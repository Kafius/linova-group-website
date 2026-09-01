// Gravel Road Tacos — the sample site for the F&B Food Truck Lite playbook.
// A fictional birria and al pastor truck working the greater Toronto area;
// nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: Analytics, Domain. That is the whole list.
// Deliberately absent: SEO Setup, e-commerce, CMS, CRM and booking.
//
// The absences are the point of this one, and two of them are worth saying
// out loud on a call:
//
//   · No SEO Setup. The page passes seo={false} to DemoLayout, so its head
//     is title, charset and viewport — no description, no canonical, no Open
//     Graph, no JSON-LD. View-source this next to Sumac Street, which is the
//     same tier plus SEO, and the difference is the line item.
//   · No CMS. The schedule below is the one thing this business changes every
//     week, and at $500 it is edited here in the data module rather than in a
//     studio. That is the honest trade, and it is the upgrade conversation.
//
// The catering block is a phone number and an email, not a form. Booking and
// CRM are both false, so there is nothing to submit to.
//
// Fourth demo on the `restaurants` vertical, sharing a switcher with
// Harbourview, Sumac Street and Fernrock. Deliberately unlike all three:
// poster yellow rather than cream or off-white, a heavy slab rather than a
// serif or a geometric sans, black hairlines, hard offset shadows and stickers
// set on an angle. This is the scrappy one.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type StopStatus = 'confirmed' | 'weather' | 'festival';

