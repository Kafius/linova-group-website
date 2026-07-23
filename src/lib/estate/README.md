# Estate Sites — single-property generator

A form-driven tool that turns one listing into a cinematic single-property
website. Agents build a free, watermarked preview under `preview.thelinovagroup.com/<slug>`
and pay to unlock (remove watermark, publish, point a custom domain).

## Routes

| Path | Type | Purpose |
|---|---|---|
| `/estate-sites` | static | Marketing landing page |
| `/estate-sites/new` | static | The builder — a 3-step wizard + live preview |
| `/preview/[slug]` | server (`prerender=false`) | The generated site, read from Supabase |
| `/api/generate` | server | Persist a listing → return slug (`locked=true`) |
| `/api/upload` | server | Compress-then-store a photo/floor plan in Supabase storage |
| `/api/extract` | server | Address → neighbourhood + AI hero title/story (graceful fallback) |
| `/api/nearby` | server | Places Nearby Search → amenity suggestions + GTA commute times |
| `/api/floorplan` | server | AI vision → room breakdown; falls back to a beds/baths template |
| `/api/distances` | server | Google Maps proxy → walk/drive times for named POIs |
| `/api/unlock` | server | Payment webhook → flips `locked=false` |

### The builder wizard (`/estate-sites/new`)
1. **Basics** — address, price, beds/baths/sqft/year/lot, agent name/brokerage/phone/email. On submit it calls `/api/extract` + `/api/nearby`.
2. **Review** — confirm/edit the extracted neighbourhood, hero title, AI story, amenity suggestions, and auto-filled commute times; add your own.
3. **The Tour** — optional floor-plan upload (AI-sectioned via `/api/floorplan`, hybrid with a beds/baths template) → one card per room with capture **guidance**, a recommended **shot checklist** + completeness meter, and multi-photo **uploads** (compressed client-side, stored via `/api/upload`). Rooms hold many angles; the generated tour pans through them.

Room guidance/checklists live in [`rooms.ts`](rooms.ts). A draft is saved to `localStorage` so work survives a refresh.

`preview.thelinovagroup.com/<slug>` maps to `/preview/<slug>` via the host
rewrite in [`vercel.json`](../../../vercel.json). Point that subdomain at the
Vercel project.

## Files

- `types.ts` — `Listing`, `Poi`, `POI_TYPES`.
- `template.ts` — `buildSiteHTML(listing, opts)`: the self-contained cinematic
  document. Shared by the preview route (server) and the builder's live preview
  (client, via `<iframe srcdoc>`).
- `slug.ts` — slug helpers used by `/api/generate`.
- `supabase-admin.ts` — **server-only** Supabase client (service role key). Never
  import into client code.

## Sale or lease

The builder opens in **lease** mode (the Sale/Lease toggle at the top of Step 1;
lease is the default). `listing_type` (`'sale' | 'lease'`) drives the generated
site: leases show the rent as **"$X / month"**, add a **Terms at a glance**
section (term, availability, furnished, pets, utilities, deposit), swap the CTA
to *Now Leasing → Request a Viewing*, and drop the sale-only *Per Sq Ft* figure.
Sales render exactly as before. `price` holds the sale price, or the monthly
rent when leasing. The DB column defaults to `'sale'` so any legacy row keeps its
meaning; the form defaults new listings to `'lease'`.

## Setup

1. **Database** — run the migrations in order in the Supabase SQL editor:
   `0001_estate_listings.sql` … `0006_estate_lease.sql`
   (creates `listings` + `distance_cache`; the tour/commute + email columns; the
   public `listing-photos` storage bucket + read policy; the caching + rate-limit
   tables; the `estate_drafts` table; and the lease columns + `listing_type`).
2. **Env vars** (add to `.env` locally and the Vercel project):
   - `PUBLIC_SUPABASE_URL` — already present
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase → Settings → API (uploads + writes)
   - `GOOGLE_MAPS_KEY` — restricted to Geocoding + Places + Distance Matrix + your
     domain, with billing alerts enabled
   - `ANTHROPIC_API_KEY` — powers AI story/hero-title and floor-plan room detection
   - `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` — unlock/publish payments (see
     **Payments** below); optional `UNLOCK_PRICE_CENTS` / `UNLOCK_CURRENCY`
3. **DNS** — add `preview.thelinovagroup.com` to the Vercel project.

**Graceful degradation.** Every smart feature falls back to manual entry when its
key is missing: no `GOOGLE_MAPS_KEY` → `/api/nearby` returns empty suggestions and
`/api/extract` skips the neighbourhood lookup; no `ANTHROPIC_API_KEY` → the AI story
is blank and `/api/floorplan` returns the beds/baths room template; no Supabase
service key → `/api/upload` and writes return 503; no `STRIPE_SECRET_KEY` →
`/api/checkout` and the Publish button return 503 (the preview still works).

