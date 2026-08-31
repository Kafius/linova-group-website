# Build Brief — thelinovagroup.com v2

**For:** Claude Fable 5
**Client:** The Linova Group (Dennis De Leon, Founder & Lead Developer)
**Type:** Full rebuild of an existing marketing site. Not a restyle.

---

## 0. Fill these in before you run this brief

Anything in `<<ANGLE BRACKETS>>` is a blank Dennis supplies. Do not invent values for these — if one is still empty when you reach it, stub it behind an env var and note it in the README.

| Blank | Where it's used |
|---|---|
| `<<CALENDLY_ORG_SLUG>>` / event type slugs | Booking page + inline embeds |
| `<<GA4_MEASUREMENT_ID>>` | Analytics |
| `<<META_PIXEL_ID>>` | Paid-social landing pages |
| `<<META_CAPI_ACCESS_TOKEN>>` | Server-side conversions |
| `<<SANITY_PROJECT_ID>>` / `<<SANITY_DATASET>>` | CMS |
| `<<GOOGLE_PLACES_API_KEY>>` / `<<GOOGLE_PLACE_ID>>` | Reviews (profile not created yet — build behind a flag) |
| `<<REPO>>` — rebuild in place vs. new repo | Deployment |

Note: the existing GitHub repo for this site watches `master`, not `main`. If reusing it, confirm the branch before assuming a push deploys.

---

## 1. What this business actually is

The Linova Group is a web design, development, and digital marketing studio serving small and mid-sized businesses across the GTA, the rest of Canada, and the US.

The differentiator is not "cheap agency work." It is a **two-engine model**:

1. **An AI-implemented build system.** Not vibe coding. A real, repeatable pipeline — typed data modules, component architecture, deterministic outputs — that lets one senior developer ship agency-grade sites in a fraction of the usual time, reliably, at scale. Computer science discipline applied to AI tooling.
2. **A human marketing team in the Philippines.** Real strategists and creatives, not AI slop. The explicit position: AI compresses the build; it does not replace marketing judgment, cultural read, or creative taste.

That tension — *machine-fast delivery, human-real marketing* — is the whole story. It should be legible in the design, not just stated in copy.

**Services to foreground (in rough priority order):**
- Web design & development
- Marketing strategy & campaign execution
- Social media management **and** content creation
- Brand & graphic design
- Analytics, SEO, ongoing support

The current site buries marketing and social under a generic services grid. Reverse that. Marketing and social should feel like a co-equal half of the business, not an add-on.

---

## 2. Kill list — what the current site does that v2 must not

Fetch `thelinovagroup.com` first and read it. Then treat every one of these as prohibited:

- ❌ Centered hero with eyebrow label + two-line headline + subhead + two buttons
- ❌ "Premium Websites. Powered by the future." — retire this line entirely
- ❌ The stat trio (50+ Projects / 1–2 wk Turnaround / 70% Cost Savings) as a hero element
- ❌ A uniform grid of 6–7 service cards, each with an icon, a sentence, and "Learn more"
- ❌ Generic B2B industry taxonomy (Professional Services / Technology & IT / Construction & Engineering / Marketing & Creative / Finance & Advisory / Real Estate)
- ❌ Numbered markers (01 / 02 / 03) used decoratively on non-sequential content
- ❌ An infinite marquee of client logos as the only social proof
- ❌ Linear top-to-bottom scroll where every section is a full-width band of the same rhythm

The site should be **loud** — it must earn attention in the first viewport by *demonstrating* capability, not by claiming it.

---

## 3. Stack

Match Dennis's established stack exactly. Do not substitute.

- **Astro 5** — static output, islands only where interactivity demands it
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/styles/global.css`. **No `tailwind.config.js`.**
- **TypeScript**, strict mode
- **Sanity** as the CMS (`@sanity/astro`, embedded Studio at `/studio`)
- **GSAP 3** (free tier now includes ScrollTrigger, SplitText, Flip, Observer) + **Lenis** for smooth scroll
- **Vercel** for deploy — team `team_MOjHL1qqbXX7HNGMxvZbjs8n`. Note: the Vercel integration token historically has read scope but not project-creation scope, so create the project through the dashboard and wire the repo, rather than assuming programmatic creation works.

### Architecture conventions (follow these — they're the house style)

```
src/
  components/     # one folder per section, scoped styles, no god-components
  data/           # typed TS modules — the single source of truth for static content
    industries.ts
    services.ts
    clients.ts
    process.ts
  layouts/
  lib/            # sanity client, analytics, meta capi, places api
  pages/
  styles/global.css
  types/
