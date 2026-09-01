// The Foundry on Bay — the sample site for the Venue / Event Space playbook.
// A fictional converted industrial event space in Hamilton, Ontario; nothing
// here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file. The gallery is the
// exception in one direction only: its items are modelled in
// venue-event-space.cms.ts as the collection the owner edits, and the entries
// below are the seed data that model describes.
//
// Flags: SEO, CMS, Analytics, Booking, Domain.
// Deliberately absent: e-commerce and CRM. A venue does not sell anything
// through a cart — the deposit and the balance are invoiced against a signed
// contract — and a single date-hold enquiry a week does not need a CRM behind
// it. That absence is the argument for this tier rather than the next one up.
//
// First demo on the `venue` vertical. Register: dark, quiet and largely
// pictures. Near-black base, an exposed-brick band, warm pewter as the one
// metal, and a high-contrast serif set large and left alone. The four other
// dark-base demos in the catalogue all shout; this one does not.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type EventKind = 'wedding' | 'corporate' | 'film' | 'celebration';

export interface Room {
  id: string;
  name: string;
  blurb: string;
  /** the numbers a planner writes down */
  specs: { label: string; value: string }[];
  bestFor: string;
  photo: { file: string; subject: string; alt: string };
}

export interface GalleryItem {
  id: string;
  caption: string;
  kind: EventKind;
  /** the room it was shot in, which is why the filter is useful */
  room: string;
  credit: string;
  photo: { file: string; subject: string; alt: string };
}

