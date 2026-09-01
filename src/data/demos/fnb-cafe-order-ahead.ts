// Fernrock Coffee & Bubble Tea — the sample site for the F&B Cafe / Order
// Ahead playbook. A fictional espresso bar and bubble tea shop in London,
// Ontario; nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, E-Commerce, Analytics, Domain.
// Deliberately absent: CMS, CRM and booking. Nobody books a coffee, and a
// twenty-one item menu does not need a content system behind it.
//
// Third demo on the `restaurants` vertical, sharing a switcher with
// Harbourview and Sumac Street. Deliberately neither: off-white and grape
// against two dark rooms, round geometry against their square, and a friendly
// geometric sans against a serif and a poster face.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type MenuLine = 'coffee' | 'tea' | 'boba' | 'food';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  line: MenuLine;
  /** CAD */
  price: number;
  /** drinks take milk, sweetness and ice choices; food does not */
  customisable: boolean;
  /** V = vegetarian, VG = vegan as served */
  dietary?: ('V' | 'VG')[];
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

/** Off-white and grape, with a second magenta reserved entirely for the
 *  bubble tea line. Big round corners. The register is a student-neighbourhood
 *  cafe, not a third-wave temple. */
export const theme: DemoTheme = {
  ink: '#FDFCF9',
  inkRaised: '#F4F1EA',
  inkLine: '#E4DFD4',
  /** deep grape — the contrast band */
  paper: '#2B1B4D',
  paperRaised: '#362459',
  paperLine: '#493670',
  /** grape on off-white (7.3:1) — coffee, tea and everything structural */
  accent: '#6A34B8',
  /** lifted for the grape band (7.9:1) */
  accentOnPaper: '#C9AEF5',
  /** magenta on off-white (6.2:1) — the bubble tea line only */
  accentAlt: '#B01E7A',
  /** lifted for the grape band (7.7:1) */
  accentAltOnPaper: '#F79ACB',
  onInk: '#241C33',
  onInkDim: 'rgba(36, 28, 51, 0.74)',
  onPaper: '#F3EEFB',
  onPaperDim: 'rgba(243, 238, 251, 0.78)',
  onAccent: '#FFFFFF',
  onAccentAlt: '#FFFFFF',
  displayFont: '"Gabarito", "Trebuchet MS", system-ui, sans-serif',
  bodyFont: '"Manrope", "Segoe UI", system-ui, sans-serif',
  radius: '14px',
};

