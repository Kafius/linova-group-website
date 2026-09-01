// Ironwood Barber Co. — the sample site for the Appointment Business
// playbook. A fictional four-chair barbershop in Hamilton; nothing here is a
// real business, and the demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file. The .astro pages under
// src/pages/industries/barbershops/preview/appointment-business/ hold layout
// and nothing else.
//
// Flags for this playbook: SEO, Analytics, Booking, Domain.
// Deliberately absent: e-commerce, CMS and CRM. There is no cart, no content
// editor and no lead pipeline anywhere in this demo. A barbershop needs a
// booking flow, not a shopping cart, and that contrast is the pitch.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export interface Service {
  id: string;
  name: string;
  description: string;
  /** minutes in the chair, including the tidy-up */
  minutes: number;
  /** CAD base price, before the barber's rate */
  price: number;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  /** what people book them for */
  specialties: string[];
  bio: string;
  /** added to the service's base price — a master barber costs more */
  surcharge: number;
  photo: { file: string; subject: string; alt: string };
}

export interface ShopDay {
  day: string;
  short: string;
  schemaDay: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Near-black, bone white, one brass accent. Hairline rules and a heavy
 *  condensed display face — the register is a shop sign, not a spa. */
export const theme: DemoTheme = {
  ink: '#111110',
  inkRaised: '#1A1A18',
  inkLine: '#2B2B27',
  paper: '#EDE9E0',
  paperRaised: '#E2DDD2',
  paperLine: '#CFC8B9',
  /** brass on near-black (7.9:1) */
  accent: '#C9A227',
  /** the same brass darkened for the bone ground (4.9:1) */
  accentOnPaper: '#7A6114',
  onInk: '#EDE9E0',
  onInkDim: 'rgba(237, 233, 224, 0.70)',
  onPaper: '#141412',
  onPaperDim: 'rgba(20, 20, 18, 0.72)',
  onAccent: '#111110',
  displayFont: '"Big Shoulders Display", "Haettenschweiler", Impact, sans-serif',
  bodyFont: '"Archivo", "Segoe UI", system-ui, sans-serif',
  radius: '2px',
};

export const fonts = [
  { family: 'Big Shoulders Display', file: 'big-shoulders-display-latin-var.woff2', weight: '400 900' },
  { family: 'Archivo', file: 'archivo-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Ironwood Barber Co.',
  shortName: 'Ironwood',
  positioning: 'Four chairs on Ironwood Row. Walk in, or take a slot.',
  address: {
    street: '218 Ironwood Row',
    neighbourhood: 'Corktown',
    city: 'Hamilton',
    region: 'ON',
    postalCode: 'L8N 0A9',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0173',
  phoneHref: 'tel:+19055550173',
  email: 'shop@ironwoodbarber.ca',
  emailHref: 'mailto:shop@ironwoodbarber.ca',
};

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '00:00', close: '00:00', closed: true },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '09:00', close: '19:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '09:00', close: '19:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '09:00', close: '19:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '09:00', close: '19:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '17:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '10:00', close: '16:00' },
];

export const services: Service[] = [
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    description: 'Clipper work down to skin, blended by hand. Includes the neck and a hot towel at the end.',
    minutes: 45,
    price: 45,
  },
  {
    id: 'scissor-cut',
    name: 'Scissor Cut',
    description: 'All scissor, no clippers. For length on top and anyone growing something out.',
    minutes: 45,
    price: 45,
  },
  {
    id: 'cut-and-beard',
    name: 'Cut & Beard',
    description: 'A full cut plus the beard shaped, lined and oiled. Book this one if it has been a while.',
    minutes: 60,
    price: 65,
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim & Line-Up',
    description: 'Shape, cheek line, neck line, hot towel. Twenty-five minutes and you look like you meant it.',
    minutes: 25,
    price: 30,
  },
  {
    id: 'straight-razor-shave',
    name: 'Straight-Razor Shave',
    description: 'The full thing: hot towels, pre-shave oil, lather, two passes with a straight razor, cold towel, balm.',
    minutes: 45,
    price: 55,
  },
  {
    id: 'head-shave',
    name: 'Head Shave',
    description: 'Clippers down, then a straight razor over the top. Finished with balm and a cold towel.',
    minutes: 35,
    price: 40,
  },
  {
    id: 'buzz-cut',
    name: 'Buzz Cut',
    description: 'One guard, all over, neck cleaned up. In and out in twenty minutes.',
    minutes: 20,
    price: 28,
  },
  {
    id: 'grey-blending',
    name: 'Grey Blending',
    description: 'Takes the hard edge off the grey without going flat black. Added to any cut.',
    minutes: 30,
    price: 35,
  },
  {
    id: 'kids-cut',
    name: "Kids' Cut",
    description: 'Under twelve. We keep it quick and there is a stool that goes on the chair.',
    minutes: 30,
    price: 32,
  },
  {
    id: 'father-and-son',
    name: 'Father & Son',
    description: 'Two cuts back to back in the same hour, one adult and one under twelve.',
    minutes: 60,
    price: 70,
  },
];

