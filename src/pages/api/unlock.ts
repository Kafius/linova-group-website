// POST /api/unlock — Stripe webhook that publishes a paid listing.
//
// Stripe calls this after a successful Checkout. We verify the signature with
// STRIPE_WEBHOOK_SECRET, then on `checkout.session.completed` read the slug from
// the session metadata and flip locked=false — which strips the watermark +
// noindex on the preview route and lets the site be published/exported.
//
// Point a Stripe webhook endpoint at https://<your-domain>/api/unlock and
// subscribe to `checkout.session.completed`. Locally, forward events with:
//   stripe listen --forward-to localhost:4321/api/unlock
//
// Required env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { serverEnv, json } from '../../lib/estate/server';
import { getAdminClient } from '../../lib/estate/supabase-admin';
import { getStripe } from '../../lib/estate/stripe';

export const prerender = false;

async function publish(slug: string): Promise<Response> {
  if (!slug) return json({ error: 'No slug in session metadata.' }, 400);
  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return json({ error: (e as Error).message }, 503);
  }
  const { data, error } = await supabase
    .from('listings')
    .update({ locked: false })
    .eq('slug', slug)
    .select('slug, locked')
    .maybeSingle();
  if (error) return json({ error: error.message }, 500);
  if (!data) return json({ error: 'No listing with that slug.' }, 404);
  // TODO on unlock: provision/point custom_domain (Vercel Domains API) and
  // release the exported .html build to the agent.
  return json({ ok: true, slug: data.slug, locked: data.locked });
}

export const POST: APIRoute = async ({ request }) => {
  const stripe = getStripe();
  const whSecret = serverEnv('STRIPE_WEBHOOK_SECRET');
  if (!stripe || !whSecret) {
    return json({ error: 'Unlock unavailable: Stripe env not set.' }, 503);
  }

  const sig = request.headers.get('stripe-signature');
  if (!sig) return json({ error: 'Missing stripe-signature header.' }, 400);

  // Signature verification needs the exact raw bytes, so read text (not json).
  const raw = await request.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, whSecret);
  } catch (e) {
    return json({ error: `Webhook signature verification failed: ${(e as Error).message}` }, 400);
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Only publish on a paid session (guards free/unpaid or async-pending).
      if (session.payment_status && session.payment_status !== 'paid') {
        return json({ received: true, skipped: session.payment_status });
      }
      return publish(String(session.metadata?.slug ?? '').trim());
    }
    default:
      // Acknowledge everything else so Stripe doesn't retry.
      return json({ received: true });
  }
};