export const fonts = [
  { family: 'Gabarito', file: 'gabarito-latin-var.woff2', weight: '400 900' },
  { family: 'Manrope', file: 'manrope-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Fernrock Coffee & Bubble Tea',
  shortName: 'Fernrock',
  positioning: 'Espresso and boba on Fernrock Lane, London. Laptops welcome until four.',
  address: {
    street: '88 Fernrock Lane',
    neighbourhood: 'Old East Village',
    city: 'London',
    region: 'ON',
    postalCode: 'N5W 0A7',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(519) 555-0181',
  phoneHref: 'tel:+15195550181',
  email: 'hey@fernrockcoffee.ca',
  emailHref: 'mailto:hey@fernrockcoffee.ca',
};

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '07:00', close: '18:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '07:00', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '07:00', close: '18:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '07:00', close: '20:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '07:00', close: '20:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '18:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '08:00', close: '17:00' },
];

export const lines: { id: MenuLine; name: string; blurb: string; alt?: boolean }[] = [
  { id: 'coffee', name: 'Coffee', blurb: 'One espresso, pulled the same way all day. Beans from a roaster two hours up the 401.' },
  { id: 'tea', name: 'Tea', blurb: 'Hojicha, matcha and a loose-leaf pot that comes with a second steep.' },
  { id: 'boba', name: 'Bubble Tea', blurb: 'Tapioca cooked in small batches through the day, never in the morning for the evening.', alt: true },
  { id: 'food', name: 'Food', blurb: 'Pastry from a bakery on Dundas, in at seven, usually gone by two.' },
];

export const menu: MenuItem[] = [
  // Coffee
  { id: 'espresso', name: 'Espresso', description: 'Two ounces, a little chocolate, no bitterness at the end.', line: 'coffee', price: 3.25, customisable: false },
  { id: 'americano', name: 'Americano', description: 'Espresso over hot water. Ask for it long and we will pull it longer.', line: 'coffee', price: 3.75, customisable: true },
  { id: 'cortado', name: 'Cortado', description: 'Equal parts espresso and steamed milk, in a glass, drunk fast.', line: 'coffee', price: 4.25, customisable: true },
  { id: 'cappuccino', name: 'Cappuccino', description: 'Six ounces with real foam on it, not a latte wearing a hat.', line: 'coffee', price: 4.5, customisable: true },
  { id: 'latte', name: 'Latte', description: 'Twelve ounces. House vanilla, brown sugar or hazelnut syrup if you want one.', line: 'coffee', price: 4.75, customisable: true },
  { id: 'batch-brew', name: 'Batch Brew', description: 'Filter coffee, brewed fresh every forty minutes. Free refills before ten.', line: 'coffee', price: 3.25, customisable: true },

  // Tea
  { id: 'hojicha-latte', name: 'Hojicha Latte', description: 'Roasted green tea, toasty rather than grassy. The one to order if matcha is not for you.', line: 'tea', price: 5.25, customisable: true },
  { id: 'matcha-latte', name: 'Matcha Latte', description: 'Ceremonial grade, whisked to order, sweetened only if you ask.', line: 'tea', price: 5.5, customisable: true },
  { id: 'loose-leaf', name: 'Loose Leaf Pot', description: 'A pot for one with enough leaf for a second steep. Ask what is open today.', line: 'tea', price: 4.5, customisable: false },
  { id: 'london-fog', name: 'London Fog', description: 'Earl Grey, steamed milk, house vanilla. Named for the wrong London, we know.', line: 'tea', price: 5, customisable: true },

  // Bubble Tea
  { id: 'classic-milk-tea', name: 'Classic Milk Tea', description: 'Black tea and milk with tapioca. The baseline everything else is measured against.', line: 'boba', price: 6.25, customisable: true },
  { id: 'brown-sugar-boba', name: 'Brown Sugar Boba', description: 'Tapioca cooked in brown sugar syrup, striped up the glass, with fresh milk.', line: 'boba', price: 6.95, customisable: true },
  { id: 'taro-milk-tea', name: 'Taro Milk Tea', description: 'Real taro, steamed and blended here, which is why it is grey rather than purple.', line: 'boba', price: 6.75, customisable: true },
  { id: 'jasmine-green', name: 'Jasmine Green Milk Tea', description: 'Lighter and floral. Good at fifty per cent sweetness, better at twenty-five.', line: 'boba', price: 6.25, customisable: true },
  { id: 'mango-green', name: 'Mango Green Tea', description: 'Fruit tea, no milk, with popping boba instead of tapioca if you prefer.', line: 'boba', price: 6.5, customisable: true, dietary: ['VG'] },
  { id: 'strawberry-matcha', name: 'Strawberry Matcha Latte', description: 'Strawberry purée under matcha and milk. Stir it or drink it in layers.', line: 'boba', price: 7.25, customisable: true },

  // Food
  { id: 'butter-croissant', name: 'Butter Croissant', description: 'From the bakery on Dundas, in at seven, warmed on request.', line: 'food', price: 4.25, customisable: false, dietary: ['V'] },
  { id: 'almond-croissant', name: 'Almond Croissant', description: 'Yesterday’s croissant, twice-baked with frangipane, which is the correct way.', line: 'food', price: 5.25, customisable: false, dietary: ['V'] },
  { id: 'morning-bun', name: 'Cinnamon Morning Bun', description: 'Laminated, rolled in cinnamon sugar. Sells out before ten most days.', line: 'food', price: 5, customisable: false, dietary: ['V'] },
  { id: 'banana-bread', name: 'Banana Bread', description: 'Thick slice, toasted with butter if you want it that way.', line: 'food', price: 4.5, customisable: false, dietary: ['V'] },
  { id: 'toastie', name: 'Ham & Gruyère Toastie', description: 'Pressed on sourdough with mustard butter. The only hot food we do.', line: 'food', price: 9.5, customisable: false },
];

export const dietaryLegend: { marker: 'V' | 'VG'; label: string }[] = [
  { marker: 'V', label: 'Vegetarian' },
  { marker: 'VG', label: 'Vegan as served' },
];

/** The three choices every drink takes. Stated once rather than repeated on
 *  twenty items — and the same list the Clover ordering modifiers mirror. */
export const customisation = {
  heading: 'Every drink, three choices',
  note: 'Ask at the counter or set them in the online order. No charge for any of it except the milk.',
  groups: [
    { label: 'Milk', options: ['Whole', 'Oat (+$0.75)', 'Soy', 'Lactose-free'] },
    { label: 'Sweetness', options: ['0%', '25%', '50%', '75%', '100%'] },
    { label: 'Ice', options: ['None', 'Less', 'Regular'] },
  ],
  drinkTag: 'Customisable',
};

const BASE = '/industries/restaurants/preview/fnb-cafe-order-ahead/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}menu`, label: 'Menu' },
    { href: `${BASE}order`, label: 'Order Ahead' },
    { href: `${BASE}coffee`, label: 'Our Coffee' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}order`, label: 'Order ahead', event: 'order_cta_nav' },
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
  tagline: 'Espresso bar and bubble tea in Old East Village, London. Open every day.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Fernrock Coffee & Bubble Tea. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'menu' | 'order' | 'coffee' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Fernrock Coffee & Bubble Tea — Old East Village, London',
    description: 'Espresso bar and bubble tea on Fernrock Lane, London Ontario. House syrups, small-batch tapioca, pastry from Dundas, and laptops welcome until four.',
    ogImage: '/og/default.png', breadcrumb: 'Home',
  },
  menu: {
    title: 'Menu — Fernrock Coffee & Bubble Tea, London',
    description: 'Coffee, tea, bubble tea and food. Twenty-one items with prices in CAD, and three customisation choices on every drink.',
    ogImage: '/og/default.png', breadcrumb: 'Menu',
  },
  order: {
    title: 'Order Ahead — Fernrock Coffee & Bubble Tea',
    description: 'Order ahead for pickup on Fernrock Lane. Set milk, sweetness and ice online, pay in the app, and collect at the end of the bar.',
    ogImage: '/og/default.png', breadcrumb: 'Order Ahead',
  },
  coffee: {
    title: 'Our Coffee — Fernrock Coffee & Bubble Tea, London',
    description: 'Where the beans come from, what goes into the house syrups, and how the tapioca is cooked through the day rather than in one batch.',
    ogImage: '/og/default.png', breadcrumb: 'Our Coffee',
  },
  contact: {
    title: 'Contact & Hours — Fernrock Coffee & Bubble Tea, London',
    description: 'Address, phone, hours and the wifi situation for Fernrock on Fernrock Lane, Old East Village, London Ontario.',
    ogImage: '/og/default.png', breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Old East Village, London',
  heroTitle: 'Espresso at the front, boba at the back',
  heroBody: 'One espresso machine, four tea bases, and tapioca cooked in small batches so the four o’clock cup is not the seven o’clock cup.',
  heroPrimaryCta: 'Order ahead',
  heroSecondaryCta: 'See the menu',
  heroPhoto: {
    file: 'hero-bar',
    subject: 'Cafe counter from the customer side, espresso machine and boba station both in frame, bright daylight',
    alt: 'The counter at Fernrock with the espresso machine and boba station',
  },
  linesHeading: 'Four things we make',
  linesCta: 'The whole menu',
  laptopHeading: 'Laptops until four',
  laptopBody: 'Plugs down the long wall, wifi with no password on the wall, and nobody is going to move you along. After four the tables are for people talking, and we will ask.',
  laptopPoints: [
    'Fourteen seats, six with a plug',
    'Wifi is on the chalkboard, no password',
    'Quietest between ten and noon',
  ],
  bobaHeading: 'About the tapioca',
  bobaBody: 'Cooked in batches through the day, roughly every three hours. Once a batch is past its window it comes off the line rather than going in a cup, which is why we occasionally run out at nine at night.',
  bobaCta: 'How we do it',
  orderHeading: 'Order ahead, walk past the line',
  orderBody: 'Set your milk, sweetness and ice in the order. Pay online and it is on the pickup shelf with your name on it.',
  orderCta: 'Start an order',
  closerHeading: 'Come in',
  closerBody: 'On Fernrock Lane, in the block with the mural. The door is the green one.',
  closerCta: 'Hours and directions',
};

export const menuPage = {
  eyebrow: 'Menu',
  heading: 'Everything we make',
  intro: 'Twenty-one items. Prices in CAD, and every drink takes the three choices below.',
  legendLabel: 'Dietary markers',
  jumpLabel: 'Jump to',
  orderCta: 'Order ahead',
  bobaNote: 'The bubble tea line is marked in pink throughout the site, including on the menu and in the online order.',
};

export const orderPage = {
  eyebrow: 'Order Ahead',
  heading: 'Order ahead for pickup',
  intro: 'Build the drink exactly as you would at the counter, pay online, and collect at the end of the bar without queueing.',
  embedLabel: 'Clover Online Ordering — embeds here',
  embedNote: 'This is the slot the live ordering system sits in.',
  explainerHeading: 'It runs on the Clover account you already have',
  explainerBody: 'Orders and payment go through the shop’s existing Clover merchant account, and the modifiers customers pick online are the same modifiers the till uses. No second gateway, no extra processing fees, and the ticket prints at the bar the same way a counter order does.',
  modifiersHeading: 'The modifiers carry across',
  modifiersBody: 'Milk, sweetness and ice are set in the order and print on the ticket, so nobody at the bar has to guess or call your name to ask.',
  stepsHeading: 'How pickup works',
  steps: [
    { title: 'Build and pay', detail: 'Everything settles online, so there is nothing to sort at the counter.' },
    { title: 'About 8 minutes', detail: 'Longer between eight and nine on a weekday. The confirmation gives you the real number.' },
    { title: 'End of the bar', detail: 'Pickup shelf past the till, name on the cup. Boba gets a lid and a wide straw.' },
  ],
  fallbackHeading: 'Or just call',
  fallbackBody: 'If the order is complicated or it is for a whole office, the phone is faster than the app.',
  fallbackCta: 'Call the bar',
};

export const coffeePage = {
  eyebrow: 'Our Coffee',
  heading: 'Where it comes from and what we do to it',
  intro: 'Short answers, because a cafe that writes three paragraphs about terroir is usually charging you for the paragraphs.',
  sections: [
    {
      title: 'The beans',
      body: 'A roaster two hours up the 401 sends us a seasonal espresso and one filter every fortnight. We do not name origins on the board because they change faster than the board does — ask and whoever is on bar will tell you what is in the hopper.',
      photo: { file: 'beans', subject: 'Hand tipping beans from a bag into a grinder hopper, close, warm morning light', alt: 'Beans being tipped into the grinder at Fernrock' },
    },
    {
      title: 'The syrups',
      body: 'Vanilla, brown sugar and hazelnut, made here on a Monday from sugar, water and the actual ingredient. They are unremarkable and that is the point: a syrup should not be the loudest thing in a latte.',
      photo: { file: 'syrups', subject: 'Three labelled syrup bottles on a back counter, handwritten tape labels, soft light', alt: 'House syrup bottles with handwritten labels on the back counter' },
    },
    {
      title: 'The tapioca',
      body: 'Cooked in small batches roughly every three hours, rested in syrup, and pulled from the line once it is past its window. Fresh tapioca is chewy in the middle and soft at the edge; day-old tapioca is neither, and we would rather run out.',
      photo: { file: 'tapioca', subject: 'Tapioca pearls being lifted from a pot with a strainer, steam rising, close crop', alt: 'Tapioca pearls being strained from the pot at Fernrock' },
    },
  ],
  closerHeading: 'Try it',
  closerBody: 'The batch brew is the cheapest way to find out whether you like what we buy.',
  closerCta: 'Order ahead',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Fernrock Lane, Old East Village',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'Open every day. Late on Thursday and Friday, when the boba line is longest.',
  hoursTable: { day: 'Day', open: 'Open' },
  gettingHereHeading: 'Getting here and sitting down',
  gettingHere: [
    { title: 'Parking', detail: 'Street parking on Fernrock, free after six. The municipal lot on Dundas is two minutes.' },
    { title: 'Wifi and plugs', detail: 'No password, it is on the chalkboard. Six seats have a plug. Laptops until four.' },
    { title: 'Accessibility', detail: 'Level entry from the lane, and the washroom is accessible. The back room has a step.' },
  ],
  mapLabel: 'Map — 88 Fernrock Lane, London',
  orderCta: 'Order ahead instead',
};

export const itemsIn = (line: MenuLine): MenuItem[] => menu.filter((item) => item.line === line);

export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);