export interface PackageTier {
  id: string;
  name: string;
  summary: string;
  /** null where the price genuinely depends on the date */
  fromPrice: number | null;
  priceNote: string;
  includes: string[];
  minimum: string;
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Near-black base, exposed brick as the contrast band, warm pewter as the
 *  single metal. Four other demos already use a dark base and every one of
 *  them puts a pale cream band against it; this one puts brick, which is the
 *  fastest way to tell the two apart at a glance on a call. */
export const theme: DemoTheme = {
  ink: '#0F0E0C',
  inkRaised: '#181513',
  inkLine: '#2B2521',
  /** exposed brick */
  paper: '#54372B',
  paperRaised: '#5F4033',
  paperLine: '#7A5645',
  /** warm pewter on near-black (10.4:1) */
  accent: '#C5BDB2',
  /** lifted for the brick band (8.2:1) */
  accentOnPaper: '#E8DFD4',
  onInk: '#F3EDE6',
  onInkDim: 'rgba(243, 237, 230, 0.72)',
  onPaper: '#F8F1E9',
  onPaperDim: 'rgba(248, 241, 233, 0.80)',
  onAccent: '#14110F',
  displayFont: '"Instrument Serif", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Work Sans", "Segoe UI", system-ui, sans-serif',
  radius: '0',
  leading: '1.7',
};

export const fonts = [
  { family: 'Instrument Serif', file: 'instrument-serif-latin-400.woff2', weight: '400' },
  { family: 'Work Sans', file: 'work-sans-latin-var.woff2', weight: '300 600' },
];

export const business: DemoBusiness = {
  name: 'The Foundry on Bay',
  shortName: 'The Foundry',
  positioning: 'Converted industrial event space in Hamilton. 180 seated, 250 standing.',
  address: {
    street: '410 Bay Street North',
    neighbourhood: 'North End',
    city: 'Hamilton',
    region: 'ON',
    postalCode: 'L8L 1P4',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0173',
  phoneHref: 'tel:+19055550173',
  email: 'events@thefoundryonbay.ca',
  emailHref: 'mailto:events@thefoundryonbay.ca',
};

/** Viewing hours, not opening hours — nobody walks into a venue. */
export const viewingHours: { day: string; short: string; schemaDay: string; open: string; close: string }[] = [
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '10:00', close: '17:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '10:00', close: '17:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '10:00', close: '19:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '10:00', close: '17:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '11:00', close: '15:00' },
];

/** The headline numbers, published once and referenced everywhere. */
export const capacity = {
  seated: 180,
  standing: 250,
  mezzanineSeated: 40,
  squareFeet: 6400,
  ceilingFeet: 18,
  licensedUntil: '1:00 am',
};

export const rooms: Room[] = [
  {
    id: 'main-hall',
    name: 'The Main Hall',
    blurb:
      'The original casting floor. Eighteen feet to the trusses, brick on three sides, and a north wall of industrial glazing that does most of the lighting work until about seven.',
    specs: [
      { label: 'Seated', value: '180 at rounds' },
      { label: 'Standing', value: '250' },
      { label: 'Floor', value: '6,400 sq ft' },
      { label: 'Ceiling', value: '18 ft to truss' },
    ],
    bestFor: 'Wedding receptions, conferences, launches, anything that needs one room to hold everyone.',
    photo: {
      file: 'main-hall',
      subject:
        'Empty converted industrial hall, exposed brick walls, steel roof trusses, tall north-facing windows, late afternoon light across a concrete floor',
      alt: 'The Main Hall at The Foundry on Bay, empty and lit from the north windows',
    },
  },
  {
    id: 'mezzanine',
    name: 'The Mezzanine',
    blurb:
      'The old crane gallery, running the length of the east wall. It looks down over the hall, which makes it the ceremony overflow, the head table, or the room the speeches are given from.',
    specs: [
      { label: 'Seated', value: '40' },
      { label: 'Standing', value: '60' },
      { label: 'Access', value: 'Stairs and lift' },
      { label: 'Rail', value: 'Original steel' },
    ],
    bestFor: 'Head tables, breakout sessions, a quieter bar during a standing reception.',
    photo: {
      file: 'mezzanine',
      subject:
        'Industrial mezzanine gallery with original steel railing overlooking a large empty hall below, warm evening light',
      alt: 'The Mezzanine looking down over the Main Hall',
    },
  },
  {
    id: 'annex',
    name: 'The Annex',
    blurb:
      'A self-contained room off the west corridor with its own entrance, washroom and door that locks. It is the getting-ready room on a wedding and the green room on everything else.',
    specs: [
      { label: 'Capacity', value: '16' },
      { label: 'Entrance', value: 'Private' },
      { label: 'Fit-out', value: 'Mirrors, rail, sink' },
      { label: 'Included', value: 'With full-day hire' },
    ],
    bestFor: 'Getting ready, green room, speaker prep, a place to put the gifts and the coats.',
    photo: {
      file: 'annex',
      subject:
        'Small brick room with a large mirror, a clothing rail and a window, soft natural light, minimal furniture',
      alt: 'The Annex, set up as a getting-ready room',
    },
  },
  {
    id: 'yard',
    name: 'The Yard',
    blurb:
      'The loading yard, gravelled and strung, on the south side away from the road. It is where people go to stand outside, and where a ceremony goes when the forecast holds.',
    specs: [
      { label: 'Standing', value: '120' },
      { label: 'Surface', value: 'Compacted gravel' },
      { label: 'Cover', value: 'None — weather call at noon' },
      { label: 'Curfew', value: '10:00 pm outdoors' },
    ],
    bestFor: 'Outdoor ceremonies, cocktail hour, the smoking corner nobody wants to talk about.',
    photo: {
      file: 'yard',
      subject:
        'Gravelled industrial courtyard with festoon lights strung overhead between brick walls, dusk',
      alt: 'The Yard at dusk with festoon lighting',
    },
  },
];

/** What the building already has, so nobody rents it twice. */
export const included: { title: string; detail: string }[] = [
  {
    title: 'In-house AV',
    detail:
      'Line array with four subs, twelve-channel desk, two handheld and two lavalier radio mics, a 5,000-lumen laser projector and a 16 ft screen. An operator is included for the first four hours.',
  },
  {
    title: 'Lighting',
    detail:
      'Dimmable pendants over the hall, forty LED uplights on a wireless desk, festoon in the yard, and full blackout on the north glazing for daytime screenings.',
  },
  {
    title: 'Power',
    detail:
      '400A three-phase at the north wall with 63A and 32A distro on site — enough for a film unit without a generator in the yard.',
  },
  {
    title: 'Furniture',
    detail:
      'Twenty 60-inch rounds, twelve 8 ft trestles, 200 cross-back chairs, and a 24 ft modular stage in 8 ft sections. Set and struck by our crew, not yours.',
  },
  {
    title: 'The bar',
    detail:
      'Two service bars, licensed and staffed by us. It is exclusive — the bar is ours on every booking, and that is not negotiable because the licence is in our name.',
  },
  {
    title: 'Load-in',
    detail:
      'Twelve-foot roller door straight onto the hall floor, level with the yard. No stairs, no lift booking, no carrying a stage through a lobby.',
  },
];

/** Catering is a list, not a kitchen. Saying so plainly is worth more than
 *  implying an in-house offer that does not exist. */
export const catering = {
  heading: 'Catering is yours to choose',
  body:
    'There is no kitchen here, and we are not going to pretend otherwise. What there is: a 900 sq ft prep room with three-phase power, a wash-up, refrigeration and a service corridor straight to the hall.',
  listHeading: 'Preferred caterers',
  listNote:
    'Six caterers know the building, have current insurance on file and do not need a walkthrough. You can bring your own instead — there is a $600 outside-caterer fee and a site visit two weeks out.',
  caterers: [
    { name: 'Ashgrove Kitchen', style: 'Plated and family-style, Ontario-led menus' },
    { name: 'Marchetti Catering', style: 'Italian, large-format, very good at 180 covers' },
    { name: 'Salt & Cedar', style: 'Canapés and stations, strong vegetarian' },
    { name: 'Gage Park Provisions', style: 'Buffet and barbecue, corporate day rates' },
    { name: 'Nasreen Fine Foods', style: 'Halal, South Asian and Levantine' },
    { name: 'Two Barns Bakehouse', style: 'Breakfast, breaks and dessert tables' },
  ],
};

/** The one thing every venue site buries and every planner needs first. */
export const packages: PackageTier[] = [
  {
    id: 'full-day',
    name: 'Full Day',
    summary:
      'The building from 8:00 am to 1:00 am. Set-up, event and strike in one hire, with the Annex and the Yard included.',
    fromPrice: 6500,
    priceNote: 'Friday and Saturday, May to October. Lower midweek and off-season.',
    includes: [
      'Main Hall, Mezzanine, Annex and Yard',
      'Furniture set and struck by our crew',
      'AV with an operator for the first four hours',
      'Venue manager on site the whole day',
      'Two licensed service bars, staffed',
      'Cleaning and waste',
    ],
    minimum: 'No minimum spend. Bar is charged on consumption.',
  },
  {
    id: 'evening',
    name: 'Evening',
    summary:
      'From 4:00 pm to 1:00 am with a two-hour set-up window ahead of it. The usual shape for a corporate party or a launch.',
    fromPrice: 4200,
    priceNote: 'Weeknights. Friday and Saturday evenings are quoted as Full Day.',
    includes: [
      'Main Hall and Mezzanine',
      'Furniture set and struck by our crew',
      'AV with an operator for the first four hours',
      'Venue manager on site',
      'One licensed service bar, staffed',
      'Cleaning and waste',
    ],
    minimum: 'Bar minimum of $1,500 on Thursday and Friday evenings.',
  },
  {
    id: 'day-rate',
    name: 'Daytime',
    summary:
      'From 8:00 am to 5:00 pm for conferences, training, shoots and anything that ends before the evening turnaround.',
    fromPrice: 2800,
    priceNote: 'Monday to Thursday. Includes blackout on the north glazing.',
    includes: [
      'Main Hall and Mezzanine',
      'Trestles, chairs and staging set to plan',
      'Projector, screen and PA with an operator',
      'Blackout and daytime lighting states',
      'Coffee service point for your caterer',
      'Cleaning and waste',
    ],
    minimum: 'Half days are available Monday to Wednesday only.',
  },
  {
    id: 'film',
    name: 'Film and photography',
    summary:
      'The hall as a location. Quoted per project because a two-hour stills shoot and a four-day unit are not the same conversation.',
    fromPrice: null,
    priceNote: 'Quoted per project. Send the schedule and the crew size.',
    includes: [
      'Exclusive use of the hall and yard',
      '400A three-phase with distro',
      'Blackout and full lighting control',
      'Unit parking for six vehicles',
      'Annex as a green room',
      'Location manager on site',
    ],
    minimum: 'Two-hour minimum. Overnight work by arrangement.',
  },
];

export const pricingNotes: { title: string; detail: string }[] = [
  {
    title: 'What moves the price',
    detail:
      'The day of the week and the month, in that order. A Saturday in September and a Tuesday in February are the same room and not the same number.',
  },
  {
    title: 'Deposit',
    detail:
      'Thirty per cent holds the date and comes off the balance. It is invoiced against a signed contract — nothing is charged through this website.',
  },
  {
    title: 'Balance',
    detail:
      'Due fourteen days before the event, invoiced the same way. Bar consumption is settled within five business days after.',
  },
  {
    title: 'Cancellation',
    detail:
      'The deposit is non-refundable inside 120 days. Outside that it transfers once to another date within the same calendar year.',
  },
];

/** Gallery seed data. On a live build these are documents in the studio —
 *  see venue-event-space.cms.ts for the model the owner actually edits. */
export const gallery: GalleryItem[] = [
  {
    id: 'hall-rounds',
    caption: 'Main Hall set for 180 at rounds, uplights at 2700K',
    kind: 'wedding',
    room: 'Main Hall',
    credit: 'Ilona Petrescu',
    photo: {
      file: 'gallery-hall-rounds',
      subject: 'Large industrial hall set with round tables and chairs, warm uplighting on brick walls, evening',
      alt: 'The Main Hall set with round tables for a wedding reception',
    },
  },
  {
    id: 'yard-ceremony',
    caption: 'Ceremony in the Yard, chairs struck and reset inside in nineteen minutes',
    kind: 'wedding',
    room: 'The Yard',
    credit: 'Ilona Petrescu',
    photo: {
      file: 'gallery-yard-ceremony',
      subject: 'Rows of chairs in a gravelled industrial courtyard set for an outdoor ceremony, brick walls, afternoon',
      alt: 'A ceremony set up in The Yard',
    },
  },
  {
    id: 'mezz-speeches',
    caption: 'Speeches from the Mezzanine, which is the only place the whole room can see',
    kind: 'wedding',
    room: 'The Mezzanine',
    credit: 'Devon Achebe',
    photo: {
      file: 'gallery-mezz-speeches',
      subject: 'A person speaking at a microphone on an industrial mezzanine above a seated crowd, warm light',
      alt: 'Speeches given from the Mezzanine above the hall',
    },
  },
  {
    id: 'conference-theatre',
    caption: 'Theatre style for 200, blackout on the north glazing',
    kind: 'corporate',
    room: 'Main Hall',
    credit: 'Devon Achebe',
    photo: {
      file: 'gallery-conference',
      subject: 'Industrial hall set theatre style with rows of chairs facing a large projection screen, blackout blinds',
      alt: 'The Main Hall set theatre style for a conference',
    },
  },
  {
    id: 'launch-standing',
    caption: 'Product launch, 250 standing, both bars open',
    kind: 'corporate',
    room: 'Main Hall',
    credit: 'Sofia Lindqvist',
    photo: {
      file: 'gallery-launch',
      subject: 'Crowded standing reception in a brick industrial hall, festoon lighting, people with drinks',
      alt: 'A standing product launch in the Main Hall',
    },
  },
  {
    id: 'film-unit',
    caption: 'Four-day unit, hall blacked out, distro off the north wall',
    kind: 'film',
    room: 'Main Hall',
    credit: 'Sofia Lindqvist',
    photo: {
      file: 'gallery-film',
      subject: 'Film crew and lighting stands in a blacked-out industrial hall, cables run along a concrete floor',
      alt: 'A film unit working in the blacked-out Main Hall',
    },
  },
  {
    id: 'stills-brick',
    caption: 'Stills against the west wall, no lighting brought in',
    kind: 'film',
    room: 'Main Hall',
    credit: 'Ilona Petrescu',
    photo: {
      file: 'gallery-stills',
      subject: 'A photographer working with a subject against a bare brick wall lit only by a tall window',
      alt: 'A stills shoot against the brick west wall',
    },
  },
  {
    id: 'holiday-party',
    caption: 'Company party, long tables down the hall, stage at the north end',
    kind: 'celebration',
    room: 'Main Hall',
    credit: 'Devon Achebe',
    photo: {
      file: 'gallery-holiday',
      subject: 'Long trestle tables running the length of an industrial hall set for dinner, pendant lights lowered',
      alt: 'Long tables set down the Main Hall for a company party',
    },
  },
  {
    id: 'annex-ready',
    caption: 'The Annex, mirrors up, an hour before doors',
    kind: 'wedding',
    room: 'The Annex',
    credit: 'Ilona Petrescu',
    photo: {
      file: 'gallery-annex',
      subject: 'Small brick room with a large mirror, dresses on a rail and daylight through one window',
      alt: 'The Annex in use as a getting-ready room',
    },
  },
  {
    id: 'yard-cocktails',
    caption: 'Cocktail hour in the Yard while the hall is turned around',
    kind: 'celebration',
    room: 'The Yard',
    credit: 'Sofia Lindqvist',
    photo: {
      file: 'gallery-yard-cocktails',
      subject: 'People standing with drinks in a gravelled courtyard under festoon lights at dusk',
      alt: 'Cocktail hour in The Yard',
    },
  },
  {
    id: 'truss-detail',
    caption: 'The trusses, which are the reason people book the room',
    kind: 'corporate',
    room: 'Main Hall',
    credit: 'Devon Achebe',
    photo: {
      file: 'gallery-truss',
      subject: 'Close view upward at riveted steel roof trusses against a dark ceiling with hanging pendant lights',
      alt: 'The original steel roof trusses above the Main Hall',
    },
  },
  {
    id: 'bar-service',
    caption: 'The north bar during a standing reception',
    kind: 'celebration',
    room: 'Main Hall',
    credit: 'Sofia Lindqvist',
    photo: {
      file: 'gallery-bar',
      subject: 'Two bartenders working a long service bar built into a brick alcove, warm light, bottles on shelves',
      alt: 'The north service bar during an event',
    },
  },
];

export const eventKinds: { id: EventKind; label: string }[] = [
  { id: 'wedding', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'film', label: 'Film and photography' },
  { id: 'celebration', label: 'Celebrations' },
];

const BASE = '/industries/venue/preview/venue-event-space/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}space`, label: 'The Space' },
    { href: `${BASE}weddings`, label: 'Weddings' },
    { href: `${BASE}corporate`, label: 'Corporate' },
    { href: `${BASE}gallery`, label: 'Gallery' },
    { href: `${BASE}pricing`, label: 'Pricing' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}check-a-date`, label: 'Check a date', event: 'date_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/venue',
};

export const footer: DemoFooter = {
  tagline: 'A converted foundry in Hamilton’s north end. 180 seated, 250 standing, licensed to 1:00 am.',
  rowsHeading: 'Viewings',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} The Foundry on Bay. Sample site — not a real business.`,
};

