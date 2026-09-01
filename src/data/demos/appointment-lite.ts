// Pin & Press Tailoring — the sample site for the Appointment Lite playbook.
// A fictional alterations and custom tailoring shop in Oakville, Ontario;
// nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, Booking, Domain. That is the whole list.
// Deliberately absent: Analytics, e-commerce, CMS and CRM.
//
// ── TWO ABSENCES WORTH POINTING AT ───────────────────────────────────────
//
//   · No Analytics. The page passes analytics={false} to DemoLayout, so there
//     is not one data-analytics-event attribute anywhere on it — not on the
//     nav CTA, not on the footer phone, not on the booking submit. Every other
//     demo in the catalogue is covered in them. Open this page and Ironwood
//     side by side in an inspector and the difference is the line item.
//
//   · Booking, but LITE. Six of the demos in this catalogue run a multi-step
//     booking flow. This one is a single short form, because the playbook is
//     called Appointment Lite and costs $600. The tier difference is not that
//     one has a form and one does not — it is that one asks four questions on
//     one screen and the other walks somebody through a service, a staff
//     member, a date and a time. Both are honest builds of what was bought.
//
// First demo on the `tailoring` vertical. Register: precise and small. A fine
// old-style serif for the wordmark and headings, a tight grotesque for
// everything else, hairline rules, and a body size a notch below every other
// demo — the whole point is that it should feel measured.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export interface ServiceRow {
  service: string;
  /** CAD, inclusive range. Both ends are real quotes from the board. */
  from: number;
  to: number;
  note?: string;
}

