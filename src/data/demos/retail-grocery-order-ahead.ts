// Cedarview Halal Grocery & Butcher — the sample site for the Retail Grocery
// Order Ahead playbook. A fictional grocer with an in-house halal butcher in
// Kitchener; nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, E-Commerce, Analytics, Domain.
// Deliberately absent: CMS, CRM and booking. The weekly specials block is a
// dated slab of data somebody swaps out on a Monday, which is exactly the
// argument for why this playbook does NOT carry a content system.
//
// This is the second demo on the `retail` vertical, and it shares a switcher
// with Bramble & Bone. It is deliberately a different world: white and deep
// green against Bramble's cream and forest, a serif against its grotesque,
// crisp corners against its pills.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export interface Department {
  id: string;
  name: string;
  description: string;
  /** what a shopper would actually come in for */
  highlights: string[];
  photo: { file: string; subject: string; alt: string };
}

export interface Cut {
  name: string;
  description: string;
  /** CAD per kilogram */
  pricePerKg: number;
  /** the animal, for the filter row and the schema */
  kind: 'Lamb' | 'Beef' | 'Chicken' | 'Veal' | 'Goat';
}

export interface Special {
  item: string;
  detail: string;
  was: number;
  now: number;
  /** 'each', '/kg', '/lb' — printed after the price */
  unit: string;
}

