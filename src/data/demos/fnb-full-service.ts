// Harbourview Bar & Grill — the sample site for the F&B Full Service
// playbook. A fictional waterfront bar and grill in Port Credit; nothing here
// is a real business, and the demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file. The .astro pages under
// src/pages/industries/restaurants/preview/ hold layout and nothing else, so
// building the next demo is: duplicate this file, rewrite the values, point
// the new pages at it. If you find yourself typing prose into a .astro file
// in that folder, it belongs here instead.

export type DietaryMarker = 'V' | 'VG' | 'GF';

export interface MenuItem {
  name: string;
  description: string;
  /** CAD, pre-tax. Rendered by the page, never pre-formatted here. */
  price: number;
  dietary?: DietaryMarker[];
}

export interface MenuSection {
  /** anchor id — the jump-nav and the heading share it */
  id: string;
  name: string;
  /** optional line under the section heading */
  note?: string;
  items: MenuItem[];
}

export interface TapListing {
  name: string;
  style: string;
  origin: string;
  /** null for the rotating handle, which has no fixed strength */
  abv: number | null;
  /** null where the pour is priced by what is actually on */
  price: number | null;
}

export interface Cocktail {
  name: string;
  description: string;
  price: number;
}

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DayHours {
  key: DayKey;
  /** full name, for the hours grid and the JSON-LD */
  day: string;
  short: string;
  /** schema.org day token */
  schemaDay: string;
  /** 24h "HH:MM". Times after midnight carry on past 24 — "25:00" is 1am,
   *  which keeps every open/close comparison plain arithmetic instead of a
   *  midnight special case. */
  open: string;
  kitchenClose: string;
  barClose: string;
  /** shown against the day in the hours grid, e.g. brunch service */
  note?: string;
}

export interface StaffMember {
  name: string;
  role: string;
  bio: string;
  /** art direction for the portrait slot; see DemoImage */
  photo: { file: string; subject: string; alt: string };
}

export interface DemoPageMeta {
  title: string;
  description: string;
  /** absolute path under public/ */
  ogImage: string;
  /** the page's name in a breadcrumb trail and its JSON-LD */
  breadcrumb: string;
}

/** The demo's palette and faces, handed to DemoLayout as CSS custom
 *  properties on the wrapper element. DemoLayout ships the structure; this
 *  ships the look, so the next demo reuses the layout with its own values and
 *  nothing restaurant-coloured ever reaches Linova's own token set. */
export const theme = {
  /** deep charcoal-brown ground */
  ink: '#17110D',
  /** raised surface on the dark ground */
  inkRaised: '#211812',
  /** hairlines on the dark ground */
  inkLine: '#332519',
  /** warm off-white — the menu surface */
  paper: '#F2EADC',
  paperRaised: '#E7DBC7',
  paperLine: '#D8C8AC',
  /** the single saturated accent, on the dark ground (4.7:1 on ink) */
  accent: '#D2762A',
  /** the same accent darkened for the paper ground (5.2:1 on paper) */
  accentOnPaper: '#9A4B12',
  /** body text on the dark ground */
  onInk: '#EDE3D4',
  onInkDim: 'rgba(237, 227, 212, 0.68)',
  /** body text on the paper ground */
  onPaper: '#2A1F16',
  onPaperDim: 'rgba(42, 31, 22, 0.72)',
  /** text sitting on a filled accent */
  onAccent: '#17110D',
  displayFont: '"Fraunces", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Karla", "Segoe UI", system-ui, sans-serif',
} as const;