```

Every data module exports a typed array plus its interface. Components consume typed data; they never hardcode content. This is what makes the site editable in one place and is the same pattern used across the client portfolio.

**No React unless a component genuinely needs state.** Animation runs from vanilla TypeScript in Astro `<script>` blocks, not from a React island. Keep the JS payload honest.

---

## 4. Art direction

### Existing brand tokens (the floor, not the ceiling)

- Navy `#242460`
- Gold `#C8A05A`
- Display: Instrument Serif
- Mono/utility: IBM Plex Mono

### The brief for you

Navy + gold + serif is a *credible* palette. It is not a *loud* one. The mandate is bold. So: **keep navy and gold as the anchor and equity carriers, but extend the system with a third high-energy accent and a much more aggressive type scale.** Propose the extension — don't just apply the existing two colors harder.

Constraints on your proposal:

- Do not land on warm cream (#F4F1EA-ish) + high-contrast serif + terracotta. Do not land on near-black + single acid-green accent. Both are current AI-design defaults and will read as generic.
- Navy must remain dominant enough that the brand is still recognizable to existing clients.
- The gold is a *precision* accent — thin rules, small caps, numerals, hairline underlines. Do not use it as a large fill.
- Add a body face that is not Instrument Serif and not IBM Plex Mono. Instrument Serif at display sizes with a neutral grotesk at text sizes is a defensible pairing; pick deliberately and justify it.
- Set a real type scale with a wide dynamic range — display sizes should go genuinely large (clamp up past 8rem on desktop), body should stay disciplined.

Before writing any code, output a short design plan: 4–6 named hex values, the type roles, a layout concept with an ASCII wireframe of the homepage, and one named **signature element** — the single thing this site will be remembered by. Review that plan against this brief and revise anything that reads like a default. Then build to the revised plan.

---

## 5. The motion system

This is the centerpiece. "Animation-heavy, non-linear scroll" is the explicit ask.

### Techniques in scope

Use a **small vocabulary applied with discipline**, not every effect available:

- **Pinned horizontal sections** — the industries showcase scrolls sideways while the page is pinned
- **Sticky stacking** — cards that stack and offset rather than scroll past
- **Scroll-scrubbed transforms** — element position/scale/mask tied to scroll progress, not to a trigger point
- **Section-level color inversion** — the page theme flips as you cross boundaries, driven by ScrollTrigger
- **SplitText reveals** — line and character staggers on display headings, once, on enter
- **Magnetic / cursor-reactive elements** — on the primary CTA and the industry tiles only
- **A page-load sequence** — an orchestrated 1.2s entrance, run once per session (`sessionStorage`), skippable

### Rules

- Every scroll-driven effect uses **Lenis + `ScrollTrigger.scrollerProxy`**. Do not mix native smooth-scroll with GSAP.
- **`prefers-reduced-motion: reduce` is non-negotiable.** Under it: all scrub animations resolve to their end state, pinning is disabled, horizontal sections become vertical stacks, the load sequence is skipped. Test this path.
- Kill all ScrollTriggers on Astro view transitions (`astro:before-swap`) or you will leak instances and the second page visit will jank.
- Mobile gets a **reduced** motion set, not the same set scaled down. Pinned horizontal sections in particular should degrade to a snap-scroll carousel below `lg`.
- Nothing animates the LCP element. The largest text or image in the first viewport paints immediately; motion applies to everything around it.
- Budget: **no more than one pinned section per page.** Two is where scroll-hijacking starts feeling hostile.

---

## 6. Sitemap

```
/                       Home
/work                   Case studies index (Sanity-driven)
/work/[slug]            Case study detail
/industries             Overview of all seven
/industries/[slug]      Per-vertical page (7 of these)
/services               Services — web / marketing / social / design
/about                  The journey + the team
/book                   Calendly
/contact                Form fallback
/lp/[campaign]          Paid-social landing pages (no nav, no footer)
/lp/[campaign]/thanks   Conversion page
/studio                 Sanity Studio (noindex)
/privacy /terms
```

---

## 7. Homepage

### 7.1 The opening — replace the hero entirely

Do not build a hero. Build a **first act**.

The job of the first viewport: make a visitor from any of seven wildly different industries think *"they build for someone like me"* within three seconds, and make them think *"these people can actually design"* within one.

**Recommended direction — "Seven Businesses, One System":**

A full-viewport composition where a single sentence anchors the screen and one word inside it cycles through the seven verticals — `barbershops` → `restaurants` → `contractors` → `dojos` → `roofing suppliers` → `retail` → `transport` — while the environment behind it swaps in sync: color theme, texture, a signature motif per vertical. The wordmark and a single CTA sit fixed on top. It's kinetic, it's on-brand for a studio selling design, and it does the "paint the picture for a multitude of businesses" job literally in the first three seconds.

Make the cycling **scroll-reactive as well as autoplaying** — as the user starts to scroll, the cycle accelerates and then resolves into the industries section. That's the non-linear feel: the hero doesn't scroll away, it *transitions into* the next act.

Two alternates if you can justify one better:
- **"The Wall"** — a live mosaic of actual client sites, columns drifting in opposing directions, wordmark knocked out over it. Maximum proof, less narrative.
- **"The Build"** — the page assembles itself on load: wireframe → type → color → imagery, in about 1.5s. Demonstrates the system thesis directly, but risks feeling like a loading screen.

Whichever you choose, **there is no subhead paragraph and no pair of buttons.** One CTA maximum in the first viewport.

### 7.2 Remaining homepage acts

Sections, in order — each with a distinct spatial rhythm so the scroll never feels like a stack of bands:

1. **Opening act** (above)
2. **Industries** — pinned horizontal scroll through all seven. Each panel: vertical name, the real problem that vertical has online, the client proof, a link to the detail page.
3. **The system** — the AI-implemented pipeline. This is the most important section on the site and it must *show*, not tell. Consider a scroll-scrubbed sequence that walks a project from intake → typed data model → component build → deploy, with real artifacts (a code fragment, a Lighthouse score, a deploy log). Concrete beats abstract.
4. **The marketing team** — a hard tonal shift. Where the system section is cold, mechanical, precise, this one should be warm and human: real faces, the Philippines team, the explicit line that marketing is where AI stops. Use the section color inversion here — this is the site's emotional turn.
5. **Selected work** — three Sanity case studies, oversized, magazine-scale. Not a card grid.
6. **Reviews** — Google reviews when the profile exists; behind a feature flag until then.
7. **Close** — booking CTA into Calendly.

The client logo wall from the current site can survive, but demoted: a quiet band, not a centerpiece.

---

## 8. The seven verticals

Build `src/data/industries.ts` with this shape. Each gets a real page at `/industries/[slug]`.

```ts
export interface Industry {
  slug: string;
  name: string;
  headline: string;          // the pain, in their language
  problem: string;           // what's broken about how this vertical shows up online
  approach: string[];        // what Linova does differently for them
  proof?: {
    client: string;
    url: string;
    result?: string;
  };
  status: 'live' | 'concept'; // 'concept' = spec work, no client yet
  motif: string;              // the visual signature for this vertical
  accent: string;             // hex — theme color for this vertical's panel
}
```

| Vertical | Proof client | Status |
|---|---|---|
| Contractors | cherrygrovegroup.com | live |
| Restaurants | bikong.ca | live |
| Hair Salons | — | **concept** |
| Retail | — | **concept** |
| B2B / Supply | liveroofontario.ca | live |
| Schools & Instruction | markhamtaekwondoacademy.com | live |
| Services / Transport | ecaretransinc.com | live |

**Handling the two concept verticals honestly:** do not fake a client. Build these two as *speculative concept pieces* — a designed mockup Linova produced to show what the vertical could look like. Label them clearly as concept work. This is more credible than a vague industry page with no proof, and it doubles as a sales asset for the first salon or retail client. Design and build both mockups as part of this project.

Each industry page also needs vertical-specific marketing angles — a barbershop cares about Instagram Reels and booking friction; a roofing supplier cares about spec sheets and lead qualification. Write these specifically, not interchangeably.

---

## 9. Sanity

Set up Sanity for case studies now, even though the content comes later. Embedded Studio at `/studio`, noindexed, protected.

**Schemas:**

- `caseStudy` — title, slug, client, industry (ref), summary, challenge, approach (portable text), results (array of `{metric, value, context}`), hero image, gallery, tech stack (array), live URL, testimonial (ref), featured (bool), publishedAt
- `industry` — mirrors the TS interface, so verticals can move to CMS later without a refactor
- `testimonial` — quote, author, role, company, avatar, related case study
- `teamMember` — name, role, location, photo, bio (for the Philippines marketing team section)
- `siteSettings` — singleton: nav, footer, social links, default SEO, feature flags

**Rules:**
- Fetch at build time via GROQ. Configure a Sanity webhook → Vercel deploy hook so publishing triggers a rebuild.
- Ship **three seeded case studies** so `/work` is never empty on launch. Use Cherry Grove, Bikong, and LiveRoof Ontario. Write real copy — do not use lorem ipsum.
- Use `@sanity/image-url` for responsive images, served as AVIF/WebP.

---

## 10. Integrations

### Calendly (`/book`)

- Inline embed of `<<CALENDLY_ORG_SLUG>>`, prefilled with name/email from any form the visitor already touched.
- **Do not load `widget.js` globally.** Load it on the `/book` route only, or on first interaction with a "Book a call" trigger elsewhere. It's a heavy third-party script and it will wreck your LCP if it's in the base layout.
- Wire Calendly's postMessage events (`calendly.event_scheduled`) to fire a GA4 conversion event and, on `/lp/*` routes, a Meta `Schedule` event.
- Provide a plain-link fallback for anyone blocking the embed.

### Google Analytics 4

- `<<GA4_MEASUREMENT_ID>>` via `@astrojs/partytown`, or a plain `is:inline` gtag snippet if Partytown causes ordering problems (it sometimes does with consent mode).
- **Google Consent Mode v2** with a lightweight banner. Dennis operates in Ontario and sells into the US — default `denied` for `ad_storage` and `ad_user_data`, `granted` on acceptance. PIPEDA and the Quebec Law 25 posture both favor this default.
- Custom events: `book_click`, `calendly_scheduled`, `form_submit`, `industry_view`, `case_study_view`, `lp_conversion`.

### Meta (Facebook / Instagram) — paid-social pipeline

- `<<META_PIXEL_ID>>` fires **only on `/lp/*` routes.** Do not pixel the whole site.
- **Conversions API** via a Vercel serverless function at `/api/capi` — server-side `Lead` and `Schedule` events with an `event_id` matched to the browser pixel for deduplication. Hash PII with SHA-256 before it leaves the server.
- Capture and persist UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) plus `fbclid` into hidden form fields, so leads land attributable.

