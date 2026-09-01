// The package playbooks — one per business type, each mapping a vertical to a
// fixed package tier with a fixed set of included features. This is the data
// behind the package panel and the sample sites on /industries/<vertical>.
//
// Distinct from src/data/industries.ts on purpose. `industries` is the
// marketing taxonomy — the pain, the angles, the trade a visitor recognises
// themselves in. `playbooks` is the commercial one: what is actually in the
// box, what it costs, and which sample site proves it. A visitor arrives
// through an industry and buys a playbook.
//
// A playbook goes 'live' only once its demo exists. Until then it carries the
// full commercial spec but no demo, and the type enforces that — see the
// union below.

export type PackageTier =
  | 'One Pager'
  | 'Starter Package'
  | 'Standard Package'
  | 'Business Package';

/** The add-ons. Only the true ones are ever shown; excluded features are
 *  argued for in prose on the package panel, never rendered as a red X.
 *  A false flag means no code for it exists in that playbook's demo. */
export interface PlaybookFeatures {
  seoSetup: boolean;
  ecommerce: boolean;
  crm: boolean;
  cms: boolean;
  analytics: boolean;
  booking: boolean;
  domainHosting: boolean;
}

export interface PlaybookPricing {
  build: number;
  maintenancePlan: string;
  maintenanceMonthly: number;
  socialMonthly: number;
  seoMonthly: number;
  totalMonthly: number;
  /** Verbatim from the spreadsheet, not recomputed. Worth knowing: on the
   *  Basic plans this is build + (social or seo x 12) + (maintenance x 12),
   *  but on every Standard plan it works out to maintenance x 9, not 12. */
  yearOneValue: number;
}

/** What the frame on /industries/<vertical> needs in order to show the
 *  real sample site instead of a drawn mockup: an address bar, the line that
 *  sits above the frame, and the button that opens the build itself. */
export interface PlaybookDemo {
  /** the fictional business's own domain, shown in the frame's address bar */
  displayUrl: string;
  /** the one-line pitch above the frame */
  premise: string;
  /** every page of the built demo, in nav order. Not rendered on the
   *  industry page since the frame became a still; kept as the record of
   *  what each build actually contains. */
  pages: { id: string; label: string; path: string }[];
}

interface PlaybookBase {
  slug: string;
  name: string;
  /** the commercial grouping this playbook files under */
  category: string;
  /** the vertical in src/data/industries.ts this playbook attaches to. The
   *  panel on /industries/<industrySlug> renders every playbook pointing at
   *  it, so one vertical can carry several packages. */
  industrySlug: string;
  /** the sub-categories this one playbook covers — the layer a prospect
   *  scans to find themselves ("I run a diner") */
  businessTypes: string[];
  packageTier: PackageTier;
  /** '4-5' — a range, because the top of the range is a sales lever */
  pageCount: string;
  features: PlaybookFeatures;
  /** verbatim from the spreadsheet — never reworded in a template */
  cloverFit: string;
  pricing: PlaybookPricing;
}

/** A playbook whose sample site is built. */
export interface LivePlaybook extends PlaybookBase {
  status: 'live';
  demo: PlaybookDemo;
  demoUrl: string;
}

/** A playbook whose sample site is not built yet: the package panel still
 *  shows the full spec, but there is nothing to click into. */
export interface UpcomingPlaybook extends PlaybookBase {
  status: 'coming-soon';
  demoUrl: null;
}

export type PackagePlaybook = LivePlaybook | UpcomingPlaybook;

// ── Clover fit strings ───────────────────────────────────────────────────
// Verbatim from the spreadsheet. Named so the four composed variants below
// cannot drift from the two they are built on.
const CLOVER_ORDERING =
  'Clover Online Ordering embeds straight into the site — menu, order-ahead and payment all run on the Clover account they already signed, so no second gateway and no extra processing fees.';
const CLOVER_STORE =
  'Clover Online Store syncs in-store inventory to the site catalogue; checkout settles to the same Clover merchant account, so stock and sales stay in one place.';
const CLOVER_APPOINTMENTS =
  'Booking form feeds their calendar / Clover Appointments; deposits and final payment are taken on the Clover terminal they already have.';
const CLOVER_LEAD_MINIMAL =
  "No online checkout needed — Clover handles in-person payment and invoicing. The site's job is to be found locally and capture the lead.";
const CLOVER_LEAD_INVOICED = `${CLOVER_LEAD_MINIMAL} Estimates and invoices go out through Clover.`;
const CLOVER_CLINIC =
  'Booking and intake sit on the site; all payment stays on the Clover terminal, which keeps patient payment data off the website entirely.';
