# thelinovagroup.com — v2

The rebuilt Linova Group site: "Plotter & Marker" design system, Astro static
output, typed data modules, GSAP + Lenis motion, Sanity case studies.

The repo is now the marketing site and nothing else, on one design system and
one layout. The previous design — `Layout.astro`, `global.css`, the Plus
Jakarta/aurora components, `/discovery`, and 33MB of stock video — was removed
on 2026-08-31; like the earlier rounds it is recoverable from git history.

Two earlier rounds of removal, on 2026-08-25:

- the legacy client/demo sub-sites (`/sourdelusions`, `/vinyllitetech`,
  `/wardkraft`);
- the estate-sites product — `/estate-sites`, `/preview/*`, `src/lib/estate/`,
  the Supabase migrations, and nine of the ten `src/pages/api/*` routes. The
  `@supabase/supabase-js`, `stripe`, and `@anthropic-ai/sdk` dependencies came
  out with them, as did `vercel.json` (its only rewrite served
  `preview.thelinovagroup.com`).

`src/pages/api/capi.ts` is the one surviving API route — the Meta Conversions
API endpoint for the `/lp/*` paid-social pipeline.

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
- Images belong in `src/assets/`, imported, never in `public/`: only imported
  images go through Astro's pipeline (resize, WebP, width/height attributes).
  `public/` holds just fonts, the favicon/OG image, and robots.txt. Logos
  served raw from public/ once cost 1.5MB for boxes no bigger than 190×66.
- Scanning emphasis: a record's `keywords` array plus `src/lib/emphasis.ts`
  lifts those terms out of its body copy at render time (`.keyword` in
  linova.css — contrast and weight, never colour, which is quarantined to the
  vertical accents). `/services` uses it on every deck and deliverable; keep
  the terms to the load-bearing nouns, roughly one per line.
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
| `PUBLIC_CALENDLY_EVENT` | defaults to `ddeleon-thelinovagroup/30min` (the live booking link) | `/book` + LP thanks embeds |
| `PUBLIC_LINOVA_SANITY_PROJECT_ID` | `99tmdxsd` — set locally, **still needed in Vercel** | Sanity fetches + `/studio` |
| `PUBLIC_LINOVA_SANITY_DATASET` | `production` | — |
| `SANITY_WRITE_TOKEN` | local only, **never in Vercel** | `npm run sanity:seed` |
| `SANITY_READ_TOKEN` | unset — only if the dataset goes private | build-time GROQ |
| `PUBLIC_META_PIXEL_ID` | **empty** | Meta pixel on `/lp/*` only |
| `META_CAPI_ACCESS_TOKEN` | **empty** | server-side `/api/capi` events |
| `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` | **empty** | Google reviews band |
| `PUBLIC_FEATURE_GOOGLE_REVIEWS` | `false` | the reviews feature flag |

## Sanity (case studies)

Project **The Linova Group** (`99tmdxsd`), dataset `production`, created
2026-08-31 and seeded with the three case studies and their hero screenshots.
`/work` builds from it; the Studio is embedded at `/studio` (noindexed, Sanity
login gates it). sanity.io/manage/project/99tmdxsd.

**Still to do on the live site:**

1. Vercel → Settings → Environment Variables: add
   `PUBLIC_LINOVA_SANITY_PROJECT_ID=99tmdxsd` and
   `PUBLIC_LINOVA_SANITY_DATASET=production`. Without them production keeps
   rendering the local seeds — silently, by design.
2. **Publish → rebuild webhook:** Vercel → Settings → Git → Deploy Hooks →
   create one for `master`. Then sanity.io/manage → API → Webhooks → add it,
   dataset `production`. Publishing a case study then triggers a rebuild
   (acceptance §16).

Re-seeding (safe to re-run — it skips documents that already exist):

```sh
npm run sanity:seed            # create missing docs + upload hero images
npm run sanity:seed -- --force # overwrite them
```

Two things to know before touching the data:

- **The dataset is public.** Published *and* draft documents are readable by
  anyone with the project id, which ships in the bundle. That is fine for
  marketing copy; if an unlaunched client's study ever needs to stay private,
  flip the dataset to private in sanity.io/manage and set `SANITY_READ_TOKEN`
  in Vercel — `src/lib/caseStudies.ts` already passes it when present.
- **Document ids must not contain a dot.** Sanity reads `.` as a path
  separator and anything off the root path (`caseStudy.bikong`, `drafts.*`) is
  invisible to unauthenticated readers, so the build would fall back to the
  seeds with no error. Ids are `caseStudy-<slug>`.

