// Stillwater Spa & Salon — the sample site for the Multi-Service Spa / Salon
// playbook. A fictional spa and salon in Burlington; nothing here is a real
// business, and the demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, CMS, Analytics, Booking, Domain.
// Deliberately absent: e-commerce and CRM. Nothing is sold online — deposits
// and the final bill go through the Clover terminal at the desk.
//
// The service menu is the CMS-modelled collection (see the .cms.ts stub), and
// that is not decoration: this business reprices seasonally, which is the
// actual reason CMS is in the Standard package and out of the F&B one.
//
// Second demo on the `barbershops` vertical, sharing a switcher with Ironwood.
// Deliberately its opposite: greige and sage against near-black, a delicate
// serif against a heavy condensed sans, air against density.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type CategoryId = 'hair' | 'nails' | 'spa';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  /** minutes in the chair or on the table */
  minutes: number;
  /** CAD. Seasonal — this is the field the CMS exists to let them change. */
  price: number;
  /** true where the price is a starting figure that depends on length or condition */
  from?: boolean;
}

export interface Practitioner {
  id: string;
  name: string;
  role: string;
  /** which categories they take bookings in */
  categories: CategoryId[];
  bio: string;
  photo: { file: string; subject: string; alt: string };
}

export interface Package {
  id: string;
  name: string;
  description: string;
  /** service ids, in the order they are taken */
  includes: string[];
  /** total minutes, which is not always the sum — some run in parallel */
  minutes: number;
  price: number;
  /** null where the bundle is priced for two and comparison would mislead */
  saves: number | null;
  note?: string;
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

/** Warm greige, soft sage, muted gold hairlines. A delicate serif with wide
 *  tracking and a great deal of air — the register is quiet and unhurried. */
export const theme: DemoTheme = {
  /** warm greige — the base ground */
  ink: '#F4F1EC',
  inkRaised: '#EBE6DE',
  inkLine: '#D9D2C7',
  /** deep sage — the contrast band */
  paper: '#3A4A40',
  paperRaised: '#44564A',
  paperLine: '#54685A',
  /** muted gold on greige (5.2:1) */
  accent: '#7D6019',
  /** the same gold lifted for the sage band (5.3:1) */
  accentOnPaper: '#D9BE7A',
  onInk: '#2A2822',
  onInkDim: 'rgba(42, 40, 34, 0.72)',
  onPaper: '#EEF1EC',
  onPaperDim: 'rgba(238, 241, 236, 0.75)',
  onAccent: '#FFFFFF',
  displayFont: '"Cormorant Garamond", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Jost", "Futura", "Century Gothic", system-ui, sans-serif',
  radius: '4px',
};

export const fonts = [
  { family: 'Cormorant Garamond', file: 'cormorant-garamond-latin-400.woff2', weight: '400' },
  { family: 'Cormorant Garamond', file: 'cormorant-garamond-latin-600.woff2', weight: '600' },
  { family: 'Jost', file: 'jost-latin-var.woff2', weight: '300 600' },
];

export const business: DemoBusiness = {
  name: 'Stillwater Spa & Salon',
  shortName: 'Stillwater',
  positioning: 'Hair, nails and treatment rooms on Stillwater Lane, Burlington.',
  address: {
    street: '24 Stillwater Lane',
    city: 'Burlington',
    region: 'ON',
    postalCode: 'L7L 0B9',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0157',
  phoneHref: 'tel:+19055550157',
  email: 'hello@stillwaterspa.ca',
  emailHref: 'mailto:hello@stillwaterspa.ca',
};

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '00:00', close: '00:00', closed: true },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '09:00', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '09:00', close: '18:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '09:00', close: '20:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '09:00', close: '20:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '09:00', close: '17:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '10:00', close: '16:00' },
];

export const categories: { id: CategoryId; name: string; blurb: string; photo: { file: string; subject: string; alt: string } }[] = [
  {
    id: 'hair',
    name: 'Hair',
    blurb: 'Cutting, colour and correction, in a room with north light and no music you have to talk over.',
    photo: {
      file: 'cat-hair',
      subject: 'Salon floor with three chairs, north window light, mirrors, plants, nobody in frame',
      alt: 'The hair floor at Stillwater, lit by north-facing windows',
    },
  },
  {
    id: 'nails',
    name: 'Nails & Esthetics',
    blurb: 'Hands, feet, brows and lashes. Autoclave sterilised, ventilated properly, no acrylic dust in the air.',
    photo: {
      file: 'cat-nails',
      subject: 'Manicure station close up, hands mid-treatment, warm lamp, tidy tools laid out',
      alt: 'A manicure in progress at the Stillwater nail station',
    },
  },
  {
    id: 'spa',
    name: 'Spa & Massage',
    blurb: 'Four treatment rooms including one for two, all off a corridor you cannot hear the salon from.',
    photo: {
      file: 'cat-spa',
      subject: 'Treatment room with a made table, folded linen, low warm light and a single plant',
      alt: 'A treatment room at Stillwater, set and waiting',
    },
  },
];