export interface ServiceGroup {
  id: string;
  garment: string;
  blurb: string;
  rows: ServiceRow[];
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

/** Off-white, charcoal, one thread red. Hairlines at 1px, corners square,
 *  and a body size deliberately smaller than the rest of the catalogue. */
export const theme: DemoTheme = {
  ink: '#FAF9F7',
  inkRaised: '#F1EFEB',
  inkLine: '#DCD8D1',
  /** charcoal band */
  paper: '#2B2B2E',
  paperRaised: '#353539',
  paperLine: '#4A4A4F',
  /** thread red on off-white (6.9:1) */
  accent: '#A81E32',
  /** the same red opened up for the charcoal band (6.0:1) */
  accentOnPaper: '#E8909B',
  onInk: '#1F1F22',
  onInkDim: 'rgba(31, 31, 34, 0.72)',
  onPaper: '#F2F1EE',
  onPaperDim: 'rgba(242, 241, 238, 0.78)',
  onAccent: '#FFFFFF',
  displayFont: '"EB Garamond", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Instrument Sans", "Segoe UI", system-ui, sans-serif',
  radius: '0',
  leading: '1.55',
  /** a notch smaller than every other demo, on purpose */
  bodySize: 'clamp(0.92rem, 0.88rem + 0.2vw, 1rem)',
};

export const fonts = [
  { family: 'EB Garamond', file: 'eb-garamond-latin-var.woff2', weight: '400 600' },
  { family: 'Instrument Sans', file: 'instrument-sans-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Pin & Press Tailoring',
  shortName: 'Pin & Press',
  positioning: 'Alterations and custom tailoring in Oakville. Suits, bridal, leather.',
  address: {
    street: '14 Kirkham Lane, Unit 2',
    city: 'Oakville',
    region: 'ON',
    postalCode: 'L6J 2X8',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0121',
  phoneHref: 'tel:+19055550121',
  email: 'fittings@pinandpress.ca',
  emailHref: 'mailto:fittings@pinandpress.ca',
};

export const hours: ShopDay[] = [
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '09:30', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '09:30', close: '18:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '09:30', close: '19:30' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '09:30', close: '18:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '09:00', close: '16:00' },
];

export const services: ServiceGroup[] = [
  {
    id: 'trousers',
    garment: 'Trousers',
    blurb: 'Most of what comes through the door. Same-week unless it is a full recut.',
    rows: [
      { service: 'Hem, plain or blind', from: 25, to: 35 },
      { service: 'Hem, original cuff kept', from: 40, to: 55, note: 'Denim and anything with topstitching' },
      { service: 'Taper through the leg', from: 45, to: 65 },
      { service: 'Waist in or out', from: 40, to: 60, note: 'Out depends on the seam allowance left' },
      { service: 'Seat and rise adjustment', from: 55, to: 80 },
    ],
  },
  {
    id: 'jackets',
    garment: 'Jackets and coats',
    blurb: 'A jacket can be made to fit properly far more often than people think. It is the shoulders that decide.',
    rows: [
      { service: 'Sleeve length, from the cuff', from: 55, to: 85 },
      { service: 'Sleeve length, from the shoulder', from: 95, to: 140, note: 'Needed when there is working buttonhole detail' },
      { service: 'Take in the body', from: 75, to: 120 },
      { service: 'Shorten the body', from: 120, to: 180 },
      { service: 'Shoulder recut', from: 180, to: 260, note: 'Quoted at the fitting only' },
      { service: 'Reline, full', from: 190, to: 280 },
    ],
  },
  {
    id: 'dresses',
    garment: 'Dresses and skirts',
    blurb: 'Bring the shoes you will wear. A hem measured in the wrong heel is a hem done twice.',
    rows: [
      { service: 'Hem, single layer', from: 45, to: 70 },
      { service: 'Hem, lined or layered', from: 70, to: 130 },
      { service: 'Take in at the side seams', from: 55, to: 95 },
      { service: 'Straps, bust and back adjustment', from: 60, to: 110 },
      { service: 'Zip replacement', from: 55, to: 90 },
    ],
  },
  {
    id: 'bridal',
    garment: 'Bridal and formal',
    blurb: 'Three fittings as standard, the last one seven to ten days before. Booked as a series, not one at a time.',
    rows: [
      { service: 'Hem and bustle', from: 150, to: 350, note: 'Bustle style chosen at the second fitting' },
      { service: 'Bodice and side seams', from: 180, to: 320 },
      { service: 'Full alteration, three fittings', from: 380, to: 700 },
      { service: 'Cups, boning and internal support', from: 120, to: 260 },
      { service: 'Steam and press before collection', from: 45, to: 75 },
    ],
  },
  {
    id: 'leather',
    garment: 'Leather and outerwear',
    blurb: 'Leather is stitched once. There is no unpicking a mistake, so we quote it at the counter and never over the phone.',
    rows: [
      { service: 'Zip replacement', from: 90, to: 150 },
      { service: 'Sleeve shorten', from: 110, to: 170 },
      { service: 'Take in through the body', from: 130, to: 220 },
      { service: 'Lining repair or replacement', from: 120, to: 240 },
    ],
  },
  {
    id: 'custom',
    garment: 'Made to measure',
    blurb: 'Cut here from a paper pattern drafted to you. Four to six weeks, three fittings, and the pattern is kept.',
    rows: [
      { service: 'Two-piece suit', from: 1400, to: 2600, note: 'Cloth depends on what you choose' },
      { service: 'Jacket only', from: 950, to: 1750 },
      { service: 'Shirt, first order', from: 180, to: 260, note: 'Minimum two on a first order' },
      { service: 'Shirt, repeat order', from: 155, to: 230 },
      { service: 'Waistcoat', from: 420, to: 680 },
    ],
  },
];

/** The turnaround promise, written once. It appears in the hero, in the
 *  services note and on the booking form. */
export const turnaround: { label: string; note: string }[] = [
  {
    label: 'Same week',
    note: 'In Tuesday, out Saturday, on anything that is not bridal or a recut.',
  },
  {
    label: '48 hours',
    note: 'Where the workroom has space. Adds 50% to the quoted price and is agreed at the counter, never assumed.',
  },
  {
    label: 'Bridal',
    note: 'Booked as a series of three fittings across six to eight weeks, not as a single appointment.',
  },
];

const BASE = '/industries/tailoring/preview/appointment-lite/';

/** A one-pager, so the nav is anchors and the wordmark goes to the top. */
export const navigation: DemoNavigation = {
  links: [
    { href: '#services', label: 'Services' },
    { href: '#fitting', label: 'Book a fitting' },
    { href: '#hours', label: 'Hours' },
    { href: '#contact', label: 'Contact' },
  ],
  cta: { href: '#fitting', label: 'Book a fitting' },
  brandHref: BASE,
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/tailoring',
};

export const footer: DemoFooter = {
  tagline: 'Alterations and made to measure on Kirkham Lane. Closed Sunday and Monday.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Pin & Press Tailoring. Sample site — not a real business.`,
};

export const pageMeta: Record<'home', DemoPageMeta> = {
  home: {
    title: 'Pin & Press Tailoring — Alterations and Custom Tailoring, Oakville',
    description:
      'Alterations and made-to-measure tailoring in Oakville: suits, dresses, bridal and leather. Price ranges published, same-week turnaround, fittings booked online.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
};

export const home = {
  heroEyebrow: 'Kirkham Lane, Oakville',
  heroTitle: 'Made to fit, or made from scratch',
  heroBody:
    'Alterations on anything you already own, and suits and shirts cut here from a pattern drafted to you. Prices are on this page because you should not have to ring to find out.',
  heroPrimaryCta: 'Book a fitting',
  heroSecondaryCta: 'Prices',
  heroFacts: [
    { label: 'Standard turnaround', value: turnaround[0].label },
    { label: 'Fittings', value: 'By appointment' },
    { label: 'On Kirkham Lane since', value: '2009' },
  ],

  servicesHeading: 'What it costs',
  servicesIntro:
    'Ranges, not starting prices. The bottom of each range is the ordinary version and the top is the awkward one, and which you have got is decided at the counter with the garment in hand.',
  fromLabel: 'From',
  toLabel: 'to',
  turnaroundHeading: 'Turnaround',

  fittingHeading: 'Book a fitting',
  fittingIntro:
    'Four questions. Bring the garment and the shoes you will wear it with; a fitting without either is a conversation.',

  hoursHeading: 'Hours',
  hoursNote: 'Closed Sunday and Monday. Thursday runs late for people who cannot get here in the day.',
  hoursTable: { day: 'Day', open: 'Open' },
  visitHeading: 'Finding us',
  visit: [
    { title: 'The unit', detail: 'Second door down the lane off Kirkham, past the framers. The window has a dress form in it.' },
    { title: 'Parking', detail: 'Four spots in the lane and unlimited on Kirkham after six. Do not use the framers’ two.' },
    { title: 'Accessibility', detail: 'One step at the door, and a portable ramp we will put out if you ring ahead.' },
  ],

  contactHeading: 'Contact',
  contactNote:
    'The workroom is one room, so the phone is not always answered on the first ring. Leaving a message works; so does the form above.',
  mapLabel: 'Map — 14 Kirkham Lane, Oakville',
};

/** The booking form. Four questions on one screen, which is the whole
 *  difference between this tier and the multi-step flows. */
export const fitting = {
  formLabel: 'Book a fitting',
  requiredNote: 'Everything except the note is required.',
  submitLabel: 'Request the fitting',
  errorSummaryHeading: 'Check these fields',
  fields: {
    garment: {
      label: 'Garment',
      options: ['Trousers', 'Jacket or coat', 'Dress or skirt', 'Bridal or formal', 'Leather or outerwear', 'Made to measure', 'Something else'],
      error: 'Choose the closest garment.',
    },
    service: {
      label: 'What needs doing',
      hint: 'If you are not sure, say so — that is what the fitting is for.',
      options: ['Hem', 'Take in or let out', 'Sleeves or straps', 'Zip or repair', 'Full alteration', 'Made to measure', 'Not sure yet'],
      error: 'Choose the closest service.',
    },
    fittingDate: {
      label: 'Preferred fitting date',
      hint: 'Tuesday to Saturday. We will confirm a time by phone.',
      error: 'A date you could come in.',
    },
    name: { label: 'Your name', error: 'A name for the ticket.' },
    phone: { label: 'Phone', hint: 'We confirm fittings by phone, not by email.', error: 'A number we can reach you on.' },
    email: { label: 'Email', hint: 'Optional. Used only to send the confirmation.' },
    notes: { label: 'Anything else', hint: 'A deadline, a wedding date, a garment we have seen before.' },
  },
  confirmation: {
    heading: 'Fitting requested',
    body:
      'Nothing is in the book yet. We will ring you to confirm a time, usually the same day, and the appointment is made on that call.',
    detailsHeading: 'What you sent',
    note: 'If the date is inside a week, ring the shop instead — the form is checked between customers, and the phone is not.',
    resetLabel: 'Send another request',
    callLabel: 'Or ring the shop',
  },
};

export const formatPrice = (price: number): string => new Intl.NumberFormat('en-CA').format(price);
