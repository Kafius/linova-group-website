// Server-only Stripe client + unlock-pricing helpers for Estate Sites.
//
// Never import this into client code — it uses the secret key. Only /api routes
// (checkout + the webhook) touch it. Like the other integrations, it degrades
// gracefully: getStripe() returns null when STRIPE_SECRET_KEY isn't set, and the
// caller answers 503 so the rest of the builder keeps working.
//
// Env:
//   STRIPE_SECRET_KEY      — sk_… / rk_… (test key while developing)
//   STRIPE_WEBHOOK_SECRET  — whsec_… (verifies /api/unlock came from Stripe)
//   UNLOCK_PRICE_CENTS     — optional; the one-time unlock price in cents (default 9900 = $99)
//   UNLOCK_CURRENCY        — optional; ISO currency (default 'cad')

import Stripe from 'stripe';
import { serverEnv } from './server';

let cached: Stripe | null = null;

/** A Stripe client, or null when STRIPE_SECRET_KEY isn't configured. */
export function getStripe(): Stripe | null {
  if (cached) return cached;
  const key = serverEnv('STRIPE_SECRET_KEY');
  if (!key) return null;
  cached = new Stripe(key);
  return cached;
}

/** The one-time unlock price, in the smallest currency unit. Default $99. */
export function unlockAmount(): number {
  const raw = serverEnv('UNLOCK_PRICE_CENTS');
  const n = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 9900;
}

/** ISO currency for the unlock charge. Default Canadian dollars. */
export function unlockCurrency(): string {
  return (serverEnv('UNLOCK_CURRENCY') || 'cad').toLowerCase();
}