export const business = {
  name: 'Harbourview Bar & Grill',
  /** used where the full name is too long — nav, footer, breadcrumbs */
  shortName: 'Harbourview',
  positioning: 'A waterfront room in Port Credit, pouring Ontario since 2011.',
  founded: 2011,
  cuisine: ['Canadian', 'Bar & Grill', 'Seafood'],
  priceRange: '$$',
  address: {
    street: '48 Harbourview Lane',
    neighbourhood: 'Port Credit',
    city: 'Mississauga',
    region: 'ON',
    regionName: 'Ontario',
    postalCode: 'L5G 0A1',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0142',
  phoneHref: 'tel:+19055550142',
  email: 'hello@harbourviewbargrill.ca',
  emailHref: 'mailto:hello@harbourviewbargrill.ca',
} as const;

export const hours: DayHours[] = [
  { key: 'mon', day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '11:30', kitchenClose: '22:00', barClose: '23:00' },
  { key: 'tue', day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '11:30', kitchenClose: '22:00', barClose: '23:00' },
  { key: 'wed', day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '11:30', kitchenClose: '22:00', barClose: '23:00' },
  { key: 'thu', day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '11:30', kitchenClose: '22:00', barClose: '23:00' },
  { key: 'fri', day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '11:30', kitchenClose: '24:00', barClose: '25:00' },
  { key: 'sat', day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '10:00', kitchenClose: '24:00', barClose: '25:00', note: 'Brunch until 2' },
  { key: 'sun', day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '10:00', kitchenClose: '21:00', barClose: '22:00', note: 'Brunch until 2' },
];

/** The rule the service rail draws: the kitchen always closes an hour early. */
export const serviceRail = {
  heading: 'The room runs on two clocks',
  body: 'The kitchen closes an hour before the bar, every night. Last call for food is the earlier line.',
  barLabel: 'Bar',
  kitchenLabel: 'Kitchen',
  nowLabel: 'Now',
  openLabel: 'Open now',
  closedLabel: 'Closed now',
  kitchenOpenLabel: 'Kitchen open',
  kitchenClosedLabel: 'Kitchen closed, bar open',
  /** shown before the script resolves the live state */
  loadingLabel: 'Checking the clock',
};

export const menu: MenuSection[] = [
  {
    id: 'starters',
    name: 'Starters',
    note: 'Meant for the middle of the table.',
    items: [
      {
        name: 'Crispy Perch Bites',
        description: 'Lake Erie perch, buttermilk-brined overnight, cornmeal crust. House tartar heavy on dill and capers.',
        price: 19,
      },
      {
        name: 'Harbour Wings',
        description: 'A full pound, fried twice so they stay loud. Maple-chipotle, salt and pepper, or the hot honey we cannot stop making.',
        price: 18,
        dietary: ['GF'],
      },
      {
        name: 'Beer-Cheese Pretzel',
        description: 'A warm salted pretzel from a St. Jacobs bakery, pulled apart over aged cheddar melted into our own amber ale.',
        price: 16,
        dietary: ['V'],
      },
      {
        name: 'Charred Corn Ribs',
        description: 'Ontario cobs quartered and blistered over the grill, lime crema, smoked paprika, crumbled cotija.',
        price: 15,
        dietary: ['V', 'GF'],
      },
      {
        name: 'Mussels in Cider',
        description: 'Steamed in Ontario cider with leeks, thyme and a little cream. Grilled sourdough comes with, for the broth.',
        price: 21,
      },
      {
        name: 'Smoked Whitefish Dip',
        description: 'Georgian Bay whitefish smoked in-house, whipped with chive and lemon, piled next to rye crisps.',
        price: 17,
      },
    ],
  },
  {
    id: 'mains',
    name: 'Mains',
    note: 'Served with the room, the lake, and whatever is on the taps.',
    items: [
      {
        name: 'Lake Huron Whitefish',
        description: 'Pan-roasted skin-on until it crackles. Brown butter, capers, fingerling potatoes and green beans.',
        price: 34,
        dietary: ['GF'],
      },
      {
        name: 'Harbourview Fish & Chips',
        description: 'Haddock in a batter cut with our amber ale, hand-cut chips, mushy peas, malt vinegar on the table.',
        price: 26,
      },
      {
        name: 'Ontario Ribeye',
        description: 'Twelve ounces, dry-aged, from a farm an hour outside Guelph. Herb butter, roasted shallot, one side.',
        price: 46,
        dietary: ['GF'],
      },
      {
        name: 'Half Chicken Under a Brick',
        description: 'Brined overnight and pressed crisp on the flat-top. Lemon-thyme jus, buttered greens.',
        price: 31,
        dietary: ['GF'],
      },
      {
        name: 'Cider-Braised Pork Shoulder',
        description: 'Six hours in Ontario cider until it gives up. Celeriac puree, pickled apple, a shard of crackling.',
        price: 29,
      },
      {
        name: 'Mushroom & Barley Risotto',
        description: 'Ontario pot barley worked like risotto. Cremini and oyster mushrooms, thyme, aged cheddar folded through.',
        price: 25,
        dietary: ['V'],
      },
      {
        name: 'Roast Squash & Lentil Plate',
        description: 'Honeynut squash roasted hard, black lentils, charred scallion, walnut and herb salsa.',
        price: 24,
        dietary: ['VG', 'GF'],
      },
    ],
  },
  {
    id: 'burgers',
    name: 'Burgers & Sandwiches',
    note: 'All served with hand-cut chips. Swap to greens for nothing.',
    items: [
      {
        name: 'The Harbourview Burger',
        description: 'Two smashed patties of Ontario chuck, aged cheddar, house pickles, burger sauce, sesame bun.',
        price: 24,
      },
      {
        name: 'Blackened Perch Sandwich',
        description: 'Perch off the same grill as the bites, blackened instead of fried. Slaw, tartar, brioche.',
        price: 23,
      },
      {
        name: 'Buttermilk Chicken Sandwich',
        description: 'Fried thigh, hot honey, dill pickle, a fistful of coleslaw doing structural work.',
        price: 22,
      },
      {
        name: 'Mushroom Melt',
        description: 'Roasted mushrooms, gruyere, caramelised onion and garlic aioli, pressed on grilled sourdough.',
        price: 21,
        dietary: ['V'],
      },
      {
        name: 'Steak Sandwich',
        description: 'Shaved ribeye off the trim, horseradish cream, arugula, ciabatta from the same bakery as the pretzel.',
        price: 27,
      },
    ],
  },
  {
    id: 'sides',
    name: 'Sides',
    items: [
      { name: 'Hand-Cut Chips', description: 'Twice-fried, rosemary salt, malt vinegar aioli.', price: 9, dietary: ['V'] },
      { name: 'Dressed Greens', description: 'Ontario leaves, shallot vinaigrette, toasted seeds.', price: 10, dietary: ['VG', 'GF'] },
      { name: 'Charred Broccolini', description: 'Blistered on the grill, chili, lemon, garlic oil.', price: 12, dietary: ['VG', 'GF'] },
      { name: 'Mac & Cheddar', description: 'Three-year cheddar, cream, a crust of toasted breadcrumb.', price: 13, dietary: ['V'] },
      { name: 'Onion Rings', description: 'Beer-battered, stacked high, smoked paprika mayo.', price: 11, dietary: ['V'] },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        name: 'Butter Tart Sundae',
        description: 'A warm butter tart broken over vanilla ice cream, burnt sugar, toasted pecan.',
        price: 12,
        dietary: ['V'],
      },
      {
        name: 'Sticky Toffee Pudding',
        description: 'Date sponge, dark toffee poured at the pass, clotted cream going soft on top.',
        price: 13,
        dietary: ['V'],
      },
      {
        name: 'Apple Crumble',
        description: 'Ontario apples, oat and brown sugar crumble, cider caramel, cold cream.',
        price: 12,
        dietary: ['V'],
      },
      {
        name: 'Dark Chocolate Pot',
        description: 'Set dark chocolate, sea salt, olive oil, a spoon that stands up in it.',
        price: 12,
        dietary: ['V', 'GF'],
      },
    ],
  },
];

