// Northline Facility Services — the sample site for the B2B / Commercial
// Services playbook. A fictional commercial janitorial and facility
// maintenance contractor in Brampton, Ontario; nothing here is a real
// business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, CRM, Analytics, Domain.
// Deliberately absent: e-commerce, CMS and booking. Nobody adds a nightly
// janitorial contract to a cart, and nothing on a five-page contractor site
// changes often enough to need a content system. A qualified enquiry landing
// in the CRM instead of a checkout is the whole argument for this tier.
//
// First demo on the `cleaning` vertical, and the first CRM build in the
// catalogue. Corporate register throughout: navy, steel, one clean blue,
// square corners, a mono face carrying every number.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export interface ServiceLine {
  id: string;
  name: string;
  summary: string;
  /** what the scope actually covers, in the words a facility manager uses */
  includes: string[];
  /** the mono spec line — crew size, window, frequency */
  spec: { label: string; value: string }[];
}

export interface ServedIndustry {
  id: string;
  name: string;
  summary: string;
  /** the thing that is different about cleaning this kind of building */
  distinct: string;
  spec: { label: string; value: string }[];
}

export interface Credential {
  name: string;
  detail: string;
}

export interface OfficeDay {
  day: string;
  short: string;
  schemaDay: string;
  open: string;
  close: string;
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Navy, steel grey, one clean blue. Two-pixel corners, hairline rules, a
 *  mono face on every figure. Nothing here is soft, because a facility
 *  manager comparing three bids is not looking to be charmed. */
export const theme: DemoTheme = {
  ink: '#F4F6F9',
  inkRaised: '#E8ECF2',
  inkLine: '#CFD8E3',
  paper: '#0D1B2E',
  paperRaised: '#16263D',
  paperLine: '#2A3C55',
  /** cobalt on the cool white (7.1:1) */
  accent: '#1B4DAF',
  /** lifted for the navy band (7.9:1) */
  accentOnPaper: '#7FB2F0',
  onInk: '#16202E',
  onInkDim: 'rgba(22, 32, 46, 0.72)',
  onPaper: '#E7EDF6',
  onPaperDim: 'rgba(231, 237, 246, 0.76)',
  onAccent: '#FFFFFF',
  displayFont: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
  bodyFont: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
  /** the mono face carries every figure — crew sizes, service windows,
   *  square footage. It reaches the pages as var(--font-mono). */
  monoFont: '"IBM Plex Mono", ui-monospace, Consolas, monospace',
  radius: '2px',
};

export const fonts = [
  { family: 'IBM Plex Sans', file: 'ibm-plex-sans-latin-var.woff2', weight: '400 700' },
  { family: 'IBM Plex Mono', file: 'ibm-plex-mono-latin-400.woff2', weight: '400' },
  { family: 'IBM Plex Mono', file: 'ibm-plex-mono-latin-600.woff2', weight: '600' },
];

export const business: DemoBusiness = {
  name: 'Northline Facility Services',
  shortName: 'Northline',
  positioning:
    'Commercial janitorial and facility maintenance across the western GTA. Bonded, insured, WSIB clear.',
  address: {
    street: 'Unit 12, 4180 Kestrel Court',
    city: 'Brampton',
    region: 'ON',
    postalCode: 'L6T 5B8',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0146',
  phoneHref: 'tel:+19055550146',
  email: 'quotes@northlinefacility.ca',
  emailHref: 'mailto:quotes@northlinefacility.ca',
};

/** Office hours. The crews work nights; the phone does not. */
export const officeHours: OfficeDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '07:00', close: '17:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '07:00', close: '17:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '07:00', close: '17:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '07:00', close: '17:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '07:00', close: '17:00' },
];

/** What goes in the footer's right-hand column. Every other demo in the
 *  catalogue puts opening hours there; a contractor's visitor wants to know
 *  when crews are in the building, which is a different question. */
export const coverage: { label: string; value: string }[] = [
  { label: 'Day porters', value: '7:00 am – 3:00 pm' },
  { label: 'Evening crews', value: '5:00 pm – 1:00 am' },
  { label: 'Overnight', value: '10:00 pm – 6:00 am' },
  { label: 'Call-out', value: '24 hours' },
];