## Accounts, drafts & cost controls

- **Agent sign-in (optional).** The wizard shows an "email me a link" bar. When
  signed in (Supabase Auth magic link, [`supabase-browser.ts`](supabase-browser.ts)),
  the draft **autosaves to `estate_drafts`** and reloads on any device, and the
  generated listing is attributed to the agent (`agent_id`, verified from the
  JWT in `/api/generate`). Signed out, the draft still persists to `localStorage`.
  Requires the Email provider enabled in Supabase and the site/preview URLs in
  the auth redirect allowlist.
- **Rate limiting.** The billed endpoints (`/api/nearby` 20/min, `/api/distances`
  30/min, `/api/extract` 20/min, `/api/floorplan` 10/min, `/api/upload` 60/min)
  are throttled per-IP via [`ratelimit.ts`](ratelimit.ts) + the `api_rate_limits`
  table. Fail-open (no store → no throttle). Prune old rows on a schedule.
- **Caching.** `/api/nearby` caches results per normalized address in
  `nearby_cache` (30-day TTL); `/api/distances` caches per (address, POI). Both
  avoid re-billing Google on re-renders.

## Payments (Stripe)

Unlocking a listing (remove watermark → publish) is a **one-time Stripe payment**:

1. The locked preview shows a **Publish this site** button (`buildSiteHTML`'s
   `publish` option, set only by the preview route). It posts the slug to
   [`/api/checkout`](../../pages/api/checkout.ts).
2. `/api/checkout` creates a hosted **Checkout Session** (`mode: 'payment'`, price
   from `UNLOCK_PRICE_CENTS`/`UNLOCK_CURRENCY`, default $99 CAD) with the slug in
   `metadata`, and returns `url` for the browser to redirect to.
3. On success Stripe calls [`/api/unlock`](../../pages/api/unlock.ts) — the
   **webhook**. It verifies the `stripe-signature` against `STRIPE_WEBHOOK_SECRET`,
   and on `checkout.session.completed` flips `locked=false` for the slug.

Payment methods are **dynamic** (configured in the Stripe Dashboard, not in code).

**Setup:** set `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` (use **test** keys
first), then register a webhook endpoint at
`https://<domain>/api/unlock` subscribed to `checkout.session.completed`.
Locally, forward events with:

```
stripe listen --forward-to localhost:4321/api/unlock
```

The webhook secret it prints is your local `STRIPE_WEBHOOK_SECRET`. Test cards:
`4242 4242 4242 4242`, any future expiry/CVC.

## Custom domains (manual provisioning)

A published listing can live on its own domain. Provisioning is **deliberately
manual** — you buy the domain and wire it up; the app resolves it by Host header,
so no per-domain code or redeploy is needed.

**How it routes.** [`site.ts`](site.ts) `listingByDomain()` matches an incoming
Host against `listings.custom_domain` (with/without `www.`, unlocked only). The
homepage ([`index.astro`](../../pages/index.astro), `prerender=false`) serves that
listing at the root for any host that isn't ours; our own hosts get the marketing
page. Both responses are edge-cached (`public, max-age=300`), keyed per host.

**Two fields, on purpose:**
- `requested_domain` — what the client typed in the "Preferred domain" field at
  Stripe checkout. Saved automatically by the webhook. This is the *order*.
- `custom_domain` — the domain you've actually wired up. Setting this is what
  makes the site go live on that domain.

**Runbook (per order, do within your SLA):**
1. In Supabase (or the Stripe payment), read the listing's `requested_domain`.
2. Buy that domain (any registrar).
3. Vercel → the project → **Settings → Domains** → add the domain; follow
   Vercel's DNS instructions at the registrar (Vercel auto-issues SSL). Add both
   the apex and `www` if you want both to work.
4. In Supabase, set that listing's **`custom_domain`** to the domain (bare apex,
   e.g. `12ravinecrest.com`).
5. Visit the domain — it now serves the listing. Done, no redeploy.

## Deliberately deferred (integration boundaries)

- **Photo uploads** — the builder takes image URLs (per the prototype). Production
  should upload to a Supabase storage bucket (client-side resize first) and store
  the returned URLs in `listings.photos`.

## How the preview stays private

- `locked=true` by default. While locked, the preview route sends
  `Cache-Control: private, no-store` + `X-Robots-Tag: noindex,nofollow`, and the
  template adds the watermark overlay + `<meta robots noindex>`.
- RLS only exposes **unlocked** listings to anon reads; every write goes through
  the service-role API routes.
