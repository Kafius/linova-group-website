// Grandview Food Distribution — the sample site for the B2B Distributor /
// Wholesale playbook. A fictional wholesale food distributor in Mississauga,
// Ontario; nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, CRM, CMS, Analytics, Domain.
// Deliberately absent: e-commerce and booking.
//
// ── A CATALOGUE WITH NO PRICES AND NO CART ───────────────────────────────
// E-commerce is FALSE here, and that is not a gap — it is how the trade
// works. A distributor's prices are account-specific, they move weekly with
// produce, and publishing them puts a competitor's homework on the open web.
// So the categories are browsable, the pack formats and storage classes are
// published, and there is no price field in the CMS model at all. See
// b2b-distributor-wholesale.cms.ts: the absence is modelled, not forgotten.
//
// ── THE SECOND CRM BUILD ─────────────────────────────────────────────────
// Northline Facility Services was the first. This one is heavier: an account
// application with a business number, two trade references and a volume band,
// which is a credit application as much as an enquiry. The CRM handoff stub is
// in becomeACustomer.astro.
//
// First demo on the `supply` vertical. Register: operational and dense. A cool
// grey base, a slate band, one utility green, and a mono face carrying every
// route, cut-off and pack size — the reference is a route sheet, not a
// brochure.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type StorageClass = 'ambient' | 'chilled' | 'frozen';

export interface ProductCategory {
  id: string;
  name: string;
  blurb: string;
  storage: StorageClass;
  /** how many lines are carried, which is the number a chef asks first */
  lines: number;
  /** the pack formats, in the words on the invoice */
  packs: string[];
  /** representative lines. No prices — see the note at the top. */
  examples: string[];
  leadTime: string;
}

