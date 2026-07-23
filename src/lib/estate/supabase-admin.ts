// Server-only Supabase client for the Estate Sites API routes.
//
// Uses the SERVICE ROLE key, which bypasses Row Level Security — it must NEVER
// be imported into client-side code or an .astro <script> block. Only import it
// from files that run exclusively on the server (src/pages/api/*, prerender=false
// routes). The public builder/landing pages use the anon key in the browser.
//
// Required env vars (add to .env and the Vercel project):
//   PUBLIC_SUPABASE_URL         — already present
//   SUPABASE_SERVICE_ROLE_KEY   — from Supabase → Project Settings → API

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  if (cached) return cached;

  // import.meta.env holds vars in local `astro dev`; process.env holds them in
  // the Vercel Node runtime. Check both so secrets resolve in either place.
  const url = import.meta.env.PUBLIC_SUPABASE_URL ?? process.env.PUBLIC_SUPABASE_URL;
  const serviceKey =
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase admin client not configured: set PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