export interface ShopDay {
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

/** White, deep green and a produce red. Crisp corners, photo-forward tiles —
 *  the register of a clean shop floor with good lighting. */
export const theme: DemoTheme = {
  /** near-white — the base ground */
  ink: '#FAFAF8',
  inkRaised: '#F0F1ED',
  inkLine: '#DDDFD8',
  /** deep green — the contrast band */
  paper: '#0F3D2E',
  paperRaised: '#154A38',
  paperLine: '#215C47',
  /** produce red on white (6.2:1) */
  accent: '#B5281F',
  /** the same red lifted for the green band (6.2:1) */
  accentOnPaper: '#F2A79C',
  onInk: '#16211C',
  onInkDim: 'rgba(22, 33, 28, 0.72)',
  onPaper: '#EFF4F0',
  onPaperDim: 'rgba(239, 244, 240, 0.75)',
  onAccent: '#FFFFFF',
  displayFont: '"Newsreader", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Rubik", "Segoe UI", system-ui, sans-serif',
  displayAxes: "'opsz' 40",
  radius: '3px',
};

export const fonts = [
  { family: 'Newsreader', file: 'newsreader-latin-var.woff2', weight: '400 700' },
  { family: 'Rubik', file: 'rubik-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Cedarview Halal Grocery & Butcher',
  shortName: 'Cedarview',
  positioning: 'Full grocery and an in-house halal butcher, cutting fresh every morning.',
  address: {
    street: '830 Cedarview Road',
    city: 'Kitchener',
    region: 'ON',
    postalCode: 'N2E 0C3',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(519) 555-0134',
  phoneHref: 'tel:+15195550134',
  email: 'hello@cedarviewgrocery.ca',
  emailHref: 'mailto:hello@cedarviewgrocery.ca',
};

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '08:00', close: '21:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '08:00', close: '21:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '08:00', close: '21:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '08:00', close: '21:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '08:00', close: '21:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '21:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '09:00', close: '20:00' },
];

export const departments: Department[] = [
  {
    id: 'butcher',
    name: 'Butcher Counter',
    description: 'Certified halal, cut to order by two full-time butchers. Nothing sits in a tray overnight.',
    highlights: ['Lamb, beef, goat, veal', 'Cut and trimmed how you ask', 'Bulk and freezer orders'],
    photo: {
      file: 'dept-butcher',
      subject: 'Butcher counter with a butcher trimming lamb behind the glass, bright clean light',
      alt: 'A butcher trimming lamb behind the counter at Cedarview',
    },
  },
  {
    id: 'produce',
    name: 'Produce',
    description: 'Ontario in season, and what the Food Terminal has when it is not. Restocked twice a day.',
    highlights: ['Herbs by the bunch', 'Cases at case price', 'Ontario growers marked'],
    photo: {
      file: 'dept-produce',
      subject: 'Produce aisle from low angle, crates of herbs and peppers, water misting the greens',
      alt: 'Crates of herbs and peppers on the Cedarview produce floor',
    },
  },
  {
    id: 'bakery',
    name: 'Bakery & Bread',
    description: 'Flatbread delivered warm twice a day, plus the sweet counter and a shelf of imported biscuits.',
    highlights: ['Warm at 9am and 4pm', 'Baklava by weight', 'Cake orders in 48 hours'],
    photo: {
      file: 'dept-bakery',
      subject: 'Stacked warm flatbread in paper sleeves on a bakery shelf, steam still on the plastic',
      alt: 'Warm flatbread stacked on the bakery shelf at Cedarview',
    },
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    description: 'Labneh, halloumi, feta by the tub, and eggs from a farm outside Wellesley.',
    highlights: ['Six kinds of yoghurt', 'Cut cheese to order', 'Local eggs, daily'],
    photo: {
      file: 'dept-dairy',
      subject: 'Dairy case shot straight on, tubs of labneh and yoghurt lined up, cold cabinet light',
      alt: 'The dairy case at Cedarview, lined with labneh and yoghurt',
    },
  },
  {
    id: 'pantry',
    name: 'Pantry & Spices',
    description: 'Rice in five- and ten-kilo bags, pulses by scoop, and a spice wall we refill ourselves.',
    highlights: ['Bulk rice and pulses', 'Whole spices ground here', 'Olive oil in tins'],
    photo: {
      file: 'dept-pantry',
      subject: 'Spice wall of labelled jars and open sacks of pulses, warm overhead light',
      alt: 'The spice wall and bulk pulses in the Cedarview pantry aisle',
    },
  },
  {
    id: 'frozen',
    name: 'Frozen & Prepared',
    description: 'Samosas, kibbeh and paratha in the freezer, plus trays from our own kitchen at the back.',
    highlights: ['House kibbeh and kofta', 'Party trays to order', 'Frozen fish and shrimp'],
    photo: {
      file: 'dept-frozen',
      subject: 'Freezer aisle with the door open, hand reaching for a box of samosas, cold blue light',
      alt: 'The frozen aisle at Cedarview with prepared foods and samosas',
    },
  },
];

/** The butcher's list. Priced per kilogram, because that is how the counter
 *  actually sells and how the order-ahead form takes a weight. */
export const cuts: Cut[] = [
  { name: 'Lamb Shoulder', description: 'Bone-in or boned and rolled. The one for a slow braise.', pricePerKg: 18.99, kind: 'Lamb' },
  { name: 'Lamb Leg', description: 'Bone-in, trimmed. Ask and we will butterfly it for the grill.', pricePerKg: 21.99, kind: 'Lamb' },
  { name: 'Lamb Chops', description: 'Cut from the rack, French-trimmed on request.', pricePerKg: 27.49, kind: 'Lamb' },
  { name: 'Beef Brisket', description: 'Point or flat. Say which and how much fat you want left on.', pricePerKg: 16.49, kind: 'Beef' },
  { name: 'Beef Short Rib', description: 'Cut across the bone or English-cut, whichever the recipe wants.', pricePerKg: 19.99, kind: 'Beef' },
  { name: 'Lean Ground Beef', description: 'Ground twice through the morning, never yesterday.', pricePerKg: 12.99, kind: 'Beef' },
  { name: 'House Kofta Mix', description: 'Beef and lamb with onion, parsley and our own spice. Ready to skewer.', pricePerKg: 15.99, kind: 'Beef' },
  { name: 'Whole Chicken', description: 'Air-chilled, about 1.6 kg. Spatchcocked at no charge.', pricePerKg: 8.49, kind: 'Chicken' },
  { name: 'Boneless Chicken Thigh', description: 'Skin on or off. The best value in the case, honestly.', pricePerKg: 13.49, kind: 'Chicken' },
  { name: 'Veal Shank', description: 'Cross-cut for osso buco, two to a package.', pricePerKg: 22.99, kind: 'Veal' },
  { name: 'Goat, Bone-In', description: 'Cubed for curry and stew. Young goat, never frozen.', pricePerKg: 20.49, kind: 'Goat' },
];

/** The weekly specials block. One dated object somebody replaces on a Monday
 *  morning — no CMS, because this is the only thing on the site that changes
 *  and swapping six numbers is a two-minute job. */
export const specials = {
  weekOf: 'Monday 7 September',
  through: 'Sunday 13 September',
  note: 'While stock lasts. We do not rain-check the meat.',
  items: [
    { item: 'Lamb Shoulder', detail: 'Bone-in, cut to order at the counter.', was: 18.99, now: 15.99, unit: '/kg' },
    { item: 'Whole Chicken', detail: 'Air-chilled, spatchcocked free.', was: 8.49, now: 6.99, unit: '/kg' },
    { item: 'Roma Tomatoes', detail: 'Ontario, case price if you take the flat.', was: 4.49, now: 2.99, unit: '/kg' },
    { item: 'Basmati Rice', detail: 'Ten-kilo bag, aged.', was: 32.99, now: 26.99, unit: 'each' },
    { item: 'Labneh', detail: 'Full fat, 900g tub.', was: 7.99, now: 5.99, unit: 'each' },
    { item: 'Medjool Dates', detail: 'Jumbo, in the 1kg box.', was: 21.99, now: 17.49, unit: 'each' },
  ] as Special[],
};

const BASE = '/industries/retail/preview/retail-grocery-order-ahead/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}departments`, label: 'Departments' },
    { href: `${BASE}order-ahead`, label: 'Order Ahead' },
    { href: `${BASE}specials`, label: 'Weekly Specials' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}order-ahead`, label: 'Order ahead', event: 'order_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/retail',
};

export const footer: DemoFooter = {
  tagline: 'Halal grocery and butcher on Cedarview Road, Kitchener. Open every day.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Cedarview Halal Grocery & Butcher. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'departments' | 'order' | 'specials' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Cedarview Halal Grocery & Butcher — Kitchener',
    description: 'Full halal grocery with an in-house butcher on Cedarview Road, Kitchener. Fresh cuts daily, custom orders, weekly specials and butcher-counter pre-orders.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  departments: {
    title: 'Departments — Cedarview Halal Grocery & Butcher, Kitchener',
    description: 'Butcher counter, produce, bakery, dairy, pantry and frozen. What each department carries and what to come in for.',
    ogImage: '/og/default.png',
    breadcrumb: 'Departments',
  },
  order: {
    title: 'Order Ahead — Cedarview Halal Grocery & Butcher',
    description: 'Pre-order from the butcher counter: pick the cut, say the weight, choose a pickup window. Paid online, cut the morning you collect it.',
    ogImage: '/og/default.png',
    breadcrumb: 'Order Ahead',
  },
  specials: {
    title: 'Weekly Specials — Cedarview Halal Grocery & Butcher',
    description: 'This week at Cedarview: lamb shoulder, whole chicken, Ontario tomatoes, basmati, labneh and Medjool dates. Prices good through Sunday.',
    ogImage: '/og/default.png',
    breadcrumb: 'Weekly Specials',
  },
  contact: {
    title: 'Contact & Hours — Cedarview Halal Grocery & Butcher, Kitchener',
    description: 'Address, phone, hours and parking for Cedarview on Cedarview Road, Kitchener. Open 8am to 9pm, every day.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Kitchener · Halal · Open every day',
  heroTitle: 'The butcher cuts it the morning you collect it',
  heroBody: 'A full grocery with a real butcher counter behind it. Order ahead and it is trimmed, weighed and wrapped before you arrive.',
  heroPrimaryCta: 'Order from the counter',
  heroSecondaryCta: 'This week’s specials',
  heroPhoto: {
    file: 'hero-counter',
    subject: 'Butcher counter along the back wall, cases full, butcher in white mid-cut, bright shop light',
    alt: 'The butcher counter at Cedarview with a butcher working behind the case',
  },
  butcherHeading: 'Two butchers, no trays',
  butcherBody: 'Everything is cut to order. Tell us the thickness, how much fat to leave, whether you want it on the bone. Nothing is portioned in advance and left to sit.',
  butcherPoints: [
    'Certified halal, sourced from Ontario abattoirs',
    'Bulk and freezer orders with a day’s notice',
    'Kofta, kebab and marinades mixed in-house',
  ],
  butcherCta: 'See the cuts and prices',
  departmentsHeading: 'What is in the shop',
  departmentsCta: 'All departments',
  specialsHeading: 'On special this week',
  specialsCta: 'All of this week’s specials',
  orderHeading: 'Order ahead from the counter',
  orderBody: 'Pick a cut, give us a weight and a pickup window. Pay online and it is ready when you walk in.',
  orderCta: 'Start an order',
  findHeading: 'Where to find us',
  findBody: 'On Cedarview Road at the Fischer-Hallman end, in the plaza with the pharmacy. Parking out front.',
  findCta: 'Hours and directions',
};

export const departmentsPage = {
  eyebrow: 'Departments',
  heading: 'Six counters, one shop',
  intro: 'Everything below is under one roof, and the butcher counter runs the length of the back wall.',
  highlightsLabel: 'Come in for',
  orderCta: 'Order from the butcher',
};

export const orderPage = {
  eyebrow: 'Order Ahead',
  heading: 'Pre-order from the butcher counter',
  intro: 'The counter is busiest on a Friday afternoon. Ordering ahead means it is cut, weighed and wrapped with your name on it.',
  embedLabel: 'Clover Online Store — embeds here',
  embedNote: 'This is the slot the live store and butcher pre-order sit in.',
  howHeading: 'How a pre-order works',
  howSteps: [
    { title: 'Pick the cut', detail: 'Everything on the counter list below is orderable, plus anything you can describe.' },
    { title: 'Give us a weight', detail: 'Order by the kilo. We cut as close as we can and charge the actual weight, never more.' },
    { title: 'Choose a window', detail: 'Two-hour windows through the day. Friday afternoons fill first.' },
    { title: 'Pay online, collect at the counter', detail: 'Any difference on the weight is settled at the till, in your favour if we cut under.' },
  ],
  explainerHeading: 'It runs on the Clover account you already have',
  explainerBody: 'The store syncs to the same inventory the tills use, and checkout settles to the existing Clover merchant account. Stock and sales stay in one place, with no second gateway and no extra processing fees.',
  windowsHeading: 'Pickup windows',
  windows: ['9am – 11am', '11am – 1pm', '1pm – 3pm', '3pm – 5pm', '5pm – 7pm'],
  windowsNote: 'Same-day orders need three hours. Anything over ten kilos, give us a day.',
  cutsHeading: 'On the counter',
  cutsNote: 'Priced per kilogram. Prices move with the market — the store shows the current figure.',
  perKgLabel: '/kg',
  filterLabel: 'Filter by',
  filterAll: 'Everything',
};

export const specialsPage = {
  eyebrow: 'Weekly Specials',
  heading: 'This week at Cedarview',
  weekLabel: 'Week of',
  throughLabel: 'through',
  wasLabel: 'was',
  saveLabel: 'Save',
  orderCta: 'Order the meat ahead',
  printNote: 'Print this and bring it in if that is easier.',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Cedarview Road, Kitchener',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'The butcher counter closes thirty minutes before the shop does.',
  hoursTable: { day: 'Day', open: 'Open' },
  gettingHereHeading: 'Parking and getting here',
  gettingHere: [
    { title: 'Parking', detail: 'Free plaza lot out front, forty spaces. Busiest between four and six.' },
    { title: 'Bus', detail: 'GRT routes along Fischer-Hallman stop at the plaza entrance.' },
    { title: 'Deliveries', detail: 'Trade and case orders load at the rear door off the service lane.' },
  ],
  mapLabel: 'Map — 830 Cedarview Road, Kitchener',
  orderCta: 'Order ahead instead',
};

export const cutKinds = (): string[] => [...new Set(cuts.map((cut) => cut.kind))];

export const formatMoney = (value: number): string =>
  value % 1 === 0 ? `${value}` : value.toFixed(2);