export interface Route {
  id: string;
  name: string;
  days: string;
  areas: string[];
  cutOff: string;
  window: string;
  minimum: number;
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Cool grey, slate, one utility green. Square corners, hairline rules, and a
 *  mono face on every figure. Nothing here is trying to be attractive. */
export const theme: DemoTheme = {
  ink: '#EEF0F2',
  inkRaised: '#E3E6EA',
  inkLine: '#C7CDD4',
  /** slate band */
  paper: '#1A1F24',
  paperRaised: '#232930',
  paperLine: '#38404A',
  /** utility green on cool grey (7.1:1) */
  accent: '#0F5C31',
  /** lifted for the slate band (10.0:1) */
  accentOnPaper: '#7BDCA4',
  onInk: '#171A1D',
  onInkDim: 'rgba(23, 26, 29, 0.72)',
  onPaper: '#E9EDF1',
  onPaperDim: 'rgba(233, 237, 241, 0.78)',
  onAccent: '#FFFFFF',
  displayFont: '"Asap", "Segoe UI", system-ui, sans-serif',
  bodyFont: '"Asap", "Segoe UI", system-ui, sans-serif',
  /** every route, cut-off, pack size and reference number is set in this */
  monoFont: '"JetBrains Mono", ui-monospace, Consolas, monospace',
  radius: '0',
};

export const fonts = [
  { family: 'Asap', file: 'asap-latin-var.woff2', weight: '400 700' },
  { family: 'JetBrains Mono', file: 'jetbrains-mono-latin-var.woff2', weight: '400 600' },
];

export const business: DemoBusiness = {
  name: 'Grandview Food Distribution',
  shortName: 'Grandview',
  positioning: 'Wholesale food distribution to independent restaurants and grocers across southern Ontario.',
  address: {
    street: 'Unit 40, 5820 Ambler Drive',
    city: 'Mississauga',
    region: 'ON',
    postalCode: 'L4W 2K9',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0132',
  phoneHref: 'tel:+19055550132',
  email: 'accounts@grandviewfood.ca',
  emailHref: 'mailto:accounts@grandviewfood.ca',
};

/** The orders desk is a different phone from accounts, and on a distributor
 *  site putting them on one number is how a Tuesday morning goes wrong. */
export const ordersDesk = {
  name: 'Orders desk',
  phone: '(905) 555-0133',
  phoneHref: 'tel:+19055550133',
  email: 'orders@grandviewfood.ca',
  emailHref: 'mailto:orders@grandviewfood.ca',
  hours: 'Monday to Friday, 6:00 am – 4:00 pm',
};

export const warehouseHours: { day: string; short: string; schemaDay: string; open: string; close: string }[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '05:00', close: '16:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '05:00', close: '16:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '05:00', close: '16:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '05:00', close: '16:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '05:00', close: '15:00' },
];

export const storageLabels: Record<StorageClass, string> = {
  ambient: 'Ambient',
  chilled: 'Chilled 2–4°C',
  frozen: 'Frozen −18°C',
};

/** ── CMS-MODELLED ────────────────────────────────────────────────────────
 *  Seed data for the `productCategory` collection. Note what is not in the
 *  interface: a price. See the note at the top of this file and the model in
 *  b2b-distributor-wholesale.cms.ts.
 *  ───────────────────────────────────────────────────────────────────────── */
export const categories: ProductCategory[] = [
  {
    id: 'dry-goods',
    name: 'Dry goods',
    blurb:
      'The base of most orders. Flour, rice, pulses, canned tomato, oils, vinegars and the shelf-stable middle of a kitchen.',
    storage: 'ambient',
    lines: 640,
    packs: ['20 kg sack', '4 × 4 L case', '6 × #10 tin', '12 × 750 ml'],
    examples: [
      'Hard red spring flour, 20 kg',
      'Parboiled long grain rice, 20 kg',
      'San Marzano style plum tomato, 6 × #10',
      'Chickpeas dry, 20 kg',
      'Canola frying oil, 16 L cube',
      'Red wine vinegar, 12 × 750 ml',
    ],
    leadTime: 'Next route',
  },
  {
    id: 'frozen',
    name: 'Frozen',
    blurb:
      'Proteins, fries, pastry and vegetables, carried at −18°C from our door to yours. The freezer trailer is the reason this line exists.',
    storage: 'frozen',
    lines: 310,
    packs: ['5 kg case', '10 kg case', '4 × 2.5 kg', '48 × 120 g'],
    examples: [
      'Beef striploin portions 8 oz, 4 × 2.5 kg',
      'Chicken thigh boneless, 10 kg',
      'Shoestring fries 6 mm, 6 × 2 kg',
      'Butter puff pastry sheets, 10 kg',
      'Green peas IQF, 4 × 2.5 kg',
      'Atlantic salmon portions, 5 kg',
    ],
    leadTime: 'Next route',
  },
  {
    id: 'produce',
    name: 'Produce',
    blurb:
      'Bought at the terminal four mornings a week. Price moves weekly and so does what is good, which is why the desk will tell you what to buy rather than sell you a list.',
    storage: 'chilled',
    lines: 180,
    packs: ['Case', '10 lb bag', '25 lb carton', 'Each'],
    examples: [
      'Field tomato, 25 lb',
      'Spanish onion, 50 lb',
      'Romaine hearts, 12 count',
      'Yukon gold potato, 50 lb',
      'Cremini mushroom, 5 lb',
      'Lemons 165 count, case',
    ],
    leadTime: 'Order by 2:00 pm, next route',
  },
  {
    id: 'dairy-chilled',
    name: 'Dairy and chilled',
    blurb:
      'Milk, cream, butter, cheese and fresh pasta on the chilled trailer. Short-dated by nature, so we hold less and turn it faster.',
    storage: 'chilled',
    lines: 220,
    packs: ['4 L bag', '12 × 1 L', '20 kg block', '2 × 5 kg'],
    examples: [
      '35% whipping cream, 12 × 1 L',
      'Unsalted butter solids, 20 kg',
      'Mozzarella block, 2 × 5 kg',
      'Parmesan wedge, 8 × 1 kg',
      'Large eggs, 15 dozen',
      'Fresh egg pasta sheets, 2 × 5 kg',
    ],
    leadTime: 'Next route',
  },
  {
    id: 'packaging',
    name: 'Packaging and disposables',
    blurb:
      'Takeout containers, films, gloves, liners and cleaning chemicals. It goes on the same truck and the same invoice as the food.',
    storage: 'ambient',
    lines: 290,
    packs: ['Case of 500', 'Case of 1000', '6 × 4 L', 'Roll'],
    examples: [
      'Kraft takeout box 26 oz, case of 500',
      'Vented lid clamshell 9 in, case of 200',
      'Nitrile gloves powder-free, 10 × 100',
      'Cling film 18 in, roll',
      'Degreaser concentrate, 4 × 4 L',
      'Bin liners 35 × 50, case of 200',
    ],
    leadTime: 'Next route',
  },
];

/** ── THE ROUTES ──────────────────────────────────────────────────────────
 *  The page a prospective customer actually reads. Cut-offs are the thing
 *  that gets a distributor fired, so they are stated per route rather than
 *  averaged into one comforting sentence.
 *  ───────────────────────────────────────────────────────────────────────── */
export const routes: Route[] = [
  {
    id: 'r1',
    name: 'Route 1',
    days: 'Tue, Thu, Sat',
    areas: ['Mississauga', 'Etobicoke', 'Brampton'],
    cutOff: '2:00 pm, day before',
    window: '05:00 – 11:00',
    minimum: 250,
  },
  {
    id: 'r2',
    name: 'Route 2',
    days: 'Mon, Wed, Fri',
    areas: ['Toronto west', 'Downtown', 'East York'],
    cutOff: '2:00 pm, day before',
    window: '05:00 – 12:00',
    minimum: 350,
  },
  {
    id: 'r3',
    name: 'Route 3',
    days: 'Wed',
    areas: ['Oakville', 'Burlington', 'Hamilton'],
    cutOff: '2:00 pm Monday',
    window: '06:00 – 13:00',
    minimum: 400,
  },
  {
    id: 'r4',
    name: 'Route 4',
    days: 'Thu',
    areas: ['Kitchener', 'Waterloo', 'Cambridge', 'Guelph'],
    cutOff: '2:00 pm Tuesday',
    window: '06:00 – 14:00',
    minimum: 450,
  },
  {
    id: 'r5',
    name: 'Route 5',
    days: 'Tue',
    areas: ['Vaughan', 'Richmond Hill', 'Newmarket', 'Barrie'],
    cutOff: '2:00 pm Friday',
    window: '06:00 – 13:00',
    minimum: 450,
  },
];

/** Flattened for the schema areaServed and for the application form's city
 *  list, so the routes and the markup cannot name different places. */
export const deliveryAreas: string[] = [...new Set(routes.flatMap((route) => route.areas))];

export const accountTerms: { label: string; value: string; note: string }[] = [
  {
    label: 'Terms',
    value: 'Net 14',
    note: 'On an approved account. First four weeks are pre-paid or on card while the references clear.',
  },
  {
    label: 'Invoicing',
    value: 'Per delivery, emailed',
    note: 'One invoice per drop, plus a weekly statement on Monday. Nothing is settled on this website.',
  },
  {
    label: 'Minimum order',
    value: '$250 – $450',
    note: 'By route — the further the truck goes the higher it is. Below the minimum we will still deliver with a $40 short-order fee.',
  },
  {
    label: 'Standing orders',
    value: 'Adjust by cut-off',
    note: 'Set a weekly baseline and change only the difference. Most accounts touch it twice a month.',
  },
  {
    label: 'Credits',
    value: 'Same day, on the driver',
    note: 'Short, damaged or wrong goes back on the truck and comes off the invoice before it is issued. No paperwork chase.',
  },
  {
    label: 'Account opening',
    value: '3 to 5 business days',
    note: 'Two trade references and a business number. First delivery usually on the next route after approval.',
  },
];

const BASE = '/industries/supply/preview/b2b-distributor-wholesale/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}products`, label: 'Products' },
    { href: `${BASE}delivery`, label: 'Delivery' },
    { href: `${BASE}apply`, label: 'Become a Customer' },
    { href: `${BASE}about`, label: 'About' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}apply`, label: 'Open an account', event: 'apply_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/supply',
};

export const footer: DemoFooter = {
  tagline: 'Wholesale food distribution from Ambler Drive, Mississauga. Five routes across southern Ontario.',
  rowsHeading: 'Warehouse',
  findUsHeading: 'Desks',
  legal: `© ${new Date().getFullYear()} Grandview Food Distribution. Sample site — not a real business.`,
};

export const pageMeta: Record<
  'home' | 'products' | 'delivery' | 'apply' | 'about' | 'contact',
  DemoPageMeta
> = {
  home: {
    title: 'Grandview Food Distribution — Wholesale Food Supply, Southern Ontario',
    description:
      'Wholesale food distribution to independent restaurants and grocers across southern Ontario. Dry goods, frozen, produce, dairy and packaging on five weekly routes from Mississauga.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  products: {
    title: 'Product Categories — Grandview Food Distribution',
    description:
      'Five categories and 1,640 lines: dry goods, frozen, produce, dairy and chilled, packaging and disposables. Pack formats and storage classes published; prices come with an account.',
    ogImage: '/og/default.png',
    breadcrumb: 'Product Categories',
  },
  delivery: {
    title: 'Delivery Routes, Areas and Cut-off Times — Grandview Food Distribution',
    description:
      'Five routes across southern Ontario with delivery days, cut-off times, arrival windows and minimum order by route. Mississauga, Toronto, Hamilton, Waterloo Region and north to Barrie.',
    ogImage: '/og/default.png',
    breadcrumb: 'Delivery Areas & Schedule',
  },
  apply: {
    title: 'Become a Customer — Open a Wholesale Account, Grandview Food',
    description:
      'Open a wholesale account: business details, business number, category, estimated weekly volume, delivery address and two trade references. Three to five business days to approval.',
    ogImage: '/og/default.png',
    breadcrumb: 'Become a Customer',
  },
  about: {
    title: 'About — Grandview Food Distribution, Mississauga',
    description:
      'A 44,000 sq ft warehouse on Ambler Drive, eleven trucks, a temperature-logged cold chain and buyers who go to the terminal four mornings a week.',
    ogImage: '/og/default.png',
    breadcrumb: 'About',
  },
  contact: {
    title: 'Contact — Grandview Food Distribution, Mississauga',
    description:
      'Orders desk and accounts desk on separate lines, warehouse hours, will-call collection and the address on Ambler Drive.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Ambler Drive, Mississauga',
  heroTitle: 'Five routes, one invoice, no minimum you cannot hit',
  heroBody:
    'Dry goods, frozen, produce, dairy and packaging on the same truck. We supply independent restaurants and grocers who are too small for the national houses and too busy to chase four suppliers.',
  heroPrimaryCta: 'Open an account',
  heroSecondaryCta: 'Routes and cut-offs',

  figuresHeading: 'The operation',
  figures: [
    { value: '1,640', label: 'Lines carried' },
    { value: '5', label: 'Weekly routes' },
    { value: '11', label: 'Trucks' },
    { value: '44,000', label: 'Sq ft, three temperature zones' },
  ],

  categoriesHeading: 'What we carry',
  categoriesBody:
    'Five categories on one order and one invoice. Pack formats and storage classes are published; prices come with an account, because they are account-specific and produce moves weekly.',
  categoriesCta: 'All categories',
  linesLabel: 'lines',

  routesHeading: 'Where the trucks go',
  routesBody:
    'Cut-off times are per route, not averaged. Missing one by ten minutes is the thing that costs a distributor a customer, so they are on the page rather than in a PDF.',
  routesCta: 'Full schedule',

  termsHeading: 'Account terms',
  termsBody: 'The six things a chef asks before the first order, answered before they have to ask.',

  applyHeading: 'Opening an account',
  applyBody:
    'Two trade references and a business number. Three to five business days, and the first delivery is usually the next route after approval.',
  applyCta: 'Become a customer',
};

export const productsPage = {
  eyebrow: 'Product Categories',
  heading: 'Five categories, 1,640 lines',
  intro:
    'Browsable, not purchasable. There is no cart on this website and there is no price on this page — see the note below, which is a real answer rather than an apology.',
  storageLabel: 'Storage',
  linesLabel: 'Lines',
  packsLabel: 'Pack formats',
  leadLabel: 'Lead time',
  examplesLabel: 'Representative lines',
  noPriceHeading: 'Why there are no prices here',
  noPriceBody:
    'Because they would be wrong by Thursday. Produce moves with the terminal, dry goods move with the dollar, and every account is priced on its volume and its route. A published price list is either out of date or it is your competitors’ homework. What you get instead: a priced list against your own account, emailed the day it is approved and updated weekly.',
  fullListHeading: 'The full list',
  fullListBody:
    'The complete line list runs to sixty pages and is issued with an account. Ring the orders desk if you want a specific line checked before you apply — it takes about a minute.',
  applyCta: 'Open an account',
};

export const deliveryPage = {
  eyebrow: 'Delivery Areas & Schedule',
  heading: 'Five routes, published cut-offs',
  intro:
    'Find your city, read the cut-off, order before it. Everything below is the schedule the warehouse actually runs, not a service-area map with a circle drawn on it.',
  routeLabel: 'Route',
  daysLabel: 'Delivery days',
  areasLabel: 'Areas',
  cutOffLabel: 'Order cut-off',
  windowLabel: 'Arrival window',
  minimumLabel: 'Minimum',
  missedHeading: 'If you miss the cut-off',
  missedBody:
    'The order goes on the next run of that route. We will not put a truck on the road for one drop and we will not pretend otherwise on the phone at four in the afternoon. If it is genuinely urgent, will-call collection from Ambler Drive is open until four.',
  outsideHeading: 'Outside these areas',
  outsideBody:
    'We will say no. A route that does not exist cannot be run reliably, and an unreliable delivery is worse for you than a supplier who was honest in the first phone call.',
  termsHeading: 'Account terms',
  ctaHeading: 'Your city on the list?',
  ctaBody: 'Then the next step is the account application. Three to five business days.',
  ctaLabel: 'Become a customer',
};

/** The account application. Heavier than an enquiry — a business number and
 *  two trade references make this a credit application, which is exactly why
 *  this playbook carries CRM. */
export const applyPage = {
  eyebrow: 'Become a Customer',
  heading: 'Open a wholesale account',
  intro:
    'Everything below is what the credit check needs. Three to five business days, and we will ring you either way rather than leaving you wondering.',
  requiredNote: 'Fields marked with an asterisk are required.',
  submitLabel: 'Submit the application',
  errorSummaryHeading: 'Check these fields',
  sections: {
    businessHeading: 'The business',
    deliveryHeading: 'Delivery',
    referencesHeading: 'Trade references',
    referencesNote: 'Two suppliers you currently buy from. We ring both, and we tell them it is a reference call.',
    contactHeading: 'Who we deal with',
  },
  fields: {
    businessName: { label: 'Operating name', error: 'The name on the sign.' },
    legalName: { label: 'Legal name', hint: 'If different from the operating name.', error: 'The name on the invoice.' },
    businessNumber: {
      label: 'Business number',
      hint: 'The nine-digit CRA business number, or the HST number if that is what you have to hand.',
      error: 'A business number is needed for a credit account.',
    },
    category: {
      label: 'Type of business',
      options: ['Independent restaurant', 'Cafe or bakery', 'Grocer or convenience', 'Caterer', 'Institution or school', 'Food truck or stall', 'Something else'],
      error: 'Choose the closest type.',
    },
    volume: {
      label: 'Estimated weekly spend',
      hint: 'A guess is fine. It decides the route and the terms, not the welcome.',
      options: ['Under $250', '$250 – $750', '$750 – $2,000', '$2,000 – $5,000', 'Over $5,000', 'Not sure yet'],
      error: 'An estimate, even a rough one.',
    },
    deliveryAddress: { label: 'Delivery address', error: 'Where the truck goes.' },
    deliveryCity: { label: 'City', hint: 'This sets your route and your cut-off.', error: 'Which city is the delivery address in.' },
    accessNotes: {
      label: 'Access notes',
      hint: 'A lane, a buzzer code, a loading restriction, a flight of stairs. Drivers read this at five in the morning.',
    },
    ref1Name: { label: 'Reference 1 — supplier', error: 'A supplier name.' },
    ref1Phone: { label: 'Reference 1 — phone', error: 'A number we can ring.' },
    ref2Name: { label: 'Reference 2 — supplier', error: 'A second supplier name.' },
    ref2Phone: { label: 'Reference 2 — phone', error: 'A number we can ring.' },
    contactName: { label: 'Your name', error: 'A name for the account.' },
    contactRole: { label: 'Role', hint: 'Owner, chef, manager — whoever signs off on orders.', error: 'Your role at the business.' },
    email: { label: 'Email', error: 'A valid email — the account pack goes here.' },
    phone: { label: 'Phone', error: 'A number the orders desk can use.' },
    notes: { label: 'Anything else', hint: 'A line you need matched, a supplier you are leaving, a date you want to start.' },
  },
  confirmation: {
    heading: 'Application received',
    body:
      'It is with the accounts desk. We ring both references, run the credit check and come back within three to five business days — either way, by phone.',
    detailsHeading: 'What you sent',
    note: 'Nothing is committed by this and no credit is extended until the account is approved in writing. The first four weeks are pre-paid or on card while the references clear.',
    resetLabel: 'Start another application',
    callLabel: 'Or ring the accounts desk',
  },
  sidebarHeading: 'What happens next',
  sidebarSteps: [
    { when: 'Same business day', what: 'An acknowledgement, and the name of whoever is handling it.' },
    { when: 'Days 1 to 3', what: 'We ring both trade references and run the credit check.' },
    { when: 'Days 3 to 5', what: 'A call either way. Approved accounts get terms, a route and a priced list.' },
    { when: 'First delivery', what: 'Usually the next run of your route after approval.' },
  ],
};

export const aboutPage = {
  eyebrow: 'About',
  heading: 'A warehouse, eleven trucks and a buyer at the terminal',
  intro:
    'Grandview supplies the independents — the places too small for a national house to care about and too busy to manage four suppliers.',
  factsHeading: 'The building',
  facts: [
    { label: 'Warehouse', value: '44,000 sq ft' },
    { label: 'Temperature zones', value: '3' },
    { label: 'Trucks', value: '11' },
    { label: 'Trading since', value: '1998' },
  ],
  coldHeading: 'The cold chain',
  coldBody:
    'Three zones in the building — ambient, chilled at 2 to 4°C and frozen at −18°C — and reefer trucks on the chilled and frozen routes. Every trailer logs its temperature for the whole run and the log is kept for a year. We work to a written HACCP-based program and take an outside audit once a year.',
  coldPoints: [
    'Temperature logged end to end and kept for twelve months',
    'Written HACCP-based program, reviewed annually',
    'Independent audit once a year, findings actioned in writing',
    'Recall procedure tested twice a year against a mock recall',
    'Lot traceability on every frozen and chilled line',
  ],
  buyingHeading: 'The buying',
  buyingBody:
    'Two buyers at the Ontario Food Terminal four mornings a week. That is why the produce desk will tell you the romaine is poor this week and to take the little gem instead — which no order portal has ever done.',
  peopleHeading: 'The people',
  peopleBody:
    'Thirty-one of us. Nine drivers, twelve in the warehouse, four on the orders desk, three buyers, two in accounts and one who fixes the forklifts.',
  ctaHeading: 'Come and see it',
  ctaBody: 'Most chefs who open an account have stood in the freezer first. Ring the orders desk and ask.',
  ctaLabel: 'Contact the desks',
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Two desks, one building',
  ordersHeading: 'Orders desk',
  ordersNote: 'Orders, substitutions, credits and anything about a delivery that is on its way.',
  accountsHeading: 'Accounts desk',
  accountsNote: 'Applications, terms, statements and anything with an invoice number on it.',
  addressHeading: 'Warehouse',
  hoursHeading: 'Warehouse hours',
  hoursNote: 'Trucks load from five. The desks answer from six. Will-call collection until four, and until three on Friday.',
  hoursTable: { day: 'Day', open: 'Open' },
  areaHeading: 'Delivery areas',
  areaNote: `${deliveryAreas.length} municipalities across ${routes.length} routes. Outside them we will refer you rather than promise a truck.`,
  mapLabel: 'Map — Unit 40, 5820 Ambler Drive, Mississauga',
  applyCta: 'Open an account',
};

export const categoryById = (id: string): ProductCategory | undefined =>
  categories.find((category) => category.id === id);

/** The total published on the home page and the products page. Computed, so
 *  the two can never disagree with the five category figures. */
export const totalLines = (): number => categories.reduce((sum, category) => sum + category.lines, 0);

export const formatNumber = (value: number): string => new Intl.NumberFormat('en-CA').format(value);