export const dietaryLegend: { marker: DietaryMarker; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan' },
  { marker: 'GF', label: 'Gluten-free' },
];

export const menuPage = {
  heading: 'Menu',
  legendLabel: 'Dietary markers',
  jumpNavLabel: 'Menu sections',
  /** the drinks block is not a MenuSection, so its anchor is named here */
  drinksAnchorId: 'drinks',
  drinksAnchorLabel: 'Drinks',
  orderCta: 'Order for pickup',
};

export const drinks = {
  tapsHeading: 'On tap',
  tapsNote: 'Six handles. Five stay, one rotates on whatever the brewery sends.',
  taps: [
    { name: 'Harbourview Amber', style: 'Amber Ale', origin: 'Brewed for us in Mississauga', abv: 5.2, price: 9 },
    { name: 'Port Credit Pale', style: 'Pale Ale', origin: 'Mississauga, ON', abv: 5.4, price: 9 },
    { name: 'Lakeshore Lager', style: 'Czech-style Pilsner', origin: 'Guelph, ON', abv: 4.8, price: 8.5 },
    { name: 'Credit River Stout', style: 'Oatmeal Stout', origin: 'Hamilton, ON', abv: 5.8, price: 9.5 },
    { name: 'The Rotating Handle', style: 'Ask what is on', origin: 'Somewhere in Ontario', abv: null, price: null },
    { name: 'Orchard Cider', style: 'Dry Apple Cider', origin: 'Beamsville, ON', abv: 6, price: 9 },
  ] as TapListing[],
  cocktailsHeading: 'Cocktails',
  cocktailsNote: 'Short list, made properly.',
  cocktails: [
    { name: 'The Lighthouse', description: 'Gin, elderflower, cucumber, lime, soda over a long block.', price: 17 },
    { name: 'Smoked Maple Old Fashioned', description: 'Rye, Ontario maple, orange oil, smoked under a glass at the bar.', price: 19 },
    { name: 'Harbour Negroni', description: 'Equal parts, stirred cold, a wide strip of grapefruit.', price: 18 },
    { name: 'Rhubarb Spritz', description: 'Rhubarb, prosecco, soda, a stalk of the real thing.', price: 16 },
    { name: 'Dockside Caesar', description: 'The house version, with a pickled bean and a rim we take seriously.', price: 15 },
  ] as Cocktail[],
};