export interface Stop {
  id: string;
  /** the weekday, written out */
  day: string;
  /** the calendar date as the owner would say it aloud */
  date: string;
  place: string;
  address: string;
  city: string;
  from: string;
  until: string;
  status: StopStatus;
  /** the one thing worth knowing about this stop */
  note: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** CAD */
  price: number;
  /** the loud sticker on a couple of items — never on more than two */
  flag?: string;
  dietary?: ('V' | 'VG')[];
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Poster yellow, chilli red, jade green, black. No other demo in the
 *  catalogue has a saturated base or a green accent, which is most of how
 *  this one stays apart from the other three restaurants in the switcher.
 *  `inkLine` is deliberately near-black: every border in this demo is a
 *  sticker outline, not a hairline rule. */
export const theme: DemoTheme = {
  ink: '#FFEFC9',
  inkRaised: '#FFE29A',
  /** the outline colour — thick and black, everywhere */
  inkLine: '#17120C',
  /** chilli red band */
  paper: '#B21D1D',
  paperRaised: '#9A1717',
  paperLine: '#17120C',
  /** jade on poster yellow (6.3:1) */
  accent: '#0A6038',
  /** poster yellow on the red band (5.2:1) */
  accentOnPaper: '#FFE066',
  onInk: '#17120C',
  onInkDim: 'rgba(23, 18, 12, 0.76)',
  onPaper: '#FFF3D6',
  onPaperDim: 'rgba(255, 243, 214, 0.93)',
  onAccent: '#FFFFFF',
  displayFont: '"Alfa Slab One", "Rockwell", Georgia, serif',
  bodyFont: '"Chivo", "Segoe UI", system-ui, sans-serif',
  radius: '3px',
};

export const fonts = [
  { family: 'Alfa Slab One', file: 'alfa-slab-one-latin-400.woff2', weight: '400' },
  { family: 'Chivo', file: 'chivo-latin-var.woff2', weight: '400 800' },
];

export const business: DemoBusiness = {
  name: 'Gravel Road Tacos',
  shortName: 'Gravel Road',
  positioning: 'Birria and al pastor out of a truck. Different corner every week, greater Toronto.',
  address: {
    street: 'Mobile — see this week’s stops',
    city: 'Toronto',
    region: 'ON',
    postalCode: '',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(416) 555-0192',
  phoneHref: 'tel:+14165550192',
  email: 'hola@gravelroadtacos.ca',
  emailHref: 'mailto:hola@gravelroadtacos.ca',
};

/** ── THE SCHEDULE ────────────────────────────────────────────────────────
 *  The hook of this build. A food truck's website exists to answer one
 *  question — where are you today — and this is the block that answers it.
 *
 *  It is written to be edited by hand every Sunday night: change `weekOf`,
 *  then edit the seven rows. Nothing else on the page needs touching, and no
 *  build step depends on the order. On a package with the CMS line item this
 *  is the collection that would move into a studio; at this tier it does not,
 *  and saying so is more useful than pretending otherwise.
 *  ───────────────────────────────────────────────────────────────────────── */
export const weekOf = 'Week of 14 September';

export const schedule: Stop[] = [
  {
    id: 'tue',
    day: 'Tuesday',
    date: 'Sep 15',
    place: 'Evergreen Brick Works',
    address: '550 Bayview Ave',
    city: 'Toronto',
    from: '11:30',
    until: '14:30',
    status: 'confirmed',
    note: 'Lunch only. We park by the kiln building, not the main lot.',
  },
  {
    id: 'wed',
    day: 'Wednesday',
    date: 'Sep 16',
    place: 'Sheridan College, Trafalgar',
    address: '1430 Trafalgar Rd',
    city: 'Oakville',
    from: '11:00',
    until: '15:00',
    status: 'confirmed',
    note: 'Student pricing on the al pastor. Bring the card.',
  },
  {
    id: 'thu',
    day: 'Thursday',
    date: 'Sep 17',
    place: 'Bloordale Beer Co.',
    address: '1174 Bloor St W',
    city: 'Toronto',
    from: '17:00',
    until: '21:30',
    status: 'confirmed',
    note: 'Their taps, our tacos. Kitchen is theirs until five, ours after.',
  },
  {
    id: 'fri',
    day: 'Friday',
    date: 'Sep 18',
    place: 'Downsview Park Night Market',
    address: '70 Canuck Ave',
    city: 'Toronto',
    from: '16:00',
    until: '22:00',
    status: 'festival',
    note: 'Festival pricing, cash and card. Expect a queue after seven.',
  },
  {
    id: 'sat',
    day: 'Saturday',
    date: 'Sep 19',
    place: 'Downsview Park Night Market',
    address: '70 Canuck Ave',
    city: 'Toronto',
    from: '12:00',
    until: '22:00',
    status: 'festival',
    note: 'Second day. We usually run out of birria by nine.',
  },
  {
    id: 'sun',
    day: 'Sunday',
    date: 'Sep 20',
    place: 'Leslieville Farmers Market',
    address: 'Jonathan Ashbridge Park',
    city: 'Toronto',
    from: '09:00',
    until: '14:00',
    status: 'weather',
    note: 'Outdoor market. If it is properly raining we do not come out.',
  },
  {
    id: 'mon',
    day: 'Monday',
    date: 'Sep 21',
    place: 'Closed',
    address: 'Prep day',
    city: '',
    from: '',
    until: '',
    status: 'confirmed',
    note: 'The birria takes six hours and somebody has to sleep.',
  },
];

export const statusLabels: Record<StopStatus, string> = {
  confirmed: 'Confirmed',
  weather: 'Weather permitting',
  festival: 'Festival',
};

export const menu: MenuItem[] = [
  {
    id: 'birria',
    name: 'Birria de Res',
    description: 'Three tacos, beef shoulder cooked six hours, dipped and griddled. Consomé comes with it.',
    price: 16,
    flag: 'The one to get',
  },
  {
    id: 'quesabirria',
    name: 'Quesabirria',
    description: 'Two, with Oaxaca cheese pulled through the middle. Messier and worth it.',
    price: 14,
  },
  {
    id: 'al-pastor',
    name: 'Al Pastor',
    description: 'Three tacos off the trompo, pineapple, onion, cilantro. Carved to order or not at all.',
    price: 15,
    flag: 'Off the trompo',
  },
  {
    id: 'carnitas',
    name: 'Carnitas',
    description: 'Three tacos, pork shoulder confit then crisped on the flat top. Salsa verde as standard.',
    price: 15,
  },
  {
    id: 'pollo',
    name: 'Pollo Asado',
    description: 'Three tacos, thigh meat marinated overnight in achiote and orange.',
    price: 14,
  },
  {
    id: 'nopales',
    name: 'Nopales y Frijol',
    description: 'Three tacos, grilled cactus, black bean, pickled red onion. Not an afterthought.',
    price: 13,
    dietary: ['VG'],
  },
  {
    id: 'consome',
    name: 'Consomé',
    description: 'A cup of the birria broth on its own. Order it if the queue was long.',
    price: 5,
  },
  {
    id: 'elote',
    name: 'Elote',
    description: 'Grilled corn, crema, cotija, lime, chilli. Eaten standing up, over the bin.',
    price: 6,
    dietary: ['V'],
  },
  {
    id: 'chips',
    name: 'Chips & Salsa Roja',
    description: 'Fried to order, which is why they take four minutes.',
    price: 7,
    dietary: ['VG'],
  },
  {
    id: 'horchata',
    name: 'Horchata',
    description: 'Made in the morning, gone by evening. Jarritos in the cooler when it is not.',
    price: 4,
    dietary: ['V'],
  },
];

export const dietaryLegend: { marker: 'V' | 'VG'; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan as served' },
];

const BASE = '/industries/restaurants/preview/fnb-food-truck-lite/';

/** A one-pager, so the nav is anchors and the brand goes to the top. */
export const navigation: DemoNavigation = {
  links: [
    { href: '#where', label: 'Where we are' },
    { href: '#menu', label: 'Menu' },
    { href: '#catering', label: 'Catering' },
    { href: '#follow', label: 'Follow' },
  ],
  cta: { href: business.phoneHref, label: 'Call the truck', event: 'phone_tap_nav' },
  brandHref: BASE,
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
  tagline: 'A truck, two grills and a trompo. Greater Toronto, seven days when the weather holds.',
  rowsHeading: 'This week',
  findUsHeading: 'Reach us',
  legal: `© ${new Date().getFullYear()} Gravel Road Tacos. Sample site — not a real business.`,
};

/** Only `title` is used: the page renders with seo={false}, so the
 *  description never reaches the head. It is kept here because the day this
 *  client buys the SEO line item, it is one prop change and the copy is
 *  already written. */
export const pageMeta: Record<'home', DemoPageMeta> = {
  home: {
    title: 'Gravel Road Tacos — birria and al pastor, greater Toronto',
    description:
      'A birria and al pastor truck working the greater Toronto area. This week’s stops, the menu, and the number to call about catering.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
};

export const home = {
  heroSticker: 'Truck, not a restaurant',
  heroTitle: 'Birria, al pastor, a different corner every week',
  heroBody:
    'Six hours on the beef, a trompo that gets carved to order, and a schedule that changes on Sunday night. Find the truck below.',
  heroPrimaryCta: 'Where we are this week',
  heroSecondaryCta: 'See the menu',
  heroPhoto: {
    file: 'hero-truck',
    subject:
      'Bright food truck service window at dusk with string lights, hand-painted signage, a short queue on the pavement',
    alt: 'The Gravel Road Tacos service window at dusk',
  },

  whereSticker: 'The whole point',
  whereHeading: 'Where we are this week',
  whereBody:
    'Updated Sunday night. If the truck is not where this says it is, the schedule is wrong and the phone is right.',
  whereLegendHeading: 'What the tags mean',
  whereLegend: [
    { status: 'confirmed' as StopStatus, detail: 'Booked and paid for. We will be there.' },
    { status: 'festival' as StopStatus, detail: 'A festival pitch. Different pricing, longer queue.' },
    { status: 'weather' as StopStatus, detail: 'Outdoor and uncovered. Heavy rain and we stay home.' },
  ],
  whereClosedLabel: 'Closed',
  whereCallCta: 'Call before you drive',

  menuSticker: 'Ten things',
  menuHeading: 'The menu',
  menuBody:
    'It does not change. Prices in CAD, tax in. Card and cash at the window, and the machine works even when the signal does not.',
  menuLegendLabel: 'Dietary markers',
  menuSoldOutNote:
    'Birria runs out before we close on a good night. That is not a marketing line, it is a six-hour cook and one pot.',

  cateringSticker: 'We come to you',
  cateringHeading: 'Catering and private events',
  cateringBody:
    'Weddings, work parties, film crews, anything with more than forty people standing around hungry. The truck brings its own power and leaves nothing behind.',
  cateringWhatHeading: 'Tell us four things',
  cateringWhat: [
    'The date, and whether it moves',
    'How many people, roughly',
    'Where it is, and whether we can park within thirty feet',
    'Indoors or out — the trompo cannot go inside',
  ],
  cateringTerms: [
    { label: 'Minimum', value: '40 people' },
    { label: 'Lead time', value: '3 weeks' },
    { label: 'Travel', value: 'Free inside the 401 ring' },
    { label: 'Deposit', value: '25%, invoiced' },
  ],
  cateringCallCta: 'Call about catering',
  cateringEmailCta: 'Email us instead',
  cateringNoFormNote:
    'There is no form here on purpose. Ring the number or send the email and you get a person the same day, which is faster than anything we could build.',

  followSticker: 'Sunday nights',
  followHeading: 'The schedule changes. Follow along.',
  followBody:
    'Stops go up Sunday night, and sell-outs go up as they happen. If you only do one of these, do the first.',
  followLinks: [
    { name: 'Instagram', handle: '@gravelroadtacos', detail: 'Stops, sell-outs, and the trompo on a Friday.' },
    { name: 'Text list', handle: 'Text TRUCK to the number', detail: 'One message a week, Sunday, with the stops.' },
    { name: 'Facebook', handle: 'Gravel Road Tacos', detail: 'The same posts, for the people who ask for them.' },
  ],
  followNote: 'Handles are demo content and go nowhere.',
};

export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
