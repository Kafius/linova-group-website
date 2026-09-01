// Vernon Street Bakehouse — the sample site for the Retail Catalogue +
// Wholesale playbook. A fictional bakery in Cambridge, Ontario running two
// revenue lines; nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, E-Commerce, CMS, Analytics, Domain.
// Deliberately absent: CRM and booking.
//
// ── THE STRUCTURAL PROBLEM THIS BUILD SOLVES ─────────────────────────────
// Two audiences who want opposite things, and a homepage that has to send
// them different ways without either one wading through the other's content:
//
//   · A retail visitor wants a shop. They get the Clover Online Store slot,
//     the counter hours, and a catalogue with prices in dollars.
//   · A wholesale buyer wants terms. They get order deadlines, delivery days,
//     minimums, a price list and an account application.
//
// The two paths split at the top of the home page and never blend again.
// Every wholesale figure on this site is a case price or a lead time; every
// retail figure is a shelf price. Mixing them is how bakery sites lose both.
//
// The wholesale account application is a FORM, not a CRM. It validates and
// confirms, and on a live build it emails the wholesale manager. What the CRM
// line item would add — routing, ranking, a record that survives the inbox —
// is exactly what is missing here, and it is the upgrade conversation.
//
// Fifth demo on the `restaurants` vertical. The other four are two dark
// rooms, a grape cafe and a yellow poster; this one is paper white, flour
// beige and ink blue, set in a printed serif. It is the quiet one.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type ShelfCategory = 'sourdough' | 'viennoiserie' | 'pastry' | 'pantry';

export interface ShelfItem {
  id: string;
  name: string;
  description: string;
  /** CAD, retail shelf price */
  price: number;
  category: ShelfCategory;
  /** what it is sold as, in the words on the shelf label */
  unit: string;
  /** bakes on these days only; empty means every baking day */
  bakedOn?: string;
  dietary?: ('V' | 'VG')[];
}

export interface WholesaleLine {
  id: string;
  name: string;
  detail: string;
  /** how it ships — the thing a chef needs to know before the price */
  format: string;
  /** case size, not a price. Prices live on the list, which is a download. */
  caseSize: string;
}

export interface SeasonalCake {
  id: string;
  name: string;
  description: string;
  /** the season this cake is in the collection for */
  season: string;
  sizes: { size: string; serves: string; price: number }[];
  allergens: string[];
}

