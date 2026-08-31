// The package playbooks — one per business type, each mapping a vertical to a
// fixed package tier with a fixed set of included features. This is the data
// behind the showcase hub and the per-playbook detail pages.
//
// Distinct from src/data/industries.ts on purpose. `industries` is the
// marketing taxonomy — the pain, the angles, the trade a visitor recognises
// themselves in. `playbooks` is the commercial one: what is actually in the
// box, what it costs, and which sample site proves it. A visitor arrives
// through an industry and buys a playbook.
//
// A playbook goes 'live' only once its demo exists. Until then it is a stub
// carrying just enough to render a muted card, and the type enforces that —
// see the union below.

export type PackageTier =
  | 'One Pager'
  | 'Starter Package'
  | 'Standard Package'
  | 'Business Package';

/** The add-ons. Only the true ones are ever shown; excluded features are
 *  argued for in prose on the detail page, never rendered as a red X. */
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
  yearOneValue: number;
}

interface PlaybookBase {
  slug: string;
  name: string;
  /** the commercial grouping this playbook files under on the hub */
  category: string;
  /** the vertical in src/data/industries.ts this playbook attaches to. The
   *  panel on /industries/<industrySlug> renders every playbook pointing at
   *  it, so one vertical can carry several packages. */
  industrySlug: string;
  /** the sub-categories this one playbook covers — the layer a prospect
   *  scans to find themselves ("I run a diner") */
  businessTypes: string[];
  packageTier: PackageTier;
}

/** What the browser frame on /industries/<vertical> needs in order to embed
 *  the real sample site instead of a drawn mockup: an address bar, a set of
 *  page tabs, and the line that sits above the frame. */
export interface PlaybookDemo {
  /** the fictional business's own domain, shown in the frame's address bar */
  displayUrl: string;
  /** the one-line pitch above the frame */
  premise: string;
  /** the tabs across the frame. First entry is what loads. */
  pages: { id: string; label: string; path: string }[];
}

/** A playbook with a built demo. Every commercial field is required here, so
 *  promoting a stub to 'live' fails the build until it is actually filled in. */
export interface LivePlaybook extends PlaybookBase {
  status: 'live';
  demo: PlaybookDemo;
  /** a range, because the top of the range is a sales lever */
  pageCount: string;
  features: PlaybookFeatures;
  /** verbatim from the spreadsheet — never reworded in a template */
  cloverFit: string;
  pricing: PlaybookPricing;
  demoUrl: string;
}

/** A playbook whose demo has not been built yet: card renders muted, no link. */
export interface UpcomingPlaybook extends PlaybookBase {
  status: 'coming-soon';
  demoUrl: null;
}

export type PackagePlaybook = LivePlaybook | UpcomingPlaybook;

