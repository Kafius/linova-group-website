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
   - `UNLOCK_WEBHOOK_SECRET` — shared/signing secret for the payment webhook
3. **DNS** — add `preview.thelinovagroup.com` to the Vercel project.

**Graceful degradation.** Every smart feature falls back to manual entry when its
key is missing: no `GOOGLE_MAPS_KEY` → `/api/nearby` returns empty suggestions and
`/api/extract` skips the neighbourhood lookup; no `ANTHROPIC_API_KEY` → the AI story
is blank and `/api/floorplan` returns the beds/baths room template; no Supabase
service key → `/api/upload` and writes return 503.

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

## Deliberately deferred (integration boundaries)

These need external credentials/decisions and are stubbed with clear TODOs:

- **Payments** — `/api/unlock` currently accepts a shared-secret header
  (`x-unlock-secret`) as a stand-in. Replace with real Stripe/Clover webhook
  signature verification and map the provider payload → listing slug via
  checkout metadata.
- **Photo uploads** — the builder takes image URLs (per the prototype). Production
  should upload to a Supabase storage bucket (client-side resize first) and store
  the returned URLs in `listings.photos`.
- **Custom-domain provisioning** — on unlock, point `custom_domain` via the
  Vercel Domains API (`/api/unlock` marks the column; provisioning is TODO).
- **AI copywriting** — generate the headline/story from raw details to cut build
  time (not yet wired).

## How the preview stays private

- `locked=true` by default. While locked, the preview route sends
  `Cache-Control: private, no-store` + `X-Robots-Tag: noindex,nofollow`, and the
  template adds the watermark overlay + `<meta robots noindex>`.
- RLS only exposes **unlocked** listings to anon reads; every write goes through
  the service-role API routes.
