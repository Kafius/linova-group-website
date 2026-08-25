# thelinovagroup.com — v2

The rebuilt Linova Group site: "Plotter & Marker" design system, Astro static
output, typed data modules, GSAP + Lenis motion, Sanity case studies.

This repo is **multi-tenant**: it also hosts client/demo sub-sites
(`/sourdelusions`, `/vinyllitetech`, `/wardkraft`), the estate-sites product
(`/estate-sites` + `src/pages/api/*` with Stripe/Supabase), and the
`preview.thelinovagroup.com` rewrite. The v2 rebuild does not touch those.

> **Branch note:** the Vercel project watches `master`. The rebuild lives on
> the `v2` branch — merging `v2 → master` deploys it.

## Running it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output via the Vercel adapter
```

- Design system: `src/styles/linova.css` (Tailwind v4 `@theme` — no
  `tailwind.config.js`). Living reference at `/styleguide` (noindexed).
- Content: `src/data/*.ts` — typed modules, single source of truth.
  Components never hardcode copy.
- Motion: `src/lib/motion/` — Lenis + ScrollTrigger bridge, reduced-motion
  guards, magnetic hover. One pinned section per page, by law.
- Design plan (palette, type, the ten laws): the "Plotter & Marker" sheet —
  ask Dennis for the artifact link, or read the tokens in `linova.css`.

## Environment (`.env`, mirrored in Vercel)

Copy `.env.example`. Everything builds with **zero** env vars set — features
light up as values arrive:

| Variable | Status | What it unlocks |
|---|---|---|
| `PUBLIC_GA4_MEASUREMENT_ID` | defaults to the live `G-V6RVGVM23G` | GA4 (Consent Mode v2, default denied) |
| `PUBLIC_CALENDLY_EVENT` | defaults to `ddeleon-thelinovagroup/30min` (the live link from `/discovery`) | `/book` + LP thanks embeds |
| `PUBLIC_LINOVA_SANITY_PROJECT_ID` | **empty — create the project** | Sanity fetches + `/studio` |
| `PUBLIC_LINOVA_SANITY_DATASET` | `production` | — |
| `PUBLIC_META_PIXEL_ID` | **empty** | Meta pixel on `/lp/*` only |
| `META_CAPI_ACCESS_TOKEN` | **empty** | server-side `/api/capi` events |
| `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` | **empty** | Google reviews band |
| `PUBLIC_FEATURE_GOOGLE_REVIEWS` | `false` | the reviews feature flag |

## Sanity setup (one-time)

1. `npx sanity init` in a scratch folder (or sanity.io/manage) → create a new
   project. Copy the project id into `PUBLIC_LINOVA_SANITY_PROJECT_ID`
   (local `.env` **and** Vercel).
2. Import the seeded case studies:
   `npx sanity dataset import sanity/seed/case-studies.ndjson production`
   (run from the repo root; `sanity.config.ts` points at the project).
   Attach the hero images in Studio — the local seeds keep rendering until
   Sanity has content, so nothing breaks in between.
3. Deploy → visit `/studio` (noindexed, Sanity login gates it).
4. **Publish → rebuild webhook:** Vercel → Project → Settings → Git →
   Deploy Hooks → create one for `master`. Then sanity.io/manage → API →
   Webhooks → add it, dataset `production`. Publishing a case study now
   triggers a rebuild (acceptance §16).

Until step 1 happens, `/work` renders from `src/data/caseStudies.ts` — the
three seeded studies (Cherry Grove, Bikong, LiveRoof) written from observable
facts on the live sites. No lorem, no invented metrics.

## Google Business Profile → reviews (when ready)

1. Create/claim the profile at business.google.com (Thornhill service-area
   business; pick the street-address visibility Dennis wants).
2. Once verified, find the Place ID: developers.google.com/maps →
   "Place ID Finder" → search the business name.
3. Google Cloud console → enable **Places API (New)** → create an API key
   restricted to it → `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` in Vercel.
4. Flip `PUBLIC_FEATURE_GOOGLE_REVIEWS=true` and redeploy. Reviews are
   fetched at build time (max five, per the API), rendered unmodified with
   the reviewer's name/photo/time and the "powered by Google" attribution —
   the terms require both.
5. Also: update `src/lib/jsonld.ts` with the street address once public.

## Paid-social landing pages

New campaign = new entry in `src/data/campaigns.ts` (the `headline` must
message-match the ad creative — it's a typed, required field). Routes are
`/lp/<slug>` + `/lp/<slug>/thanks`, `noindex`, no nav/footer, robots-blocked.

The lead flow fires three ways at once: Formspree (the actual lead), browser
pixel `Lead`, and `/api/capi` server `Lead` — pixel and CAPI share one
`event_id`, so Meta deduplicates. PII is SHA-256-hashed server-side. The
thanks page offers Calendly and fires `Schedule` the same dual way.

## Analytics events

`book_click`, `calendly_scheduled`, `form_submit`, `industry_view`,
`case_study_view`, `lp_conversion` — all through `window.linovaTrack`,
all gated behind the consent banner (default denied; PIPEDA/Law 25 posture).

## Launch checklist (merge day)

- [ ] Merge `v2` → `master` (Vercel deploys `master`)
- [ ] Point the Calendly event's confirmation redirect at `/thank-you-booked`
      or retire it — then **retire `/discovery`** (redirect → `/book`) and
      update any running ads
- [ ] Set the Sanity env vars + webhook (above)
- [ ] Photos + names for the Philippines team → homepage handoff act &
      About page (placeholders are honestly labeled until then)
- [ ] Real OG image at `public/og/default.png` (1200×630; currently absent —
      pages reference it, so ship one before launch)
- [ ] LinkedIn Insight tag: the old layout carried partner id `9138074`;
      re-add in `BaseLayout` only if the LinkedIn campaigns are still live
- [ ] Lighthouse scores land in the homepage system section
      (`data-lighthouse-slot`) once measured on production
