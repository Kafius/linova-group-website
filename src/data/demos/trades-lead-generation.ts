// Bright Line Painting — the sample site for the Trades / Lead Generation
// playbook. A fictional residential and light commercial painting contractor
// in Whitby, Ontario; nothing here is a real business, and the demo ribbon
// says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, Analytics, Domain.
// Deliberately absent: e-commerce, CMS, CRM and booking.
//
// ── LOCAL SEO IS THE BUILD ───────────────────────────────────────────────
// This playbook has no store, no CMS and no CRM. What it has is $150/month of
// SEO work and a site whose entire job is to be found by somebody in Whitby
// typing "painters near me" and then to get them to ring. So:
//
//   · The four towns are named in prose on the home page, on the services
//     page and on the work page — not just listed in a footer — and the
//     schema areaServed says the same four.
//   · Every project on the work page carries the town it was in.
//   · The phone number IS the nav CTA. On a trades site it is the conversion.
//
// ── THE ESTIMATE FORM IS NOT A CRM ───────────────────────────────────────
// CRM is FALSE here. The form validates, takes photos and confirms, and on a
// live build it emails the office. What the CRM line item would add — routing,
// ranking, a record that outlives the inbox — is exactly what is missing.
// Compare it with Northline, which is the same shape of form one tier up.
//
// ── ON aggregateRating ───────────────────────────────────────────────────
// The brief asks for an aggregateRating SLOT, and a slot is what this is: the
// markup is documented and the code for it is written, but it emits nothing,
// because this business has no reviews and inventing a 4.9 from 87 people is
// the single most common lie in local-trades markup. See tradesJsonld.ts.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export interface ServiceLine {
  id: string;
  name: string;
  summary: string;
  /** what is actually done, in the order it is done */
  includes: string[];
  /** the honest range, and what moves it */
  typical: string;
  timeline: string;
}

export interface Project {
  id: string;
  title: string;
  town: string;
  scope: string;
  detail: string;
  duration: string;
  before: { file: string; subject: string; alt: string };
  after: { file: string; subject: string; alt: string };
}

export interface Credential {
  name: string;
  detail: string;
}

export interface OfficeDay {
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

/** White, black, one bold brand colour. High contrast, badge-heavy, and the
 *  phone number never more than a thumb away. */
export const theme: DemoTheme = {
  ink: '#FFFFFF',
  inkRaised: '#F4F4F5',
  inkLine: '#D9D9DD',
  /** the black band */
  paper: '#111113',
  paperRaised: '#1B1B1E',
  paperLine: '#2E2E33',
  /** brand orange on white (6.0:1) */
  accent: '#B23A05',
  /** opened up for the black band (8.0:1) */
  accentOnPaper: '#FF8A3D',
  onInk: '#131316',
  onInkDim: 'rgba(19, 19, 22, 0.72)',
  onPaper: '#F3F3F5',
  onPaperDim: 'rgba(243, 243, 245, 0.78)',
  onAccent: '#FFFFFF',
  displayFont: '"Outfit", "Segoe UI", system-ui, sans-serif',
  bodyFont: '"Inter Tight", "Segoe UI", system-ui, sans-serif',
  radius: '4px',
};

export const fonts = [
  { family: 'Outfit', file: 'outfit-latin-var.woff2', weight: '400 700' },
  { family: 'Inter Tight', file: 'inter-tight-latin-var.woff2', weight: '400 600' },
];

export const business: DemoBusiness = {
  name: 'Bright Line Painting',
  shortName: 'Bright Line',
  positioning: 'Residential and light commercial painting in Whitby, Ajax, Oshawa and Pickering.',
  address: {
    street: '31 Thickson Road South, Unit 4',
    city: 'Whitby',
    region: 'ON',
    postalCode: 'L1N 8W7',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0114',
  phoneHref: 'tel:+19055550114',
  email: 'estimates@brightlinepainting.ca',
  emailHref: 'mailto:estimates@brightlinepainting.ca',
};

export const officeHours: OfficeDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '07:00', close: '18:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '07:00', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '07:00', close: '18:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '07:00', close: '18:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '07:00', close: '17:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '14:00' },
];

/** The four towns, named everywhere rather than listed once. Also the schema
 *  areaServed — the two must not disagree, so there is one array. */
