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
  /** Which file under src/assets/features/ this group shows on the parts
   *  list. Usually the group id, but four groups share a scene with a
   *  siteSystems entry and point at that file instead of duplicating it. */
  photoFile: string;
  features: SiteFeature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'booking',
    photoFile: 'booking',
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
    photoFile: 'payments',
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
    photoFile: 'cms',
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
    photoFile: 'forms',
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
    photoFile: 'trust',
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
    photoFile: 'found',
    name: 'found & measured',
    blurb:
      "Being good is not the same as being findable. Measured in calls booked, not pageviews.",
    photo: {
      subject:
        "A phone held up showing a map app mid-search, a nearby business pinned with its rating and hours.",
      alt: "A phone showing a map app with a local business pinned, rated and open",
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
    photoFile: 'build',
    name: 'the build itself',
    blurb:
      "Mobile-first, accessible, fast, and backed up. At handoff the keys are yours.",
    photo: {
      subject:
        "A site open on a laptop on a working desk, a phone beside it, printed work within reach.",
      alt: "A laptop on a desk showing a website, with a phone and printed work beside it",
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

/** ── The homepage act-3 list ──────────────────────────────────────────
 *  Eight systems, each a hairline, a name, and one line (FeaturesSection).
 *  Promoted out of src/data/buildPillars.ts when the build act was removed —
 *  they were already rendering there as the "systems" artifact panel, which
 *  duplicated this grid one section below.
 *
 *  Copy rule, harder here than anywhere else on the site: this act is the
 *  first thing a cold owner reads about what they are buying, so no row is
 *  allowed to be named after the software that does it. "Your own edits", not
 *  CMS. "Enquiries", not CRM. "What's working", not analytics. If a barber
 *  would not say the word, it does not go in `name`.
 *    name   — the part, in a word the owner already uses
 *    claim  — what it does for them, as a sentence they'd say themselves
 *    detail — what is actually in it, plainly
 *
 *  `photo` is mostly not rendered on the homepage any more — act 3 is type
 *  and hairlines, with ONE of these photographs run full width as the act's
 *  band (currently cms; FeaturesSection picks it by id). The rest are kept
 *  because the ids still match the files in src/assets/features/ one-for-one,
 *  so the act can take more pictures back without re-deriving the art
 *  direction. See that directory's README.
 */
export interface SiteSystem {
  id: string;
  name: string;
  claim: string;
  detail: string;
  photo: { subject: string; alt: string };
}

export const siteSystems: SiteSystem[] = [
  {
    id: 'booking',
    name: 'Booking',
    claim: "They book while you're closed.",
    detail: 'Times, staff, deposits, and the reminder that stops the no-show.',
    photo: {
      subject: 'A booking calendar on screen — a week of slots with staff assigned.',
      alt: 'A laptop showing a week of colour-coded appointment slots, beside a coffee',
    },
  },
  {
    id: 'payments',
    name: 'Getting paid',
    claim: 'Paid before they walk out.',
    detail: 'Deposits, invoices, and card payments taken on the site.',
    photo: {
      subject: 'A card payment being taken at a counter, or a checkout screen mid-transaction.',
      alt: 'A bank card being tapped on a countertop payment terminal in a shop',
    },
  },
  {
    id: 'cms',
    name: 'Your own edits',
    claim: 'Change a price without phoning us.',
    detail: 'Prices, hours, and photos — edited by you, no developer and no fee.',
    photo: {
      subject: 'An owner editing their own content — a CMS open on a laptop at a desk.',
      alt: 'A laptop on a wooden desk showing a content editing screen',
    },
  },
  {
    id: 'crm',
    name: 'Enquiries',
    claim: 'Nothing gets lost between calls.',
    detail: 'Every message lands where your team already works, with the details attached.',
    photo: {
      subject: 'A pipeline or contact list on screen; someone working leads at a desk.',
      alt: 'Two people working at desks with data open on their monitors',
    },
  },
  {
    id: 'ecommerce',
    name: 'Selling online',
    claim: 'The shelf stays open all night.',
    detail: "Stock, orders, pickup and delivery — matching what's really in the shop.",
    photo: {
      subject: 'Stock on a shelf or orders being packed — the physical side of the storefront.',
      alt: 'Stock on shelves and packed orders in a small store',
    },
  },
  {
    id: 'forms',
    name: 'Quotes',
    claim: 'The request arrives already answered.',
    detail: 'Forms that ask your questions first, so you quote once instead of three times.',
    photo: {
      subject: 'A quote request arriving — a tradesperson on site with a phone or quote pad.',
      alt: 'A site surveyor in a hi-vis vest holding a phone on a construction site',
    },
  },
  {
    id: 'analytics',
    name: "What's working",
    claim: "You'll know what brought the call.",
    detail: 'Calls, bookings, and forms counted — not just visitors.',
    photo: {
      subject: 'A dashboard of charts on a screen — real numbers, not a stock graph render.',
      alt: 'A dashboard of performance metrics displayed on a screen',
    },
  },
  {
    id: 'reviews',
    name: 'Reviews',
    claim: "Asked when they're happiest.",
    detail: 'The review request goes out right after the job, and lands on your Google profile.',
    photo: {
      subject: 'A customer leaving a rating on a phone, or a star rating on screen.',
      alt: 'A smiling customer looking at their phone',
    },
  },
];