/** The service menu. This is the CMS-modelled collection — see the .cms.ts
 *  stub. Prices move seasonally and the owner changes them herself. */
export const services: Service[] = [
  // Hair
  { id: 'cut-style', name: 'Cut & Style', description: 'Consultation, cut and a finish you can repeat at home. We will show you how.', category: 'hair', minutes: 60, price: 75 },
  { id: 'cut-style-long', name: 'Cut & Style, Long', description: 'For anything past the shoulder. More time on the finish, which is where long hair is won.', category: 'hair', minutes: 75, price: 95 },
  { id: 'root-colour', name: 'Root Colour', description: 'Regrowth matched to what is already there, with a gloss through the ends.', category: 'hair', minutes: 90, price: 130 },
  { id: 'full-colour', name: 'Full Colour', description: 'Root to tip, single process. Includes the cut and the finish.', category: 'hair', minutes: 150, price: 195, from: true },
  { id: 'balayage', name: 'Balayage', description: 'Hand-painted, toned and cut. Booked as a half day because it takes one.', category: 'hair', minutes: 180, price: 275, from: true },
  { id: 'gloss-treatment', name: 'Gloss & Treatment', description: 'A bond treatment and a clear or tinted gloss. The thing to book between colours.', category: 'hair', minutes: 45, price: 65 },

  // Nails & Esthetics
  { id: 'classic-manicure', name: 'Classic Manicure', description: 'Shape, cuticle work, a hand massage and polish. No drill, no filing down the plate.', category: 'nails', minutes: 45, price: 55 },
  { id: 'gel-manicure', name: 'Gel Manicure', description: 'The same manicure, finished in gel. Soak-off removal is included if it is our set.', category: 'nails', minutes: 60, price: 75 },
  { id: 'spa-pedicure', name: 'Spa Pedicure', description: 'Soak, exfoliation, callus work, a long massage and polish. The one people rebook.', category: 'nails', minutes: 60, price: 85 },
  { id: 'lash-lift', name: 'Lash Lift & Tint', description: 'Lifts and tints what you already have. Lasts six to eight weeks, no infills.', category: 'nails', minutes: 60, price: 95 },
  { id: 'brow-shape', name: 'Brow Shape & Tint', description: 'Mapped, waxed or threaded, tinted to suit. We will talk you out of going thinner.', category: 'nails', minutes: 30, price: 45 },
  { id: 'leg-wax', name: 'Full Leg Wax', description: 'Hard wax throughout, which hurts less and takes shorter hair.', category: 'nails', minutes: 45, price: 90 },

  // Spa & Massage
  { id: 'signature-facial', name: 'Signature Facial', description: 'Cleanse, exfoliate, extract if you want it, mask and massage. Built around your skin on the day.', category: 'spa', minutes: 60, price: 135 },
  { id: 'resurfacing-facial', name: 'Resurfacing Facial', description: 'A stronger peel with a recovery mask. Book it two weeks before an event, never two days.', category: 'spa', minutes: 75, price: 175 },
  { id: 'swedish-massage', name: 'Swedish Massage', description: 'Long, even pressure through the whole body. The one for switching off.', category: 'spa', minutes: 60, price: 125 },
  { id: 'deep-tissue', name: 'Deep Tissue Massage', description: 'Slower and firmer, focused where you carry it. Say if the pressure is wrong.', category: 'spa', minutes: 60, price: 140 },
  { id: 'hot-stone', name: 'Hot Stone Massage', description: 'Basalt stones and oil, ninety minutes. Warmth does what pressure cannot.', category: 'spa', minutes: 90, price: 185 },
  { id: 'scrub-wrap', name: 'Body Scrub & Wrap', description: 'Salt scrub, shower, then wrapped with a scalp massage while it works.', category: 'spa', minutes: 75, price: 160 },
];