export const serviceArea: { town: string; note: string }[] = [
  { town: 'Whitby', note: 'Where the shop is. Brooklin, Williamsburg, Pringle Creek and everything south of Taunton.' },
  { town: 'Ajax', note: 'Both sides of Harwood. A large part of what we do is the 1990s stock north of Rossland.' },
  { town: 'Oshawa', note: 'North Oshawa, Samac and the older brick homes around the downtown.' },
  { town: 'Pickering', note: 'West to Liverpool Road. Past that it is a longer drive than the job is worth and we will say so.' },
];

/** Four commitments this company makes about itself. No third-party
 *  certification marks are claimed. */
export const credentials: Credential[] = [
  {
    name: 'Fully insured',
    detail: '$2M commercial general liability. The certificate is emailed with every estimate, before you ask for it.',
  },
  {
    name: 'WSIB clearance',
    detail: 'Current, and attached to the estimate. If a painter is hurt in your house it is not your problem.',
  },
  {
    name: 'Three-year warranty',
    detail: 'On our workmanship — peeling, blistering and adhesion failure. Not on the paint itself, which is the manufacturer’s, and not on a substrate that was failing before we got there. We will tell you which one you have.',
  },
  {
    name: 'Written estimates',
    detail: 'Itemised by room or elevation, with the products named and the prep described. Free, and no deposit until the first day on site.',
  },
];

export const services: ServiceLine[] = [
  {
    id: 'interior',
    name: 'Interior painting',
    summary:
      'Walls, ceilings, trim and doors. Most of what we do, and the part where the prep is the whole job.',
    includes: [
      'Floors and furniture covered; everything movable moved by us',
      'Fill, sand and spot-prime every nail hole and crack',
      'Caulk trim gaps and along the ceiling line',
      'Two coats as standard, three over a strong colour change',
      'Cut in by hand, not taped, on every edge',
      'Site left swept and put back the same day it finishes',
    ],
    typical: '$450 – $850 a room',
    timeline: '1 to 2 days a room',
  },
  {
    id: 'exterior',
    name: 'Exterior painting',
    summary:
      'Siding, brick, stucco, soffit, fascia and doors. Booked May to October, and cancelled rather than rushed when it rains.',
    includes: [
      'Pressure wash and let dry — usually a day on its own',
      'Scrape, sand and spot-prime bare wood and failed areas',
      'Replace failed caulking at joints and around openings',
      'Two coats of exterior acrylic, back-brushed where it matters',
      'Windows and landscaping masked and protected',
      'Nothing painted below 10°C or with rain inside 24 hours',
    ],
    typical: '$3,200 – $9,500 a house',
    timeline: '3 to 8 days',
  },
  {
    id: 'cabinets',
    name: 'Cabinet refinishing',
    summary:
      'Kitchen and vanity cabinets sprayed, not brushed. Doors come off to the shop; the boxes are done on site.',
    includes: [
      'Doors and drawer fronts numbered, removed and taken to the shop',
      'Degrease, sand and bond-prime every face',
      'Two finish coats sprayed in a booth, not in your kitchen',
      'Boxes sprayed on site behind full containment',
      'Seventy-two hours to cure before doors go back on',
      'New hinges and bumpers if the old ones are tired',
    ],
    typical: '$3,800 – $7,500 a kitchen',
    timeline: '5 to 7 days',
  },
  {
    id: 'commercial',
    name: 'Light commercial',
    summary:
      'Offices, clinics, retail units and common areas. Worked evenings and weekends so nobody loses a trading day.',
    includes: [
      'Evening and weekend scheduling as standard',
      'Low-odour and zero-VOC products where the space is occupied',
      'Nightly clean-down so the space opens in the morning',
      'Certificate of insurance issued to the property manager',
      'Phased by floor or unit on anything over 5,000 sq ft',
      'One point of contact for the whole job',
    ],
    typical: 'Quoted per site',
    timeline: 'Phased to suit',
  },
];

