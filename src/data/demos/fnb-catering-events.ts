// Saffron Table Catering — the sample site for the F&B Catering & Events
// playbook. A fictional takeout counter and catering kitchen in Markham,
// Ontario; nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, E-Commerce, Analytics, Booking, Domain.
// Deliberately absent: CMS and CRM.
//
// ── TWO PATHS, TWO MECHANISMS ────────────────────────────────────────────
// This is the second demo in the catalogue with two audiences, and unlike
// Vernon Street the two paths do not just get different pages — they get
// different machinery:
//
//   · Takeout is a transaction. It runs through the Clover Online Ordering
//     slot, prices are per item, and nobody has to talk to anybody.
//   · Catering is a conversation. It runs through a four-step consultation
//     booking, prices are per head with a minimum, and the point of the form
//     is to arrive at the call already knowing the date and the headcount.
//
// A catering enquiry is not a checkout and a $14 lunch is not a consultation.
// Building both correctly is the whole argument for this tier.
//
// Sixth demo on the `restaurants` vertical, and the switcher is getting
// crowded, so this one leans hard on its own register: a deep toasted-spice
// base where every other restaurant demo is either near-black, off-white or
// poster yellow, with gold hairlines instead of grey ones.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type MenuLine = 'mains' | 'grill' | 'sides' | 'sweets';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  line: MenuLine;
  /** CAD, counter price */
  price: number;
  /** what a portion is, in the words on the counter card */
  portion: string;
  dietary?: ('V' | 'VG' | 'GF')[];
}

export interface CateringPackage {
  id: string;
  name: string;
  summary: string;
  /** CAD per head */
  perHead: number;
  minimum: number;
  serviceStyle: string;
  leadTime: string;
  includes: string[];
}

export interface TraySize {
  size: string;
  serves: string;
  note: string;
}