export const staff: StaffMember[] = [
  {
    name: 'Nadia Halloran',
    role: 'Owner',
    bio: 'Took the lease in 2011 with her father, who still does the Tuesday produce run. She is on the floor most nights and will find you a table if you are patient.',
    photo: {
      file: 'staff-nadia',
      subject: 'Owner mid-forties standing at the pass, warm low room light, candid not posed',
      alt: 'Nadia Halloran, owner of Harbourview Bar & Grill, standing at the kitchen pass',
    },
  },
  {
    name: 'Marcus Ilesanmi',
    role: 'Executive Chef',
    bio: 'Cooked in Toronto rooms for a decade before deciding he would rather know his suppliers by name. He writes the specials the morning they are served.',
    photo: {
      file: 'staff-marcus',
      subject: 'Chef plating at the pass, hands in frame, steam and warm tungsten light',
      alt: 'Marcus Ilesanmi, executive chef, plating a dish at the pass',
    },
  },
  {
    name: 'June Takahashi',
    role: 'Bar Manager',
    bio: 'Runs the taps and the short cocktail list. She is the reason the rotating handle changes on a Thursday and never on a Friday.',
    photo: {
      file: 'staff-june',
      subject: 'Bar manager behind the taps, backlit bottles, hand on a tap handle',
      alt: 'June Takahashi, bar manager, pouring at the tap wall',
    },
  },
];

/** Per-page head content. Titles are unique, descriptions are written for the
 *  SERP snippet rather than copied from the H1. */