export interface BakeDay {
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

/** Paper white, flour beige, one ink blue. Sharp corners and hairline rules —
 *  the reference is a printed price list, not a website. */
export const theme: DemoTheme = {
  ink: '#FAF8F3',
  inkRaised: '#F0EBE0',
  inkLine: '#DDD5C6',
  /** ink blue band */
  paper: '#1B2A4A',
  paperRaised: '#243458',
  paperLine: '#3B4C74',
  /** ink blue on paper white (9.9:1) */
  accent: '#1F3D7A',
  /** warm cream on the blue band — cream ink on blue stock */
  accentOnPaper: '#E8D9B8',
  onInk: '#24201A',
  onInkDim: 'rgba(36, 32, 26, 0.74)',
  onPaper: '#F2EEE5',
  onPaperDim: 'rgba(242, 238, 229, 0.80)',
  onAccent: '#FFFFFF',
  displayFont: '"Spectral", "Iowan Old Style", Georgia, serif',
  bodyFont: '"DM Sans", "Segoe UI", system-ui, sans-serif',
  radius: '0',
};

export const fonts = [
  { family: 'Spectral', file: 'spectral-latin-400.woff2', weight: '400' },
  { family: 'Spectral', file: 'spectral-latin-600.woff2', weight: '600' },
  { family: 'DM Sans', file: 'dm-sans-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Vernon Street Bakehouse',
  shortName: 'Vernon Street',
  positioning: 'Sourdough, viennoiserie and cakes. Retail counter in Galt, wholesale across Waterloo Region.',
  address: {
    street: '42 Vernon Street',
    neighbourhood: 'Galt',
    city: 'Cambridge',
    region: 'ON',
    postalCode: 'N1R 5S6',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(519) 555-0164',
  phoneHref: 'tel:+15195550164',
  email: 'hello@vernonstreetbakehouse.ca',
  emailHref: 'mailto:hello@vernonstreetbakehouse.ca',
};

/** The wholesale desk is a different person on a different phone, and saying
 *  so is half the point of the split. */
export const wholesaleContact = {
  name: 'Wholesale desk',
  phone: '(519) 555-0165',
  phoneHref: 'tel:+15195550165',
  email: 'wholesale@vernonstreetbakehouse.ca',
  emailHref: 'mailto:wholesale@vernonstreetbakehouse.ca',
};

/** Counter hours. Closed Monday and Tuesday, which is when the bakery bakes
 *  for wholesale and nothing else. */
export const counterHours: BakeDay[] = [
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '07:30', close: '16:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '07:30', close: '16:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '07:30', close: '17:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '15:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '08:00', close: '14:00' },
];

export const shelfCategories: { id: ShelfCategory; name: string; blurb: string }[] = [
  {
    id: 'sourdough',
    name: 'Sourdough',
    blurb: 'One starter, kept since 2016. Long cold ferment, baked on stone, sold the day it comes out.',
  },
  {
    id: 'viennoiserie',
    name: 'Viennoiserie',
    blurb: 'Laminated Tuesday night, baked Wednesday to Sunday. When it is gone it is gone.',
  },
  {
    id: 'pastry',
    name: 'Pastry and cake by the slice',
    blurb: 'Whatever the season is doing, cut from the same cakes on the Special Orders page.',
  },
  {
    id: 'pantry',
    name: 'Pantry',
    blurb: 'The things people ask for at the till: flour, starter, jam from the farm up the road.',
  },
];

/** ── CMS-MODELLED ────────────────────────────────────────────────────────
 *  Seed data for the `shelfItem` collection. The catalogue is what changes:
 *  a loaf comes off in February, a price moves in March, a special runs for
 *  three weeks. See retail-catalogue-wholesale.cms.ts for the model.
 *  ───────────────────────────────────────────────────────────────────────── */
export const shelf: ShelfItem[] = [
  {
    id: 'country-loaf',
    name: 'Country Loaf',
    description: 'The everyday loaf. Ontario hard red wheat, 20% whole grain, 24-hour cold ferment.',
    price: 8.5,
    category: 'sourdough',
    unit: '900 g loaf',
    dietary: ['VG'],
  },
  {
    id: 'seeded-rye',
    name: 'Seeded Rye',
    description: 'Dark rye with sunflower, flax and caraway. Dense, keeps a week, better on day three.',
    price: 9.5,
    category: 'sourdough',
    unit: '800 g loaf',
    dietary: ['VG'],
  },
  {
    id: 'baguette',
    name: 'Baguette',
    description: 'Poolish, shaped by hand, baked twice a day. Buy it at four and it is still warm.',
    price: 4.75,
    category: 'sourdough',
    unit: 'Each',
    dietary: ['VG'],
  },
  {
    id: 'focaccia',
    name: 'Rosemary Focaccia',
    description: 'Sheet-baked, olive oil, sea salt, rosemary from the pots out front until October.',
    price: 6.5,
    category: 'sourdough',
    unit: 'Quarter sheet',
    bakedOn: 'Friday to Sunday',
    dietary: ['VG'],
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Eighty-two per cent butter, three folds, proofed overnight. The bake we are judged on.',
    price: 4.75,
    category: 'viennoiserie',
    unit: 'Each',
    dietary: ['V'],
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    description: 'Two batons of 55% couverture. Warmed on request, which we recommend before ten.',
    price: 5.25,
    category: 'viennoiserie',
    unit: 'Each',
    dietary: ['V'],
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    description: 'Yesterday’s croissant, syrup, frangipane, twice baked. The correct use of day-old.',
    price: 5.75,
    category: 'viennoiserie',
    unit: 'Each',
    dietary: ['V'],
  },
  {
    id: 'kouign-amann',
    name: 'Kouign-Amann',
    description: 'Caramelised sugar laminated through, baked in a ring. Twenty a day, weekends only.',
    price: 6.25,
    category: 'viennoiserie',
    unit: 'Each',
    bakedOn: 'Saturday and Sunday',
    dietary: ['V'],
  },
  {
    id: 'canele',
    name: 'Canelé',
    description: 'Copper moulds, beeswax, two days of rest before they go in. Twelve at a time.',
    price: 4.5,
    category: 'pastry',
    unit: 'Each',
    bakedOn: 'Friday to Sunday',
    dietary: ['V'],
  },
  {
    id: 'fruit-tart',
    name: 'Seasonal Fruit Tart',
    description: 'Pâte sucrée, crème pâtissière, whatever the farm on Blair Road has picked this week.',
    price: 7,
    category: 'pastry',
    unit: 'Each',
    dietary: ['V'],
  },
  {
    id: 'cake-slice',
    name: 'Cake by the Slice',
    description: 'Cut from the current seasonal cake. Which one depends on the day and on us.',
    price: 7.5,
    category: 'pastry',
    unit: 'Slice',
    dietary: ['V'],
  },
  {
    id: 'starter',
    name: 'Starter, Fed and Ready',
    description: 'A jar of the 2016 culture with a page of instructions. Come back and tell us how it went.',
    price: 6,
    category: 'pantry',
    unit: '250 g jar',
    dietary: ['VG'],
  },
  {
    id: 'flour',
    name: 'Milled Flour',
    description: 'The same hard red wheat we use, stone-milled forty minutes from here.',
    price: 12,
    category: 'pantry',
    unit: '2 kg bag',
    dietary: ['VG'],
  },
  {
    id: 'jam',
    name: 'Blair Road Jam',
    description: 'Made up the road in small batches. Whatever fruit is in, usually four kinds at once.',
    price: 11,
    category: 'pantry',
    unit: '250 ml jar',
    dietary: ['VG'],
  },
];

export const dietaryLegend: { marker: 'V' | 'VG'; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan as made' },
];

/** Wholesale lines. Note what is NOT here: prices. They live on the list,
 *  which is a download, because a chef comparing three bakeries wants a page
 *  they can print and a price that is not on the open web. */
export const wholesaleLines: WholesaleLine[] = [
  {
    id: 'par-baked-croissant',
    name: 'Par-baked viennoiserie',
    detail:
      'Croissants, pain au chocolat and almond, frozen at 80%. Fifteen minutes at 180°C and your counter smells like a bakery at seven in the morning.',
    format: 'Frozen, par-baked',
    caseSize: '48 per case',
  },
  {
    id: 'wholesale-loaves',
    name: 'Sourdough loaves',
    detail:
      'Country and seeded rye, baked to your delivery day, sliced or whole. Sliced adds a day to the order deadline.',
    format: 'Fresh, delivered',
    caseSize: '12 per case',
  },
  {
    id: 'burger-buns',
    name: 'Buns and rolls',
    detail:
      'Brioche burger buns, potato rolls and demi baguettes for sandwich service. Sized to your spec above 200 a week.',
    format: 'Fresh or frozen',
    caseSize: '24 per case',
  },
  {
    id: 'tart-shells',
    name: 'Blind-baked tart shells',
    detail:
      'Pâte sucrée and pâte brisée, 8 cm and 20 cm, blind-baked and boxed. For kitchens that want the filling to be theirs.',
    format: 'Frozen, blind-baked',
    caseSize: '36 per case',
  },
  {
    id: 'wholesale-pastry',
    name: 'Finished pastry',
    detail:
      'Canelé, financiers and seasonal tarts for cafés that sell pastry but do not bake. Delivered finished, day-of.',
    format: 'Fresh, delivered',
    caseSize: '24 per case',
  },
];

/** The terms a chef reads before anything else. */
export const wholesaleTerms: { label: string; value: string; note: string }[] = [
  {
    label: 'Order deadline',
    value: '2:00 pm, two days ahead',
    note: 'Sliced bread and anything shaped to spec needs three.',
  },
  {
    label: 'Delivery days',
    value: 'Tuesday, Thursday, Saturday',
    note: 'Between 5:00 and 8:00 am. We have a key or a code on most accounts.',
  },
  {
    label: 'Minimum order',
    value: '$120 per delivery',
    note: 'Below that we will still deliver, with a $25 short-order fee.',
  },
  {
    label: 'Invoicing',
    value: 'Net 15, invoiced weekly',
    note: 'One invoice a week covering every delivery in it. No per-drop paperwork.',
  },
  {
    label: 'Standing orders',
    value: 'Adjust by 5:00 pm Sunday',
    note: 'Set a weekly baseline and change it only when you need to.',
  },
  {
    label: 'Delivery area',
    value: 'Waterloo Region and Guelph',
    note: 'Cambridge, Kitchener, Waterloo, Guelph and Ayr. Further out by arrangement.',
  },
];

export const deliveryZones: string[] = ['Cambridge', 'Kitchener', 'Waterloo', 'Guelph', 'Ayr', 'Paris'];

/** ── CMS-MODELLED ────────────────────────────────────────────────────────
 *  Seed data for the `seasonalCake` collection. This one rotates four times a
 *  year and is the reason the CMS line item is on this package rather than
 *  the tier below.
 *  ───────────────────────────────────────────────────────────────────────── */
export const cakes: SeasonalCake[] = [
  {
    id: 'fig-honey',
    name: 'Fig and Honey',
    description:
      'Olive oil sponge, honey buttercream, roasted figs through the middle. Not very sweet, which is either the point or a complaint depending on who is asking.',
    season: 'Autumn',
    sizes: [
      { size: '6 inch', serves: '8 to 10', price: 62 },
      { size: '8 inch', serves: '14 to 18', price: 88 },
      { size: '10 inch', serves: '24 to 30', price: 124 },
    ],
    allergens: ['Wheat', 'Egg', 'Dairy'],
  },
  {
    id: 'spiced-pear',
    name: 'Spiced Pear and Brown Butter',
    description:
      'Brown butter cake, poached pear, a cream cheese frosting with more salt in it than most people expect.',
    season: 'Autumn',
    sizes: [
      { size: '6 inch', serves: '8 to 10', price: 60 },
      { size: '8 inch', serves: '14 to 18', price: 85 },
      { size: '10 inch', serves: '24 to 30', price: 120 },
    ],
    allergens: ['Wheat', 'Egg', 'Dairy'],
  },
  {
    id: 'chocolate-rye',
    name: 'Chocolate Rye',
    description:
      'Dark rye flour in the sponge, 70% ganache, a little malt. The one we make for people who say they do not like cake.',
    season: 'All year',
    sizes: [
      { size: '6 inch', serves: '8 to 10', price: 66 },
      { size: '8 inch', serves: '14 to 18', price: 94 },
      { size: '10 inch', serves: '24 to 30', price: 132 },
    ],
    allergens: ['Wheat', 'Egg', 'Dairy', 'Soy'],
  },
  {
    id: 'lemon-poppy',
    name: 'Lemon and Poppy Seed',
    description:
      'Three layers, curd between them, Swiss meringue outside. The default request for a birthday and a good one.',
    season: 'All year',
    sizes: [
      { size: '6 inch', serves: '8 to 10', price: 58 },
      { size: '8 inch', serves: '14 to 18', price: 82 },
      { size: '10 inch', serves: '24 to 30', price: 116 },
    ],
    allergens: ['Wheat', 'Egg', 'Dairy'],
  },
];

const BASE = '/industries/restaurants/preview/retail-catalogue-wholesale/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}shop`, label: 'Retail Shop' },
    { href: `${BASE}wholesale`, label: 'Wholesale' },
    { href: `${BASE}cakes`, label: 'Cakes' },
    { href: `${BASE}about`, label: 'About' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}shop`, label: 'Shop online', event: 'shop_cta_nav' },
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
  tagline: 'A bakery in Galt with two front doors: a counter on Vernon Street and a delivery van.',
  rowsHeading: 'Counter hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Vernon Street Bakehouse. Sample site — not a real business.`,
};

export const pageMeta: Record<
  'home' | 'shop' | 'wholesale' | 'cakes' | 'about' | 'contact',
  DemoPageMeta
> = {
  home: {
    title: 'Vernon Street Bakehouse — Bakery in Cambridge, Ontario',
    description:
      'Sourdough, viennoiserie and celebration cakes from a bakery in Galt, Cambridge. Retail counter Wednesday to Sunday, wholesale delivery across Waterloo Region.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  shop: {
    title: 'Retail Shop — Vernon Street Bakehouse, Cambridge',
    description:
      'The counter catalogue with prices: sourdough, viennoiserie, pastry and pantry. Order online for collection, or come in Wednesday to Sunday.',
    ogImage: '/og/default.png',
    breadcrumb: 'Retail Shop',
  },
  wholesale: {
    title: 'Wholesale — Vernon Street Bakehouse, Waterloo Region',
    description:
      'Par-baked viennoiserie, sourdough, buns and tart shells delivered to cafés and restaurants across Waterloo Region. Order deadlines, minimums and account application.',
    ogImage: '/og/default.png',
    breadcrumb: 'Wholesale',
  },
  cakes: {
    title: 'Cakes and Special Orders — Vernon Street Bakehouse',
    description:
      'The seasonal cake collection with sizes, servings and prices in CAD, plus lead times and the allergen policy for special orders.',
    ogImage: '/og/default.png',
    breadcrumb: 'Cakes & Special Orders',
  },
  about: {
    title: 'About — Vernon Street Bakehouse, Cambridge',
    description:
      'One starter kept since 2016, Ontario hard red wheat, and a bake schedule built around two businesses sharing one oven.',
    ogImage: '/og/default.png',
    breadcrumb: 'About',
  },
  contact: {
    title: 'Contact and Hours — Vernon Street Bakehouse, Cambridge',
    description:
      'Counter hours, address and parking for 42 Vernon Street, Galt. Separate line and inbox for wholesale accounts.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

/** The fork. Two cards, two colours, two destinations — and the copy on each
 *  written for one reader only. */
export const home = {
  heroEyebrow: 'Galt, Cambridge',
  heroTitle: 'One oven, two businesses',
  heroBody:
    'A retail counter on Vernon Street and a delivery van that leaves at five in the morning. Whichever one you are here for, it is one click away.',
  forkHeading: 'Which are you here for',
  fork: [
    {
      id: 'retail',
      kicker: 'For people',
      title: 'The counter',
      body:
        'Sourdough, croissants and cake by the slice, Wednesday to Sunday. Order online the night before and collect it before the queue.',
      points: ['Prices on every item', 'Collection from 7:30 am', 'Closed Monday and Tuesday'],
      cta: 'Retail shop',
      href: 'shop',
    },
    {
      id: 'wholesale',
      kicker: 'For kitchens',
      title: 'The van',
      body:
        'Par-baked viennoiserie, loaves, buns and tart shells delivered three mornings a week across Waterloo Region and Guelph.',
      points: ['Order by 2:00 pm, two days ahead', 'Net 15, invoiced weekly', '$120 minimum per delivery'],
      cta: 'Wholesale terms',
      href: 'wholesale',
    },
  ],
  bakeHeading: 'What is in the oven',
  bakeBody:
    'The wholesale bake runs Monday and Tuesday when the counter is shut. Everything on the retail shelf is baked the morning it is sold.',
  bakeCta: 'The whole catalogue',
  cakesHeading: 'The seasonal collection',
  cakesBody:
    'Four cakes at a time, changed with the season. Ordered by phone or at the counter, a week ahead.',
  cakesCta: 'Cakes and special orders',
  aboutHeading: 'Since 2016',
  aboutBody:
    'One starter, Ontario hard red wheat, and a schedule built around two businesses sharing one deck oven.',
  aboutCta: 'How it works',
};

export const shopPage = {
  eyebrow: 'Retail Shop',
  heading: 'The counter catalogue',
  intro:
    'Everything on the shelf, with the price. Order online for collection the next baking day, or just come in.',
  filterLabel: 'Filter by shelf',
  filterAll: 'Everything',
  embedLabel: 'Clover Online Store — embeds here',
  embedNote: 'This is the slot the live store sits in.',
  embedHeading: 'Order for collection',
  embedBody:
    'Orders run through the shop’s existing Clover merchant account, so the till and the website share one product list and one stock count. No second gateway, no extra processing fees, and a sell-out at the counter takes the item off the website by itself.',
  collectionHeading: 'How collection works',
  collection: [
    { title: 'Order by 6:00 pm', detail: 'For collection the next baking day. We are shut Monday and Tuesday.' },
    { title: 'Pick a window', detail: 'From 7:30 am. Croissants at eight are a different thing from croissants at two.' },
    { title: 'Paid already', detail: 'Give the name at the counter. The bag is on the shelf behind the till.' },
  ],
  unitLabel: 'Sold as',
  bakedLabel: 'Baked',
  legendLabel: 'Dietary markers',
  wholesaleAsideHeading: 'Buying for a business?',
  wholesaleAsideBody: 'Case prices, delivery days and account terms are on the wholesale page — none of it is on this one.',
  wholesaleAsideCta: 'Wholesale',
};

export const wholesalePage = {
  eyebrow: 'Wholesale',
  heading: 'Delivered three mornings a week',
  intro:
    'Cafés, restaurants, grocers and caterers across Waterloo Region and Guelph. Terms first, because that is what you actually need to know.',
  termsHeading: 'The terms',
  linesHeading: 'What we supply',
  formatLabel: 'Format',
  caseLabel: 'Case',
  zonesHeading: 'Where the van goes',
  zonesNote: 'Six municipalities on three routes. Outside them we will say so rather than quote you a van that does not exist.',
  priceListHeading: 'The price list',
  priceListBody:
    'Case prices for every line, updated quarterly. It is a PDF because a chef comparing three bakeries wants something they can print and put next to the other two.',
  priceListSlotLabel: 'Wholesale price list (PDF) — links here',
  priceListSlotNote: 'The current list is uploaded by the bakery and replaced each quarter.',
  applyHeading: 'Apply for an account',
  applyIntro:
    'Six questions. We come back within two business days with the price list, a delivery day and a first order if you want one.',
  requiredNote: 'Fields marked with an asterisk are required.',
  submitLabel: 'Send the application',
  errorSummaryHeading: 'Check these fields',
  fields: {
    businessName: { label: 'Business name', error: 'The name the invoice goes to.' },
    businessType: {
      label: 'Type of business',
      hint: 'It changes which lines we quote you',
      options: ['Café or coffee shop', 'Restaurant', 'Grocer or deli', 'Caterer', 'Hotel or institution', 'Something else'],
      error: 'Choose the closest type.',
    },
    deliveryCity: {
      label: 'Delivery city',
      hint: 'Where the van would be going',
      options: ['Cambridge', 'Kitchener', 'Waterloo', 'Guelph', 'Ayr', 'Paris', 'Somewhere else'],
      error: 'Which city is the delivery address in.',
    },
    volume: {
      label: 'Estimated weekly spend',
      hint: 'A guess is fine. It decides the route, not the price.',
      options: ['Under $120', '$120 – $400', '$400 – $900', '$900 – $2,000', 'Over $2,000', 'Not sure yet'],
      error: 'An estimate, even a rough one.',
    },
    startDate: {
      label: 'Preferred start',
      options: ['As soon as possible', 'Within a month', 'One to three months', 'Just gathering prices'],
      error: 'When would you want the first delivery.',
    },
    interest: {
      label: 'Lines you are interested in',
      hint: 'Tick as many as apply',
      error: 'Tick at least one line.',
    },
    contactName: { label: 'Your name', error: 'A name to address the reply to.' },
    email: { label: 'Work email', error: 'A valid email, so the price list reaches you.' },
    phone: { label: 'Phone', hint: 'Optional. Faster for anything about a route.' },
    notes: { label: 'Anything else', hint: 'Allergen requirements, a spec you need matched, a deadline.' },
  },
  confirmation: {
    heading: 'Application received',
    body:
      'It is with the wholesale desk. You will hear back within two business days with the price list and a proposed delivery day.',
    detailsHeading: 'What you sent',
    note: 'Nothing is committed by this. The first order is the commitment, and it can be one case.',
    resetLabel: 'Send another application',
  },
  sidebarHeading: 'Talk to the desk',
  sidebarBody: 'Wholesale has its own line and its own inbox. It is not the counter phone, which nobody can hear on a Saturday.',
  retailAsideHeading: 'Just buying bread?',
  retailAsideBody: 'The counter catalogue and the online shop are on the retail page. Nothing on this page applies to you.',
  retailAsideCta: 'Retail shop',
};

export const cakesPage = {
  eyebrow: 'Cakes & Special Orders',
  heading: 'Four cakes at a time',
  intro:
    'The collection changes with the season. Sizes, servings and prices are below; orders go through the counter or the phone, a week ahead.',
  seasonLabel: 'In the collection',
  servesLabel: 'Serves',
  allergenLabel: 'Contains',
  howHeading: 'How to order one',
  how: [
    { title: 'A week ahead', detail: 'Ten days from December through to the new year, and for anything over ten inches.' },
    { title: 'Half now', detail: 'A 50% deposit takes the date. It is taken at the counter or over the phone, not on this website.' },
    { title: 'Collection only', detail: 'Cakes are not delivered and not shipped. A 10 inch does not survive a car boot on Highway 8.' },
  ],
  allergenHeading: 'About allergens',
  allergenBody:
    'This is one small kitchen. Wheat, egg, dairy, nuts and sesame are all handled in it, on the same surfaces, every day. We list what is in each cake and we will talk through an order honestly, but we cannot call anything allergen-free and will not pretend otherwise.',
  customHeading: 'Something not on the list',
  customBody:
    'We will do a flavour we already make in a different size, and we will keep decoration simple and good. We do not do sculpted cakes, printed images or fondant figures — there are people in Cambridge who do that properly and we will name one.',
  ctaHeading: 'Order a cake',
  ctaBody: 'The counter phone, Wednesday to Sunday. Bring the date and the number of people.',
};

export const aboutPage = {
  eyebrow: 'About',
  heading: 'Two businesses, one deck oven',
  intro:
    'The bakery runs on a schedule that most customers never see, and it is the reason the counter is shut on a Monday.',
  weekHeading: 'The week',
  week: [
    { day: 'Monday', detail: 'Wholesale bake. Loaves and par-baked viennoiserie for Tuesday’s van. Counter shut.' },
    { day: 'Tuesday', detail: 'Delivery from five. Lamination for the rest of the week. Counter shut.' },
    { day: 'Wednesday', detail: 'Counter opens. First bake out at 7:30, second at noon.' },
    { day: 'Thursday', detail: 'Second delivery run. Cakes assembled for the weekend.' },
    { day: 'Friday', detail: 'Focaccia, canelé, the long bake. Busiest day at the counter.' },
    { day: 'Saturday', detail: 'Third delivery, then the counter until three. Kouign-amann.' },
    { day: 'Sunday', detail: 'Counter until two, then the starter gets fed and everybody goes home.' },
  ],
  factsHeading: 'The short version',
  facts: [
    { label: 'Starter kept since', value: '2016' },
    { label: 'Flour milled within', value: '40 min' },
    { label: 'Wholesale accounts', value: '31' },
    { label: 'People', value: '9' },
  ],
  flourHeading: 'The flour and the starter',
  flourBody:
    'Ontario hard red wheat, stone-milled forty minutes from here, and one starter kept alive since the year the shop opened. Neither is a marketing story: the flour is what is close and good, and the starter is a habit nobody has broken.',
  peopleHeading: 'The people',
  peopleBody:
    'Nine of us. Two on nights, three on the bench, two at the counter, one in the van and one doing the invoices. Everybody has done the six o’clock start.',
  ctaHeading: 'Come in on a Friday',
  ctaBody: 'It is the busiest and the best day to see the place working.',
  ctaLabel: 'Hours and address',
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: '42 Vernon Street, Galt',
  retailHeading: 'The counter',
  wholesaleHeading: 'Wholesale accounts',
  addressHeading: 'Address',
  hoursHeading: 'Counter hours',
  hoursNote: 'Closed Monday and Tuesday. Those are the wholesale bake days and there is nobody at the front.',
  hoursTable: { day: 'Day', open: 'Open' },
  visitHeading: 'Getting here',
  visit: [
    { title: 'Parking', detail: 'Six spaces behind the building off the lane. Street parking on Vernon is two hours, free.' },
    { title: 'Accessibility', detail: 'Level entry from the lane side, and the counter is at 900 mm. The washroom is accessible.' },
    { title: 'Deliveries in', detail: 'Flour and dairy come to the lane door before seven. Please do not block it.' },
  ],
  mapLabel: 'Map — 42 Vernon Street, Cambridge',
  shopCta: 'Order for collection',
};

export const itemsIn = (category: ShelfCategory): ShelfItem[] =>
  shelf.filter((item) => item.category === category);

export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