const CLOVER_INVOICING_CRM =
  'Clover Invoicing covers billing, so the site is a lead-generation front end — qualified enquiries land in the CRM instead of a shopping cart.';
const CLOVER_VENUE =
  'Enquiry and date-hold forms on the site; venue deposits and final balances are invoiced through Clover.';
const CLOVER_MOBILE =
  'Clover Go / mobile terminal handles payment on site; the page and social feed carry location, schedule and catering enquiries.';

const BASIC = 'Basic Maintenance';
const STANDARD = 'Standard Maintenance';

// Ordered by pipeline weight — clients on the list, then year-one value.
export const playbooks: PackagePlaybook[] = [
  /* 1 ── 13 clients · $66,170 year one — the heaviest line in the pipeline */
  {
    slug: 'fnb-full-service',
    industrySlug: 'restaurants',
    name: 'F&B — Full Service',
    category: 'Food & Beverage',
    businessTypes: [
      'Bar & grill',
      'Bar & restaurant',
      'Full-service restaurant',
      'Diner',
      'Pizzeria',
      'Restaurant & bar',
      'Restaurant & cafe',
    ],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_ORDERING,
    pricing: { build: 1850, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 5090 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/fnb-full-service/',
    demo: {
      displayUrl: 'harbourviewbargrill.ca',
      premise:
        'The full-service build, and the one the rest are measured against: five pages, a menu that reads on a phone at the door, and deliberately no booking engine.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/restaurants/preview/fnb-full-service/' },
        { id: 'menu', label: 'menu', path: '/industries/restaurants/preview/fnb-full-service/menu' },
        { id: 'order', label: 'order online', path: '/industries/restaurants/preview/fnb-full-service/order' },
        { id: 'about', label: 'about', path: '/industries/restaurants/preview/fnb-full-service/about' },
        { id: 'contact', label: 'contact', path: '/industries/restaurants/preview/fnb-full-service/contact' },
      ],
    },
  },

  /* 2 ── 9 clients · $45,210 */
  {
    slug: 'retail-online-store',
    industrySlug: 'retail',
    name: 'Retail — Online Store',
    category: 'Retail',
    businessTypes: [
      'Apparel & fashion',
      'Electronics & mobile',
      'General merchandise',
      'Hair & beauty products',
      'Herbal & natural health products',
      'Pet supplies',
    ],
    packageTier: 'Starter Package',
    pageCount: '5',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: true, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_STORE,
    pricing: { build: 2150, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 5390 },
    status: 'live',
    demoUrl: '/industries/retail/preview/retail-online-store/',
    demo: {
      displayUrl: 'brambleandbone.ca',
      premise:
        'The category filter runs on no JavaScript at all, and the catalogue under the store slot is what search engines index.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/retail/preview/retail-online-store/' },
        { id: 'shop', label: 'shop', path: '/industries/retail/preview/retail-online-store/shop' },
        { id: 'about', label: 'about', path: '/industries/retail/preview/retail-online-store/about' },
        { id: 'stockists', label: 'stockists & delivery', path: '/industries/retail/preview/retail-online-store/stockists' },
        { id: 'contact', label: 'contact', path: '/industries/retail/preview/retail-online-store/contact' },
      ],
    },
  },

  /* 3 ── 8 clients · $38,320 */
  {
    slug: 'appointment-business',
    industrySlug: 'barbershops',
    name: 'Appointment Business',
    category: 'Beauty & Personal Care',
    businessTypes: ['Barbershop', 'Hair salon', 'Nail, hair & skin care', 'Skin care & esthetics'],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: false, analytics: true, booking: true, domainHosting: true },
    cloverFit: CLOVER_APPOINTMENTS,
    pricing: { build: 1550, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 4790 },
    status: 'live',
    demoUrl: '/industries/barbershops/preview/appointment-business/',
    demo: {
      displayUrl: 'ironwoodbarber.ca',
      premise:
        'The booking page is the whole point — four steps, a running total that knows the barber costs more, and a confirmation. No cart anywhere.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/barbershops/preview/appointment-business/' },
        { id: 'services', label: 'services & pricing', path: '/industries/barbershops/preview/appointment-business/services' },
        { id: 'book', label: 'book', path: '/industries/barbershops/preview/appointment-business/book' },
        { id: 'barbers', label: 'our barbers', path: '/industries/barbershops/preview/appointment-business/barbers' },
        { id: 'contact', label: 'contact', path: '/industries/barbershops/preview/appointment-business/contact' },
      ],
    },
  },

  /* 4 ── 6 clients · $22,740 */
  {
    slug: 'automotive-book-a-bay',
    industrySlug: 'auto',
    name: 'Automotive — Book a Bay',
    category: 'Automotive',
    businessTypes: ['Auto body', 'Auto repair', 'Car wash & detailing'],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: false, analytics: true, booking: true, domainHosting: true },
    cloverFit: CLOVER_LEAD_INVOICED,
    pricing: { build: 1550, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 0, seoMonthly: 150, totalMonthly: 170, yearOneValue: 3590 },
    status: 'live',
    demoUrl: '/industries/auto/preview/automotive-book-a-bay/',
    demo: {
      displayUrl: 'redlineauto.ca',
      premise:
        'Local SEO is the whole build here: the four towns in the copy are the same four in the schema. Five-step booking, and no checkout anywhere.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/auto/preview/automotive-book-a-bay/' },
        { id: 'services', label: 'services', path: '/industries/auto/preview/automotive-book-a-bay/services' },
        { id: 'book', label: 'book a bay', path: '/industries/auto/preview/automotive-book-a-bay/book' },
        { id: 'why-us', label: 'why us', path: '/industries/auto/preview/automotive-book-a-bay/why-us' },
        { id: 'contact', label: 'contact', path: '/industries/auto/preview/automotive-book-a-bay/contact' },
      ],
    },
  },

  /* 5 ── 6 clients · $26,040 */
  {
    slug: 'fnb-quick-service-launch',
    industrySlug: 'restaurants',
    name: 'F&B — Quick Service Launch',
    category: 'Food & Beverage',
    businessTypes: [
      'Counter service',
      'Quick service / fast food',
      'Quick service / takeout',
      'Takeout restaurant',
    ],
    packageTier: 'One Pager',
    pageCount: '1',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_ORDERING,
    pricing: { build: 1100, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 4340 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/fnb-quick-service-launch/',
    demo: {
      displayUrl: 'sumacstreet.ca',
      premise:
        'One page, and the argument for the tier: everything a hungry person needs without it reading as cut short. Its nav is anchors down a single document, not links to other pages.',
      pages: [
        { id: 'top', label: 'the page', path: '/industries/restaurants/preview/fnb-quick-service-launch/' },
      ],
    },
  },

  /* 6 ── 6 clients · $3,840 — the leanest build in the catalogue */
  {
    slug: 'local-presence-starter',
    industrySlug: 'retail',
    name: 'Local Presence Starter',
    category: 'Retail',
    businessTypes: ['Convenience & variety store', 'Convenience store', 'Variety store & money remittance'],
    packageTier: 'One Pager',
    pageCount: '1',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: false, analytics: false, booking: false, domainHosting: true },
    cloverFit: CLOVER_LEAD_MINIMAL,
    pricing: { build: 400, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 0, seoMonthly: 0, totalMonthly: 20, yearOneValue: 640 },
    status: 'coming-soon',
    demoUrl: null,
  },

  /* 7 ── 4 clients · $20,360 */
  {
    slug: 'retail-grocery-order-ahead',
    industrySlug: 'retail',
    name: 'Retail — Grocery Order Ahead',
    category: 'Retail',
    businessTypes: ['Grocery', 'Grocery & butcher (halal)'],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_STORE,
    pricing: { build: 1850, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 5090 },
    status: 'live',
    demoUrl: '/industries/retail/preview/retail-grocery-order-ahead/',
    demo: {
      displayUrl: 'cedarviewgrocery.ca',
      premise:
        'The store slot is framed for a butcher counter — cut, weight, pickup window — and the weekly specials are one dated block somebody swaps on a Monday.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/retail/preview/retail-grocery-order-ahead/' },
        { id: 'departments', label: 'departments', path: '/industries/retail/preview/retail-grocery-order-ahead/departments' },
        { id: 'order', label: 'order ahead', path: '/industries/retail/preview/retail-grocery-order-ahead/order-ahead' },
        { id: 'specials', label: 'weekly specials', path: '/industries/retail/preview/retail-grocery-order-ahead/specials' },
        { id: 'contact', label: 'contact', path: '/industries/retail/preview/retail-grocery-order-ahead/contact' },
      ],
    },
  },

  /* 8 ── 4 clients · $23,164 */
  {
    slug: 'multi-service-spa-salon',
    industrySlug: 'barbershops',
    name: 'Multi-Service Spa / Salon',
    category: 'Beauty & Personal Care',
    businessTypes: ['Hair salon & spa', 'Nail salon & spa', 'Spa'],
    packageTier: 'Standard Package',
    pageCount: '6–8',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: true, analytics: true, booking: true, domainHosting: true },
    cloverFit: CLOVER_APPOINTMENTS,
    pricing: { build: 2350, maintenancePlan: STANDARD, maintenanceMonthly: 49, socialMonthly: 250, seoMonthly: 0, totalMonthly: 299, yearOneValue: 5791 },
    status: 'live',
    demoUrl: '/industries/barbershops/preview/multi-service-spa-salon/',
    demo: {
      displayUrl: 'stillwaterspa.ca',
      premise:
        'Eight pages, a six-step booking flow that narrows the practitioner list to the room you chose, and a service menu modelled for the CMS because this business reprices seasonally.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/barbershops/preview/multi-service-spa-salon/' },
        { id: 'hair', label: 'hair', path: '/industries/barbershops/preview/multi-service-spa-salon/hair' },
        { id: 'nails', label: 'nails & esthetics', path: '/industries/barbershops/preview/multi-service-spa-salon/nails' },
        { id: 'spa', label: 'spa & massage', path: '/industries/barbershops/preview/multi-service-spa-salon/spa' },
        { id: 'packages', label: 'packages', path: '/industries/barbershops/preview/multi-service-spa-salon/packages' },
        { id: 'book', label: 'book', path: '/industries/barbershops/preview/multi-service-spa-salon/book' },
        { id: 'team', label: 'our team', path: '/industries/barbershops/preview/multi-service-spa-salon/team' },
        { id: 'contact', label: 'contact', path: '/industries/barbershops/preview/multi-service-spa-salon/contact' },
      ],
    },
  },

  /* 9 ── 3 clients · $13,773 */
  {
    slug: 'clinic-practitioner',
    industrySlug: 'clinic',
    name: 'Clinic / Practitioner',
    category: 'Health & Wellness',
    businessTypes: ['Clinic'],
    packageTier: 'Standard Package',
    pageCount: '6–10',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: true, analytics: true, booking: true, domainHosting: true },
    cloverFit: CLOVER_CLINIC,
    pricing: { build: 2350, maintenancePlan: STANDARD, maintenanceMonthly: 49, socialMonthly: 0, seoMonthly: 150, totalMonthly: 199, yearOneValue: 4591 },
    status: 'live',
    demoUrl: '/industries/clinic/preview/clinic-practitioner/',
    demo: {
      displayUrl: 'lakeshorechiro.ca',
      premise:
        'Health copy written conservatively throughout — process, credentials and fees, never an outcome claim. Every colour pairing clears AAA rather than AA.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/clinic/preview/clinic-practitioner/' },
        { id: 'services', label: 'services', path: '/industries/clinic/preview/clinic-practitioner/services' },
        { id: 'practitioners', label: 'practitioners', path: '/industries/clinic/preview/clinic-practitioner/practitioners' },
        { id: 'new-patients', label: 'new patients', path: '/industries/clinic/preview/clinic-practitioner/new-patients' },
        { id: 'booking', label: 'booking', path: '/industries/clinic/preview/clinic-practitioner/booking' },
        { id: 'insurance', label: 'insurance & fees', path: '/industries/clinic/preview/clinic-practitioner/insurance' },
        { id: 'faq', label: 'faq', path: '/industries/clinic/preview/clinic-practitioner/faq' },
        { id: 'contact', label: 'contact', path: '/industries/clinic/preview/clinic-practitioner/contact' },
      ],
    },
  },

  /* 10 ── 2 clients · $10,180 */
  {
    slug: 'fnb-cafe-order-ahead',
    industrySlug: 'restaurants',
    name: 'F&B — Cafe / Order Ahead',
    category: 'Food & Beverage',
    businessTypes: ['Cafe', 'Cafe & bubble tea'],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_ORDERING,
    pricing: { build: 1850, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 5090 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/fnb-cafe-order-ahead/',
    demo: {
      displayUrl: 'fernrockcoffee.ca',
      premise:
        'Two businesses under one roof, so the bubble tea line carries its own colour everywhere it appears — the menu, the jump links, the online order. Same package as the grocery build, a room away from the other restaurants in this switcher.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/restaurants/preview/fnb-cafe-order-ahead/' },
        { id: 'menu', label: 'menu', path: '/industries/restaurants/preview/fnb-cafe-order-ahead/menu' },
        { id: 'order', label: 'order ahead', path: '/industries/restaurants/preview/fnb-cafe-order-ahead/order' },
        { id: 'coffee', label: 'our coffee', path: '/industries/restaurants/preview/fnb-cafe-order-ahead/coffee' },
        { id: 'contact', label: 'contact', path: '/industries/restaurants/preview/fnb-cafe-order-ahead/contact' },
      ],
    },
  },

  /* 11 ── 1 client · $3,790 */
  {
    slug: 'b2b-commercial-services',
    industrySlug: 'cleaning',
    name: 'B2B — Commercial Services',
    category: 'Trades & Home Services',
    businessTypes: ['Janitorial & cleaning'],
    packageTier: 'Starter Package',
    pageCount: '5',
    features: { seoSetup: true, ecommerce: false, crm: true, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_INVOICING_CRM,
    pricing: { build: 1750, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 0, seoMonthly: 150, totalMonthly: 170, yearOneValue: 3790 },
    status: 'live',
    demoUrl: '/industries/cleaning/preview/b2b-commercial-services/',
    demo: {
      displayUrl: 'northlinefacility.ca',
      premise:
        'The first build in the catalogue where the form is the product. Six qualifying answers arrive attached to the enquiry, so a lead can be ranked before anyone returns the call — which is what CRM buys over a contact form.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/cleaning/preview/b2b-commercial-services/' },
        { id: 'services', label: 'services', path: '/industries/cleaning/preview/b2b-commercial-services/services' },
        { id: 'industries', label: 'industries served', path: '/industries/cleaning/preview/b2b-commercial-services/industries' },
        { id: 'quote', label: 'request a quote', path: '/industries/cleaning/preview/b2b-commercial-services/quote' },
        { id: 'contact', label: 'contact', path: '/industries/cleaning/preview/b2b-commercial-services/contact' },
      ],
    },
  },

  /* 12 ── 1 client · $5,791 */
  {
    slug: 'venue-event-space',
    industrySlug: 'venue',
    name: 'Venue / Event Space',
    category: 'Hospitality & Events',
    businessTypes: ['Event venue'],
    packageTier: 'Standard Package',
    pageCount: '6–8',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: true, analytics: true, booking: true, domainHosting: true },
    cloverFit: CLOVER_VENUE,
    pricing: { build: 2350, maintenancePlan: STANDARD, maintenanceMonthly: 49, socialMonthly: 250, seoMonthly: 0, totalMonthly: 299, yearOneValue: 5791 },
    status: 'live',
    demoUrl: '/industries/venue/preview/venue-event-space/',
    demo: {
      displayUrl: 'thefoundryonbay.ca',
      premise:
        'CMS scoped to the one collection that actually churns — the gallery — while the rooms, rates and terms stay in code. The date-hold form is four steps because a venue enquiry is four questions, and the pricing page publishes the numbers most venue sites refuse to.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/venue/preview/venue-event-space/' },
        { id: 'space', label: 'the space', path: '/industries/venue/preview/venue-event-space/space' },
        { id: 'weddings', label: 'weddings', path: '/industries/venue/preview/venue-event-space/weddings' },
        { id: 'corporate', label: 'corporate', path: '/industries/venue/preview/venue-event-space/corporate' },
        { id: 'gallery', label: 'gallery', path: '/industries/venue/preview/venue-event-space/gallery' },
        { id: 'pricing', label: 'pricing', path: '/industries/venue/preview/venue-event-space/pricing' },
        { id: 'date', label: 'check a date', path: '/industries/venue/preview/venue-event-space/check-a-date' },
        { id: 'contact', label: 'contact', path: '/industries/venue/preview/venue-event-space/contact' },
      ],
    },
  },

  /* 13 ── 1 client · $3,740 — the only playbook with no SEO setup */
  {
    slug: 'fnb-food-truck-lite',
    industrySlug: 'restaurants',
    name: 'F&B — Food Truck Lite',
    category: 'Food & Beverage',
    businessTypes: ['Food truck'],
    packageTier: 'One Pager',
    pageCount: '1',
    features: { seoSetup: false, ecommerce: false, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_MOBILE,
    pricing: { build: 500, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 3740 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/fnb-food-truck-lite/',
    demo: {
      displayUrl: 'gravelroadtacos.ca',
      premise:
        'The only demo in the catalogue with no SEO Setup, and the one to open in view-source next to Sumac Street: no description, no canonical, no Open Graph, no schema. The weekly schedule block is the whole product, and it is edited in code — which is the CMS conversation.',
      pages: [
        { id: 'top', label: 'the page', path: '/industries/restaurants/preview/fnb-food-truck-lite/' },
      ],
    },
  },

  /* 14 ── 1 client · $6,091 */
  {
    slug: 'retail-catalogue-wholesale',
    industrySlug: 'restaurants',
    name: 'Retail — Catalogue + Wholesale',
    category: 'Retail',
    businessTypes: ['Bakery & pastry (wholesale + retail)'],
    packageTier: 'Standard Package',
    pageCount: '6–8',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: true, analytics: true, booking: false, domainHosting: true },
    cloverFit: `${CLOVER_STORE} Wholesale accounts are invoiced separately through Clover.`,
    pricing: { build: 2650, maintenancePlan: STANDARD, maintenanceMonthly: 49, socialMonthly: 250, seoMonthly: 0, totalMonthly: 299, yearOneValue: 6091 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/retail-catalogue-wholesale/',
    demo: {
      displayUrl: 'vernonstreetbakehouse.ca',
      premise:
        'Two audiences who want opposite things, split at the top of the home page and never blended again. Retail gets the Clover store slot and shelf prices; wholesale gets order deadlines, a case-size catalogue and an account application. The wholesale form is deliberately not a CRM — open it next to Northline to see what the CRM line item adds.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/restaurants/preview/retail-catalogue-wholesale/' },
        { id: 'shop', label: 'retail shop', path: '/industries/restaurants/preview/retail-catalogue-wholesale/shop' },
        { id: 'wholesale', label: 'wholesale', path: '/industries/restaurants/preview/retail-catalogue-wholesale/wholesale' },
        { id: 'cakes', label: 'cakes', path: '/industries/restaurants/preview/retail-catalogue-wholesale/cakes' },
        { id: 'about', label: 'about', path: '/industries/restaurants/preview/retail-catalogue-wholesale/about' },
        { id: 'contact', label: 'contact', path: '/industries/restaurants/preview/retail-catalogue-wholesale/contact' },
      ],
    },
  },

  /* 15 ── 1 client · $6,091 — largest catalogue in the set */
  {
    slug: 'retail-large-catalogue',
    industrySlug: 'retail',
    name: 'Retail — Large Catalogue',
    category: 'Retail',
    businessTypes: ['Furniture & appliances'],
    packageTier: 'Standard Package',
    pageCount: '6–10',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: true, analytics: true, booking: false, domainHosting: true },
    cloverFit: `${CLOVER_STORE} Big-ticket items can be deposit-paid online and balanced in store.`,
    pricing: { build: 2650, maintenancePlan: STANDARD, maintenanceMonthly: 49, socialMonthly: 250, seoMonthly: 0, totalMonthly: 299, yearOneValue: 6091 },
    status: 'live',
    demoUrl: '/industries/retail/preview/retail-large-catalogue/',
    demo: {
      displayUrl: 'haldenhome.ca',
      premise:
        'The largest catalogue in the set, and the one to open when a client asks what happens past a hundred products. Two-facet filtering on every category page with zero JavaScript, and the Clover slot framed for a deposit rather than a checkout — nobody buys a $3,450 sofa through a web cart.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/retail/preview/retail-large-catalogue/' },
        { id: 'living', label: 'living', path: '/industries/retail/preview/retail-large-catalogue/living' },
        { id: 'bedroom', label: 'bedroom', path: '/industries/retail/preview/retail-large-catalogue/bedroom' },
        { id: 'dining', label: 'dining', path: '/industries/retail/preview/retail-large-catalogue/dining' },
        { id: 'appliances', label: 'appliances', path: '/industries/retail/preview/retail-large-catalogue/appliances' },
        { id: 'delivery', label: 'delivery & financing', path: '/industries/retail/preview/retail-large-catalogue/delivery' },
        { id: 'about', label: 'about', path: '/industries/retail/preview/retail-large-catalogue/about' },
        { id: 'contact', label: 'contact', path: '/industries/retail/preview/retail-large-catalogue/contact' },
      ],
    },
  },

  /* 16 ── 1 client · $5,290 */
  {
    slug: 'fnb-catering-events',
    industrySlug: 'restaurants',
    name: 'F&B — Catering & Events',
    category: 'Food & Beverage',
    businessTypes: ['Takeout & catering'],
    packageTier: 'Starter Package',
    pageCount: '5',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: false, analytics: true, booking: true, domainHosting: true },
    cloverFit: `${CLOVER_ORDERING} Catering deposits are invoiced through Clover.`,
    pricing: { build: 2050, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 5290 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/fnb-catering-events/',
    demo: {
      displayUrl: 'saffrontable.ca',
      premise:
        'Two audiences on two mechanisms, not just two pages: takeout is a transaction and runs through the Clover ordering slot, catering is a conversation and runs through a four-step consultation booking. A $14 lunch is not a consultation and a wedding is not a checkout.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/restaurants/preview/fnb-catering-events/' },
        { id: 'menu', label: 'takeout menu', path: '/industries/restaurants/preview/fnb-catering-events/menu' },
        { id: 'catering', label: 'catering packages', path: '/industries/restaurants/preview/fnb-catering-events/catering' },
        { id: 'consult', label: 'consultation', path: '/industries/restaurants/preview/fnb-catering-events/consultation' },
        { id: 'contact', label: 'contact', path: '/industries/restaurants/preview/fnb-catering-events/contact' },
      ],
    },
  },

  /* 17 ── 1 client · $840 */
  {
    slug: 'appointment-lite',
    industrySlug: 'tailoring',
    name: 'Appointment Lite',
    category: 'Professional & Personal Services',
    businessTypes: ['Tailoring & alterations'],
    packageTier: 'One Pager',
    pageCount: '1',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: false, analytics: false, booking: true, domainHosting: true },
    cloverFit: CLOVER_APPOINTMENTS,
    pricing: { build: 600, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 0, seoMonthly: 0, totalMonthly: 20, yearOneValue: 840 },
    status: 'live',
    demoUrl: '/industries/tailoring/preview/appointment-lite/',
    demo: {
      displayUrl: 'pinandpress.ca',
      premise:
        'The smallest build in the catalogue and the only one with no Analytics: zero data-analytics-event attributes on the page, where every other demo returns between five and twenty-one. Booking is here but it is one screen of four questions, not a multi-step flow — which is exactly what the word Lite is doing in the name.',
      pages: [
        { id: 'top', label: 'the page', path: '/industries/tailoring/preview/appointment-lite/' },
      ],
    },
  },

  /* 18 ── 1 client · $3,390 */
  {
    slug: 'trades-lead-generation',
    industrySlug: 'contractors',
    name: 'Trades — Lead Generation',
    category: 'Trades & Home Services',
    businessTypes: ['Painting contractor'],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: false, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: `${CLOVER_LEAD_MINIMAL} Deposits are collected by Clover invoice once a quote is accepted.`,
    pricing: { build: 1350, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 0, seoMonthly: 150, totalMonthly: 170, yearOneValue: 3390 },
    status: 'live',
    demoUrl: '/industries/contractors/preview/trades-lead-generation/',
    demo: {
      displayUrl: 'brightlinepainting.ca',
      premise:
        'The build where local search is the product: four towns named in prose on three pages, every project tagged with the town it was in, and the phone number as the nav CTA rather than a link to a form. The aggregateRating slot is written and returns nothing, because inventing a 4.9 from 87 reviews is the fastest way to lose a rich result.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/contractors/preview/trades-lead-generation/' },
        { id: 'services', label: 'services', path: '/industries/contractors/preview/trades-lead-generation/services' },
        { id: 'work', label: 'our work', path: '/industries/contractors/preview/trades-lead-generation/work' },
        { id: 'estimate', label: 'get an estimate', path: '/industries/contractors/preview/trades-lead-generation/estimate' },
        { id: 'contact', label: 'contact', path: '/industries/contractors/preview/trades-lead-generation/contact' },
      ],
    },
  },

  /* 19 ── 1 client · $4,791 */
  {
    slug: 'b2b-distributor-wholesale',
    industrySlug: 'supply',
    name: 'B2B — Distributor / Wholesale',
    category: 'Trades & Home Services',
    businessTypes: ['Food wholesale & distribution'],
    packageTier: 'Standard Package',
    pageCount: '6–10',
    features: { seoSetup: true, ecommerce: false, crm: true, cms: true, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_INVOICING_CRM,
    pricing: { build: 2550, maintenancePlan: STANDARD, maintenanceMonthly: 49, socialMonthly: 0, seoMonthly: 150, totalMonthly: 199, yearOneValue: 4791 },
    status: 'live',
    demoUrl: '/industries/supply/preview/b2b-distributor-wholesale/',
    demo: {
      displayUrl: 'grandviewfood.ca',
      premise:
        'A catalogue with no cart and no prices — deliberately, and the CMS model has no price field to make it stick. The account application is a credit application, with a business number and two trade references, which is exactly the kind of record that must not sit in an inbox. Open it next to Northline to see the same CRM line item on a heavier form.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/supply/preview/b2b-distributor-wholesale/' },
        { id: 'products', label: 'product categories', path: '/industries/supply/preview/b2b-distributor-wholesale/products' },
        { id: 'delivery', label: 'delivery & schedule', path: '/industries/supply/preview/b2b-distributor-wholesale/delivery' },
        { id: 'apply', label: 'become a customer', path: '/industries/supply/preview/b2b-distributor-wholesale/apply' },
        { id: 'about', label: 'about', path: '/industries/supply/preview/b2b-distributor-wholesale/about' },
        { id: 'contact', label: 'contact', path: '/industries/supply/preview/b2b-distributor-wholesale/contact' },
      ],
    },
  },

  /* 20 ── 1 client · $5,090 */
  {
    slug: 'fnb-bakery-pre-order',
    industrySlug: 'restaurants',
    name: 'F&B — Bakery / Pre-Order',
    category: 'Food & Beverage',
    businessTypes: ['Bakery & pastry'],
    packageTier: 'Starter Package',
    pageCount: '4–5',
    features: { seoSetup: true, ecommerce: true, crm: false, cms: false, analytics: true, booking: false, domainHosting: true },
    cloverFit: CLOVER_ORDERING,
    pricing: { build: 1850, maintenancePlan: BASIC, maintenanceMonthly: 20, socialMonthly: 250, seoMonthly: 0, totalMonthly: 270, yearOneValue: 5090 },
    status: 'live',
    demoUrl: '/industries/restaurants/preview/fnb-bakery-pre-order/',
    demo: {
      displayUrl: 'almondandrye.ca',
      premise:
        'The tier comparison to open next to Vernon Street: same trade, one tier down, $800 less. One audience instead of two, no CMS, and a Clover slot framed around pickup windows rather than a basket — because what a bakery sells ahead is a time. Custom cakes are an enquiry, not a checkout, because a cake gets quoted.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/restaurants/preview/fnb-bakery-pre-order/' },
        { id: 'menu', label: 'daily menu', path: '/industries/restaurants/preview/fnb-bakery-pre-order/menu' },
        { id: 'order', label: 'pre-order', path: '/industries/restaurants/preview/fnb-bakery-pre-order/pre-order' },
        { id: 'cakes', label: 'custom cakes', path: '/industries/restaurants/preview/fnb-bakery-pre-order/cakes' },
        { id: 'contact', label: 'contact', path: '/industries/restaurants/preview/fnb-bakery-pre-order/contact' },
      ],
    },
  },
];

