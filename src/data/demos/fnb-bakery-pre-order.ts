// Almond & Rye Bakery — the sample site for the F&B Bakery / Pre-Order
// playbook, and the twentieth and last demo in the catalogue. A fictional
// neighbourhood bakery in Ottawa; nothing here is a real business, and the
// demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, E-Commerce, Analytics, Domain.
// Deliberately absent: CMS, CRM and booking.
//
// ── THE SECOND BAKERY, AND WHY THAT IS USEFUL ────────────────────────────
// Vernon Street Bakehouse is also a bakery, also on the `restaurants`
// vertical, and sits two tiers up. Opening the two side by side is the
// clearest tier comparison in the whole catalogue:
//
//   · Vernon Street — Standard, $2,650. Two audiences (retail and wholesale),
//     CMS on the catalogue and the cake collection, an account application.
//     Paper white, ink blue, letterpress.
//   · Almond & Rye — Starter, $1,850. One audience. No CMS: fourteen items on
//     a board that changes twice a year, edited in code. Warm white, wheat,
//     one berry. Soft where the other one is precise.
//
// Same trade, different problem, different money. That is the pitch.
//
// ── TWO MECHANISMS, ONE OF WHICH IS DELIBERATELY NOT A CART ──────────────
//   · Pre-order runs through the Clover Online Ordering slot, framed around
//     pickup windows and lead times rather than around a basket, because what
//     a bakery is really selling ahead is a time.
//   · Custom cakes are an ENQUIRY, not a checkout. A cake gets quoted — the
//     servings, the flavour and the decoration move the price — so putting it
//     behind a cart would be selling something nobody has priced yet.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type MenuLine = 'pastry' | 'bread' | 'sweet' | 'pantry';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  line: MenuLine;
  /** CAD */
  price: number;
  /** what a unit is, as written on the board */
  unit: string;
  /** true where the item is pre-order only — the hook that ties the menu to
   *  the pre-order page */
  preOrderOnly?: boolean;
  /** bakes on these days only; omit for every open day */
  bakedOn?: string;
  dietary?: ('V' | 'VG')[];
}

export interface PickupWindow {
  id: string;
  time: string;
  note: string;
}

export interface CakeSize {
  size: string;
  serves: string;
  from: number;
  to: number;
}

