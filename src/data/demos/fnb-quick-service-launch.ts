// Sumac Street Shawarma — the sample site for the F&B Quick Service Launch
// playbook. A fictional counter-service shawarma shop in Scarborough; nothing
// here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// This is a ONE PAGER, and that is the entire pitch for the tier: everything a
// hungry person needs, on one screen's worth of scrolling, with nothing that
// reads as truncated. Hero, menu, ordering, hours, location, contact.
//
// Flags: SEO, E-Commerce, Analytics, Domain.
// Deliberately absent: CMS, CRM and booking. Nobody books a shawarma.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export interface MenuItem {
  name: string;
  description: string;
  /** CAD, pre-tax */
  price: number;
  /** V = vegetarian, VG = vegan */
  dietary?: ('V' | 'VG')[];
}

export interface MenuSection {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface ShopDay {
  day: string;
  short: string;
  schemaDay: string;
  /** 24h "HH:MM"; past midnight carries on past 24, so "27:00" is 3am */
  open: string;
  close: string;
}

/** Charcoal, cream and one warm red. Big type, tight rhythm, poster energy —
 *  a counter you read from the sidewalk, not a menu you linger over. */
export const theme: DemoTheme = {
  ink: '#191512',
  inkRaised: '#221D19',
  inkLine: '#332B25',
  paper: '#F7EFE3',
  paperRaised: '#EFE4D3',
  paperLine: '#DCCBB4',
  /** Warm red. Lifted from #E8503C, which cleared 4.5:1 on the base charcoal
   *  but landed at 4.49 on --ink-raised, where the footer headings sit.
   *  5.6:1 on ink, 5.1:1 on ink-raised. */
  accent: '#EE6047',
  /** the same red deepened for the cream ground (5.6:1) */
  accentOnPaper: '#B03322',
  onInk: '#F4EDE4',
  onInkDim: 'rgba(244, 237, 228, 0.72)',
  onPaper: '#1C1713',
  onPaperDim: 'rgba(28, 23, 19, 0.72)',
  /** charcoal on the red, not white — white lands at 3.7:1 and fails */
  onAccent: '#191512',
  displayFont: '"Syne", "Trebuchet MS", system-ui, sans-serif',
  bodyFont: '"Figtree", "Segoe UI", system-ui, sans-serif',
  radius: '6px',
};

export const fonts = [
  { family: 'Syne', file: 'syne-latin-var.woff2', weight: '400 800' },
  { family: 'Figtree', file: 'figtree-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Sumac Street Shawarma',
  shortName: 'Sumac Street',
  positioning: 'Halal shawarma and mixed grill, off the spit until late.',
  address: {
    street: '1190 Sumac Street',
    neighbourhood: 'Scarborough',
    city: 'Toronto',
    region: 'ON',
    postalCode: 'M1J 0B7',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(416) 555-0166',
  phoneHref: 'tel:+14165550166',
  email: 'hello@sumacstreet.ca',
  emailHref: 'mailto:hello@sumacstreet.ca',
};

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '11:00', close: '25:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '11:00', close: '25:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '11:00', close: '25:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '11:00', close: '25:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '11:00', close: '27:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '11:00', close: '27:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '12:00', close: '24:00' },
];

export const menu: MenuSection[] = [
  {
    id: 'wraps',
    name: 'Wraps',
    items: [
      { name: 'Chicken Shawarma', description: 'Off the spit, garlic sauce, pickled turnip, tomato, wrapped and pressed.', price: 11 },
      { name: 'Beef Shawarma', description: 'Tahini, onion, sumac and parsley, in a saj wrap that gets a minute on the grill.', price: 12.5 },
      { name: 'Mixed Shawarma', description: 'Both spits in one wrap. Garlic and tahini, because you are having both.', price: 13 },
      { name: 'Shish Tawook', description: 'Marinated chicken off the skewer, garlic sauce, pickles, grilled tomato.', price: 12 },
      { name: 'Falafel', description: 'Fried to order, hummus, tahini, tomato, cucumber and a lot of parsley.', price: 10, dietary: ['VG'] },
    ],
  },
  {
    id: 'plates',
    name: 'Plates',
    items: [
      { name: 'Chicken Shawarma Plate', description: 'Rice, salad, garlic potatoes, pickles and a mound of chicken.', price: 17 },
      { name: 'Beef Shawarma Plate', description: 'The same plate, the other spit, with tahini instead of garlic.', price: 18.5 },
      { name: 'Mixed Grill', description: 'Tawook, kafta and beef kebab over rice, with grilled tomato and onion.', price: 24 },
      { name: 'Shish Kafta Plate', description: 'Two skewers of hand-minced beef and lamb with parsley and onion.', price: 18 },
      { name: 'Falafel Plate', description: 'Six falafel, hummus, fattoush, rice and pickled turnip.', price: 15, dietary: ['VG'] },
    ],
  },
  {
    id: 'sides',
    name: 'Sides',
    items: [
      { name: 'Garlic Potatoes', description: 'Fried, tossed in garlic and coriander while still hot.', price: 7, dietary: ['VG'] },
      { name: 'Hummus & Pita', description: 'Whipped smooth, olive oil, paprika, warm pita to move it with.', price: 8, dietary: ['VG'] },
      { name: 'Fattoush', description: 'Tomato, cucumber, radish, mint and fried pita in a sumac dressing.', price: 9, dietary: ['VG'] },
      { name: 'Pickles & Olives', description: 'Pickled turnip, cucumber and green olives. Order it, you will want it.', price: 4, dietary: ['VG'] },
    ],
  },
  {
    id: 'sweets',
    name: 'Sweets & Drinks',
    items: [
      { name: 'Baklava', description: 'Three pieces, pistachio, made down the road and delivered every morning.', price: 6, dietary: ['V'] },
      { name: 'Knafeh', description: 'Cheese, semolina, syrup. Ten minutes to warm, so order it when you order the food.', price: 9, dietary: ['V'] },
      { name: 'Ayran', description: 'Salted yoghurt drink. The right thing with a beef wrap.', price: 4, dietary: ['V'] },
      { name: 'Mint Lemonade', description: 'Blended with ice until it is almost a slush.', price: 5, dietary: ['VG'] },
    ],
  },
];

export const dietaryLegend: { marker: 'V' | 'VG'; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan' },
];

const ROUTE = '/industries/restaurants/preview/fnb-quick-service-launch/';

export const navigation: DemoNavigation = {
  // A one-pager's nav is anchors; the wordmark gets its own target.
  brandHref: ROUTE,
  links: [
    { href: '#menu', label: 'Menu' },
    { href: '#order', label: 'Order' },
    { href: '#find', label: 'Find us' },
  ],
  cta: { href: '#order', label: 'Order online', event: 'order_cta_nav' },
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
  tagline: 'Halal shawarma and mixed grill in Scarborough. Open late, every night.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Sumac Street Shawarma. Sample site — not a real business.`,
};

export const pageMeta = {
  title: 'Sumac Street Shawarma — Halal Shawarma in Scarborough, Open Late',
  description: 'Counter-service shawarma and mixed grill on Sumac Street, Scarborough. Halal, open to 1am and 3am on weekends. Order ahead for pickup.',
  ogImage: '/og/default.png',
  route: ROUTE,
};

export const page = {
  /** the in-page nav, which is the whole navigation on a one-pager */
  jump: [
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order' },
    { id: 'find', label: 'Find us' },
    { id: 'contact', label: 'Contact' },
  ],
  jumpLabel: 'On this page',

  heroEyebrow: 'Scarborough · Halal · Open late',
  heroTitle: 'Off the spit until 3am',
  heroBody: 'Chicken and beef turning all day, hand-minced kafta, falafel fried to order. Counter service, no table to wait for.',
  heroPrimaryCta: 'Order for pickup',
  heroSecondaryCta: 'See the menu',
  heroPhoto: {
    file: 'hero-spit',
    subject: 'Two shawarma spits close up under the heat, meat carved mid-motion, warm red light',
    alt: 'Chicken and beef shawarma turning on the spits at Sumac Street',
  },

  menuHeading: 'The whole menu',
  menuNote: 'Eighteen things. Prices in CAD, halal throughout.',
  legendLabel: 'Dietary markers',

  orderHeading: 'Order ahead, skip the line',
  orderBody: 'Build it, pay online, and collect at the counter. Same kitchen, same prices, no third-party markup.',
  embedLabel: 'Clover Online Ordering — embeds here',
  embedNote: 'This is the slot the live ordering system sits in.',
  orderExplainer: 'Orders and payment run through the shop’s existing Clover merchant account. No second gateway, no extra processing fees, and the ticket prints at the counter the same way a walk-in order does.',
  orderSteps: [
    { title: 'Order and pay', detail: 'Everything settles online, so there is nothing to sort out at the counter.' },
    { title: 'About 15 minutes', detail: 'Longer after 11pm on a Friday. The confirmation gives you the real number.' },
    { title: 'Collect at the counter', detail: 'Give the name on the order. The pickup shelf is to the right of the till.' },
  ],
  deliveryNote: 'We are on the delivery apps too, but they take a cut of every order. Pickup here costs us less and costs you less.',

  findHeading: 'Where and when',
  findBody: 'On Sumac Street, two doors down from the plaza entrance. Street parking after 6pm.',
  hoursHeading: 'Hours',
  hoursNote: 'The spit goes on at eleven and comes off when the last order is out.',
  hoursTable: { day: 'Day', open: 'Open' },
  mapLabel: 'Map — 1190 Sumac Street, Scarborough',

  contactHeading: 'Call the counter',
  contactBody: 'Large orders, catering trays or anything the online menu will not let you ask for.',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  addressHeading: 'Address',

  /** the fixed bar on small screens, where the nav CTA is behind the toggle */
  stickyCta: 'Order for pickup',
};

export const formatMenuPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
