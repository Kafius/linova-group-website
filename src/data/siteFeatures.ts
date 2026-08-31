// The parts list — everything that can be built into a site, grouped by the
// job it does. This is a catalogue, not a package: nobody gets all of it, and
// which parts a build uses comes out of the vertical's playbook (see the act-2
// claim in src/components/fit/FitSection.astro).
//
// Two renderers read this file and they show different halves of it:
//   components/features/FeaturesSection.astro (homepage act 3) — one card per
//     group showing `blurb`, ending in a Learn more button;
//   components/features/PartsList.astro (/services) — every `feature`,
//     numbered 01–42 with its `detail`.
// The homepage grid is a knowing exception to brief §2's kill list, made by
// Dennis on 2026-08-30; see the note at the top of FeaturesSection.astro.
//
// Copy rule: `detail` says what the part does for the owner in their words,
// never what it is technically. "the no-show costs something", not "Stripe
// deposit capture on booking confirmation".

export interface SiteFeature {
  name: string;
  detail: string;
}

export interface FeatureGroup {
  id: string;
  /** the job this group of parts does, in the mono register */
  name: string;
  /** what the category covers, for the act-3 cards. Landing-page length —
   *  two short sentences, ~20 words. The detail belongs on /services. */
  blurb: string;
  /** `subject` is the art direction a REPLACEMENT should follow; `alt`
   *  describes the image actually in src/assets/features/ right now. Keep alt
   *  matching the real file whenever the photo changes.
   *  The image itself lives at
   *  src/assets/features/<id>.(jpg|png|webp|avif); until one is dropped there,
   *  FeaturePhoto renders `subject` as an on-screen placeholder, so the page
   *  says which picture is missing and what it should be. Same contract as
   *  heroPhoto in industries.ts. */
  photo: { subject: string; alt: string };
  features: SiteFeature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'booking',
    name: 'booking & scheduling',
    blurb:
      "Bookings without the DM thread. Deposits hold the chair, reminders cut no-shows, and cancellations refill themselves.",
    photo: {
      subject:
        "A phone face-up on a counter showing a confirmed appointment, the workstation behind it prepped and empty. Shot from above, daylight.",
      alt: "A laptop showing a week of colour-coded appointment slots, beside a coffee",
    },
    features: [
      { name: 'Online booking', detail: 'pick a service, a person, and a slot' },
      { name: 'Deposits at booking', detail: 'the no-show costs something' },
      { name: 'Reminders', detail: 'text and email before the appointment' },
      { name: 'A book per person', detail: 'clients follow staff, not the shop' },
      { name: 'Waitlist', detail: 'cancellations get filled instead of lost' },
    ],
  },
  {
    id: 'selling',
    name: 'selling',
    blurb:
      "Anything you charge for, paid for on the site — through the tools you already use.",
    photo: {
      subject:
        "Hands at a counter taking a card payment beside a wrapped order waiting for pickup. Tight crop, no faces needed.",
      alt: "A bank card being tapped on a countertop payment terminal in a shop",
    },
    features: [
      { name: 'Storefront', detail: 'stock that matches the shelf' },
      { name: 'Online ordering', detail: 'pickup, delivery, and table' },
      { name: 'Quotes & estimates', detail: 'priced off your own rate card' },
      { name: 'Invoicing', detail: 'sent, tracked, and paid online' },
      { name: 'Memberships', detail: 'recurring billing, member-only pages' },
      { name: 'Gift cards', detail: 'bought online, redeemed at the counter' },
    ],
  },
  {
    id: 'content',
    name: 'content you control',
    blurb:
      "Change a price once; every page follows. No developer, no ticket, no fee to edit your own hours.",
    photo: {
      subject:
        "A shop owner at a laptop editing their own price list, the printed menu they are correcting lying open beside it.",
      alt: "A laptop on a wooden desk showing a content editing screen",
    },
    features: [
      { name: 'CMS', detail: 'prices, hours, and photos, edited by you' },
      { name: 'Menus & price lists', detail: 'one edit, every page updates' },
      { name: 'Galleries', detail: 'the work, at full resolution' },
      { name: 'Blog & news', detail: 'for search, and for regulars' },
      { name: 'Staff pages', detail: 'a page per person who does the work' },
      { name: 'Project portfolio', detail: 'the job, the problem, the result' },
      { name: 'Spec sheets', detail: 'PDFs your buyers can download' },
      { name: 'FAQ', detail: 'the questions they ask before they call' },
    ],
  },
  {
    id: 'enquiry',
    name: 'getting the enquiry',
    blurb:
      "Forms that reach whoever actually answers, already scoped. One tap to call or text on a phone.",
    photo: {
      subject:
        "A tradesperson taking a call on site — phone to ear, quote pad or tablet in the other hand, van or job behind them.",
      alt: "A site surveyor in a hi-vis vest holding a phone on a construction site",
    },
    features: [
      { name: 'Contact forms', detail: 'routed to whoever actually answers' },
      { name: 'Qualifying forms', detail: 'the request arrives already scoped' },
      { name: 'Click to call and text', detail: 'one tap, on a phone' },
      { name: 'WhatsApp & live chat', detail: 'where your customers already are' },
      { name: 'Callback requests', detail: "for the ones who won't fill a form" },
      { name: 'Newsletter capture', detail: 'a list you own outright' },
    ],
  },
  {
    id: 'trust',
    name: 'proof a stranger checks',
    blurb:
      "Your rating, your licence, last month's job, the towns you cover — put where a buyer is already looking.",
    photo: {
      subject:
        "A wall of real licences and certifications in a working shop. Slightly worn, obviously not staged.",
      alt: "A stairwell wall hung with dozens of framed licences and certificates",
    },
    features: [
      { name: 'Google reviews', detail: 'pulled live, not screenshotted' },
      { name: 'Testimonials', detail: 'attributed to real people' },
      { name: 'Licences & certifications', detail: 'the thing a buyer verifies' },
      { name: 'Before & after', detail: 'the work, side by side' },
      { name: 'Service-area map', detail: 'the towns you actually cover' },
    ],
  },
  {
    id: 'found',
    name: 'found & measured',
    blurb:
      "Being good is not the same as being findable. Measured in calls booked, not pageviews.",
    photo: {
      subject:
        "Someone on a pavement at dusk searching on their phone, a lit shopfront out of focus ahead of them.",
      alt: "A person on a lit city street at dusk looking at their phone",
    },
    features: [
      { name: 'Structured data', detail: 'LocalBusiness, Service, FAQ' },
      { name: 'Service-area pages', detail: 'a page per town you serve' },
      { name: 'Google Business Profile', detail: 'set up and kept current' },
      { name: 'Analytics', detail: 'calls booked, not just pageviews' },
      { name: 'Conversion tracking', detail: 'GA4 and Meta, server-side' },
      { name: 'Sitemap & robots', detail: 'shipped with the build' },
    ],
  },
  {
    id: 'build',
    name: 'the build itself',
    blurb:
      "Mobile-first, accessible, fast, and backed up. At handoff the keys are yours.",
    photo: {
      subject:
        "The same site open on a phone and a laptop side by side, on a workbench with real tools around them.",
      alt: "A laptop, tablet and phone side by side on a desk showing the same site",
    },
    features: [
      { name: 'Mobile first', detail: 'tested on the phones your customers carry' },
      { name: 'Accessibility', detail: 'keyboard, contrast, and screen-reader passes' },
      { name: 'More than one language', detail: 'one build, every language you sell in' },
      { name: 'Speed budget', detail: 'agreed before launch, measured at handoff' },
      { name: 'Consent & privacy', detail: 'cookie banner and a privacy page that match' },
      { name: 'Hosting, SSL, backups', detail: 'and the keys are yours' },
    ],
  },
];

