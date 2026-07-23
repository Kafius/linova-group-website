// POST /api/unlock — payment webhook that publishes a listing.
//
// Called by the payment provider (Clover Hosted Checkout or Stripe) after a
// successful charge. It flips locked=false, which strips the watermark + noindex
// on the preview route and lets the site be exported/published.
//
// ⚠ Integration boundary: this route MUST verify the request actually came from
// the payment provider before unlocking. Two things are stubbed until the
// provider is chosen:
//   1. Signature verification (Stripe: stripe-signature HMAC; Clover: their
//      webhook auth). Right now we accept a shared-secret header as a stand-in.
//   2. Mapping the provider's payload → our listing slug (via checkout metadata).
//
// Required env: UNLOCK_WEBHOOK_SECRET  (shared secret / signing secret)

import type { APIRoute } from 'astro';
import { getAdminClient } from '../../lib/estate/supabase-admin';

export const prerender = false;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.UNLOCK_WEBHOOK_SECRET ?? process.env.UNLOCK_WEBHOOK_SECRET;
  if (!secret) {
    return json({ error: 'Unlock unavailable: UNLOCK_WEBHOOK_SECRET not set.' }, 503);
  }

  // --- Provider auth (stub) -------------------------------------------------
  // Replace with real Stripe/Clover signature verification. For Stripe:
  //   const sig = request.headers.get('stripe-signature');
  //   stripe.webhooks.constructEvent(rawBody, sig, secret);
  const provided = request.headers.get('x-unlock-secret');
  if (provided !== secret) {
    return json({ error: 'Unauthorized.' }, 401);
  }

  let body: { slug?: string; custom_domain?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const slug = String(body.slug ?? '').trim();
  if (!slug) return json({ error: 'slug is required.' }, 400);

  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return json({ error: (e as Error).message }, 503);
  }

  const update: Record<string, unknown> = { locked: false };
  if (body.custom_domain) update.custom_domain = String(body.custom_domain).slice(0, 200);

  const { data, error } = await supabase
    .from('listings')
    .update(update)
    .eq('slug', slug)
    .select('slug, locked, custom_domain')
    .maybeSingle();

  if (error) return json({ error: error.message }, 500);
  if (!data) return json({ error: 'No listing with that slug.' }, 404);

  // TODO on unlock: provision/point custom_domain (Vercel Domains API) and
  // release the exported .html build to the agent.

  return json({ ok: true, slug: data.slug, locked: data.locked });
};
