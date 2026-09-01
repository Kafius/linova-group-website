// Bramble & Bone Pet Supply — the sample site for the Retail Online Store
// playbook. A fictional independent pet shop in Guelph; nothing here is a real
// business, and the demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file. The .astro pages under
// src/pages/industries/retail/preview/retail-online-store/ hold layout and
// nothing else. If you find yourself typing prose into one of those files, it
// belongs here instead.
//
// Flags for this playbook: SEO, E-Commerce, CMS, Analytics, Domain.
// Deliberately absent: CRM and booking. There is no enquiry pipeline and no
// calendar anywhere in this demo, and their absence is part of the pitch.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type ProductCategory = 'food' | 'treats' | 'toys' | 'care' | 'accessories';

export interface Product {
  /** stable id — the CMS document key and the anchor */
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  /** CAD, pre-tax */
  price: number;
  /** pack size as it is written on the shelf label */
  size: string;
  /** short shelf-talkers: 'Made in-house', 'Ontario raised', 'Grain-free' */
  tags: string[];
  inStock: boolean;
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** The demo's palette and faces. Note the inversion against Harbourview: here
 *  `ink` is the cream the site mostly sits on and `paper` is the forest-green
 *  band, because DemoLayout only cares that one is the base ground and the
 *  other is its opposite. Two demos, one layout, no shared colours. */
export const theme: DemoTheme = {
  /** cream — the base ground */
  ink: '#FBF7EF',
  inkRaised: '#F3ECDF',
  inkLine: '#E2D8C6',
  /** forest green — the contrast band */
  paper: '#1F3D2B',
  paperRaised: '#26492F',
  paperLine: '#33593D',
  /** terracotta on cream (5.6:1) */
  accent: '#A34A21',
  /** the same terracotta lifted for the green band (5.5:1) */
  accentOnPaper: '#E9A183',
  onInk: '#1A241B',
  onInkDim: 'rgba(26, 36, 27, 0.72)',
  onPaper: '#F1EFE4',
  onPaperDim: 'rgba(241, 239, 228, 0.75)',
  onAccent: '#FFFFFF',
  displayFont: '"Bricolage Grotesque", "Trebuchet MS", system-ui, sans-serif',
  bodyFont: '"Public Sans", "Segoe UI", system-ui, sans-serif',
  displayAxes: "'opsz' 48",
  radius: '999px',
};

/** The two self-hosted faces this demo loads. Display first — it is preloaded. */
export const fonts = [
  { family: 'Bricolage Grotesque', file: 'bricolage-grotesque-latin-var.woff2', weight: '400 800' },
  { family: 'Public Sans', file: 'public-sans-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Bramble & Bone Pet Supply',
  shortName: 'Bramble & Bone',
  positioning: 'Raw, small-batch and made-in-the-back, on Wheelwright Lane since 2015.',
  address: {
    street: '41 Wheelwright Lane',
    neighbourhood: 'Exhibition Park',
    city: 'Guelph',
    region: 'ON',
    postalCode: 'N1H 0B2',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(519) 555-0148',
  phoneHref: 'tel:+15195550148',
  email: 'hello@brambleandbone.ca',
  emailHref: 'mailto:hello@brambleandbone.ca',
};

export interface ShopDay {
  day: string;
  short: string;
  schemaDay: string;
  open: string;
  close: string;
}

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '10:00', close: '19:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '10:00', close: '19:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '10:00', close: '19:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '10:00', close: '19:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '10:00', close: '19:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '09:00', close: '18:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '11:00', close: '17:00' },
];

export const categories: { id: ProductCategory; label: string; blurb: string }[] = [
  { id: 'food', label: 'Food', blurb: 'Raw, air-dried, gently cooked and one honest kibble.' },
  { id: 'treats', label: 'Treats', blurb: 'Most of these are made in the back on a Tuesday.' },
  { id: 'toys', label: 'Toys', blurb: 'Things that survive a week with a determined dog.' },
  { id: 'care', label: 'Care', blurb: 'Coat, paws, and the smell of a wet one in February.' },
  { id: 'accessories', label: 'Accessories', blurb: 'Leads, collars and bowls built to outlast the dog.' },
];

/** The catalogue. This is the collection modelled for the CMS — see
 *  retail-online-store.cms.ts. In a live build these documents come from
 *  Sanity and this array is the seed. */
export const products: Product[] = [
  // ── Food ──────────────────────────────────────────────────────────
  {
    id: 'ridgeline-raw-beef',
    name: 'Ridgeline Raw Beef & Organ',
    description: 'Ontario beef with heart, liver and kidney, ground coarse and frozen in 250g pucks. The one we start most dogs on.',
    category: 'food',
    price: 24,
    size: '1 kg · 4 pucks',
    tags: ['Ontario raised', 'Frozen'],
    inStock: true,
  },
  {
    id: 'ridgeline-raw-turkey',
    name: 'Ridgeline Raw Turkey & Pumpkin',
    description: 'Leaner than the beef, with pumpkin worked through it. What we reach for when a stomach is being difficult.',
    category: 'food',
    price: 23,
    size: '1 kg · 4 pucks',
    tags: ['Ontario raised', 'Frozen'],
    inStock: true,
  },
  {
    id: 'cold-creek-air-dried-lamb',
    name: 'Cold Creek Air-Dried Lamb',
    description: 'Dried slowly over three days so it keeps the nutrition of raw without the freezer. Travels well, which is the whole point.',
    category: 'food',
    price: 46,
    size: '900 g',
    tags: ['Grain-free'],
    inStock: true,
  },
  {
    id: 'bramble-kitchen-chicken',
    name: 'Bramble Kitchen Gently Cooked Chicken',
    description: 'Cooked in our own kitchen with sweet potato, carrot and a vitamin blend. Sold frozen in weekly portions.',
    category: 'food',
    price: 32,
    size: '1.2 kg',
    tags: ['Made in-house', 'Frozen'],
    inStock: true,
  },
  {
    id: 'wildwater-salmon-kibble',
    name: 'Wildwater Salmon Kibble',
    description: 'The one bag we stock, for people who want kibble and want it to be good. Single protein, no filler grains.',
    category: 'food',
    price: 68,
    size: '5 kg',
    tags: ['Grain-free'],
    inStock: false,
  },

  // ── Treats ────────────────────────────────────────────────────────
  {
    id: 'beef-liver-crisps',
    name: 'Beef Liver Crisps',
    description: 'One ingredient, dehydrated until it snaps. The training treat that works on a dog who has stopped listening.',
    category: 'treats',
    price: 14,
    size: '100 g',
    tags: ['Made in-house', 'Single ingredient'],
    inStock: true,
  },
  {
    id: 'sweet-potato-chews',
    name: 'Sweet Potato Chews',
    description: 'Thick-cut rounds dried down to a chew. Nothing added, and they take a while to get through.',
    category: 'treats',
    price: 12,
    size: '200 g',
    tags: ['Made in-house', 'Vegan'],
    inStock: true,
  },
  {
    id: 'peanut-oat-biscuits',
    name: 'Peanut & Oat Biscuits',
    description: 'Baked here on Tuesdays. Peanut butter, oat flour, nothing sweetened. They go stale because there is nothing in them to stop it.',
    category: 'treats',
    price: 11,
    size: '12 biscuits',
    tags: ['Made in-house'],
    inStock: true,
  },
  {
    id: 'split-elk-antler',
    name: 'Split Elk Antler',
    description: 'Naturally shed, split to expose the marrow so a dog gets somewhere with it. Medium suits most 20 to 30 kg dogs.',
    category: 'treats',
    price: 22,
    size: 'Medium',
    tags: ['Long-lasting'],
    inStock: true,
  },
  {
    id: 'cod-skin-twists',
    name: 'Cod Skin Twists',
    description: 'Rolled and dried skin, high in omega oils and very good for a dull coat. They smell like the sea, fair warning.',
    category: 'treats',
    price: 16,
    size: '80 g',
    tags: ['Single ingredient'],
    inStock: true,
  },

  // ── Toys ──────────────────────────────────────────────────────────
  {
    id: 'rope-core-fetch-ring',
    name: 'Rope-Core Fetch Ring',
    description: 'Rubber over a rope core, so when the rubber finally goes there is still a toy in your hand. Floats.',
    category: 'toys',
    price: 18,
    size: '18 cm',
    tags: ['Floats'],
    inStock: true,
  },
  {
    id: 'cedar-ridge-snuffle-mat',
    name: 'Cedar Ridge Snuffle Mat',
    description: 'Scatter a meal into the fleece and a fast eater becomes a twenty-minute eater. Machine washable, which matters.',
    category: 'toys',
    price: 42,
    size: '50 x 50 cm',
    tags: ['Washable'],
    inStock: true,
  },
  {
    id: 'rubber-treat-puzzle',
    name: 'Rubber Treat Puzzle',
    description: 'Stuff it, freeze it, hand it over when you need forty minutes. The large fits a full breakfast.',
    category: 'toys',
    price: 26,
    size: 'Large',
    tags: ['Freezer safe'],
    inStock: true,
  },
  {
    id: 'felted-wool-mice',
    name: 'Felted Wool Mice',
    description: 'Wool, catnip, no plastic and no rattle. Cats lose them under the couch within a week, hence the three.',
    category: 'toys',
    price: 14,
    size: '3 pack',
    tags: ['For cats'],
    inStock: true,
  },

  // ── Care ──────────────────────────────────────────────────────────
  {
    id: 'oat-chamomile-shampoo',
    name: 'Oat & Chamomile Shampoo',
    description: 'For dogs that itch through the winter. No fragrance, rinses out fast, does not strip the coat.',
    category: 'care',
    price: 22,
    size: '500 ml',
    tags: ['Fragrance-free'],
    inStock: true,
  },
  {
    id: 'paw-balm',
    name: 'Paw Balm',
    description: 'Beeswax and shea, whipped soft enough to work in with a thumb. For salted sidewalks and hot August pavement.',
    category: 'care',
    price: 18,
    size: '60 g',
    tags: ['Made in-house'],
    inStock: true,
  },
  {
    id: 'enzyme-odour-spray',
    name: 'Enzyme Odour Spray',
    description: 'Breaks the smell down instead of covering it, which is the difference between this and everything at the grocery store.',
    category: 'care',
    price: 19,
    size: '750 ml',
    tags: ['Unscented'],
    inStock: true,
  },

  // ── Accessories ───────────────────────────────────────────────────
  {
    id: 'waxed-canvas-lead',
    name: 'Waxed Canvas Lead',
    description: 'Sewn in Kitchener from waxed canvas and solid brass. Stiff for a month, then it becomes the only lead you use.',
    category: 'accessories',
    price: 48,
    size: '6 ft',
    tags: ['Made in Ontario'],
    inStock: true,
  },
  {
    id: 'brass-hardware-collar',
    name: 'Brass-Hardware Collar',
    description: 'Same canvas as the lead, with a brass buckle rather than a plastic clip. Sized S through XL, fitted in store.',
    category: 'accessories',
    price: 38,
    size: 'S – XL',
    tags: ['Made in Ontario'],
    inStock: true,
  },
  {
    id: 'slow-feed-ceramic-bowl',
    name: 'Slow-Feed Ceramic Bowl',
    description: 'Weighted stoneware with a ridged base, so a dog that inhales dinner has to work around it. Dishwasher safe.',
    category: 'accessories',
    price: 34,
    size: '900 ml',
    tags: ['Dishwasher safe'],
    inStock: true,
  },
];

export const navigation: DemoNavigation = {
  links: [
    { href: '/industries/retail/preview/retail-online-store/', label: 'Home' },
    { href: '/industries/retail/preview/retail-online-store/shop', label: 'Shop' },
    { href: '/industries/retail/preview/retail-online-store/about', label: 'About' },
    { href: '/industries/retail/preview/retail-online-store/stockists', label: 'Stockists & Delivery' },
    { href: '/industries/retail/preview/retail-online-store/contact', label: 'Contact' },
  ],
  cta: { href: '/industries/retail/preview/retail-online-store/shop', label: 'Shop online', event: 'shop_cta_nav' },
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
  tagline: 'Independent pet supply in Guelph. Raw, small-batch, and made in the back.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Bramble & Bone Pet Supply. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'shop' | 'about' | 'stockists' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Bramble & Bone Pet Supply — Raw & Small-Batch Pet Food in Guelph',
    description: 'Independent Guelph pet shop stocking raw, air-dried and gently cooked food, house-made treats, and free in-store nutrition consults. Curbside pickup and local delivery.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  shop: {
    title: 'Shop — Bramble & Bone Pet Supply, Guelph',
    description: 'Browse food, treats, toys, care and accessories. Twenty lines we actually stock, priced in CAD, with pickup in Guelph or local delivery.',
    ogImage: '/og/default.png',
    breadcrumb: 'Shop',
  },
  about: {
    title: 'About — Bramble & Bone Pet Supply, Guelph',
    description: 'A shop built around one question: what is actually in the bag. How we choose what we stock, what we make ourselves, and how the nutrition consults work.',
    ogImage: '/og/default.png',
    breadcrumb: 'About',
  },
  stockists: {
    title: 'Stockists & Delivery — Bramble & Bone Pet Supply',
    description: 'Where else to find our house-made treats, plus curbside pickup and the Guelph delivery zones, minimums and cut-off times.',
    ogImage: '/og/default.png',
    breadcrumb: 'Stockists & Delivery',
  },
  contact: {
    title: 'Contact & Hours — Bramble & Bone Pet Supply, Guelph',
    description: 'Address, phone, email, opening hours and parking for Bramble & Bone on Wheelwright Lane in Guelph.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Guelph · since 2015',
  heroTitle: 'We read the bag so you do not have to',
  heroBody: 'An independent shop stocking raw, air-dried and gently cooked food, plus treats we bake in the back. If we cannot explain what is in it, we do not put it on the shelf.',
  heroPrimaryCta: 'Shop online',
  heroSecondaryCta: 'How the consults work',
  heroPhoto: {
    file: 'hero-shop',
    subject: 'Wide interior of a small pet shop, timber shelving, chest freezer, dog waiting by the counter',
    alt: 'The interior of Bramble & Bone, with timber shelving and a dog waiting at the counter',
  },
  pillarsHeading: 'Three things we do differently',
  pillars: [
    {
      title: 'One freezer, four proteins',
      detail: 'A short raw list we can vouch for, rather than a wall of brands nobody in the shop has fed.',
    },
    {
      title: 'Treats baked on Tuesdays',
      detail: 'Liver crisps, sweet potato chews and peanut biscuits, made here in batches that sell out by Friday.',
    },
    {
      title: 'Consults cost nothing',
      detail: 'Bring the bag you are using now and we will read it with you. No appointment, no upsell, no charge.',
    },
  ],
  categoriesHeading: 'What is on the shelf',
  categoriesCta: 'Browse everything',
  madeHereHeading: 'Made in the back',
  madeHereBody: 'The kitchen behind the shop turns out the treats, the gently cooked food and the paw balm. It is the reason the shop smells like a bakery on a Tuesday morning.',
  madeHerePhoto: {
    file: 'kitchen',
    subject: 'Trays of dehydrated treats coming out of a rack oven in a small back kitchen, hands in frame',
    alt: 'Trays of house-made treats coming out of the oven in the back kitchen',
  },
  deliveryHeading: 'Pickup and delivery',
  deliveryBody: 'Order online and collect at the counter, usually within the hour. Inside Guelph we deliver on Wednesdays and Saturdays.',
  deliveryCta: 'Delivery zones and cut-offs',
  closerHeading: 'Bring the bag in',
  closerBody: 'Whatever you are feeding now, bring it. We will read the panel with you and tell you honestly if it is fine.',
  closerCta: 'Find the shop',
};

export const shop = {
  eyebrow: 'Shop',
  heading: 'Twenty lines, all of them stocked',
  intro: 'The whole range is here. Order online for pickup or local delivery, or come in and we will talk you through it.',
  filterLabel: 'Filter by category',
  filterAll: 'Everything',
  embedLabel: 'Clover Online Store — embeds here',
  embedNote: 'This is the slot the live store and checkout sit in.',
  explainerHeading: 'It runs on the Clover account you already have',
  explainerBody: 'The store syncs to the same inventory the front counter uses, and checkout settles to the existing Clover merchant account. Stock and sales stay in one place, with no second gateway and no extra processing fees.',
  catalogueHeading: 'The full range',
  catalogueNote: 'Prices in CAD. What is on this page is what is on the shelf.',
  outOfStock: 'Out of stock',
  pickupNote: 'Pickup at the counter in Guelph, usually within the hour.',
};

export const about = {
  eyebrow: 'Since 2015',
  heading: 'A shop built around one question',
  story: [
    'Priya opened Bramble & Bone after a year of turning bags over in grocery aisles and not being able to work out what was in them. The shop started with one chest freezer and four proteins.',
    'It is bigger now, but the rule has not moved: if nobody working here can explain what is in a product and why, it does not get shelf space. That is why the food list is short.',
  ],
  sourcingHeading: 'Where it comes from',
  sourcingBody: 'The raw comes from an abattoir outside Fergus, the leads and collars are sewn in Kitchener, and the treats, gently cooked food and paw balm are made in the kitchen behind the shop.',
  sourcingPhoto: {
    file: 'sourcing',
    subject: 'Waxed canvas leads and brass collars hanging on a timber peg rail, close and shallow focus',
    alt: 'Waxed canvas leads and brass-hardware collars hanging on a peg rail in the shop',
  },
  consultHeading: 'The nutrition consult',
  consultBody: 'Bring the food you are using and we will read the panel with you: protein sources, fillers, what the first five ingredients actually mean. It takes about fifteen minutes, it is free, and there is nothing to book — just come by when the shop is quiet, which is most weekday afternoons.',
  consultDirectionsCta: 'Hours and directions',
  consultNote: 'We are not veterinarians and we do not diagnose. If something is wrong with your animal, that is a vet visit, and we will say so.',
  teamHeading: 'Who is behind the counter',
  team: [
    {
      name: 'Priya Raghunathan',
      role: 'Owner',
      bio: 'Opened the shop in 2015 with one freezer. Does the Fergus run herself most Mondays and will happily spend twenty minutes on a bag of kibble.',
      photo: {
        file: 'staff-priya',
        subject: 'Owner in her forties behind a shop counter, aprons and shelving behind her, natural window light',
        alt: 'Priya Raghunathan, owner, behind the counter at Bramble & Bone',
      },
    },
    {
      name: 'Devon Achterberg',
      role: 'Kitchen',
      bio: 'Runs the back kitchen and everything that comes out of it. The reason the peanut biscuits are gone by Friday.',
      photo: {
        file: 'staff-devon',
        subject: 'Person in an apron loading dehydrator trays in a small back kitchen, warm light',
        alt: 'Devon Achterberg loading dehydrator trays in the back kitchen',
      },
    },
  ],
};

export const stockists = {
  eyebrow: 'Stockists & Delivery',
  heading: 'Where else to find us, and how to get it to you',
  intro: 'Our house-made treats are on the shelf at a few other independents. Everything else is here, by pickup or delivery.',
  stockistsHeading: 'Carrying our treats',
  stockistsNote: 'These shops stock the liver crisps, sweet potato chews and biscuits. Not the raw — that stays in our freezer.',
  stockistList: [
    { name: 'The Green Leash', place: 'Fergus', detail: 'Liver crisps and biscuits' },
    { name: 'Rockwood Feed & Pet', place: 'Rockwood', detail: 'Full treat range' },
    { name: 'Two Rivers Grooming', place: 'Guelph, south end', detail: 'Biscuits and paw balm' },
    { name: 'Elora Country Supply', place: 'Elora', detail: 'Sweet potato chews' },
  ],
  pickupHeading: 'Curbside pickup',
  pickupSteps: [
    { title: 'Order online', detail: 'Everything is paid for at checkout, so there is nothing to settle at the counter.' },
    { title: 'Wait for the text', detail: 'Usually within the hour during opening hours. Frozen orders can take longer if we are packing a delivery run.' },
    { title: 'Pull into the lane', detail: 'Two marked spots outside the door on Wheelwright. Call and we will bring it out.' },
  ],
  deliveryHeading: 'Delivery inside Guelph',
  deliveryNote: 'We drive it ourselves, which is why the zones are small and the days are fixed.',
  deliveryZones: [
    { zone: 'Central & Exhibition Park', days: 'Wednesday and Saturday', minimum: 40, fee: 0 },
    { zone: 'South end & Clairfields', days: 'Saturday', minimum: 60, fee: 6 },
    { zone: 'East & Grange Hill', days: 'Wednesday', minimum: 60, fee: 6 },
    { zone: 'West & Willow Road', days: 'Saturday', minimum: 60, fee: 6 },
  ],
  deliveryTerms: [
    'Order by 6pm the day before a run.',
    'Frozen goes out in an insulated bag; somebody needs to be home for it.',
    'Free over the minimum for your zone, otherwise the fee above.',
  ],
  zonesTable: { zone: 'Zone', days: 'Days' },
  minimumLabel: 'Minimum',
  feeLabel: 'Fee',
  freeLabel: 'Free',
  orderCta: 'Start an order',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Come by, or send a message',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'The quiet stretch is weekday afternoons, which is the best time for a consult.',
  hoursTable: { day: 'Day', open: 'Open' },
  gettingHereHeading: 'Parking and getting here',
  gettingHere: [
    { title: 'Parking', detail: 'Two marked spots outside the door, plus the municipal lot on Kent Street a minute away.' },
    { title: 'On foot', detail: 'Five minutes from Exhibition Park along Wheelwright. The door is the green one.' },
    { title: 'Bus', detail: 'Guelph Transit routes along Woolwich stop at the corner of Kent.' },
  ],
  mapLabel: 'Map — 41 Wheelwright Lane, Guelph',
  formHeading: 'Send a message',
  formNote: 'For anything that is not an order. We answer within a day.',
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameError: 'Enter your name.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    emailError: 'Enter an email we can reply to.',
    messageLabel: 'Message',
    messagePlaceholder: 'What can we help with?',
    messageError: 'Tell us what you need.',
    submit: 'Send message',
    submitting: 'Sending',
    successHeading: 'Message sent',
    successBody: 'Thanks — somebody from the shop will get back to you within a day.',
  },
};

/** Products in a category, in catalogue order. */
export const productsIn = (category: ProductCategory): Product[] =>
  products.filter((product) => product.category === category);

export const findProduct = (id: string): Product | undefined =>
  products.find((product) => product.id === id);