export const playbooks: PackagePlaybook[] = [
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
    status: 'live',
    pageCount: '4–5',
    features: {
      seoSetup: true,
      ecommerce: true,
      crm: false,
      cms: false,
      analytics: true,
      booking: false,
      domainHosting: true,
    },
    cloverFit:
      'Clover Online Ordering embeds straight into the site — menu, order-ahead and payment all run on the Clover account they already signed, so no second gateway and no extra processing fees.',
    pricing: {
      build: 1850,
      maintenancePlan: 'Basic Maintenance',
      maintenanceMonthly: 20,
      socialMonthly: 250,
      seoMonthly: 0,
      totalMonthly: 270,
      yearOneValue: 5090,
    },
    demoUrl: '/industries/restaurants/preview/',
    demo: {
      displayUrl: 'harbourviewbargrill.ca',
      premise:
        'Click through the pages and flip it to a phone. Every control works, because this is the site rather than a picture of one.',
      pages: [
        { id: 'home', label: 'home', path: '/industries/restaurants/preview/' },
        { id: 'menu', label: 'menu', path: '/industries/restaurants/preview/menu' },
        { id: 'order', label: 'order online', path: '/industries/restaurants/preview/order' },
        { id: 'about', label: 'about', path: '/industries/restaurants/preview/about' },
        { id: 'contact', label: 'contact', path: '/industries/restaurants/preview/contact' },
      ],
    },
  },

  // Stubs. Fill in features, pricing, cloverFit and pageCount as each demo is
  // built; TypeScript lists what is missing the moment status flips to 'live'.
  // businessTypes here are first-pass and want a check against the spreadsheet.
  {
    slug: 'b2b-commercial-services',
    industrySlug: 'cleaning',
    name: 'B2B — Commercial Services',
    category: 'Trades & Home Services',
    businessTypes: ['Commercial cleaning', 'Facility maintenance', 'Landscaping contractor', 'Property services'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'appointment-business',
    industrySlug: 'barbershops',
    name: 'Appointment Business',
    category: 'Beauty & Personal Care',
    businessTypes: ['Barbershop', 'Hair salon', 'Nail salon', 'Lashes & brows', 'Tattoo studio'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'venue-event-space',
    industrySlug: 'venue',
    name: 'Venue / Event Space',
    category: 'Hospitality & Events',
    businessTypes: ['Banquet hall', 'Event venue', 'Private dining room', 'Studio rental'],
    packageTier: 'Standard Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'retail-online-store',
    industrySlug: 'retail',
    name: 'Retail — Online Store',
    category: 'Retail',
    businessTypes: ['Boutique', 'Gift shop', 'Specialty retail', 'Apparel store'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'automotive-book-a-bay',
    industrySlug: 'auto',
    name: 'Automotive — Book a Bay',
    category: 'Automotive',
    businessTypes: ['Auto repair shop', 'Tire shop', 'Oil change', 'Detailing'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'retail-grocery-order-ahead',
    industrySlug: 'retail',
    name: 'Retail — Grocery Order Ahead',
    category: 'Retail',
    businessTypes: ['Grocery store', 'Convenience store', 'Butcher', 'Produce market'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'fnb-quick-service-launch',
    industrySlug: 'restaurants',
    name: 'F&B — Quick Service Launch',
    category: 'Food & Beverage',
    businessTypes: ['Quick service restaurant', 'Takeout counter', 'Shawarma & grill', 'Fried chicken'],
    packageTier: 'One Pager',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'fnb-food-truck-lite',
    industrySlug: 'restaurants',
    name: 'F&B — Food Truck Lite',
    category: 'Food & Beverage',
    businessTypes: ['Food truck', 'Food trailer', 'Pop-up stall', 'Market vendor'],
    packageTier: 'One Pager',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'local-presence-starter',
    industrySlug: 'retail',
    name: 'Local Presence Starter',
    category: 'Retail',
    businessTypes: ['Single-location shop', 'Neighbourhood storefront', 'Owner-operator'],
    packageTier: 'One Pager',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'retail-catalogue-wholesale',
    industrySlug: 'supply',
    name: 'Retail — Catalogue + Wholesale',
    category: 'Retail',
    businessTypes: ['Wholesale supplier', 'Trade counter', 'Catalogue retailer'],
    packageTier: 'Standard Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'retail-large-catalogue',
    industrySlug: 'supply',
    name: 'Retail — Large Catalogue',
    category: 'Retail',
    businessTypes: ['Multi-department retail', 'Hardware store', 'Parts retailer'],
    packageTier: 'Standard Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'fnb-catering-events',
    industrySlug: 'restaurants',
    name: 'F&B — Catering & Events',
    category: 'Food & Beverage',
    businessTypes: ['Caterer', 'Event catering', 'Corporate lunch service', 'Private chef'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'clinic-practitioner',
    industrySlug: 'clinic',
    name: 'Clinic / Practitioner',
    category: 'Health & Wellness',
    businessTypes: ['Dental clinic', 'Physiotherapy', 'Chiropractic', 'Massage therapy', 'Walk-in clinic'],
    packageTier: 'Standard Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'appointment-lite',
    industrySlug: 'schools',
    name: 'Appointment Lite',
    category: 'Professional & Personal Services',
    businessTypes: ['Tutor', 'Consultant', 'Photographer', 'Solo practitioner'],
    packageTier: 'One Pager',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'multi-service-spa-salon',
    industrySlug: 'barbershops',
    name: 'Multi-Service Spa / Salon',
    category: 'Beauty & Personal Care',
    businessTypes: ['Day spa', 'Medi-spa', 'Full-service salon', 'Wellness centre'],
    packageTier: 'Standard Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'fnb-cafe-order-ahead',
    industrySlug: 'restaurants',
    name: 'F&B — Cafe / Order Ahead',
    category: 'Food & Beverage',
    businessTypes: ['Cafe', 'Coffee shop', 'Bubble tea', 'Juice bar'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'trades-lead-generation',
    industrySlug: 'contractors',
    name: 'Trades — Lead Generation',
    category: 'Trades & Home Services',
    businessTypes: ['Plumber', 'Electrician', 'HVAC', 'Roofer', 'General contractor'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'b2b-distributor-wholesale',
    industrySlug: 'supply',
    name: 'B2B — Distributor / Wholesale',
    category: 'Trades & Home Services',
    businessTypes: ['Building supply', 'Equipment distributor', 'Industrial supplier'],
    packageTier: 'Standard Package',
    status: 'coming-soon',
    demoUrl: null,
  },
  {
    slug: 'fnb-bakery-pre-order',
    industrySlug: 'restaurants',
    name: 'F&B — Bakery / Pre-Order',
    category: 'Food & Beverage',
    businessTypes: ['Bakery', 'Patisserie', 'Cake shop', 'Bagel & bread'],
    packageTier: 'Starter Package',
    status: 'coming-soon',
    demoUrl: null,
  },
];

export const getPlaybook = (slug: string): PackagePlaybook | undefined =>
  playbooks.find((playbook) => playbook.slug === slug);

/** Only the playbooks with a demo behind them. The status check narrows the
 *  union, so callers get the pricing and feature fields without a cast. */
export const livePlaybooks = (): LivePlaybook[] =>
  playbooks.filter((playbook): playbook is LivePlaybook => playbook.status === 'live');

/** Grouped for the hub, in first-appearance order — a directory whose
 *  sections reshuffle as the roster grows is a directory nobody learns. */
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

/** The playbook whose built sample site fills the frame on a vertical's page.
 *  Undefined until that vertical has a demo, which is what keeps the drawn
 *  mockup as the fallback for the other thirteen. */
export const embeddableDemoFor = (industrySlug: string): LivePlaybook | undefined =>
  playbooks.find(
    (playbook): playbook is LivePlaybook =>
      playbook.industrySlug === industrySlug && playbook.status === 'live'
  );