export const featureCount = featureGroups.reduce(
  (total, group) => total + group.features.length,
  0
);

/** ── The homepage act-3 grid ──────────────────────────────────────────
 *  Eight systems, two rows of four. Promoted out of src/data/buildPillars.ts
 *  when the build act was removed — they were already rendering there as the
 *  "systems" artifact panel, which duplicated this grid one section below.
 *
 *  `name` + `detail` are the card's subtitle and line. `photo.alt` describes
 *  the image actually sitting in src/assets/features/<id>.jpg right now;
 *  `photo.subject` is the direction a replacement should follow. Keep alt
 *  matching the real file whenever a photo is swapped.
 */
export interface SiteSystem {
  id: string;
  name: string;
  detail: string;
  photo: { subject: string; alt: string };
}

export const siteSystems: SiteSystem[] = [
  {
    id: 'booking',
    name: 'Booking',
    detail: 'slots, staff, deposits, reminders',
    photo: {
      subject: 'A booking calendar on screen — a week of slots with staff assigned.',
      alt: 'A laptop showing a week of colour-coded appointment slots, beside a coffee',
    },
  },
  {
    id: 'payments',
    name: 'Payments',
    detail: 'deposits, invoices, online checkout',
    photo: {
      subject: 'A card payment being taken at a counter, or a checkout screen mid-transaction.',
      alt: 'A bank card being tapped on a countertop payment terminal in a shop',
    },
  },
  {
    id: 'cms',
    name: 'CMS',
    detail: 'you edit prices, hours, and photos',
    photo: {
      subject: 'An owner editing their own content — a CMS open on a laptop at a desk.',
      alt: 'A laptop on a wooden desk showing a content editing screen',
    },
  },
  {
    id: 'crm',
    name: 'CRM',
    detail: 'leads land where sales already works',
    photo: {
      subject: 'A pipeline or contact list on screen; someone working leads at a desk.',
      alt: 'Two people working at desks with data open on their monitors',
    },
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    detail: 'stock that matches the shelf',
    photo: {
      subject: 'Stock on a shelf or orders being packed — the physical side of the storefront.',
      alt: 'Stock on shelves and packed orders in a small store',
    },
  },
  {
    id: 'forms',
    name: 'Forms & quoting',
    detail: 'requests that qualify themselves',
    photo: {
      subject: 'A quote request arriving — a tradesperson on site with a phone or quote pad.',
      alt: 'A site surveyor in a hi-vis vest holding a phone on a construction site',
    },
  },
  {
    id: 'analytics',
    name: 'Analytics',
    detail: 'calls booked, not just pageviews',
    photo: {
      subject: 'A dashboard of charts on a screen — real numbers, not a stock graph render.',
      alt: 'A dashboard of performance metrics displayed on a screen',
    },
  },
  {
    id: 'reviews',
    name: 'Reviews',
    detail: 'Google profile asked at the right moment',
    photo: {
      subject: 'A customer leaving a rating on a phone, or a star rating on screen.',
      alt: 'A smiling customer looking at their phone',
    },
  },
];