export const pageMeta: Record<'home' | 'menu' | 'order' | 'about' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Harbourview Bar & Grill — Waterfront Bar & Grill in Port Credit',
    description: 'A family-run bar and grill on the Port Credit waterfront since 2011. Ontario menu, six taps, weekend brunch, and order-ahead pickup.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  menu: {
    title: 'Menu — Harbourview Bar & Grill, Port Credit',
    description: 'Starters, mains, burgers, sides and desserts built on Ontario suppliers. Six taps and a short cocktail list. Prices in CAD.',
    ogImage: '/og/default.png',
    breadcrumb: 'Menu',
  },
  order: {
    title: 'Order Online for Pickup — Harbourview Bar & Grill',
    description: 'Order ahead for pickup in Port Credit. Pay online, skip the line, and collect at the bar in about 20 minutes.',
    ogImage: '/og/default.png',
    breadcrumb: 'Order Online',
  },
  about: {
    title: 'About — Harbourview Bar & Grill, Port Credit',
    description: 'Family-run on the Port Credit waterfront since 2011. How the room came together, who cooks in it, and where the food comes from.',
    ogImage: '/og/default.png',
    breadcrumb: 'About',
  },
  contact: {
    title: 'Contact & Hours — Harbourview Bar & Grill, Port Credit',
    description: 'Address, phone, hours, parking and transit for Harbourview Bar & Grill on Harbourview Lane in Port Credit, Mississauga.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const navigation = {
  links: [
    { href: '/industries/restaurants/preview/', label: 'Home' },
    { href: '/industries/restaurants/preview/menu', label: 'Menu' },
    { href: '/industries/restaurants/preview/order', label: 'Order Online' },
    { href: '/industries/restaurants/preview/about', label: 'About' },
    { href: '/industries/restaurants/preview/contact', label: 'Contact' },
  ],
  cta: { href: '/industries/restaurants/preview/order', label: 'Order Online' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/restaurants',
};

export const home = {
  heroEyebrow: 'Port Credit, Ontario',
  heroTitle: 'Harbourview Bar & Grill',
  heroPositioning: 'A waterfront room where the kitchen buys Ontario and the taps pour it.',
  heroPrimaryCta: 'Order Online',
  heroSecondaryCta: 'View Menu',
  heroPhoto: {
    file: 'hero-room',
    subject: 'Wide shot of the dining room at dusk, lake through the windows, warm lamps on, tables mid-service',
    alt: 'The Harbourview dining room at dusk with the lake visible through the windows',
  },
  teaserHeading: 'Three things we would order',
  teaserNote: 'The full list runs to twenty-seven plates.',
  /** dish names must match entries in `menu` — the page looks them up */
  teaserItems: ['Crispy Perch Bites', 'Lake Huron Whitefish', 'The Harbourview Burger'],
  teaserCta: 'See the whole menu',
  roomHeading: 'Two rooms, one kitchen',
  roomBody: 'The bar side is loud, first-come, and open latest. The dining room is quieter, takes the big tables, and looks straight down the harbour.',
  roomPhoto: {
    file: 'room-bar',
    subject: 'The bar side at capacity, tap wall backlit, people at the rail, shot from the doorway',
    alt: 'The bar side of Harbourview with guests along the rail and the tap wall lit behind',
  },
  locationHeading: 'Finding us',
  locationBody: 'On the water at the foot of Harbourview Lane, two minutes from the Port Credit GO station.',
  mapLabel: 'Map — 48 Harbourview Lane, Port Credit',
  footerCtaHeading: 'Skip the line',
  footerCtaBody: 'Order ahead and collect at the bar. Everything runs on the same kitchen.',
  footerCtaButton: 'Start an order',
};

export const order = {
  eyebrow: 'Pickup',
  heading: 'Order ahead, collect at the bar',
  intro: 'Build your order, pay online, and pick it up at the bar without waiting for a table. Same kitchen, same menu.',
  embedLabel: 'Clover Online Ordering — embeds here',
  embedNote: 'This is the slot the live ordering system sits in.',
  explainerHeading: 'It runs on the Clover account you already have',
  explainerBody: 'Orders and payment go through the restaurant’s existing Clover merchant account. No second gateway to sign, no extra processing fees, and the tickets print in the kitchen the same way a dine-in order does.',
  stepsHeading: 'How pickup works',
  steps: [
    { title: 'Order and pay', detail: 'Everything is charged online, so there is nothing to settle at the counter.' },
    { title: 'Give it about 20 minutes', detail: 'Longer on a Friday after seven. The confirmation screen gives you the real number.' },
    { title: 'Collect at the bar', detail: 'Come in the main door and go left. Give the name on the order.' },
  ],
  fallbackHeading: 'Rather do it by phone',
  fallbackBody: 'Call the bar directly and someone will take it down. Best before six on a weekend.',
  fallbackCta: 'Call the bar',
};

export const about = {
  eyebrow: 'Since 2011',
  heading: 'A family bought a room on the water',
  story: [
    'The building was a bait shop, then a sandwich counter, then empty for two years. Nadia and her father took the lease in 2011 because the windows faced the harbour and nobody else wanted the draft.',
    'The room has been full most nights since. The bar side came in 2016 when the unit next door opened up, and the two have shared one kitchen ever since.',
  ],
  sourcingPhoto: {
    file: 'sourcing',
    subject: 'Crates of Ontario produce on the loading step at open, morning light, hands unloading',
    alt: 'Crates of Ontario produce being unloaded at the kitchen door in the morning',
  },
  sourcingHeading: 'Where it comes from',
  sourcingBody: 'The fish is Great Lakes, the beef is from a farm outside Guelph, and the produce comes off a Tuesday run to the Ontario Food Terminal. The menu changes when the supply does.',
  staffHeading: 'Who is in the room',
  eventsHeading: 'Private events',
  eventsBody: 'The dining room seats forty for a buyout and takes groups of twelve and up any night. Call or email and ask for Nadia — there is no form for this, because a party is a conversation.',
  eventsPhoneCta: 'Call the room',
  eventsEmailCta: 'Email Nadia',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Where we are, when we are open',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'Kitchen closes an hour before the bar, every night.',
  hoursTable: { day: 'Day', bar: 'Bar', kitchenCloses: 'Kitchen closes' },
  gettingHereHeading: 'Parking and transit',
  gettingHere: [
    { title: 'Parking', detail: 'Free lot behind the building, twenty-two spots. Street parking on Harbourview Lane is two hours until 9pm.' },
    { title: 'GO Transit', detail: 'Port Credit GO is a seven-minute walk. Lakeshore West line.' },
    { title: 'MiWay', detail: 'Routes along Lakeshore Road stop at the corner, one block up.' },
  ],
  mapLabel: 'Map — 48 Harbourview Lane, Port Credit',
  formHeading: 'Send a message',
  formNote: 'For anything that is not a booking. We answer within a day.',
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
    successBody: 'Thanks — someone from the room will get back to you within a day.',
  },
};

