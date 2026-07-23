// Server-only, Supabase-backed fixed-window rate limiter for the Estate Sites
// API routes. Best-effort: if Supabase isn't configured, or the check errors,
// it fails open (allows the request) rather than blocking the flow.
//
// Fixed-window counting is slightly racy under high concurrency, but it's more
// than enough to cap accidental loops / abuse against billed Google + Anthropic
// endpoints. Uses the service-role client (the `api_rate_limits` table has RLS
// on with no policies, so only the service role can touch it).

import { getAdminClient } from './supabase-admin';
import { json } from './server';

export interface RateResult {
  ok: boolean;
  retryAfter?: number;
}

export async function checkRateLimit(
  ident: string,
  route: string,
  max: number,
  windowSec: number
): Promise<RateResult> {
  let sb;
  try {
    sb = getAdminClient();
  } catch {
    return { ok: true }; // no store configured → don't block
  }
  try {
    const bucket = Math.floor(Date.now() / (windowSec * 1000));
    const window_start = new Date(bucket * windowSec * 1000).toISOString();
    const { data } = await sb
      .from('api_rate_limits')
      .select('count')
      .eq('ident', ident)
      .eq('route', route)
      .eq('window_start', window_start)
      .maybeSingle();
    const count = (data?.count ?? 0) + 1;
    await sb
      .from('api_rate_limits')
      .upsert({ ident, route, window_start, count }, { onConflict: 'ident,route,window_start' });
    return count > max ? { ok: false, retryAfter: windowSec } : { ok: true };
  } catch {
    return { ok: true };
  }
}

/** Standard 429 response with a Retry-After header. */
export function tooMany(retryAfter = 60): Response {
  const res = json({ error: 'Too many requests — please slow down.' }, 429);
  res.headers.set('retry-after', String(retryAfter));
  return res;
}