export const practitioners: Practitioner[] = [
  {
    id: 'renata', name: 'Renata Vasquez', role: 'Owner · Master Stylist', categories: ['hair'],
    bio: 'Opened Stillwater in 2016 after fifteen years downtown. Takes the corrections nobody else wants.',
    photo: { file: 'staff-renata', subject: 'Stylist in her forties at the chair, natural window light, calm', alt: 'Renata Vasquez, owner and master stylist' },
  },
  {
    id: 'colm', name: 'Colm Byrne', role: 'Senior Stylist', categories: ['hair'],
    bio: 'Precision cutting and short shapes. The one to see if you are cutting it all off.',
    photo: { file: 'staff-colm', subject: 'Stylist mid-cut with shears and comb, focused, soft light', alt: 'Colm Byrne, senior stylist' },
  },
  {
    id: 'aiyana', name: 'Aiyana Whitecloud', role: 'Colourist', categories: ['hair'],
    bio: 'Balayage and colour correction. Will tell you honestly how many sessions blonde will take.',
    photo: { file: 'staff-aiyana', subject: 'Colourist painting balayage with a brush and board, close crop', alt: 'Aiyana Whitecloud, colourist' },
  },
  {
    id: 'sofia', name: 'Sofia Marchetti', role: 'Nail Technician', categories: ['nails'],
    bio: 'Structured gel and natural-nail work. Runs the sterilisation, which she is strict about.',
    photo: { file: 'staff-sofia', subject: 'Nail technician at her station, hands and lamp in frame', alt: 'Sofia Marchetti, nail technician' },
  },
  {
    id: 'bea', name: 'Bea Ocampo', role: 'Esthetician', categories: ['nails'],
    bio: 'Brows, lashes and waxing. Maps every brow before touching it, which is why they suit people.',
    photo: { file: 'staff-bea', subject: 'Esthetician mapping a brow with a pencil, close and gentle', alt: 'Bea Ocampo, esthetician' },
  },
  {
    id: 'nadege', name: 'Nadège Toussaint', role: 'Lead Esthetician', categories: ['spa'],
    bio: 'Facials and peels. Fifteen years in medical esthetics before she came to us.',
    photo: { file: 'staff-nadege', subject: 'Esthetician preparing a facial trolley in a treatment room', alt: 'Nadège Toussaint, lead esthetician' },
  },
  {
    id: 'ines', name: 'Ines Kowalczyk', role: 'Registered Massage Therapist', categories: ['spa'],
    bio: 'RMT, deep tissue and treatment work. Receipts for insurance are issued at the desk.',
    photo: { file: 'staff-ines', subject: 'Massage therapist adjusting linen on a table, warm low light', alt: 'Ines Kowalczyk, registered massage therapist' },
  },
  {
    id: 'theo', name: 'Theo Lindqvist', role: 'Registered Massage Therapist', categories: ['spa'],
    bio: 'RMT, Swedish and hot stone. Books out furthest ahead of anyone here.',
    photo: { file: 'staff-theo', subject: 'Massage therapist warming stones in a bath, hands in frame', alt: 'Theo Lindqvist, registered massage therapist' },
  },
];

export const packages: Package[] = [
  {
    id: 'half-day', name: 'The Half Day',
    description: 'A facial, a pedicure and a gloss, in that order, with lunch in the middle.',
    includes: ['signature-facial', 'spa-pedicure', 'gloss-treatment'],
    minutes: 165, price: 265, saves: 20,
  },
  {
    id: 'two-by-the-window', name: 'Two by the Window',
    description: 'The couples’ room: two massages, then two facials, side by side.',
    includes: ['swedish-massage', 'signature-facial'],
    minutes: 120, price: 495, saves: null,
    note: 'Priced for two people. The room takes one booking at a time.',
  },
  {
    id: 'the-reset', name: 'The Reset',
    description: 'Deep tissue first, then salt scrub and a wrap while the work settles.',
    includes: ['deep-tissue', 'scrub-wrap'],
    minutes: 135, price: 285, saves: 15,
  },
  {
    id: 'before-the-wedding', name: 'Before the Wedding',
    description: 'Colour, nails and lashes, booked as one long day about a fortnight out.',
    includes: ['balayage', 'gel-manicure', 'lash-lift'],
    minutes: 300, price: 425, saves: 20,
    note: 'Book six weeks ahead. We will not do a first-time balayage inside two weeks of a wedding.',
  },
];