export const projects: Project[] = [
  {
    id: 'brooklin-century',
    title: 'Century home, full exterior',
    town: 'Whitby',
    scope: 'Exterior — siding, soffit, fascia, porch',
    detail:
      'Eighty years of paint on cedar siding, most of it failing. Two days of scraping before a brush touched it, which is the part nobody quotes for.',
    duration: '7 days',
    before: { file: 'brooklin-before', subject: 'Weathered cedar-sided century home with peeling paint on the front elevation, overcast day', alt: 'The Brooklin house before, with peeling paint on cedar siding' },
    after: { file: 'brooklin-after', subject: 'The same century home repainted in a deep green with white trim, clean lines at the soffit', alt: 'The same house after repainting' },
  },
  {
    id: 'ajax-kitchen',
    title: 'Oak kitchen, sprayed',
    town: 'Ajax',
    scope: 'Cabinet refinishing — 34 doors, 8 drawers',
    detail:
      'Honey oak from 1998. Grain filled before priming, which is why it does not look like painted oak at the end.',
    duration: '6 days',
    before: { file: 'ajax-before', subject: 'Dated honey oak kitchen cabinets with visible grain and brass handles', alt: 'The Ajax kitchen before, in honey oak' },
    after: { file: 'ajax-after', subject: 'The same kitchen with cabinets sprayed off-white, grain filled smooth, new matt black handles', alt: 'The same kitchen after refinishing' },
  },
  {
    id: 'oshawa-stairwell',
    title: 'Two-storey stairwell and landing',
    town: 'Oshawa',
    scope: 'Interior — walls, ceiling, spindles',
    detail:
      'Eighteen feet to the ceiling over a staircase. Staging in, staging out, and every spindle done by hand.',
    duration: '4 days',
    before: { file: 'oshawa-before', subject: 'Tall stairwell with scuffed beige walls and yellowed white spindles', alt: 'The Oshawa stairwell before' },
    after: { file: 'oshawa-after', subject: 'The same stairwell in a soft white with crisp repainted spindles and a clean ceiling line', alt: 'The same stairwell after' },
  },
  {
    id: 'pickering-clinic',
    title: 'Dental clinic, six operatories',
    town: 'Pickering',
    scope: 'Commercial — evenings only',
    detail:
      'Worked six until midnight across nine nights so the practice never lost a day. Zero-VOC throughout.',
    duration: '9 nights',
    before: { file: 'pickering-before', subject: 'Clinical corridor with marked and scuffed pale walls under fluorescent light', alt: 'The Pickering clinic corridor before' },
    after: { file: 'pickering-after', subject: 'The same corridor repainted in a calm grey-green with clean door frames', alt: 'The same corridor after' },
  },
  {
    id: 'whitby-semi',
    title: 'Whole interior before listing',
    town: 'Whitby',
    scope: 'Interior — nine rooms in one week',
    detail:
      'Sold in four days. We are not claiming credit for that, but the agent asked for our number afterwards.',
    duration: '5 days',
    before: { file: 'whitby-before', subject: 'Empty living room with patched drywall and mismatched wall colours', alt: 'The Whitby semi before, with patched walls' },
    after: { file: 'whitby-after', subject: 'The same empty living room in a uniform warm white with sharp trim lines', alt: 'The same room after' },
  },
  {
    id: 'ajax-stucco',
    title: 'Stucco and brick, front elevation',
    town: 'Ajax',
    scope: 'Exterior — stucco, brick, garage doors',
    detail:
      'Masonry paint on brick is a one-way decision and we said so twice before starting. They were sure, and it looks right.',
    duration: '5 days',
    before: { file: 'ajax-stucco-before', subject: 'House front with chalky beige stucco and orange-toned brick, faded garage doors', alt: 'The Ajax stucco elevation before' },
    after: { file: 'ajax-stucco-after', subject: 'The same elevation in warm white masonry paint with charcoal garage doors', alt: 'The same elevation after' },
  },
];