export interface CounterDay {
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

/** Deep toasted spice, cream, and one gold that runs from a bright tone on the
 *  dark base to a bronze on the cream band. Hairlines are gold rather than
 *  grey, which is most of what makes the page feel warm rather than dim. */
export const theme: DemoTheme = {
  ink: '#33200F',
  inkRaised: '#402913',
  /** gold hairline, not a grey rule */
  inkLine: '#6B4A1E',
  /** cream band */
  paper: '#F6EBD7',
  paperRaised: '#EFE0C6',
  paperLine: '#D9C39A',
  /** gold on the spice base (6.9:1) */
  accent: '#D9A441',
  /** bronze on the cream band (6.2:1) */
  accentOnPaper: '#7A4A0C',
  onInk: '#F7EEE0',
  onInkDim: 'rgba(247, 238, 224, 0.78)',
  onPaper: '#2E1E0D',
  onPaperDim: 'rgba(46, 30, 13, 0.76)',
  onAccent: '#2A1A08',
  displayFont: '"Eczar", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Mulish", "Segoe UI", system-ui, sans-serif',
  radius: '6px',
};

export const fonts = [
  { family: 'Eczar', file: 'eczar-latin-var.woff2', weight: '400 700' },
  { family: 'Mulish', file: 'mulish-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Saffron Table Catering',
  shortName: 'Saffron Table',
  positioning: 'Takeout counter and full-service catering in Markham. Ten covers to two hundred.',
  address: {
    street: 'Unit 5, 7220 Kennedy Road',
    city: 'Markham',
    region: 'ON',
    postalCode: 'L3R 5T2',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0157',
  phoneHref: 'tel:+19055550157',
  email: 'hello@saffrontable.ca',
  emailHref: 'mailto:hello@saffrontable.ca',
};

/** Catering has its own desk. A Saturday counter phone is not where a
 *  wedding enquiry should land. */
export const cateringContact = {
  name: 'Catering desk',
  phone: '(905) 555-0158',
  phoneHref: 'tel:+19055550158',
  email: 'catering@saffrontable.ca',
  emailHref: 'mailto:catering@saffrontable.ca',
};

export const counterHours: CounterDay[] = [
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '11:00', close: '20:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '11:00', close: '20:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '11:00', close: '21:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '11:00', close: '21:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '11:00', close: '21:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '12:00', close: '19:00' },
];

/** Also the schema areaServed for the CateringService. */
export const serviceArea: string[] = [
  'Markham',
  'Richmond Hill',
  'Scarborough',
  'North York',
  'Vaughan',
  'Pickering',
  'Stouffville',
];

export const menuLines: { id: MenuLine; name: string; blurb: string }[] = [
  {
    id: 'mains',
    name: 'From the pot',
    blurb: 'Cooked in the morning in quantity, which is the only way any of it tastes like it should.',
  },
  {
    id: 'grill',
    name: 'From the grill',
    blurb: 'Marinated overnight, cooked to order. Add ten minutes at seven on a Friday.',
  },
  {
    id: 'sides',
    name: 'Rice, breads and sides',
    blurb: 'Breads come out of the oven every twenty minutes until we stop taking orders.',
  },
  {
    id: 'sweets',
    name: 'Sweets',
    blurb: 'Made here on a Wednesday and a Saturday. When the tray is empty that is the week done.',
  },
];

export const menu: MenuItem[] = [
  { id: 'butter-chicken', name: 'Butter Chicken', description: 'Tomato and cashew, finished with cream. The one that pays for everything else on this list.', line: 'mains', price: 17.5, portion: 'Single, with rice', dietary: ['GF'] },
  { id: 'lamb-rogan', name: 'Lamb Rogan Josh', description: 'Shoulder, four hours, Kashmiri chilli for colour rather than heat.', line: 'mains', price: 19.5, portion: 'Single, with rice', dietary: ['GF'] },
  { id: 'chana-masala', name: 'Chana Masala', description: 'Chickpea, tomato, amchur. Cooked without ghee, so it is genuinely vegan and not vegan-adjacent.', line: 'mains', price: 14.5, portion: 'Single, with rice', dietary: ['VG', 'GF'] },
  { id: 'saag-paneer', name: 'Saag Paneer', description: 'Spinach and mustard greens, paneer made in-house on Tuesday and Friday.', line: 'mains', price: 16, portion: 'Single, with rice', dietary: ['V', 'GF'] },
  { id: 'goat-curry', name: 'Goat Curry', description: 'On the bone, slow, and worth the awkwardness of eating it. Sundays and Thursdays.', line: 'mains', price: 21, portion: 'Single, with rice', dietary: ['GF'] },
  { id: 'biryani', name: 'Chicken Biryani', description: 'Layered and sealed, opened at the counter. Comes with raita, not without.', line: 'mains', price: 18.5, portion: 'Single portion', dietary: ['GF'] },
  { id: 'seekh-kebab', name: 'Seekh Kebab', description: 'Lamb, hand-minced, on the skewer. Three to a portion with onion and lime.', line: 'grill', price: 15, portion: 'Three skewers', dietary: ['GF'] },
  { id: 'chicken-tikka', name: 'Chicken Tikka', description: 'Yoghurt and hung curd overnight. Thigh meat, because breast dries out over coals.', line: 'grill', price: 16.5, portion: 'Six pieces', dietary: ['GF'] },
  { id: 'paneer-tikka', name: 'Paneer Tikka', description: 'Our own paneer, capsicum and onion, same marinade and same grill.', line: 'grill', price: 15, portion: 'Six pieces', dietary: ['V', 'GF'] },
  { id: 'fish-tikka', name: 'Fish Tikka', description: 'Basa, ajwain and gram flour. Fridays and Saturdays only, and it sells out.', line: 'grill', price: 18, portion: 'Four pieces', dietary: ['GF'] },
  { id: 'basmati', name: 'Basmati Rice', description: 'Plain, drained not steamed. The default with every main above.', line: 'sides', price: 4.5, portion: 'Single', dietary: ['VG', 'GF'] },
  { id: 'naan', name: 'Naan', description: 'Plain, garlic or butter. Out of the oven every twenty minutes.', line: 'sides', price: 3.5, portion: 'Each', dietary: ['V'] },
  { id: 'roti', name: 'Tandoori Roti', description: 'Whole wheat, no fat brushed on unless you ask for it.', line: 'sides', price: 3, portion: 'Each', dietary: ['VG'] },
  { id: 'raita', name: 'Cucumber Raita', description: 'Yoghurt, cucumber, cumin. Order it with anything that came off the grill.', line: 'sides', price: 4, portion: '250 ml', dietary: ['V', 'GF'] },
  { id: 'gulab-jamun', name: 'Gulab Jamun', description: 'Two, warm, in syrup. Made Wednesday and Saturday.', line: 'sweets', price: 5.5, portion: 'Two pieces', dietary: ['V'] },
  { id: 'kheer', name: 'Kheer', description: 'Rice, milk, cardamom, an hour of stirring somebody else did.', line: 'sweets', price: 5, portion: '250 ml', dietary: ['V', 'GF'] },
];

export const dietaryLegend: { marker: 'V' | 'VG' | 'GF'; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan as made' },
  { marker: 'GF', label: 'No gluten ingredients' },
];

export const packages: CateringPackage[] = [
  {
    id: 'corporate-drop',
    name: 'Corporate Drop-off',
    summary:
      'Trays delivered to a boardroom, set on the sideboard, serving spoons and plates included. Nobody stays.',
    perHead: 22,
    minimum: 10,
    serviceStyle: 'Drop-off',
    leadTime: '48 hours',
    includes: [
      'Two mains, one vegetarian, in chafing trays with fuel',
      'Rice, bread and one side',
      'Plates, cutlery, napkins and serving utensils',
      'Delivered and set up within a 30-minute window',
      'Trays collected next business day, or bin them',
    ],
  },
  {
    id: 'home-trays',
    name: 'Home Event Trays',
    summary:
      'The same food, collected from the counter or delivered cold with heating instructions. For a house, not a hall.',
    perHead: 18,
    minimum: 12,
    serviceStyle: 'Collection or cold delivery',
    leadTime: '48 hours',
    includes: [
      'Choice of two mains and one grill item',
      'Rice and breads by the tray',
      'Heating instructions written for a domestic oven',
      'Disposable serving trays included',
      'Delivery inside the service area, or collect and save it',
    ],
  },
  {
    id: 'reception',
    name: 'Canapé Reception',
    summary:
      'Passed and stationed, for the hour before people sit down or the whole evening if they do not.',
    perHead: 34,
    minimum: 40,
    serviceStyle: 'Staffed, passed service',
    leadTime: '2 weeks',
    includes: [
      'Eight pieces per head across six kinds',
      'Two staff per fifty guests, two hours on site',
      'Stationed grill for tikka and kebabs',
      'Crockery, glassware and linen for the stations',
      'Full clear-down and everything taken away',
    ],
  },
  {
    id: 'buffet',
    name: 'Celebration Buffet',
    summary:
      'The wedding and the big birthday. A staffed buffet line with chafers, replenished until people stop going back.',
    perHead: 48,
    minimum: 60,
    serviceStyle: 'Staffed buffet',
    leadTime: '4 weeks',
    includes: [
      'Four mains including two vegetarian, plus grill',
      'Rice, four breads, sides, chutneys and salad',
      'Three staff per hundred guests for four hours',
      'Chafers, crockery, cutlery, glassware and linen',
      'Sweets table, and tea service at the end',
    ],
  },
  {
    id: 'plated',
    name: 'Full-Service Plated',
    summary:
      'Three courses to the table with a service team. The one that needs a kitchen or a room we can set up in.',
    perHead: 72,
    minimum: 50,
    serviceStyle: 'Staffed, plated to table',
    leadTime: '6 weeks',
    includes: [
      'Three courses, chosen at the tasting',
      'One server per twelve guests, plus a chef and a supervisor',
      'A tasting for two, deducted from the balance if you book',
      'Full crockery, glassware, cutlery and linen',
      'A site visit before the date, and a run sheet you keep',
    ],
  },
];

export const traySizes: TraySize[] = [
  { size: 'Small', serves: '10 to 12', note: 'One tray of a main. Fits a domestic oven shelf.' },
  { size: 'Medium', serves: '20 to 25', note: 'The standard boardroom tray. Two of these feed most offices.' },
  { size: 'Large', serves: '40 to 50', note: 'Needs two people to carry and a proper table to stand on.' },
];

const BASE = '/industries/restaurants/preview/fnb-catering-events/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}menu`, label: 'Takeout Menu' },
    { href: `${BASE}catering`, label: 'Catering' },
    { href: `${BASE}consultation`, label: 'Consultation' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}menu`, label: 'Order takeout', event: 'order_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/restaurants',
};

export const footer: DemoFooter = {
  tagline: 'A counter on Kennedy Road and a catering kitchen behind it. Markham and the north-east GTA.',
  rowsHeading: 'Counter hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Saffron Table Catering. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'menu' | 'catering' | 'consultation' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Saffron Table Catering — Takeout and Catering, Markham',
    description:
      'A takeout counter on Kennedy Road and a catering kitchen behind it. Corporate lunches, weddings and home events across Markham and the north-east GTA, from ten covers to two hundred.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  menu: {
    title: 'Takeout Menu — Saffron Table, Markham',
    description:
      'The counter menu with prices in CAD: curries, biryani, grill, breads and sweets. Order online for collection, or come to the counter Tuesday to Sunday.',
    ogImage: '/og/default.png',
    breadcrumb: 'Takeout Menu',
  },
  catering: {
    title: 'Catering Packages and Prices — Saffron Table, Markham',
    description:
      'Five catering packages priced per head with minimums, from a $22 corporate drop-off to $72 full-service plated. Tray sizes, staffing and lead times stated for each.',
    ogImage: '/og/default.png',
    breadcrumb: 'Catering Packages',
  },
  consultation: {
    title: 'Book a Consultation — Saffron Table Catering',
    description:
      'Four questions and a date. Tell us the event, the headcount, the service style and any dietary requirements, and we will come back within one business day.',
    ogImage: '/og/default.png',
    breadcrumb: 'Book a Consultation',
  },
  contact: {
    title: 'Contact and Hours — Saffron Table, Markham',
    description:
      'Counter hours, address and parking for Unit 5, 7220 Kennedy Road, Markham, plus the separate line and inbox for catering.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Kennedy Road, Markham',
  heroTitle: 'Lunch for one, or dinner for two hundred',
  heroBody:
    'The counter at the front and the catering kitchen behind it cook the same food from the same pots. One of them you order on a phone; the other one starts with a conversation.',
  heroPhoto: {
    file: 'hero-counter',
    subject:
      'Catering kitchen pass with chafing trays of curries and rice, steam rising, warm overhead light, cooks plating in the background',
    alt: 'The pass at Saffron Table with catering trays being filled',
  },
  forkHeading: 'Two ways in',
  fork: [
    {
      id: 'takeout',
      kicker: 'Tonight',
      title: 'Takeout',
      body:
        'Sixteen things, all priced, ready in twenty minutes. Order online for collection or ring the counter.',
      points: ['Prices on everything', 'Ready in about 20 minutes', 'Tuesday to Sunday'],
      cta: 'The takeout menu',
      href: 'menu',
    },
    {
      id: 'catering',
      kicker: 'A date in the diary',
      title: 'Catering',
      body:
        'Five packages, priced per head with a minimum. Corporate lunches, weddings and everything between.',
      points: ['From $18 a head, minimum 12', 'Drop-off to full service', '48 hours to 6 weeks’ notice'],
      cta: 'Packages and prices',
      href: 'catering',
    },
  ],
  rangeHeading: 'Ten to two hundred',
  rangeBody:
    'The same kitchen does a boardroom of twelve and a wedding of a hundred and eighty. What changes is the staffing and the notice, and both are on the packages page.',
  raysHeading: 'Tray sizes',
  areaHeading: 'Where we go',
  areaBody:
    'Seven municipalities. Outside them we will say no rather than send food an hour in a van and hope.',
  closerHeading: 'Have a date',
  closerBody:
    'The consultation form takes four questions and about a minute, and it means the call starts with the useful part.',
  closerCta: 'Book a consultation',
};

export const menuPage = {
  eyebrow: 'Takeout Menu',
  heading: 'The counter menu',
  intro:
    'Sixteen things, all of them priced. Order online for collection, or come in — there is usually a seat.',
  legendLabel: 'Dietary markers',
  portionLabel: 'Portion',
  embedHeading: 'Order for collection',
  embedLabel: 'Clover Online Ordering — embeds here',
  embedNote: 'This is the slot the live ordering system sits in.',
  embedBody:
    'Orders and payment run through the counter’s existing Clover merchant account, so the till and the website share one menu and one price list. No second gateway and no extra processing fees, and a sold-out fish tikka comes off the website by itself.',
  collectionHeading: 'How collection works',
  collection: [
    { title: 'About 20 minutes', detail: 'Longer between six and eight on a Friday. The confirmation gives you the real number.' },
    { title: 'Paid already', detail: 'Give the name at the counter. Nothing to settle when you get here.' },
    { title: 'Grill is cooked to order', detail: 'Everything from the pot is ready. Skewers start when the order lands.' },
  ],
  cateringAsideHeading: 'Feeding more than six?',
  cateringAsideBody:
    'Past about six people the counter menu stops being the right answer. Trays start at ten and are priced per head.',
  cateringAsideCta: 'Catering packages',
};

export const cateringPage = {
  eyebrow: 'Catering Packages',
  heading: 'Five packages, priced per head',
  intro:
    'Every price on this page is per person and every package has a minimum. Both are real numbers, not a starting point for a negotiation.',
  perHeadLabel: 'per head',
  minimumLabel: 'Minimum',
  styleLabel: 'Service',
  leadLabel: 'Notice',
  includesLabel: 'Included',
  traysHeading: 'Tray sizes',
  traysNote:
    'Drop-off and home packages are built from these. A small tray is one main for ten to twelve people.',
  servesLabel: 'Serves',
  dietaryHeading: 'Dietary requirements, honestly',
  dietaryBody:
    'Every package includes a vegetarian main as standard, and we cook vegan and gluten-free dishes to order. What we cannot do is call anything allergen-free: this is one kitchen, wheat, dairy, nuts and sesame are in it every day, and the same surfaces get used. We will talk any requirement through properly and tell you what we can guarantee and what we cannot.',
  depositHeading: 'Deposits and payment',
  depositBody:
    'A signed quote and a 25% deposit hold the date. The deposit is invoiced — nothing is charged through this website — and the balance is due seven days before the event.',
  depositTerms: [
    { label: 'Deposit', value: '25% on booking' },
    { label: 'Balance', value: '7 days before' },
    { label: 'Final numbers', value: '5 days before' },
    { label: 'Cancellation', value: 'Deposit held inside 14 days' },
  ],
  closerHeading: 'Start with the consultation',
  closerBody:
    'Four questions, one minute, and then a call that begins with the food rather than with the date.',
  closerCta: 'Book a consultation',
};

/** The booking flow. Four steps, matching the four things that decide whether
 *  we can do an event at all: what it is, when and how many, what has to be
 *  accommodated, and who to ring. */
export const consultationPage = {
  eyebrow: 'Book a Consultation',
  heading: 'Four questions, then a call',
  intro:
    'A consultation is a twenty-minute phone call, or a tasting if the event is plated. Nothing is booked and nothing is charged by this form.',
  stepLabel: 'Step',
  ofLabel: 'of',
  backLabel: 'Back',
  nextLabel: 'Continue',
  submitLabel: 'Request the consultation',
  errorSummaryHeading: 'Check these fields',
  steps: [
    { id: 'event', title: 'What is the event', hint: 'It decides which of the five packages we quote you.' },
    { id: 'when', title: 'When, and how many', hint: 'An approximate headcount is fine. The date matters more.' },
    { id: 'needs', title: 'What has to be accommodated', hint: 'Tick everything that applies. We will talk it through on the call.' },
    { id: 'contact', title: 'Who we are calling', hint: 'One person, one number. Nobody is added to a list.' },
  ],
  fields: {
    eventType: {
      label: 'Event type',
      options: ['Corporate lunch or meeting', 'Wedding', 'Birthday or celebration', 'Home event', 'Community or religious event', 'Something else'],
      error: 'Choose the closest event type.',
    },
    serviceStyle: {
      label: 'Service style',
      hint: 'If you are not sure, choose the last one — it is the most useful answer.',
      options: ['Drop-off trays', 'Collection from the counter', 'Staffed buffet', 'Canapé reception', 'Plated to table', 'Not sure yet'],
      error: 'Choose a style, or the last option.',
    },
    eventDate: {
      label: 'Event date',
      hint: 'Plated events need six weeks; drop-off needs forty-eight hours.',
      error: 'A date, even an approximate one.',
    },
    headcount: {
      label: 'Guests',
      hint: 'Between 10 and 200. Our minimum is 10 and our ceiling is 200.',
      error: 'A number between 10 and 200.',
    },
    budgetBand: {
      label: 'Budget per head',
      hint: 'Food only, before staffing and delivery.',
      options: ['Under $20', '$20 – $35', '$35 – $50', '$50 – $75', 'Over $75', 'Not sure yet'],
      error: 'A band, even a rough one.',
    },
    dietary: {
      label: 'Dietary requirements',
      hint: 'Tick what applies. We will discuss what we can and cannot guarantee.',
      options: ['Vegetarian', 'Vegan', 'Halal', 'No gluten', 'No nuts', 'No dairy', 'None of these'],
      error: 'Tick at least one, or tick the last option.',
    },
    name: { label: 'Your name', error: 'A name to address the reply to.' },
    email: { label: 'Email', error: 'A valid email, so the quote reaches you.' },
    phone: { label: 'Phone', hint: 'The consultation is a phone call, so this one is worth filling in.' },
    notes: { label: 'Anything else', hint: 'A venue, a kitchen we would be working in, a hard budget ceiling, a fixed finish time.' },
  },
  confirmation: {
    heading: 'Consultation requested',
    body:
      'The catering desk has it. You will hear back within one business day to arrange the call, and a written quote follows the call rather than replacing it.',
    detailsHeading: 'What you sent',
    note: 'Nothing is booked by this and nothing is charged. The date is held only once a quote is signed and a deposit is invoiced.',
    resetLabel: 'Send another request',
    callLabel: 'Or ring the catering desk',
  },
  sidebarHeading: 'What happens next',
  sidebarSteps: [
    { when: 'Within one business day', what: 'A call to arrange the consultation, at a time that suits you.' },
    { when: 'The consultation', what: 'Twenty minutes on the phone, or a tasting for two if the event is plated.' },
    { when: 'Two days after', what: 'A written quote, itemised, valid for thirty days.' },
    { when: 'On signing', what: 'A 25% deposit is invoiced and the date comes off the calendar.' },
  ],
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Unit 5, 7220 Kennedy Road',
  counterHeading: 'The counter',
  cateringHeading: 'Catering desk',
  addressHeading: 'Address',
  hoursHeading: 'Counter hours',
  hoursNote:
    'Closed Monday, which is when the kitchen preps for the week’s events. The catering desk answers weekdays regardless.',
  hoursTable: { day: 'Day', open: 'Open' },
  areaHeading: 'Service area',
  areaNote: 'Delivery and staffed service inside these seven. Further out we will refer you to somebody closer.',
  visitHeading: 'Getting here',
  visit: [
    { title: 'Parking', detail: 'The plaza lot in front, free. Do not use the loading bay at the back — the van needs it.' },
    { title: 'Collection', detail: 'Takeout and tray collection at the counter. Large trays are brought out on a cart.' },
    { title: 'Accessibility', detail: 'Level entry from the lot, and the counter has a lowered section at the left end.' },
  ],
  mapLabel: 'Map — 7220 Kennedy Road, Markham',
  consultationCta: 'Book a consultation',
};

export const itemsIn = (line: MenuLine): MenuItem[] => menu.filter((item) => item.line === line);

export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