export const pageMeta: Record<
  'home' | 'space' | 'weddings' | 'corporate' | 'gallery' | 'pricing' | 'checkADate' | 'contact',
  DemoPageMeta
> = {
  home: {
    title: 'The Foundry on Bay — Event Venue in Hamilton, Ontario',
    description:
      'A converted foundry in Hamilton’s north end. 180 seated, 250 standing, 18 ft trusses, in-house AV and an exclusive bar. Weddings, corporate events and film.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  space: {
    title: 'The Space — The Foundry on Bay, Hamilton',
    description:
      'Four spaces under one hire: a 6,400 sq ft main hall, a steel mezzanine, a private annex and a gravelled yard. Capacities, ceiling heights, power and load-in.',
    ogImage: '/og/default.png',
    breadcrumb: 'The Space',
  },
  weddings: {
    title: 'Weddings — The Foundry on Bay, Hamilton',
    description:
      'Ceremony and reception in one building, 180 seated. What is included, how the day runs, the preferred caterer list, and the things we do not do.',
    ogImage: '/og/default.png',
    breadcrumb: 'Weddings',
  },
  corporate: {
    title: 'Corporate and Film — The Foundry on Bay, Hamilton',
    description:
      'Conferences to 200 theatre style, launches to 250 standing, and a blacked-out hall with 400A three-phase for film units. Day rates and evening hires.',
    ogImage: '/og/default.png',
    breadcrumb: 'Corporate',
  },
  gallery: {
    title: 'Gallery — The Foundry on Bay, Hamilton',
    description:
      'The hall set for weddings, conferences, launches and film. Filter by event type. Every photograph is from an event held in this building.',
    ogImage: '/og/default.png',
    breadcrumb: 'Gallery',
  },
  pricing: {
    title: 'Pricing and Packages — The Foundry on Bay, Hamilton',
    description:
      'Full day, evening, daytime and film hire rates in CAD, what each includes, and the deposit and cancellation terms in plain words.',
    ogImage: '/og/default.png',
    breadcrumb: 'Pricing & Packages',
  },
  checkADate: {
    title: 'Check a Date — The Foundry on Bay, Hamilton',
    description:
      'Tell us the event, the date you want and a second one you would take. We come back within one business day with availability and a hold.',
    ogImage: '/og/default.png',
    breadcrumb: 'Check a Date',
  },
  contact: {
    title: 'Contact and Viewings — The Foundry on Bay, Hamilton',
    description:
      'Address, phone, email and viewing hours. Parking, transit, load-in and accessibility for 410 Bay Street North, Hamilton.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Hamilton, Ontario',
  heroTitle: 'A foundry that stopped casting in 1974',
  heroBody:
    'Six thousand four hundred square feet, eighteen feet to the trusses, and brick that was never meant to be looked at. It holds 180 seated and 250 standing.',
  heroPrimaryCta: 'Check a date',
  heroSecondaryCta: 'See the space',
  heroPhoto: {
    file: 'hero-hall',
    subject:
      'Wide view of an empty converted foundry hall at dusk, exposed brick, steel trusses, pendant lights, concrete floor',
    alt: 'The Main Hall at The Foundry on Bay',
  },
  figuresHeading: 'The numbers',
  figures: [
    { value: '180', label: 'Seated at rounds' },
    { value: '250', label: 'Standing' },
    { value: '6,400', label: 'Square feet' },
    { value: '18 ft', label: 'To the trusses' },
  ],
  usesHeading: 'What happens here',
  uses: [
    {
      title: 'Weddings',
      detail: 'Ceremony in the Yard or the hall, dinner at 180, and the room turned around while everyone is outside.',
      href: 'weddings',
      cta: 'Weddings at the Foundry',
    },
    {
      title: 'Corporate',
      detail: 'Conferences at 200 theatre style, launches at 250 standing, AGMs, training days and the December party.',
      href: 'corporate',
      cta: 'Corporate and film',
    },
    {
      title: 'Film and photography',
      detail: 'A blacked-out hall, 400A three-phase, and a twelve-foot door onto the floor. Quoted per project.',
      href: 'corporate',
      cta: 'Location hire',
    },
  ],
  includedHeading: 'What comes with the room',
  includedBody:
    'Most of what a venue lets you rent separately is already in the building. The list below is not an upsell menu.',
  includedCta: 'The full inventory',
  galleryHeading: 'In use',
  galleryBody: 'Every photograph on this site is from an event held in this building.',
  galleryCta: 'The gallery',
  closerHeading: 'Have a date in mind',
  closerBody:
    'Send it with a second date you would take. We answer within one business day, and a hold costs nothing until the contract.',
  closerCta: 'Check a date',
};

export const spacePage = {
  eyebrow: 'The Space',
  heading: 'Four rooms, one hire',
  intro:
    'The building is hired whole. There is no configuration where another party is in the next room, because there is no next room.',
  bestForLabel: 'Best for',
  includedHeading: 'In the building already',
  includedBody:
    'Set and struck by our crew on every hire. If something here is not needed we do not put it out; the price does not change either way, and we would rather say that than pretend it is a discount.',
  accessHeading: 'Getting in and out',
  access: [
    { title: 'Load-in', detail: 'Twelve-foot roller door from the yard straight onto the hall floor. No step, no lift, no booking a service corridor.' },
    { title: 'Step-free', detail: 'Level entry throughout the ground floor, accessible washrooms, and a lift to the Mezzanine.' },
    { title: 'Parking', detail: 'Sixty spaces in the yard and on the north lot, plus the municipal lot two blocks south after six.' },
    { title: 'Curfew', detail: 'Licensed and amplified until 1:00 am inside. Outdoors in the Yard stops at 10:00 pm, which is the bylaw, not our preference.' },
  ],
  closerHeading: 'Come and stand in it',
  closerBody: 'Photographs of a big room are all the same. Viewings run Tuesday to Saturday and take about twenty minutes.',
  closerCta: 'Book a viewing',
};

export const weddingsPage = {
  eyebrow: 'Weddings',
  heading: 'One building, one day, one crew',
  intro:
    'Ceremony, photographs, dinner and dancing without moving anybody in a car. The room is turned around during cocktail hour by our staff, not by your wedding party.',
  /** Built from `capacity` so the three numbers on this page cannot drift from
   *  the three numbers on every other page. */
  capacityLine: `${capacity.seated} seated · ${capacity.standing} standing · licensed to ${capacity.licensedUntil}`,
  dayHeading: 'How the day runs',
  day: [
    { time: '11:00 am', title: 'Doors to you', detail: 'The Annex opens for getting ready. Florists, planners and the cake come in through the yard door.' },
    { time: '3:00 pm', title: 'Ceremony', detail: 'In the Yard if the noon weather call holds, in the hall if it does not. Both are set in advance either way.' },
    { time: '3:40 pm', title: 'Cocktail hour', detail: 'Guests move to the Yard or the Mezzanine. The hall is reset for dinner behind a closed door.' },
    { time: '5:00 pm', title: 'Dinner', detail: 'Doors reopen at 180 seated. Speeches from the Mezzanine, which is the only spot the whole room can see.' },
    { time: '8:30 pm', title: 'Floor open', detail: 'Tables struck to the perimeter, pendants down, uplights on. Bar stays open until 12:30.' },
    { time: '1:00 am', title: 'Out', detail: 'Music off at 1:00, building clear by 2:00. We handle the strike; you take the flowers and the gifts.' },
  ],
  honestHeading: 'Things we do not do',
  honestBody:
    'Every one of these is a real question we get, and a straight answer now is worth more than a good surprise later.',
  honest: [
    'No in-house catering. There is no kitchen, only a prep room. Use our list or bring your own for a fee.',
    'No corkage or outside bar. The licence is in our name, so the bar is ours on every booking without exception.',
    'No décor packages, no draping, no chair covers. We hire you a room with good bones and get out of the way.',
    'No two weddings in one day, and never a second event in the building alongside yours.',
    'No confetti, no sparklers, no open flame outside a holder. The building is 1911 and mostly wood above the trusses.',
  ],
  closerHeading: 'Dates go about fourteen months out',
  closerBody: 'Saturdays from May to October are the ones that move first. Send two dates and we will tell you honestly what is left.',
  closerCta: 'Check a date',
};

export const corporatePage = {
  eyebrow: 'Corporate and Film',
  heading: 'A room that does not look like a hotel',
  intro:
    'Conferences, launches, AGMs, training days, parties and film units. The same hall, configured differently, hired by the day or the evening.',
  formatsHeading: 'Configurations',
  formats: [
    { name: 'Theatre', capacity: '200', detail: 'Rows facing the north end, 16 ft screen, centre aisle. Set by 7:00 am for a 9:00 start.' },
    { name: 'Cabaret', capacity: '120', detail: 'Rounds of eight with a clear sightline to the stage. The usual shape for a full-day conference.' },
    { name: 'Classroom', capacity: '90', detail: 'Trestles at 6 ft, power to every second table, for training that involves laptops.' },
    { name: 'Boardroom', capacity: '40', detail: 'One long table down the centre of the hall, or the Mezzanine for something smaller.' },
    { name: 'Standing', capacity: '250', detail: 'Both bars, high tables, stage struck. Launches, receptions and the December party.' },
    { name: 'Unit base', capacity: 'Crew of 40', detail: 'Hall blacked out, Annex as green room, yard for six vehicles, 400A at the north wall.' },
  ],
  avHeading: 'AV, and who runs it',
  avBody:
    'The system is installed, not hired in. An operator is included for the first four hours of every booking, which covers a keynote and a panel; after that it is $85 an hour and worth it.',
  filmHeading: 'For film and photography',
  filmBody:
    'The hall takes a unit without a generator in the yard. Blackout on the north glazing means a controllable interior at two in the afternoon, and the twelve-foot door means a dolly track goes in on a cart rather than on shoulders.',
  filmPoints: [
    '400A three-phase with 63A and 32A distro',
    'Full blackout, dimmable house lighting, no daylight leaks',
    'Twelve-foot roller door, level from the yard to the floor',
    'Unit parking for six vehicles inside the gate',
    'Annex as a green room, with its own washroom',
    'Quoted per project — send the schedule and the crew size',
  ],
  closerHeading: 'Get a date and a number',
  closerBody: 'Tell us the format and the head count. We come back with availability and a price the same week.',
  closerCta: 'Check a date',
};

export const galleryPage = {
  eyebrow: 'Gallery',
  heading: 'The room, in use',
  intro:
    'Every photograph here was taken in this building at a real booking. Filter by what the event was.',
  filterLabel: 'Filter by event type',
  allLabel: 'Everything',
  creditLabel: 'Photograph',
  countLabel: 'photographs',
  closerHeading: 'See it empty first',
  closerBody: 'A room set for someone else’s wedding tells you very little. Viewings run Tuesday to Saturday.',
  closerCta: 'Book a viewing',
};

export const pricingPage = {
  eyebrow: 'Pricing & Packages',
  heading: 'Four ways to hire it',
  intro:
    'Rates in CAD, before tax, for the venue only. Catering and bar consumption are separate and are not marked up by us.',
  fromLabel: 'From',
  quotedLabel: 'Quoted',
  includesLabel: 'Included in the hire',
  minimumLabel: 'Minimums',
  notesHeading: 'Terms, in plain words',
  extrasHeading: 'The things that cost extra',
  extras: [
    { item: 'AV operator past four hours', price: '$85 / hour' },
    { item: 'Outside caterer fee', price: '$600' },
    { item: 'Additional bar staff', price: '$45 / hour each' },
    { item: 'Ceremony set and strike in the Yard', price: '$450' },
    { item: 'Extra hour past 1:00 am', price: 'Not available' },
    { item: 'Second viewing before booking', price: 'No charge' },
  ],
  closerHeading: 'The number you get is the number',
  closerBody:
    'One quote, itemised, valid for thirty days. We do not have a discount to offer you at the end of a phone call.',
  closerCta: 'Check a date',
};

/** The booking flow. Four steps, because a venue enquiry has four questions
 *  and asking them on one long page is how planners abandon a form. */
export const checkADatePage = {
  eyebrow: 'Check a Date',
  heading: 'Two dates, four questions',
  intro:
    'Availability is answered by a person within one business day. A hold is free and lasts seven days; nothing is committed until a contract is signed.',
  stepLabel: 'Step',
  ofLabel: 'of',
  backLabel: 'Back',
  nextLabel: 'Continue',
  submitLabel: 'Send the enquiry',
  errorSummaryHeading: 'Check these fields',
  steps: [
    {
      id: 'event',
      title: 'What is the event',
      hint: 'It changes which rooms we set and who answers you.',
    },
    {
      id: 'dates',
      title: 'When',
      hint: 'A second date you would genuinely take makes a hold about twice as likely.',
    },
    {
      id: 'size',
      title: 'How many, and roughly what budget',
      hint: 'Budget band is not a negotiation. It tells us whether to quote a Saturday or a Thursday.',
    },
    {
      id: 'contact',
      title: 'Who you are',
      hint: 'One person we can reach. We do not add anyone to a mailing list.',
    },
  ],
  fields: {
    eventType: {
      label: 'Event type',
      options: ['Wedding', 'Corporate event or conference', 'Film or photography', 'Party or celebration', 'Something else'],
      error: 'Choose the closest event type.',
    },
    preferredDate: {
      label: 'Preferred date',
      hint: 'Saturdays from May to October go about fourteen months out.',
      error: 'A preferred date, even an approximate one.',
    },
    alternateDate: {
      label: 'Alternate date',
      hint: 'Optional, but it is the single most useful thing on this form.',
    },
    guestCount: {
      label: 'Guest count',
      hint: 'Best guess. 180 seated and 250 standing are the ceilings.',
      error: 'A number between 1 and 250.',
    },
    seating: {
      label: 'Seated or standing',
      options: ['Seated dinner', 'Standing reception', 'Theatre or classroom', 'Not decided yet'],
      error: 'Choose one, or the last option.',
    },
    budgetBand: {
      label: 'Venue budget band',
      hint: 'Venue hire only, not catering or bar.',
      options: ['Under $3,000', '$3,000 – $5,000', '$5,000 – $8,000', '$8,000 – $12,000', 'Over $12,000', 'Not sure yet'],
      error: 'A band, even a rough one.',
    },
    name: { label: 'Your name', error: 'A name we can address the reply to.' },
    email: { label: 'Email', error: 'A valid email, so availability reaches you.' },
    phone: { label: 'Phone', hint: 'Optional. Faster if the date is inside eight weeks.' },
    notes: {
      label: 'Anything else',
      hint: 'Ceremony on site, dietary counts, a caterer already booked, a hard budget ceiling.',
    },
  },
  confirmation: {
    heading: 'Enquiry sent',
    body:
      'A person reads this, not a queue. You will hear back within one business day with whether the date is open and what a hold would look like.',
    detailsHeading: 'What you sent',
    holdNote:
      'A hold lasts seven days and costs nothing. It comes off the calendar the moment somebody signs for that date, so we will tell you if there is another enquiry against it.',
    resetLabel: 'Send another enquiry',
    callLabel: 'Or call the office',
  },
  sidebarHeading: 'Before you send it',
  sidebarPoints: [
    'A hold is free and lasts seven days.',
    'Nothing is committed until a contract is signed.',
    'Thirty per cent deposit holds the date after that.',
    'We answer within one business day, six days a week.',
  ],
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: '410 Bay Street North',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Viewing hours',
  hoursNote:
    'Viewings are by appointment and take about twenty minutes. There is nobody at a front desk — the building is either empty or in use.',
  hoursTable: { day: 'Day', open: 'Open' },
  gettingHereHeading: 'Getting here',
  gettingHere: [
    { title: 'Parking', detail: 'Sixty spaces in the yard and the north lot. The municipal lot two blocks south is free after six.' },
    { title: 'Transit', detail: 'The Barton bus stops one block east. Hamilton GO Centre is a nine-minute taxi.' },
    { title: 'Load-in', detail: 'Twelve-foot roller door off the yard, level with the hall floor. Suppliers use the north gate.' },
    { title: 'Accessibility', detail: 'Step-free throughout the ground floor, accessible washrooms, and a lift to the Mezzanine.' },
  ],
  mapLabel: 'Map — 410 Bay Street North, Hamilton',
  ctaHeading: 'Have a date',
  ctaBody: 'The enquiry form gets you an answer faster than the phone, because it arrives with the dates attached.',
  cta: 'Check a date',
};

export const galleryFor = (kind: EventKind): GalleryItem[] =>
  gallery.filter((item) => item.kind === kind);

export const roomById = (id: string): Room | undefined => rooms.find((room) => room.id === id);
