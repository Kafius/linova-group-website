// POST /api/checkout — start a Stripe Checkout Session to unlock a listing.
//
// The locked preview's "Publish" button posts { slug } here. We look up the
// listing, create a one-time hosted Checkout Session with the slug in metadata,
// and return { url } for the browser to redirect to. On success Stripe calls
// /api/unlock (the webhook), which flips locked=false.
//
// Payment methods are dynamic (no payment_method_types) — configure them in the
// Stripe Dashboard. Price/currency come from UNLOCK_PRICE_CENTS / UNLOCK_CURRENCY
// (default $99 CAD).

import type { APIRoute } from 'astro';
import { json, clientIp } from '../../lib/estate/server';
import { getAdminClient } from '../../lib/estate/supabase-admin';
import { getStripe, unlockAmount, unlockCurrency } from '../../lib/estate/stripe';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'checkout', 15, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  const stripe = getStripe();
  if (!stripe) return json({ error: 'Payments unavailable: STRIPE_SECRET_KEY not set.' }, 503);

  let body: { slug?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  const slug = String(body.slug ?? '').trim();
  if (!slug) return json({ error: 'slug is required.' }, 400);

  // Confirm the listing exists (and whether it's already published).
  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return json({ error: (e as Error).message }, 503);
  }
  const { data: listing, error } = await supabase
    .from('listings')
    .select('slug, name, locked')
    .eq('slug', slug)
    .maybeSingle();
  if (error) return json({ error: error.message }, 500);
  if (!listing) return json({ error: 'No listing with that slug.' }, 404);

  const origin = new URL(request.url).origin;
  const previewUrl = `${origin}/preview/${encodeURIComponent(slug)}`;
  if (listing.locked === false) {
    // Nothing to buy — just send them to the live site.
    return json({ url: `${previewUrl}?published=1`, alreadyUnlocked: true });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: unlockCurrency(),
            unit_amount: unlockAmount(),
            product_data: {
              name: `Publish listing site — ${listing.name || slug}`.slice(0, 250),
            },
          },
        },
      ],
      metadata: { slug },
      // Mirror onto the PaymentIntent so the slug is available from either object.
      payment_intent_data: { metadata: { slug } },
      success_url: `${previewUrl}?published=1`,
      cancel_url: `${previewUrl}?canceled=1`,
    });

    if (!session.url) return json({ error: 'Could not create checkout session.' }, 502);
    return json({ url: session.url });
  } catch (e) {
    return json({ error: (e as Error).message }, 502);
  }
};