export const footer = {
  tagline: 'Waterfront bar and grill, Port Credit, Ontario.',
  hoursHeading: 'Hours',
  findUsHeading: 'Find us',
  /** the fictional business's own copyright line, not Linova's */
  legal: `© ${new Date().getFullYear()} Harbourview Bar & Grill. Sample site — not a real business.`,
};

/** Menu lookup for the home page teaser, so a dish is written once. */
export const findMenuItem = (name: string): MenuItem | undefined => {
  for (const section of menu) {
    const match = section.items.find((item) => item.name === name);
    if (match) return match;
  }
  return undefined;
};

/** "11:30" -> 690. Values past 24:00 stay linear, which is the whole point. */
export const toMinutes = (time: string): number => {
  const [h = '0', m = '0'] = time.split(':');
  return Number(h) * 60 + Number(m);
};

/** 690 -> "11:30 am". Hours past midnight wrap for display only. */
export const formatTime = (time: string): string => {
  const total = toMinutes(time) % (24 * 60);
  const hour24 = Math.floor(total / 60);
  const minute = total % 60;
  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return minute === 0 ? `${hour12} ${suffix}` : `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
};

/** "24:00"/"25:00" -> "00:00"/"01:00" for schema.org, which wants a wall clock. */
export const toSchemaTime = (time: string): string => {
  const total = toMinutes(time) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