const BASE = '/industries/contractors/preview/trades-lead-generation/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}services`, label: 'Services' },
    { href: `${BASE}work`, label: 'Our Work' },
    { href: `${BASE}estimate`, label: 'Get an Estimate' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  /** On a trades site the phone number IS the conversion, so it is the CTA
   *  rather than a link to a form. */
  cta: { href: business.phoneHref, label: business.phone, event: 'phone_tap_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/contractors',
};

export const footer: DemoFooter = {
  tagline: 'Painters in Whitby, working Whitby, Ajax, Oshawa and Pickering. Insured, WSIB clear, three-year warranty.',
  rowsHeading: 'Office hours',
  findUsHeading: 'Get in touch',
  legal: `© ${new Date().getFullYear()} Bright Line Painting. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'services' | 'work' | 'estimate' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Painters in Whitby, Ajax, Oshawa and Pickering — Bright Line Painting',
    description:
      'Residential and light commercial painters based in Whitby, working Whitby, Ajax, Oshawa and Pickering. Interior, exterior and cabinet refinishing. Insured, WSIB clear, three-year workmanship warranty, free written estimates.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  services: {
    title: 'Interior, Exterior and Cabinet Painting — Bright Line Painting, Whitby',
    description:
      'What we do and what it costs: interior painting from $450 a room, exteriors from $3,200, cabinet refinishing from $3,800. Prep described in full, because prep is the job.',
    ogImage: '/og/default.png',
    breadcrumb: 'Services',
  },
  work: {
    title: 'Our Work — Painting Projects in Whitby, Ajax, Oshawa and Pickering',
    description:
      'Six recent projects with before and after photographs, the town each was in, what the scope was and how long it took.',
    ogImage: '/og/default.png',
    breadcrumb: 'Our Work',
  },
  estimate: {
    title: 'Get a Free Painting Estimate — Whitby, Ajax, Oshawa, Pickering',
    description:
      'Tell us the project, the size and the timeline, and add photos. We come back within one business day to book a look, and the written estimate follows within two.',
    ogImage: '/og/default.png',
    breadcrumb: 'Get an Estimate',
  },
  contact: {
    title: 'Contact — Bright Line Painting, Whitby',
    description:
      'Phone, email, office hours and the four towns we work. Based on Thickson Road South in Whitby.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Whitby · Ajax · Oshawa · Pickering',
  heroTitle: 'Painters who tell you what the prep costs',
  heroBody:
    'Interior, exterior and cabinet refinishing across Durham Region. The estimate is written, itemised and free, and it says what we are going to do before we do it.',
  heroPrimaryCta: 'Get an estimate',
  heroPhoto: {
    file: 'hero-crew',
    subject:
      'Painter cutting in along a ceiling line in a bright empty living room, drop sheets down, ladder to one side',
    alt: 'A Bright Line painter cutting in a ceiling line',
  },
  callLabel: 'Or call',

  credentialsHeading: 'Before you let anyone in your house',
  credentialsBody: 'All four come with the estimate, not after the job is awarded.',

  servicesHeading: 'What we do',
  servicesCta: 'Services and prices',
  workHeading: 'Recent work',
  workBody: 'Six jobs, before and after, with the town and the scope on each.',
  workCta: 'See the work',

  areaHeading: 'Where we work',
  areaBody:
    'Four towns, all within forty minutes of the shop on Thickson Road. We do not travel to Toronto, and saying so is more useful than a map with a hundred-kilometre circle on it.',

  warrantyHeading: 'The three-year warranty, in full',
  warrantyBody:
    'If our workmanship fails inside three years — peeling, blistering, adhesion — we come back and fix it at no charge. It does not cover the paint itself, which carries the manufacturer’s own warranty, and it does not cover a substrate that was already failing, which we will have written into the estimate before starting.',

  closerHeading: 'Get a written estimate',
  closerBody: 'Six questions and a few photos. A look at the job within a week, and the number two days after that.',
  closerCta: 'Get an estimate',
};

export const servicesPage = {
  eyebrow: 'Services',
  heading: 'Four things, done properly',
  intro:
    'Prices below are what jobs like yours usually come to. The estimate is the real number and it is free, itemised and written.',
  typicalLabel: 'Typically',
  timelineLabel: 'On site',
  includesLabel: 'What that includes',
  prepHeading: 'Why the prep list is this long',
  prepBody:
    'Because it is where a painting job is won or lost, and because it is the part a cheap quote leaves out. Two coats over unfilled, unsanded, unprimed wall is a job that looks finished for eleven months.',
  areaHeading: 'Booked across four towns',
  closerHeading: 'None of these quite it?',
  closerBody: 'Ring and describe it. If it is not work we do well we will say so and give you a name.',
  closerCta: 'Get an estimate',
};

export const workPage = {
  eyebrow: 'Our Work',
  heading: 'Before and after',
  intro:
    'Six recent jobs. Every photograph is of work we did, in the town it says, and none of them are staged.',
  beforeLabel: 'Before',
  afterLabel: 'After',
  townLabel: 'Town',
  scopeLabel: 'Scope',
  durationLabel: 'On site',
  closerHeading: 'Yours could be on here',
  closerBody: 'We ask before we photograph anything, and plenty of people say no. That is fine.',
  closerCta: 'Get an estimate',
};

/** The estimate form. Six questions and a photo upload, and it is a form,
 *  not a CRM — see the note at the top of this file. */
export const estimatePage = {
  eyebrow: 'Get an Estimate',
  heading: 'Six questions and a few photos',
  intro:
    'Photos save a visit on about half of the jobs we quote. Nothing is committed by this, and there is no charge for the estimate either way.',
  requiredNote: 'Everything except the photos and the note is required.',
  submitLabel: 'Send the request',
  errorSummaryHeading: 'Check these fields',
  fields: {
    projectType: {
      label: 'Project type',
      options: ['Interior painting', 'Exterior painting', 'Cabinet refinishing', 'Light commercial', 'More than one of these', 'Not sure yet'],
      error: 'Choose the closest project type.',
    },
    size: {
      label: 'Rough size',
      hint: 'Rooms for interior, square footage or storeys for exterior. A guess is fine.',
      options: ['1 to 2 rooms', '3 to 5 rooms', '6 or more rooms', 'Whole house exterior', 'One elevation', 'A kitchen', 'Commercial unit'],
      error: 'A rough size, even approximately.',
    },
    town: {
      label: 'Town',
      hint: 'We work four. If yours is not here, ring and ask.',
      error: 'Which town is the property in.',
    },
    timeline: {
      label: 'Timeline',
      options: ['As soon as possible', 'Within a month', 'One to three months', 'Later in the year', 'Getting prices for now'],
      error: 'When would you want it done.',
    },
    photos: {
      label: 'Photos',
      hint: 'Up to six. Wide shots beat close-ups, and one of the worst bit beats five of the best.',
      buttonLabel: 'Choose photos',
      noneLabel: 'No photos chosen',
      countLabel: 'chosen',
    },
    name: { label: 'Your name', error: 'A name for the file.' },
    phone: { label: 'Phone', hint: 'We ring to book the look. It is faster than three emails.', error: 'A number we can reach you on.' },
    email: { label: 'Email', hint: 'The written estimate comes here.', error: 'A valid email for the estimate.' },
    notes: { label: 'Anything else', hint: 'A colour already chosen, a deadline, a room we should not touch.' },
  },
  confirmation: {
    heading: 'Request received',
    body:
      'Someone will ring you within one business day to book a look at the job, and the written estimate follows within two days of that visit.',
    detailsHeading: 'What you sent',
    photoRow: 'Photos',
    note: 'No deposit is taken until the first day on site, and the estimate is free whether you go ahead or not.',
    resetLabel: 'Send another request',
    callLabel: 'Or call now',
  },
  sidebarHeading: 'What happens next',
  sidebarSteps: [
    { when: 'Within one business day', what: 'A call to book a look, at a time that suits you.' },
    { when: 'The visit', what: 'Twenty minutes, measuring and looking at the substrate. No sales pitch.' },
    { when: 'Two days after', what: 'A written estimate, itemised by room or elevation, products named.' },
    { when: 'If you go ahead', what: 'A start date, and no deposit until the first morning on site.' },
  ],
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Thickson Road South, Whitby',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  addressHeading: 'Shop',
  addressNote: 'A shop and a spray booth, not a showroom. Come by if you want to see cabinet doors being sprayed, but ring first.',
  hoursHeading: 'Office hours',
  hoursNote: 'The phone is answered during these. Crews start at seven and are on site, not at a desk.',
  hoursTable: { day: 'Day', open: 'Open' },
  areaHeading: 'The four towns',
  mapLabel: 'Map — 31 Thickson Road South, Whitby',
  estimateCta: 'Get an estimate',
};