/** The municipalities under contract. Also the schema areaServed. */
export const serviceArea: string[] = [
  'Brampton',
  'Mississauga',
  'Vaughan',
  'Etobicoke',
  'Milton',
  'Caledon',
];

/** Four things a facility manager checks before a walkthrough is booked.
 *  All four are commitments this company makes about itself — no third-party
 *  certification marks are claimed. */
export const credentials: Credential[] = [
  {
    name: 'Bonded and insured',
    detail: '$5M commercial general liability. Certificate of insurance issued to the property owner on request, naming them as additional insured.',
  },
  {
    name: 'WSIB clearance',
    detail: 'Clearance certificate kept current and attached to every invoice, so your accounts payable file is never the thing holding up a payment.',
  },
  {
    name: 'WHMIS 2015 trained',
    detail: 'Every crew member is trained before a first shift. SDS binder on site, product list submitted with the scope.',
  },
  {
    name: 'Screened crews',
    detail: 'Reference and criminal record checks on all staff, vulnerable sector screening on clinical and childcare sites.',
  },
];

export const services: ServiceLine[] = [
  {
    id: 'nightly-janitorial',
    name: 'Nightly janitorial',
    summary:
      'The standing contract. A fixed crew, the same faces most nights, working a written scope your property manager signs off on.',
    includes: [
      'Washrooms cleaned, disinfected and restocked',
      'Offices, boardrooms and common areas',
      'Kitchens and staff rooms, including appliance exteriors',
      'Entrances, glass, elevator cabs and stairwells',
      'Waste and recycling to the loading dock or bin',
      'Nightly sign-off sheet, signed and dated on site',
    ],
    spec: [
      { label: 'Crew', value: '2–6' },
      { label: 'Window', value: '18:00–01:00' },
      { label: 'Frequency', value: '2–5 nights' },
    ],
  },
  {
    id: 'day-porter',
    name: 'Day porter service',
    summary:
      'Somebody in the building while it is occupied. Washrooms checked on a schedule, spills dealt with before they are complaints, and a face the tenants know.',
    includes: [
      'Washroom checks on a posted rotation',
      'Lobby, entrance and common-area upkeep',
      'Meeting-room resets between bookings',
      'Spill and incident response',
      'Consumables restocked before they run out',
      'Light bulb, ceiling tile and hardware reports to your FM',
    ],
    spec: [
      { label: 'Crew', value: '1–2' },
      { label: 'Window', value: '07:00–15:00' },
      { label: 'Frequency', value: 'Daily' },
    ],
  },
  {
    id: 'clinical',
    name: 'Clinical and medical cleaning',
    summary:
      'Written procedures for exam rooms, treatment areas and reception, with the colour-coded cloth system and the disinfectant contact times documented in the scope.',
    includes: [
      'Exam and treatment rooms to a written room protocol',
      'Colour-coded microfibre, laundered off site',
      'Disinfectant contact times documented per product',
      'Sharps and biomedical containers staged, never handled',
      'Reception, washrooms and staff areas',
      'Product list and SDS provided to your infection-control lead',
    ],
    spec: [
      { label: 'Crew', value: '1–3' },
      { label: 'Window', value: 'After last patient' },
      { label: 'Screening', value: 'Vulnerable sector' },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial and warehouse',
    summary:
      'Plant floors, mezzanines, lunchrooms and washrooms on a shift schedule that works around production rather than pretending it does not exist.',
    includes: [
      'Ride-on and walk-behind scrubbing of plant floors',
      'Racking aisles, dock areas and mezzanine walkways',
      'Lunchrooms, locker rooms and shower facilities',
      'Office areas inside the plant envelope',
      'High-level dusting on a quarterly rotation',
      'Site-specific orientation before a first shift',
    ],
    spec: [
      { label: 'Crew', value: '3–8' },
      { label: 'Window', value: 'Between shifts' },
      { label: 'Equipment', value: 'Ours' },
    ],
  },
  {
    id: 'floor-care',
    name: 'Floor care programme',
    summary:
      'Strip, seal, burnish and carpet extraction on a dated schedule set at the start of the contract year, so nobody is negotiating it in the third week of December.',
    includes: [
      'Strip and refinish on VCT and vinyl plank',
      'Burnishing on a monthly or quarterly cycle',
      'Hot-water carpet extraction with drying times published',
      'Entrance mat programme, swapped on rotation',
      'Concrete sealing and polishing in plant areas',
      'Twelve-month calendar issued with the contract',
    ],
    spec: [
      { label: 'Crew', value: '2–4' },
      { label: 'Window', value: 'Weekends' },
      { label: 'Cycle', value: 'Annual plan' },
    ],
  },
  {
    id: 'post-construction',
    name: 'Post-construction cleanup',
    summary:
      'Rough, final and touch-up cleans for tenant fit-outs and base-building work, priced by phase so the general contractor can hold the schedule.',
    includes: [
      'Rough clean once trades are off the floor',
      'Final clean including glass, frames and fixtures',
      'Touch-up clean before the occupancy walkthrough',
      'Construction dust removal from ceiling grid and diffusers',
      'Debris removal to the site bin',
      'Priced by phase, per square foot',
    ],
    spec: [
      { label: 'Crew', value: '4–12' },
      { label: 'Window', value: 'By phase' },
      { label: 'Notice', value: '5 days' },
    ],
  },
  {
    id: 'consumables',
    name: 'Washroom consumables',
    summary:
      'Paper, soap and liners supplied and restocked as part of the contract, billed at cost plus a stated margin rather than buried in the monthly rate.',
    includes: [
      'Hand towel, tissue and jumbo roll supply',
      'Soap and sanitiser, including dispenser servicing',
      'Liners for every bin size on site',
      'Feminine hygiene units and disposal',
      'Dispensers supplied and maintained at no charge on contract',
      'Usage reported quarterly so the budget is not a surprise',
    ],
    spec: [
      { label: 'Billing', value: 'Cost + 12%' },
      { label: 'Restock', value: 'With service' },
      { label: 'Report', value: 'Quarterly' },
    ],
  },
  {
    id: 'one-time',
    name: 'One-time and project work',
    summary:
      'Deep cleans, move-outs, seasonal work and the jobs that come up when a building changes hands. Quoted flat, scheduled around your tenants.',
    includes: [
      'Move-in and move-out cleans',
      'Post-flood and post-incident cleanup',
      'Seasonal deep cleans between lease terms',
      'Duct and vent grille cleaning coordinated with your HVAC contractor',
      'Interior and ground-floor exterior window cleaning',
      'Flat quote, no hourly surprises',
    ],
    spec: [
      { label: 'Pricing', value: 'Flat' },
      { label: 'Quote', value: '48 hours' },
      { label: 'Minimum', value: 'None' },
    ],
  },
];

export const industries: ServedIndustry[] = [
  {
    id: 'office',
    name: 'Offices and multi-tenant',
    summary:
      'Single-tenant head offices and multi-tenant buildings from one floor to nine, cleaned on a scope the landlord and the tenants have both seen.',
    distinct:
      'The work has to be invisible by 7:30 am and the tenant complaints have to reach one named person, not a general inbox.',
    spec: [
      { label: 'Sites', value: '19' },
      { label: 'Range', value: '4k–120k sq ft' },
    ],
  },
  {
    id: 'medical',
    name: 'Medical and dental clinics',
    summary:
      'Family practices, dental offices, physiotherapy and diagnostic clinics, cleaned to a written room protocol your infection-control lead approves before the first shift.',
    distinct:
      'Product list, contact times and cloth handling are documented, and the crew that cleans clinical space does not also clean the plant across the road.',
    spec: [
      { label: 'Sites', value: '11' },
      { label: 'Screening', value: 'Vulnerable sector' },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial and warehouse',
    summary:
      'Distribution centres, light manufacturing and food-adjacent plants, on a schedule built around your shift pattern rather than a standard nightly window.',
    distinct:
      'Crews are oriented to your site rules before they start, and the equipment on the floor is ours, so nothing is borrowed from your maintenance department.',
    spec: [
      { label: 'Sites', value: '8' },
      { label: 'Range', value: '20k–300k sq ft' },
    ],
  },
  {
    id: 'retail',
    name: 'Retail and plazas',
    summary:
      'Strip plazas, standalone retail and common areas in enclosed centres, including the parts the tenants argue about — entrances, sidewalks and shared washrooms.',
    distinct:
      'Common-area scope is written so the CAM recovery is defensible and every tenant is billed for what they actually use.',
    spec: [
      { label: 'Sites', value: '9' },
      { label: 'Frequency', value: '3–7 days' },
    ],
  },
  {
    id: 'education',
    name: 'Schools and childcare',
    summary:
      'Private schools, daycares and after-school programmes, cleaned after hours with screened staff and a scope that accounts for the toy and mat washing nobody else quotes.',
    distinct:
      'Vulnerable sector screening on every crew member, and a summer deep-clean schedule agreed in April rather than the last week of June.',
    spec: [
      { label: 'Sites', value: '6' },
      { label: 'Screening', value: 'Vulnerable sector' },
    ],
  },
  {
    id: 'property-management',
    name: 'Property management portfolios',
    summary:
      'Multi-site portfolios under one agreement, with one account manager, one invoice format and one place to look when a site needs something.',
    distinct:
      'Consolidated or per-site invoicing, whichever your accounting prefers, and a quarterly walkthrough report on every building in the portfolio.',
    spec: [
      { label: 'Portfolios', value: '4' },
      { label: 'Reporting', value: 'Quarterly' },
    ],
  },
];

/** The onboarding sequence, which is what a facility manager is really
 *  buying: a transition that does not leave a gap. */
export const onboarding: { step: string; title: string; detail: string }[] = [
  {
    step: '01',
    title: 'Walkthrough',
    detail:
      'We walk the site with you, measure what is actually there, and write down the things the last contractor was quietly not doing.',
  },
  {
    step: '02',
    title: 'Scope and quote',
    detail:
      'A written scope by area and frequency, priced per month, with the consumables line broken out separately. Two business days after the walkthrough.',
  },
  {
    step: '03',
    title: 'Transition plan',
    detail:
      'Keys, alarm codes, site rules and a start date. If you are leaving another contractor we overlap by a week so there is no night without a crew.',
  },
  {
    step: '04',
    title: 'First 30 days',
    detail:
      'Your account manager walks the site weekly for the first month, then monthly. Anything on the punch list is closed before it becomes a complaint.',
  },
];

const BASE = '/industries/cleaning/preview/b2b-commercial-services/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}services`, label: 'Services' },
    // Short in the nav, long everywhere else. "Industries We Serve" is the
    // page's name — its title, its H1 and its breadcrumb — but as a nav item
    // it is the longest label in the catalogue and pushes the row onto two
    // lines above 1200px.
    { href: `${BASE}industries`, label: 'Industries' },
    { href: `${BASE}quote`, label: 'Request a Quote' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}quote`, label: 'Request a quote', event: 'quote_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/cleaning',
};

export const footer: DemoFooter = {
  tagline:
    'Commercial janitorial and facility maintenance across the western GTA. Bonded, insured, WSIB clear.',
  rowsHeading: 'Crews on site',
  findUsHeading: 'Office',
  legal: `© ${new Date().getFullYear()} Northline Facility Services. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'services' | 'industries' | 'quote' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Northline Facility Services — Commercial Cleaning, Brampton',
    description:
      'Commercial janitorial and facility maintenance in Brampton, Mississauga and the western GTA. Bonded and insured, WSIB clear, night crews and day porters on written scopes.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  services: {
    title: 'Services — Northline Facility Services',
    description:
      'Nightly janitorial, day porters, clinical cleaning, industrial floor care, post-construction cleanup and washroom consumables, each on a written scope with crew size and service window stated.',
    ogImage: '/og/default.png',
    breadcrumb: 'Services',
  },
  industries: {
    title: 'Industries We Serve — Northline Facility Services',
    description:
      'Offices, medical and dental clinics, industrial plants, retail plazas, schools and multi-site property management portfolios across Brampton and the western GTA.',
    ogImage: '/og/default.png',
    breadcrumb: 'Industries We Serve',
  },
  quote: {
    title: 'Request a Quote — Northline Facility Services',
    description:
      'Tell us the facility type, size, frequency and timeline. We walk the site within five business days and return a written scope and price two days after that.',
    ogImage: '/og/default.png',
    breadcrumb: 'Request a Quote',
  },
  contact: {
    title: 'Contact — Northline Facility Services, Brampton',
    description:
      'Office address, phone, email and the direct line for existing sites. Office hours Monday to Friday, crews on site evenings and overnight.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroKicker: 'Brampton · Western GTA',
  heroTitle: 'Commercial cleaning on a written scope',
  heroBody:
    'Nightly janitorial, day porters and facility maintenance for offices, clinics and plants. One account manager, one invoice, and a crew that signs the sheet before it leaves.',
  heroPrimaryCta: 'Request a quote',
  heroSecondaryCta: 'See the services',
  heroPhoto: {
    file: 'hero-lobby',
    subject:
      'Empty commercial office lobby at night, polished floor, one crew member with a cart at the far end, cool overhead light',
    alt: 'A commercial lobby being cleaned after hours',
  },
  statsKicker: '01 / At a glance',
  stats: [
    { value: '57', label: 'Sites under contract' },
    { value: '4', label: 'Property management portfolios' },
    { value: '92', label: 'Crew members, all screened' },
    { value: '11 yrs', label: 'Under the same ownership' },
  ],
  credentialsKicker: '02 / Before you shortlist us',
  credentialsHeading: 'The four things procurement asks for',
  credentialsBody:
    'All four are current and all four come with the quote, not after the award.',
  servicesKicker: '03 / Services',
  servicesHeading: 'What we are contracted to do',
  servicesBody:
    'Eight lines of work. Most sites take two or three of them under one agreement.',
  servicesCta: 'Full scope of services',
  industriesKicker: '04 / Industries',
  industriesHeading: 'Buildings we already clean',
  industriesBody:
    'The scope changes by building type. So does the screening, the schedule and who signs off.',
  industriesCta: 'Industries we serve',
  onboardingKicker: '05 / Onboarding',
  onboardingHeading: 'How a site starts',
  onboardingBody:
    'Four steps from the first call to a crew in the building. If you are switching contractors, nobody misses a night.',
  areaKicker: '06 / Coverage',
  areaHeading: 'Where the crews are',
  areaBody:
    'Six municipalities, all within an hour of the Brampton yard. Outside that radius we will tell you rather than stretch a crew.',
  closerHeading: 'Book a walkthrough',
  closerBody:
    'Twenty minutes on site tells us more than an hour on the phone. Written scope and price two business days later.',
  closerCta: 'Request a quote',
};

export const servicesPage = {
  kicker: 'Services',
  heading: 'Eight lines of work',
  intro:
    'Each one is quoted on a written scope with the crew size and the service window stated up front. Most contracts combine two or three.',
  jumpLabel: 'Jump to a service',
  includesLabel: 'Scope includes',
  closerHeading: 'Not sure which lines you need',
  closerBody:
    'That is what the walkthrough is for. Most facility managers find they are paying for one thing they do not need and missing two they do.',
  closerCta: 'Request a quote',
};

export const industriesPage = {
  kicker: 'Industries We Serve',
  heading: 'The building type changes the scope',
  intro:
    'A clinic and a distribution centre need different crews, different products and different screening. Pricing one like the other is how contracts fail in month three.',
  distinctLabel: 'What is different here',
  closerHeading: 'Your building is not on this list',
  closerBody:
    'Tell us what it is. If it is not work we do well, we will say so — there are trades we refer out rather than learn on your site.',
  closerCta: 'Request a quote',
};

/** The qualifying form. These six groups are the whole reason this playbook
 *  carries CRM rather than a contact form: an enquiry that arrives with
 *  facility type, size, frequency, incumbent and timeline attached is a lead
 *  a salesperson can rank before returning the call. */
export const quotePage = {
  kicker: 'Request a Quote',
  heading: 'Six questions, then a walkthrough',
  intro:
    'Enough detail to price a walkthrough properly and to tell you honestly if we are the wrong fit. Nothing here goes anywhere except our estimating team.',
  responseHeading: 'What happens next',
  responseSteps: [
    { title: 'Same business day', detail: 'An acknowledgement with the name of the estimator picking it up.' },
    { title: 'Within 5 business days', detail: 'A walkthrough booked around your building access.' },
    { title: '2 days after that', detail: 'A written scope by area and frequency, priced per month.' },
  ],
  formLabel: 'Request a quote',
  requiredNote: 'Fields marked with an asterisk are required.',
  submitLabel: 'Send the request',
  errorSummaryHeading: 'Check these fields',
  fields: {
    facilityType: {
      label: 'Facility type',
      hint: 'What kind of building is it',
      options: [
        'Office or multi-tenant',
        'Medical or dental clinic',
        'Industrial or warehouse',
        'Retail or plaza',
        'School or childcare',
        'Multi-site portfolio',
        'Something else',
      ],
      error: 'Choose the closest facility type.',
    },
    squareFootage: {
      label: 'Approximate size',
      hint: 'Cleanable square footage, near enough',
      options: [
        'Under 5,000 sq ft',
        '5,000 – 15,000 sq ft',
        '15,000 – 40,000 sq ft',
        '40,000 – 100,000 sq ft',
        'Over 100,000 sq ft',
        'Multiple sites, varies',
      ],
      error: 'An approximate size lets us send the right estimator.',
    },
    frequency: {
      label: 'Frequency',
      hint: 'How often the crew is needed',
      options: [
        '5 nights a week',
        '3 nights a week',
        '2 nights a week',
        'Once a week',
        'Day porter as well as nightly',
        'One-time or project work',
      ],
      error: 'Choose a frequency, even approximately.',
    },
    currentProvider: {
      label: 'Current arrangement',
      hint: 'Who cleans it now',
      options: [
        'Another contractor',
        'In-house staff',
        'Nobody at the moment',
        'New building, not occupied yet',
        'Prefer not to say',
      ],
      error: 'Tell us who cleans it now, or choose the last option.',
    },
    timeline: {
      label: 'Timeline',
      hint: 'When you need a crew in the building',
      options: [
        'As soon as possible',
        'Within 30 days',
        '30 to 90 days',
        'Contract renews later this year',
        'Budgeting for next year',
      ],
      error: 'A timeline tells us how to prioritise the walkthrough.',
    },
    contactName: { label: 'Your name', error: 'We need a name to address the quote to.' },
    company: { label: 'Company', error: 'Which company is the contract with.' },
    email: { label: 'Work email', error: 'A valid work email, so the scope reaches you.' },
    phone: { label: 'Phone', hint: 'Optional, but it speeds up booking the walkthrough' },
    siteCity: {
      label: 'Site location',
      hint: 'City or municipality',
      error: 'Which municipality is the site in.',
    },
    notes: {
      label: 'Anything else',
      hint: 'Access constraints, tender deadlines, what went wrong with the last contractor',
    },
  },
  confirmation: {
    heading: 'Request received',
    body:
      'It is with the estimating team now. You will get an acknowledgement today with the name of the person picking it up, and we will come back within five business days to book the walkthrough.',
    detailsHeading: 'What you sent',
    urgentNote: 'If it is urgent — a flood, a failed inspection, a contractor who walked — call the office instead.',
    resetLabel: 'Send another request',
  },
  sidebarHeading: 'Rather just call',
  sidebarBody:
    'The office answers Monday to Friday, 7:00 am to 5:00 pm. Ask for estimating.',
};

export const contactPage = {
  kicker: 'Contact',
  heading: 'Brampton yard and office',
  addressHeading: 'Office and yard',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Office hours',
  hoursNote:
    'The office is open weekdays. Crews are in buildings evenings and overnight, and the call-out line is answered around the clock.',
  hoursTable: { day: 'Day', open: 'Open' },
  routingHeading: 'Who to ask for',
  routing: [
    {
      title: 'New business',
      detail: 'Estimating. Or use the quote form, which gets it to the same desk with the details already attached.',
    },
    {
      title: 'An existing site',
      detail: 'Your account manager, by name. Every contract has one and their mobile is on the site binder.',
    },
    {
      title: 'Invoicing and WSIB',
      detail: 'Accounts. Clearance certificates are attached to every invoice; ask if you need one separately.',
    },
    {
      title: 'After hours',
      detail: 'The call-out line, on the main number. It reaches a supervisor, not a voicemail box.',
    },
  ],
  areaHeading: 'Service area',
  areaNote: 'Six municipalities. Outside them we will refer you rather than send a crew an hour up the 410.',
  mapLabel: 'Map — Unit 12, 4180 Kestrel Court, Brampton',
  quoteCta: 'Request a quote instead',
};

export const serviceById = (id: string): ServiceLine | undefined =>
  services.find((service) => service.id === id);
