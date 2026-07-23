// Browser Supabase client for agent auth + draft sync in the builder.
//
// Uses the PUBLIC anon key (safe to ship) with sessions persisted to
// localStorage and magic-link detection in the return URL. Returns null when
// the public env isn't configured, so the wizard simply hides the auth bar.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null | undefined;

export function getBrowserClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  cached = url && anon
    ? createClient(url, anon, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null;
  return cached;
}