### Google Reviews

The Business Profile doesn't exist yet, so:

- Build the component and the fetch layer now, gated behind a `siteSettings.features.googleReviews` flag that is **off** by default.
- Use **Places API (New) — Place Details**, which returns up to five reviews. Fetch at build time and cache the response as JSON; do not call the API per pageview (quota + latency).
- Google's terms require attribution and prohibit modifying review text — render the reviewer name, photo, rating, relative time, and the "Powered by Google" mark.
- Include a written setup checklist in the README for claiming the profile and getting the Place ID.

---

## 11. Paid-social landing pages (`/lp/[campaign]`)

A reusable, data-driven template — new campaigns should be a new entry in `src/data/campaigns.ts`, not a new page file.

**Rules:**
- No global nav. No footer links. Logo is not a link home.
- One offer, one CTA, repeated. Everything above the fold serves the ad's promise.
- Message-match: the headline should echo the ad creative. Make that a required field in the campaign data type.
- Mobile-first, hard. This traffic is ~90% mobile in-app browsers.
- Form: name, business, email, phone, "what do you need" (select), plus the hidden UTM/fbclid fields.
- Motion here is **restrained** — a single reveal, nothing that delays the form. LP conversion beats LP artistry.
- `/lp/[campaign]/thanks` fires the conversion events and offers the Calendly embed as the immediate next step.
- All `/lp/*` routes are `noindex, nofollow`.