const BASE = '/industries/barbershops/preview/multi-service-spa-salon/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}hair`, label: 'Hair' },
    { href: `${BASE}nails`, label: 'Nails & Esthetics' },
    { href: `${BASE}spa`, label: 'Spa & Massage' },
    { href: `${BASE}packages`, label: 'Packages' },
    { href: `${BASE}team`, label: 'Our Team' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}book`, label: 'Book', event: 'book_cta_nav' },
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
  tagline: 'Hair, nails and treatment rooms in Burlington. Closed Mondays.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Stillwater Spa & Salon. Sample site — not a real business.`,
};

export const pageMeta: Record<
  'home' | 'hair' | 'nails' | 'spa' | 'packages' | 'book' | 'team' | 'contact',
  DemoPageMeta
> = {
  home: {
    title: 'Stillwater Spa & Salon — Burlington',
    description: 'Hair, nails, facials and massage under one roof on Stillwater Lane, Burlington. Eight practitioners, four treatment rooms, and a room for two.',
    ogImage: '/og/default.png', breadcrumb: 'Home',
  },
  hair: {
    title: 'Hair — Stillwater Spa & Salon, Burlington',
    description: 'Cut, colour, balayage and correction. Every price and how long to allow, from a $65 gloss to a full day of balayage.',
    ogImage: '/og/default.png', breadcrumb: 'Hair',
  },
  nails: {
    title: 'Nails & Esthetics — Stillwater Spa & Salon, Burlington',
    description: 'Manicures, pedicures, lash lifts, brows and waxing. Autoclave sterilised, properly ventilated, no drill on natural nails.',
    ogImage: '/og/default.png', breadcrumb: 'Nails & Esthetics',
  },
  spa: {
    title: 'Spa & Massage — Stillwater Spa & Salon, Burlington',
    description: 'Facials, Swedish and deep tissue massage, hot stone and body treatments. Four rooms including one for two.',
    ogImage: '/og/default.png', breadcrumb: 'Spa & Massage',
  },
  packages: {
    title: 'Packages — Stillwater Spa & Salon, Burlington',
    description: 'Half days, couples’ bookings and pre-wedding days, priced together with the time each one actually takes.',
    ogImage: '/og/default.png', breadcrumb: 'Packages',
  },
  book: {
    title: 'Book — Stillwater Spa & Salon, Burlington',
    description: 'Choose the room, the service, the practitioner and a time. Six steps, no account, and nothing charged until you are here.',
    ogImage: '/og/default.png', breadcrumb: 'Book',
  },
  team: {
    title: 'Our Team — Stillwater Spa & Salon, Burlington',
    description: 'Eight practitioners: stylists, a colourist, nail and esthetics, and two registered massage therapists.',
    ogImage: '/og/default.png', breadcrumb: 'Our Team',
  },
  contact: {
    title: 'Contact & Hours — Stillwater Spa & Salon, Burlington',
    description: 'Address, phone, hours and parking for Stillwater on Stillwater Lane, Burlington. Open Tuesday to Sunday, late Thursday and Friday.',
    ogImage: '/og/default.png', breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Burlington · since 2016',
  heroTitle: 'A quiet building with eight pairs of hands in it',
  heroBody: 'Hair on the ground floor, nails behind it, and four treatment rooms down a corridor you cannot hear either from.',
  heroPrimaryCta: 'Book a time',
  heroSecondaryCta: 'See the packages',
  heroPhoto: {
    file: 'hero-room',
    subject: 'Reception and waiting area, linen chairs, tall plant, soft daylight, deliberately empty',
    alt: 'The reception and waiting area at Stillwater',
  },
  roomsHeading: 'Three rooms',
  roomsCta: 'Everything and every price',
  packagesHeading: 'Booked together',
  packagesNote: 'Four combinations, priced and timed as one appointment.',
  packagesCta: 'All packages',
  membershipHeading: 'The membership',
  membershipBody: 'One treatment a month at member pricing, ten per cent off everything else, and first refusal on Thursday and Friday evenings. Cancel whenever — it is a standing appointment, not a contract.',
  membershipPrice: 129,
  membershipUnit: 'a month',
  membershipNote: 'Ask at the desk. We do not sell it online, because it is worth a conversation first.',
  closerHeading: 'Book a time',
  closerBody: 'Six steps and about a minute. Nothing is charged until you are standing at the desk.',
  closerCta: 'Book',
};

export const categoryPage = {
  durationLabel: 'min',
  fromLabel: 'from',
  bookCta: 'Book this',
  allCta: 'Book a time',
  practitionersLabel: 'Who takes these',
  priceNote: 'Prices are reviewed twice a year and are current as shown.',
};

export const packagesPage = {
  eyebrow: 'Packages',
  heading: 'Booked together, timed properly',
  intro: 'Each of these is one appointment with one arrival time. The minutes below are what the day actually takes, not the services added up.',
  includesLabel: 'Includes',
  durationLabel: 'Allow',
  savesLabel: 'Saves',
  bookCta: 'Book this package',
  minutesLabel: 'min',
};

export const bookPage = {
  eyebrow: 'Booking',
  heading: 'Book a time',
  intro: 'Six steps. No account, no deposit online — the desk takes payment on the Clover terminal when you are here.',
  stepLabel: 'Step',
  ofLabel: 'of',
  steps: [
    { id: 'category', title: 'Which room?', hint: 'Hair, nails and esthetics, or the treatment rooms.' },
    { id: 'service', title: 'Which service?', hint: 'Times are how long the room is held for you.' },
    { id: 'practitioner', title: 'With whom?', hint: 'Or take the first available, which is usually sooner.' },
    { id: 'date', title: 'Which day?', hint: 'We confirm the exact time by phone the day before.' },
    { id: 'time', title: 'What time?', hint: 'Greyed-out times are already taken.' },
    { id: 'you', title: 'Your details', hint: 'We send one reminder the day before and nothing else.' },
  ],
  anyPractitioner: { id: 'any', name: 'First available', role: 'Whoever is free', detail: 'Usually the shortest wait.' },
  nextLabel: 'Next',
  backLabel: 'Back',
  confirmLabel: 'Request this time',
  summaryHeading: 'Your booking',
  categoryLabel: 'Room',
  serviceLabel: 'Service',
  practitionerLabel: 'With',
  dateLabel: 'Date',
  timeLabel: 'Time',
  totalLabel: 'Price',
  form: {
    nameLabel: 'Name', namePlaceholder: 'Your name', nameError: 'We need a name for the booking.',
    phoneLabel: 'Mobile', phonePlaceholder: '(905) 555-0100', phoneError: 'Enter a mobile for the reminder.',
    emailLabel: 'Email', emailPlaceholder: 'you@example.com', emailError: 'Enter an email for the confirmation.',
    notesLabel: 'Anything we should know', notesPlaceholder: 'Allergies, pregnancy, recent treatments — optional but useful',
  },
  errors: {
    category: 'Choose a room to carry on.',
    service: 'Choose a service.',
    practitioner: 'Choose a practitioner, or take the first available.',
    date: 'Choose a day.',
    time: 'Choose a time.',
  },
  successHeading: 'Time requested',
  successBody: 'We will call to confirm and to talk through anything on your notes. Nothing is charged until you are here.',
  successAgain: 'Book another',
  phoneNote: 'Booking a package, or for more than one person? Call the desk — those are easier by voice.',
};

/** The times offered, and the ones already gone. On a live build the taken
 *  list comes from the practitioners' calendars; a sample site has none to
 *  read, so it is stated here rather than invented at runtime. */
export const slots = {
  times: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  taken: ['11:00', '14:00', '17:00'],
  takenLabel: 'Taken',
};

export const teamPage = {
  eyebrow: 'Our Team',
  heading: 'Eight pairs of hands',
  intro: 'People book a person, not a building. Here is who does what, and which room you will find them in.',
  takesLabel: 'Takes bookings in',
  bookWith: 'Book with',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Stillwater Lane, Burlington',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'Closed Mondays. Last appointment goes in an hour before close, longer services earlier.',
  hoursTable: { day: 'Day', open: 'Open' },
  closedLabel: 'Closed',
  gettingHereHeading: 'Parking and getting here',
  gettingHere: [
    { title: 'Parking', detail: 'Eight marked spaces behind the building, off the lane. Street parking is two hours.' },
    { title: 'Accessibility', detail: 'Level entry from the rear lot. One treatment room and the washroom are accessible.' },
    { title: 'Arriving', detail: 'Ten minutes early for a treatment, so you are not starting in a hurry.' },
  ],
  mapLabel: 'Map — 24 Stillwater Lane, Burlington',
  bookCta: 'Book a time',
};

export const servicesIn = (category: CategoryId): Service[] =>
  services.filter((service) => service.category === category);

export const findService = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const practitionersIn = (category: CategoryId): Practitioner[] =>
  practitioners.filter((p) => p.categories.includes(category));

export const findCategory = (id: CategoryId) => categories.find((c) => c.id === id);