export const getPlaybook = (slug: string): PackagePlaybook | undefined =>
  playbooks.find((playbook) => playbook.slug === slug);

/** Only the playbooks with a demo behind them. The status check narrows the
 *  union, so callers get the demo fields without a cast. */
export const livePlaybooks = (): LivePlaybook[] =>
  playbooks.filter((playbook): playbook is LivePlaybook => playbook.status === 'live');

/** Grouped by commercial category, in first-appearance order — a directory
 *  whose sections reshuffle as the roster grows is one nobody learns. */
export const playbooksByCategory = (): { category: string; playbooks: PackagePlaybook[] }[] => {
  const groups: { category: string; playbooks: PackagePlaybook[] }[] = [];
  for (const playbook of playbooks) {
    const group = groups.find((g) => g.category === playbook.category);
    if (group) group.playbooks.push(playbook);
    else groups.push({ category: playbook.category, playbooks: [playbook] });
  }
  return groups;
};

/** Every playbook attached to one vertical, live ones first so the page leads
 *  with the package that has a sample site behind it. */
export const playbooksForIndustry = (industrySlug: string): PackagePlaybook[] =>
  playbooks
    .filter((playbook) => playbook.industrySlug === industrySlug)
    .sort((a, b) => Number(b.status === 'live') - Number(a.status === 'live'));

/** Every built sample site for a vertical, in pipeline order. The frame on
 *  /industries/<vertical> loads the first and offers the rest as a switcher.
 *  Empty until that vertical has a demo, which is what keeps the drawn mockup
 *  as the fallback for the verticals that don't yet. */
export const embeddableDemosFor = (industrySlug: string): LivePlaybook[] =>
  playbooks.filter(
    (playbook): playbook is LivePlaybook =>
      playbook.industrySlug === industrySlug && playbook.status === 'live'
  );