---

## 12. About page

This is the page Dennis cares most about. It is a narrative, not a bio grid.

**The arc:**

1. **The background.** Computer science, then B2B sales — cold calling, BDR work. An unusual combination: someone who can build the thing *and* knows why a small business owner picks up the phone.
2. **The problem he saw.** Small businesses in the GTA — restaurants, trades, dojos, transport companies — getting quoted agency prices for template work, or getting cheap template work and paying for it in lost customers.
3. **The turn.** Not "I started using AI." The specific claim: **this is not vibe coding.** Vibe coding produces something that demos well and breaks in production. What he built instead is a *system* — typed data architecture, consistent component patterns, deterministic build pipelines, real testing — where AI is the accelerant inside an engineering discipline, not a replacement for it. That's why the output is reliable enough to scale across dozens of clients rather than impressive once.
4. **The other half.** The marketing team in the Philippines. State the position plainly and without hedging: AI can compress a build. It cannot do marketing. It cannot read a neighborhood, feel out a brand's voice, or know why one Reel lands and the next one dies. That work is done by people, and Linova is not going to pretend otherwise while competitors ship AI slop. Name the team, show faces, give them roles.
5. **The synthesis.** Machine-fast where machines are better. Human where humans are better. That's the whole company.

**Tone:** first person, direct, confident, zero corporate filler. No "we believe in excellence." Specifics only. Let the writing carry conviction rather than adjectives.