export const barbers: Barber[] = [
  {
    id: 'dez',
    name: 'Dez Okonkwo',
    role: 'Owner · Master Barber',
    specialties: ['Skin fades', 'Straight-razor shaves'],
    bio: 'Opened the shop in 2017 after eleven years on King Street. Books out about two weeks ahead, so plan it.',
    surcharge: 10,
    photo: {
      file: 'barber-dez',
      subject: 'Barber in his forties at the chair, clippers in hand, mirror and bottles behind, hard side light',
      alt: 'Dez Okonkwo working at his chair at Ironwood Barber Co.',
    },
  },
  {
    id: 'tomas',
    name: 'Tomas Herrera',
    role: 'Senior Barber',
    specialties: ['Scissor work', 'Textured crops'],
    bio: 'All-scissor cuts and anything with texture on top. The one to see if you are growing it out and it has hit the awkward stage.',
    surcharge: 5,
    photo: {
      file: 'barber-tomas',
      subject: 'Barber mid-scissor-cut, comb and shears raised, focused, warm shop light',
      alt: 'Tomas Herrera cutting with scissors at Ironwood Barber Co.',
    },
  },
  {
    id: 'mikey',
    name: 'Mikey Brant',
    role: 'Barber',
    specialties: ['Classic cuts', 'Beard sculpting'],
    bio: 'Side parts, taper fades and beards. Talks the whole way through it, which most people seem to want.',
    surcharge: 0,
    photo: {
      file: 'barber-mikey',
      subject: 'Barber shaping a beard with a trimmer, client in cape, close crop',
      alt: 'Mikey Brant shaping a beard at Ironwood Barber Co.',
    },
  },
  {
    id: 'sione',
    name: 'Sione Fifita',
    role: 'Barber',
    specialties: ['Buzz cuts', 'Kids', 'Grey blending'],
    bio: 'Fastest chair in the shop and the most patient with kids. Saturday mornings are his.',
    surcharge: 0,
    photo: {
      file: 'barber-sione',
      subject: 'Barber crouching to talk to a child in the barber chair, both laughing',
      alt: 'Sione Fifita cutting a child’s hair at Ironwood Barber Co.',
    },
  },
];