**`/studio` does not work under `npm run dev`** — it 504s on
`sanity/structure` ("Outdated Optimize Dep"). That is @sanity/astro 3.5.1
against Astro 7's Vite: the Studio is reached through a virtual module the
cold-start dep scan never sees, and the package can be neither pre-bundled
(it reaches into `sanity`'s internals, which @sanity/astro aliases instead of
optimizing) nor excluded (its source imports its own package.json). Both
workarounds were tried and both fail differently; leave `optimizeDeps` alone.
Edit content on the deployed `/studio`, or at sanity.io/manage. The
production build is unaffected — `astro build` bundles the Studio properly and
it loads, so this is a dev-server-only limitation.

Content model: `sanity/schemaTypes/`. A case study's **section** is a slug
picked from `src/data/industries.ts` (`industrySlug`), not a reference —
industries stay a code-side source of truth because the accents, motifs, and
the homepage cycle all read that module.

If `PUBLIC_LINOVA_SANITY_PROJECT_ID` is unset — or the dataset is empty —
`/work` falls back to `src/data/caseStudies.ts`, the same three studies
written from observable facts on the live sites. No lorem, no invented
metrics.

## /work — the section front

`/work` is laid out like a newspaper section front: masthead, a sticky section
rail with live counts, one lead story, then dated cards (newest first,
`publishedAt`). The rail's sections are **real static pages**
(`/work/section/<industry>`, from `src/pages/work/section/[section].astro`) —
not a client-side filter, so the links are shareable and work without JS.

Section fronts are `noindex` and excluded from the sitemap: they are a
navigation view over the same case studies `/work` already publishes, and with
one or two studies each they would be thin, duplicate content. Worth flipping
to indexable once a section carries three-plus studies.

## /industries — the directory

Two layers, both in `src/data/industries.ts`:

- **`industryCategories`** — six groups over the fourteen playbooks
  (`category` on each vertical). Ordering is editorial, not by volume, and
  every group holds at least two verticals; a category of one reads as a
  mistake in the rail.
- **`covers`** — the specific business types each playbook is written for
  ("HVAC, electrical & plumbing", "hybrid & EV service"). This is the layer a
  visitor scans to find themselves, rendered as a plain dot-separated line by
  `src/components/industries/Covers.astro` — inside every card on
  `/industries`, and behind a "built for" label on the vertical's own page. It
  says who the playbook is **for**, never a claim of work already done, so it
  stays honest for `concept` verticals too.

The playbooks are **cards in a three-up grid**
(`src/components/industries/IndustryCards.astro`), grouped under their
category heading: the vertical's photograph from `src/assets/industries/` on
top (`IndustryPhoto`, which falls back to a placeholder frame printing the art
direction when a file is missing), then the index number, the proof or
`concept` chip, the name in its accent, the pain line, and the trades it
covers. Cards stretch to a common height per row, and they are numbered in
reading order down the page rather than by roster position — grouping breaks
the roster's order, and 03 / 08 / 02 running across a page reads as a bug.
The plotter motifs stay on the verticals' own pages.

Group fronts live at `/industries/category/<group>` — real static pages, same
rule as `/work/section/*`, and `noindex` + out of the sitemap for the same
reason. Both index pages share one rail component,
`src/components/shell/SectionRail.astro`.

## Google Business Profile → reviews (when ready)

1. Create/claim the profile at business.google.com (service-area business —
   keep the street address hidden; the site publishes no locality).
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

- [ ] **Commit the rebuild and merge `v2` → `master`** — Vercel deploys
      `master`, so none of this is live until that happens
- [ ] Sanity env vars in Vercel (`PUBLIC_LINOVA_SANITY_PROJECT_ID`,
      `PUBLIC_LINOVA_SANITY_DATASET`) + the publish → deploy-hook webhook
      (above). Without them production silently renders the seeded studies
- [ ] Update any running ads that still point at `/discovery` — the URL now
      301s to `/book` (astro.config), so nothing breaks, but the ad should
      name the real destination
- [ ] LinkedIn Insight tag: the retired layout carried partner id `9138074`
      (see git history); re-add in `BaseLayout` only if those campaigns still run

Optional, still dark behind flags:

- [ ] Google reviews band — needs `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`
      and `PUBLIC_FEATURE_GOOGLE_REVIEWS=true` (see the Google Business
      Profile section above)
- [ ] Meta pixel on `/lp/*` — needs `PUBLIC_META_PIXEL_ID` +
      `META_CAPI_ACCESS_TOKEN`

Polish from the 2026-08-31 site audit, none of it blocking:

- [ ] 14 meta descriptions run past the ~165-char SERP cutoff (homepage 212,
      `/industries/clinic` 203); `/terms` is only 36. All in `seo.description`
      in `src/data/industries.ts` and `src/data/site.ts`
- [ ] Three titles over 65 chars: `/industries/carwash` (74),
      `/industries/cleaning` (67), `/work/liveroof-ontario` (66)
- [ ] Tap targets under WCAG 2.2's 24px minimum: footer "Privacy"/"Terms"
      (20px), "Send a message" (21px), "read the case study →" (17px)