**Design:** this page should be the *quietest* on the site — long-form, typographically driven, generous measure. Coming off six loud pages, restraint here reads as substance. One scroll-driven device maximum.

Byline and all business-facing attribution: **Dennis De Leon**.

---

## 13. Copy rules

- Sentence case everywhere. No Title Case Headlines.
- No "leverage," "solutions," "empower," "elevate," "unlock," "seamless," "cutting-edge," "in today's digital landscape."
- Numbers over adjectives. "Launched in nine days" beats "fast turnaround."
- Buttons name their action and keep that name through the flow. "Book a call" → the page says "Book a call" → the confirmation says "Call booked."
- Every industry page speaks that industry's language. A restaurant page says "covers" and "rush." A contractor page says "bids" and "callbacks."
- Empty and error states get direction, not apology.

---

## 14. Quality floor

- Lighthouse mobile: **Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100.** With this much motion that's a real constraint — it's the point. Prove that heavy animation and a fast site aren't in conflict, because that claim *is* the sales pitch.
- Core Web Vitals: LCP < 2.0s, CLS < 0.05, INP < 200ms.
- Total JS on the homepage < 150KB gzipped, GSAP included. Import only the plugins used.
- All images AVIF/WebP with correct `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image.
- WCAG 2.1 AA: visible keyboard focus on every interactive element, 4.5:1 text contrast, full keyboard operability of horizontal-scroll sections, no motion-only information.
- Self-host fonts. `font-display: swap`, subset, preload the display face only.
- Per-page meta, OG images, JSON-LD (`Organization`, `LocalBusiness` at region level (no locality published), `Service`, `BreadcrumbList`), sitemap, robots.txt with `/lp/` and `/studio` disallowed.

---

## 15. Build order

Work in phases. Stop at the end of each and show the result before continuing.

1. **Design plan** — palette, type, layout concept + ASCII wireframe, named signature element. Self-critique against §4. No code.
2. **Foundation** — Astro 5 + Tailwind v4 `@theme` tokens, fonts, layout shell, nav, footer, `src/data/*` modules populated with real content.
3. **Homepage act 1** — the opening. Get this right before anything else; everything downstream inherits its energy.
4. **Homepage acts 2–7** — motion system built as reusable utilities in `src/lib/motion/`, not copy-pasted per section.
5. **Industries** — index + seven detail pages, including the two concept mockups.
6. **Sanity** — schemas, Studio, GROQ layer, `/work` index and detail, three seeded case studies.
7. **About + Services**
8. **Integrations** — Calendly, GA4 + consent, Meta pixel/CAPI, reviews behind the flag.
9. **Landing page template** — plus one live campaign as a reference implementation.
10. **Audit** — Lighthouse, keyboard pass, reduced-motion pass, mobile pass on a real narrow viewport. Fix, re-run, report the numbers.

---

## 16. Acceptance criteria

- [ ] Nothing on the kill list in §2 appears anywhere on the site
- [ ] First viewport communicates multi-vertical reach without a bulleted list
- [ ] All seven verticals have a real page; the two concept ones are labeled honestly
- [ ] `prefers-reduced-motion` produces a fully usable, non-degraded site
- [ ] Homepage passes the Lighthouse targets in §14 **with** the motion system live
- [ ] Sanity Studio publishes a case study and triggers a rebuild
- [ ] A `/lp/*` submission fires both browser and server-side Meta events with matched `event_id`
- [ ] Calendly booking fires a GA4 conversion
- [ ] The About page reads like a person wrote it
- [ ] Zero console errors; zero leaked ScrollTrigger instances after three view transitions

---

## 17. Ask before assuming

If any of these are unclear when you reach them, stop and ask rather than guessing: the final palette extension, which opening direction to build, whether the two concept verticals should be full mockup sites or single-page concepts, and the real content for the Philippines team section (names, roles, photos).