export interface BakeryDay {
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

/** Warm white, wheat, one berry. Generous corners and a soft serif — the
 *  opposite register to Vernon Street's paper-white letterpress, on purpose. */
export const theme: DemoTheme = {
  ink: '#FCF7EC',
  inkRaised: '#F4EADA',
  inkLine: '#E3D5BE',
  /** berry band */
  paper: '#7A2B4A',
  paperRaised: '#8A3355',
  paperLine: '#9C4767',
  /** berry on warm white (6.5:1) */
  accent: '#A32B54',
  /** wheat on the berry band (6.4:1) */
  accentOnPaper: '#EFD3A8',
  onInk: '#2B211C',
  onInkDim: 'rgba(43, 33, 28, 0.72)',
  onPaper: '#FDF6F0',
  onPaperDim: 'rgba(253, 246, 240, 0.80)',
  onAccent: '#FFFFFF',
  displayFont: '"Petrona", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Nunito Sans", "Segoe UI", system-ui, sans-serif',
  radius: '10px',
  leading: '1.66',
};

export const fonts = [
  { family: 'Petrona', file: 'petrona-latin-var.woff2', weight: '400 600' },
  { family: 'Nunito Sans', file: 'nunito-sans-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Almond & Rye Bakery',
  shortName: 'Almond & Rye',
  positioning: 'A small bakery on Beechwood. Morning pastry, sourdough by pre-order, cakes to order.',
  address: {
    street: '212 Beechwood Avenue',
    neighbourhood: 'New Edinburgh',
    city: 'Ottawa',
    region: 'ON',
    postalCode: 'K1L 8A6',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(613) 555-0148',
  phoneHref: 'tel:+16135550148',
  email: 'hello@almondandrye.ca',
  emailHref: 'mailto:hello@almondandrye.ca',
};

export const hours: BakeryDay[] = [
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '07:30', close: '15:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '07:30', close: '15:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '07:30', close: '16:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '07:30', close: '16:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '15:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '08:00', close: '14:00' },
];

export const menuLines: { id: MenuLine; name: string; blurb: string }[] = [
  {
    id: 'pastry',
    name: 'Morning pastry',
    blurb: 'Laminated the day before, baked from six. Out at 7:30 and mostly gone by eleven on a Saturday.',
  },
  {
    id: 'bread',
    name: 'Bread',
    blurb: 'One starter, kept since the shop opened. Loaves are pre-order — see below for why.',
  },
  {
    id: 'sweet',
    name: 'Sweet things',
    blurb: 'Made in small numbers in the afternoon for the next morning. When the tray is empty that is the day.',
  },
  {
    id: 'pantry',
    name: 'Pantry',
    blurb: 'The things people ask for at the till, on a shelf by the door.',
  },
];

export const menu: MenuItem[] = [
  { id: 'croissant', name: 'Butter Croissant', description: 'Three folds, proofed overnight, baked at six. The one everything else is judged against.', line: 'pastry', price: 4.75, unit: 'Each', dietary: ['V'] },
  { id: 'pain-au-chocolat', name: 'Pain au Chocolat', description: 'Two batons of dark couverture. Ask for it warm before ten and it will be.', line: 'pastry', price: 5.25, unit: 'Each', dietary: ['V'] },
  { id: 'almond-croissant', name: 'Almond Croissant', description: 'Yesterday’s croissant, syrup, frangipane, baked again. The shop is half named after it.', line: 'pastry', price: 5.75, unit: 'Each', dietary: ['V'] },
  { id: 'morning-bun', name: 'Cinnamon Morning Bun', description: 'Laminated and rolled in cinnamon sugar. Twenty a day, weekends only.', line: 'pastry', price: 5, unit: 'Each', bakedOn: 'Saturday and Sunday', dietary: ['V'] },
  { id: 'danish', name: 'Seasonal Danish', description: 'Whatever the fruit is doing. Rhubarb in May, plum in September, apple when it is neither.', line: 'pastry', price: 5.5, unit: 'Each', dietary: ['V'] },
  { id: 'country-loaf', name: 'Country Loaf', description: 'Ontario hard red wheat, 20% whole grain, a 24-hour cold ferment. Pre-order by 4:00 pm the day before.', line: 'bread', price: 8.5, unit: '900 g loaf', preOrderOnly: true, dietary: ['VG'] },
  { id: 'rye', name: 'Dark Rye', description: 'Caraway, molasses, a dense crumb that keeps a week. Better on day three than day one.', line: 'bread', price: 9.5, unit: '800 g loaf', preOrderOnly: true, dietary: ['VG'] },
  { id: 'seeded', name: 'Seeded Sourdough', description: 'Sunflower, flax and sesame through the dough and on the crust.', line: 'bread', price: 9.75, unit: '900 g loaf', preOrderOnly: true, dietary: ['VG'] },
  { id: 'baguette', name: 'Baguette', description: 'Poolish, shaped by hand, baked twice a day. Walk in for this one — it does not keep.', line: 'bread', price: 4.5, unit: 'Each', dietary: ['VG'] },
  { id: 'canele', name: 'Canelé', description: 'Copper moulds and beeswax, two days of rest before baking. Twelve at a time.', line: 'sweet', price: 4.5, unit: 'Each', bakedOn: 'Friday to Sunday', dietary: ['V'] },
  { id: 'cake-slice', name: 'Cake by the Slice', description: 'Cut from whatever cake is on. Which one depends on the day and on us.', line: 'sweet', price: 7, unit: 'Slice', dietary: ['V'] },
  { id: 'cookie', name: 'Rye Chocolate Cookie', description: 'Dark rye flour and 70% chocolate, salt on top. Sold warm at three most afternoons.', line: 'sweet', price: 4.25, unit: 'Each', dietary: ['V'] },
  { id: 'starter', name: 'Starter, Fed and Ready', description: 'A jar of the culture with a page of instructions. Come back and tell us how it went.', line: 'pantry', price: 6, unit: '250 g jar', dietary: ['VG'] },
  { id: 'jam', name: 'Small-Batch Jam', description: 'Made in the afternoon from whatever the market had. Usually three or four kinds.', line: 'pantry', price: 11, unit: '250 ml jar', dietary: ['VG'] },
];

export const dietaryLegend: { marker: 'V' | 'VG'; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan as made' },
];

/** The pickup windows. On a bakery pre-order what is being sold ahead is a
 *  TIME, not a basket, which is how the Clover slot is framed. */
export const pickupWindows: PickupWindow[] = [
  { id: 'early', time: '8:00 – 10:00', note: 'Everything is out and warm. The busiest window and the best one.' },
  { id: 'mid', time: '10:00 – 12:00', note: 'Quieter. Pastry is still good; the morning buns are usually gone.' },
  { id: 'late', time: '12:00 – 14:00', note: 'Bread and cake only. We will not hold pastry this long and pretend it is fresh.' },
];

export const leadTimes: { item: string; notice: string; cutOff: string }[] = [
  { item: 'Bread', notice: '24 hours', cutOff: 'Order by 4:00 pm the day before' },
  { item: 'Pastry box (6 or 12)', notice: '24 hours', cutOff: 'Order by 4:00 pm the day before' },
  { item: 'Whole cake from the case', notice: '48 hours', cutOff: 'Order by 4:00 pm, two days before' },
  { item: 'Custom celebration cake', notice: '72 hours', cutOff: 'Enquiry first — it is quoted, not ordered' },
];

export const cakeSizes: CakeSize[] = [
  { size: '6 inch', serves: '8 to 10', from: 58, to: 78 },
  { size: '8 inch', serves: '14 to 18', from: 82, to: 116 },
  { size: '10 inch', serves: '24 to 30', from: 118, to: 168 },
  { size: 'Two tier', serves: '40 to 55', from: 240, to: 380 },
];

export const cakeFlavours: string[] = [
  'Vanilla and raspberry',
  'Chocolate and rye',
  'Lemon and poppy seed',
  'Carrot and cream cheese',
  'Almond and cherry',
  'Coffee and walnut',
];

const BASE = '/industries/restaurants/preview/fnb-bakery-pre-order/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}menu`, label: 'Daily Menu' },
    { href: `${BASE}pre-order`, label: 'Pre-Order' },
    { href: `${BASE}cakes`, label: 'Custom Cakes' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}pre-order`, label: 'Pre-order', event: 'order_cta_nav' },
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
  tagline: 'A small bakery on Beechwood Avenue. Closed Monday, and out of croissants by eleven on a Saturday.',
  rowsHeading: 'Open',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Almond & Rye Bakery. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'menu' | 'preOrder' | 'cakes' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Almond & Rye Bakery — Beechwood Avenue, Ottawa',
    description:
      'A small bakery in New Edinburgh, Ottawa. Morning pastry from 7:30, sourdough by pre-order, and custom celebration cakes with 72 hours’ notice.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  menu: {
    title: 'Daily Menu — Almond & Rye Bakery, Ottawa',
    description:
      'Fourteen things with prices: morning pastry, sourdough, sweet things and pantry. Which items are pre-order only and which you can walk in for.',
    ogImage: '/og/default.png',
    breadcrumb: 'Daily Menu',
  },
  preOrder: {
    title: 'Pre-Order — Almond & Rye Bakery, Ottawa',
    description:
      'Order bread and pastry boxes ahead, choose a pickup window and collect. Lead times and cut-offs for every item, and what we will not hold.',
    ogImage: '/og/default.png',
    breadcrumb: 'Pre-Order',
  },
  cakes: {
    title: 'Custom Celebration Cakes — Almond & Rye Bakery, Ottawa',
    description:
      'Custom cakes from 6 inch to two tier, six flavours, 72 hours’ notice. Sizes, servings and price ranges in CAD, and an enquiry rather than a checkout.',
    ogImage: '/og/default.png',
    breadcrumb: 'Custom Cakes',
  },
  contact: {
    title: 'Contact and Hours — Almond & Rye Bakery, Ottawa',
    description:
      'Opening hours, address and parking for 212 Beechwood Avenue, New Edinburgh, Ottawa. Closed Monday.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Beechwood Avenue, Ottawa',
  heroTitle: 'Out at half seven, gone by eleven',
  heroBody:
    'A small bakery that makes a small amount of everything. Walk in for pastry, order the bread ahead, and give us three days for a cake.',
  heroPrimaryCta: 'Pre-order',
  heroSecondaryCta: 'Today’s menu',
  heroPhoto: {
    file: 'hero-counter',
    subject:
      'Close crop of a bakery counter at opening — croissants in a wooden tray, a loaf on a board, morning light across flour dust',
    alt: 'The counter at Almond & Rye first thing in the morning',
  },

  threeHeading: 'Three ways to get something',
  three: [
    {
      id: 'walk-in',
      title: 'Walk in',
      body: 'Pastry, baguette, cake by the slice. From 7:30, Tuesday to Sunday, until it runs out.',
      note: 'No notice needed',
      href: 'menu',
      cta: 'What is on today',
    },
    {
      id: 'pre-order',
      title: 'Pre-order',
      body: 'Bread and pastry boxes, ordered ahead and collected in a window you choose.',
      note: '24 hours’ notice',
      href: 'preOrder',
      cta: 'How pre-order works',
    },
    {
      id: 'custom',
      title: 'A cake made for you',
      body: 'Six flavours, four sizes, and a conversation about what it is for.',
      note: '72 hours’ notice',
      href: 'cakes',
      cta: 'Custom cakes',
    },
  ],

  breadHeading: 'Why the bread is pre-order',
  breadBody:
    'Because a sourdough loaf takes twenty-four hours and we would rather bake what is spoken for than throw away what is not. Order by four in the afternoon and it is on the shelf with your name on it the next morning.',
  breadCta: 'Pre-order bread',

  menuHeading: 'On the board',
  menuBody: 'Fourteen things. It changes twice a year and not on a Tuesday.',
  menuCta: 'The full menu',

  closerHeading: 'Come in',
  closerBody: 'On Beechwood, past the bridge. Closed Monday, and the good stuff goes early.',
  closerCta: 'Hours and directions',
};

export const menuPage = {
  eyebrow: 'Daily Menu',
  heading: 'Fourteen things',
  intro:
    'Everything with a price. The loaves are marked pre-order — that is not a policy to be difficult, it is on the pre-order page and it takes a minute.',
  legendLabel: 'Dietary markers',
  unitLabel: 'Sold as',
  bakedLabel: 'Baked',
  preOrderTag: 'Pre-order only',
  preOrderNote:
    'Three of the four loaves are pre-order. The baguette is not, because it does not keep and we bake it twice a day anyway.',
  soldOutHeading: 'When it is gone',
  soldOutBody:
    'It is gone. We do not bake a second batch of croissants at noon to catch the people who missed the first, because a croissant baked at noon is a worse croissant. Pre-ordering is how you stop losing that race.',
  preOrderCta: 'Pre-order instead',
};

export const preOrderPage = {
  eyebrow: 'Pre-Order',
  heading: 'Order ahead, pick a window, collect',
  intro:
    'What you are really booking is a time. Choose the window, and the bag is on the shelf behind the till with your name on it.',
  embedHeading: 'Place a pre-order',
  embedLabel: 'Clover Online Ordering — embeds here',
  embedNote: 'This is the slot the live ordering system sits in.',
  embedBody:
    'Pre-orders and payment run through the bakery’s existing Clover merchant account, so the till and the website share one product list. No second gateway and no extra processing fees, and when the last seeded loaf is spoken for it comes off the website by itself.',
  windowsHeading: 'Pickup windows',
  windowsNote: 'Pick one when you order. We hold to the end of the window and then we ring you.',
  leadHeading: 'Lead times and cut-offs',
  leadItemLabel: 'Item',
  leadNoticeLabel: 'Notice',
  leadCutOffLabel: 'Cut-off',
  honestHeading: 'What we will not do',
  honest: [
    'Hold pastry past two o’clock and call it fresh.',
    'Take a bread order after four for the next morning — the dough is already shaped.',
    'Deliver. There is one of us on the counter and it would be the whole morning.',
    'Take a custom cake through the pre-order system. Those are quoted, and there is a form for it.',
  ],
  cakesCta: 'Custom cakes',
  closerHeading: 'Missed the cut-off?',
  closerBody: 'Ring the shop. If the dough is not shaped yet somebody will say yes, and if it is they will say so.',
};

export const cakesPage = {
  eyebrow: 'Custom Cakes',
  heading: 'Cakes made for the thing they are for',
  intro:
    'Seventy-two hours’ notice, six flavours and four sizes. This is an enquiry rather than a checkout, because the servings, the flavour and the decoration all move the price and none of them are decided yet.',
  sizesHeading: 'Sizes and price ranges',
  sizesNote:
    'The bottom of each range is a plain finish and the top is a decorated one. The quote comes back inside a business day and is the real number.',
  servesLabel: 'Serves',
  fromLabel: 'From',
  toLabel: 'to',
  flavoursHeading: 'Flavours',
  flavoursNote: 'These six, all year. We will do a flavour we already make in a different size, and we will not invent one for a Saturday.',
  allergenHeading: 'About allergens',
  allergenBody:
    'One small kitchen, with wheat, egg, dairy, nuts and sesame in it every day and on the same surfaces. We will tell you exactly what is in a cake and talk any requirement through honestly, and we will not call anything allergen-free, because in this room it would not be true.',
  notHeading: 'What we do not do',
  notBody:
    'Sculpted cakes, printed images, fondant figures and tiered cakes above two tiers. There are people in Ottawa who do that properly and we will give you a name rather than do it badly.',
  formHeading: 'Tell us about it',
  formIntro: 'Five questions and a photo if you have one. A quote comes back inside one business day.',
  requiredNote: 'Everything except the photo and the note is required.',
  submitLabel: 'Send the enquiry',
  errorSummaryHeading: 'Check these fields',
  fields: {
    occasion: {
      label: 'Occasion',
      options: ['Birthday', 'Wedding or engagement', 'Anniversary', 'Baby shower', 'Work or celebration', 'Something else'],
      error: 'Choose the closest occasion.',
    },
    servings: {
      label: 'Servings',
      hint: 'Roughly how many people. It sets the size.',
      options: ['8 to 10', '14 to 18', '24 to 30', '40 to 55', 'Not sure yet'],
      error: 'A rough number of servings.',
    },
    flavour: {
      label: 'Flavour',
      hint: 'Or the last option, and we will talk about it.',
      /** appended after the six flavours, so the select is built from
       *  `cakeFlavours` plus one string and nothing is typed into markup */
      undecided: 'Not decided yet',
      error: 'Choose a flavour, or the last option.',
    },
    date: {
      label: 'Date you need it',
      hint: 'Seventy-two hours’ notice minimum. Saturdays go about three weeks out.',
      error: 'A date, at least three days away.',
    },
    photo: {
      label: 'Reference photo',
      hint: 'One picture of something you like. It is a reference, not a brief — we will not copy it exactly and would rather not.',
      buttonLabel: 'Choose a photo',
      noneLabel: 'No photo chosen',
      chosenLabel: 'chosen',
    },
    name: { label: 'Your name', error: 'A name for the order.' },
    email: { label: 'Email', hint: 'The quote comes here.', error: 'A valid email for the quote.' },
    phone: { label: 'Phone', hint: 'Optional, but faster if the date is close.' },
    notes: { label: 'Anything else', hint: 'A message on the cake, a dietary requirement, a colour somebody hates.' },
  },
  confirmation: {
    heading: 'Enquiry sent',
    body:
      'Somebody reads this between the morning bake and lunch. A quote comes back inside one business day, and the date is held once you say yes to it.',
    detailsHeading: 'What you sent',
    photoRow: 'Reference photo',
    note: 'Nothing is booked or charged by this. A 50% deposit takes the date, and it is taken at the counter or over the phone.',
    resetLabel: 'Send another enquiry',
    callLabel: 'Or ring the shop',
  },
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: '212 Beechwood Avenue',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Opening hours',
  hoursNote: 'Closed Monday. Sunday is short, and Saturday morning is the busiest hour of the week.',
  hoursTable: { day: 'Day', open: 'Open' },
  visitHeading: 'Getting here',
  visit: [
    { title: 'Parking', detail: 'Street parking on Beechwood, two hours, free. The lot behind belongs to the dentist and they do tow.' },
    { title: 'Accessibility', detail: 'Level entry, and there is room for a pram or a chair between the counter and the window seats.' },
    { title: 'Collection', detail: 'Pre-orders are on the shelf behind the till. Give the name — no need to queue at the case.' },
  ],
  mapLabel: 'Map — 212 Beechwood Avenue, Ottawa',
  preOrderCta: 'Pre-order',
};

export const itemsIn = (line: MenuLine): MenuItem[] => menu.filter((item) => item.line === line);

export const preOrderItems = (): MenuItem[] => menu.filter((item) => item.preOrderOnly);

export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