export const navigation: DemoNavigation = {
  links: [
    { href: '/industries/barbershops/preview/appointment-business/', label: 'Home' },
    { href: '/industries/barbershops/preview/appointment-business/services', label: 'Services & Pricing' },
    { href: '/industries/barbershops/preview/appointment-business/book', label: 'Book' },
    { href: '/industries/barbershops/preview/appointment-business/barbers', label: 'Our Barbers' },
    { href: '/industries/barbershops/preview/appointment-business/contact', label: 'Contact' },
  ],
  cta: { href: '/industries/barbershops/preview/appointment-business/book', label: 'Book a chair', event: 'book_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/barbershops',
};

export const footer: DemoFooter = {
  tagline: 'Four-chair barbershop on Ironwood Row, Hamilton. Walk-ins and appointments.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Ironwood Barber Co. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'services' | 'book' | 'barbers' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Ironwood Barber Co. — Barbershop in Corktown, Hamilton',
    description: 'Four-chair traditional barbershop on Ironwood Row. Skin fades, scissor cuts, beard work and straight-razor shaves. Walk in or book a chair online.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  services: {
    title: 'Services & Pricing — Ironwood Barber Co., Hamilton',
    description: 'Every service with the time it takes and what it costs. Cuts from $28, beard work from $30, straight-razor shaves at $55. Prices in CAD.',
    ogImage: '/og/default.png',
    breadcrumb: 'Services & Pricing',
  },
  book: {
    title: 'Book a Chair — Ironwood Barber Co., Hamilton',
    description: 'Pick a service, a barber, a day and a time. Four steps, no account, and you get a text the morning of.',
    ogImage: '/og/default.png',
    breadcrumb: 'Book',
  },
  barbers: {
    title: 'Our Barbers — Ironwood Barber Co., Hamilton',
    description: 'Four barbers, four sets of hands. Who does skin fades, who does scissor work, who is best with kids, and what each of them charges.',
    ogImage: '/og/default.png',
    breadcrumb: 'Our Barbers',
  },
  contact: {
    title: 'Contact & Hours — Ironwood Barber Co., Hamilton',
    description: 'Address, phone, hours and parking for Ironwood Barber Co. on Ironwood Row in Corktown, Hamilton. Closed Mondays.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Corktown, Hamilton',
  heroTitle: 'Four chairs. No app.',
  heroBody: 'A traditional shop that takes walk-ins and appointments. Skin fades, scissor cuts, beards and straight-razor shaves.',
  heroPrimaryCta: 'Book a chair',
  heroSecondaryCta: 'See the price list',
  heroPhoto: {
    file: 'hero-shop',
    subject: 'Four barber chairs in a row down a narrow shop, mirrors, tiled floor, low warm light',
    alt: 'The four chairs at Ironwood Barber Co. down the length of the shop',
  },
  walkinHeading: 'Walk in or book',
  walkinBody: 'There is always a chair held for walk-ins. Booking just means you are not standing on Ironwood Row for forty minutes on a Saturday.',
  popularHeading: 'What people book',
  popularNote: 'The full list runs to ten services.',
  /** ids must exist in `services` — the page looks them up */
  popularIds: ['skin-fade', 'cut-and-beard', 'straight-razor-shave'],
  popularCta: 'All services and prices',
  barbersHeading: 'Who is in this week',
  barbersCta: 'Meet the barbers',
  closerHeading: 'Take a slot',
  closerBody: 'Four steps, about a minute. You will get a text the morning of.',
  closerCta: 'Book a chair',
};

export const servicesPage = {
  eyebrow: 'Services & Pricing',
  heading: 'What it costs and how long it takes',
  intro: 'Base prices below. A senior barber adds five dollars and a master barber adds ten — the booking page shows the total before you confirm.',
  durationLabel: 'min',
  fromLabel: 'from',
  rateHeading: 'Barber rates',
  rateNote: 'Added to the base price above.',
  baseRateLabel: 'Base price',
  rateTable: { barber: 'Barber', role: 'Role', rate: 'Rate' },
  bookCta: 'Book this',
  allCta: 'Book a chair',
};

export const bookPage = {
  eyebrow: 'Booking',
  heading: 'Book a chair',
  intro: 'Four steps. No account, no card, nothing to download.',
  stepLabel: 'Step',
  ofLabel: 'of',
  steps: [
    { id: 'service', title: 'Pick a service', hint: 'Times below are how long the chair is held for.' },
    { id: 'barber', title: 'Pick a barber', hint: 'Or take whoever is free — it is usually faster.' },
    { id: 'when', title: 'Pick a day and time', hint: 'Greyed-out slots are already taken.' },
    { id: 'you', title: 'Your details', hint: 'We text a reminder the morning of, and that is the only thing we send.' },
  ],
  anyBarber: { id: 'any', name: 'No preference', role: 'First one free', detail: 'Usually the shortest wait.' },
  nextLabel: 'Next',
  backLabel: 'Back',
  confirmLabel: 'Confirm booking',
  summaryHeading: 'Your booking',
  dateLabel: 'Date',
  timeLabel: 'Time',
  serviceLabel: 'Service',
  barberLabel: 'Barber',
  totalLabel: 'Total',
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameError: 'We need a name for the chair.',
    phoneLabel: 'Mobile',
    phonePlaceholder: '(905) 555-0100',
    phoneError: 'Enter a mobile we can text the reminder to.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    emailError: 'Enter an email we can send the confirmation to.',
    notesLabel: 'Anything we should know',
    notesPlaceholder: 'Optional',
  },
  errors: {
    service: 'Pick a service to carry on.',
    barber: 'Pick a barber, or choose no preference.',
    date: 'Pick a day.',
    time: 'Pick a time.',
  },
  successHeading: 'Chair booked',
  successBody: 'You will get a confirmation by email and a text on the morning of. If you need to move it, call the shop.',
  successAgain: 'Book another',
  walkInNote: 'Changed your mind about booking? Walk-ins are taken all day, every day we are open.',
};

/** The slots the shop offers, and the ones already gone. On a live build the
 *  taken list comes from the barber's calendar; a sample site has no calendar
 *  to read, so it is stated here rather than invented at runtime. */
export const slots = {
  times: ['09:00', '09:45', '10:30', '11:15', '12:00', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00'],
  /** slot times that render as unavailable, so the grid looks like a real day */
  taken: ['10:30', '12:00', '15:00', '18:00'],
  takenLabel: 'Taken',
};

export const barbersPage = {
  eyebrow: 'Our Barbers',
  heading: 'Four barbers, four sets of hands',
  intro: 'People follow a barber, not a shop. Here is who does what, and what each of them adds to the base price.',
  specialtiesLabel: 'Books for',
  rateLabel: 'Rate',
  baseRate: 'Base price',
  bookWith: 'Book with',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Ironwood Row, Corktown',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'Closed Mondays. Last cut goes in thirty minutes before close.',
  hoursTable: { day: 'Day', open: 'Open' },
  closedLabel: 'Closed',
  gettingHereHeading: 'Parking and getting here',
  gettingHere: [
    { title: 'Parking', detail: 'Free on Ironwood Row after 9am, and the municipal lot on Ferguson is two minutes away.' },
    { title: 'Bus', detail: 'HSR routes along King stop at Wellington, a four-minute walk.' },
    { title: 'GO', detail: 'Hamilton GO Centre is a ten-minute walk through Corktown.' },
  ],
  mapLabel: 'Map — 218 Ironwood Row, Hamilton',
  walkInHeading: 'Walk-ins',
  walkInBody: 'There is always one chair held back. Quietest stretch is Tuesday and Wednesday afternoons; the longest wait is Saturday between ten and one.',
  bookCta: 'Book instead',
};

export const findService = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const findBarber = (id: string): Barber | undefined =>
  barbers.find((barber) => barber.id === id);
