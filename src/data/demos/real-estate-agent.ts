// Elena Marlowe Real Estate — the sample site for the Real Estate / Agent
// playbook. A fictional salesperson at a fictional brokerage in Burlington;
// nothing here is a real business, a real listing or a real price, and the
// demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file.
//
// ── THREE RULES SPECIFIC TO THIS DEMO ────────────────────────────────────
//
// 1. NO TRADEMARKS. The words REALTOR, MLS and Multiple Listing Service are
//    certification marks owned by CREA and used under licence by members. A
//    fictional agent is not a member of anything, so this site says "agent",
//    "listing" and "board feed" throughout. If a real client build wants the
//    marks, they come with the client's own membership and their own ® — not
//    from us.
//
// 2. THE BROKERAGE IS NAMED EVERYWHERE. In Ontario a registrant advertises
//    under the brokerage's registered name, with their own name and
//    registration category, and the trade name cannot be more prominent than
//    the brokerage. That is why `business.name` is the agent and
//    `brokerage.line` sits with it in the footer on every page — the layout
//    is built so the pair cannot be separated by an edit.
//
// 3. BUYING AND RENTING NEVER MERGE. A renter's questions (term, what's
//    included, when it's free) and a buyer's questions (taxes, lot, closing)
//    are different questions. They get separate pages, separate accents and
//    separate spec rows. The moment they share a filtered list, both get a
//    worse page.
//
// Flags: SEO, CMS, CRM, Analytics, Domain.
// Deliberately absent: e-commerce and booking. Nothing about a real estate
// transaction can settle on a website — a deposit goes to the brokerage's
// trust account — and showings are arranged by the agent out of the enquiry,
// which is why there is no calendar anywhere on this build.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type Deal = 'sale' | 'lease';

export type PropertyType =
  | 'Detached'
  | 'Semi-detached'
  | 'Townhouse'
  | 'Condo apartment'
  | 'Bungalow'
  | 'Duplex';

/** The chip on a card. Deliberately not a date: a demo site outlives any
 *  "listed 3 days ago" it prints, and a stale date is the fastest way to make
 *  a sample look abandoned. */
export type ListingFlag = 'new' | 'open-house' | 'offer-held' | 'price-improved';

export interface Listing {
  id: string;
  /** The agent's OWN file reference, not a board number. Invented numbers in
   *  a board's format are the one thing on a demo that could be mistaken for
   *  a real record, so the prefix is the fictional brokerage's initials. */
  ref: string;
  deal: Deal;
  address: string;
  neighbourhood: string;
  city: string;
  /** CAD. A sale price outright; a lease price is per month. */
  price: number;
  type: PropertyType;
  beds: number;
  baths: number;
  parking: number;
  /** interior square feet; null where it is genuinely not measured */
  sqft: number | null;
  blurb: string;
  highlights: string[];
  flag?: ListingFlag;
  /** open-house wording, shown only where the flag is set */
  openHouse?: string;

  // ── Sale-only fields ──────────────────────────────────────────────────
  /** frontage x depth, as a survey would print it */
  lot?: string;
  /** annual property tax, CAD */
  taxes?: number;
  /** monthly condo fee, CAD — condos only */
  condoFee?: number;
  /** what the fee covers, in the order a buyer asks */
  feeIncludes?: string[];

  // ── Lease-only fields ─────────────────────────────────────────────────
  /** month name only; a year would rot */
  available?: string;
  leaseTerm?: string;
  utilities?: string[];
  pets?: string;

  photo: { file: string; subject: string; alt: string };
  /** where the pin sits on the drawn area map, 0–1 from the top left */
  pin: { x: number; y: number };
}

export interface Neighbourhood {
  id: string;
  name: string;
  /** two sentences, in a buyer's terms, not a tourism board's */
  blurb: string;
  /** what actually trades there */
  typical: string;
}

export interface SoldRecord {
  /** street and area only — a full civic address on a sold record is
   *  somebody's home, and on a real build this list is published with the
   *  seller's consent or not at all */
  where: string;
  type: PropertyType;
  listed: number;
  sold: number;
  /** "9 days" — relative, so it does not date */
  onMarket: string;
}

export interface AgentDay {
  day: string;
  short: string;
  schemaDay: string;
  open: string;
  close: string;
  note?: string;
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Warm paper, deep pine, brass. Two accents rather than one, and this is the
 *  demo the second accent slot in DemoTheme was actually written for: brass
 *  carries everything to do with buying, slate carries everything to do with
 *  leasing, and the two never appear on the same card. A buyer scanning the
 *  homepage can tell which door they are on by colour before they read a word.
 *
 *  Every pairing below clears AA on its own ground; the two accents were
 *  picked to be separable by hue AND by lightness, so the split still reads
 *  under a colour-vision deficiency. */
export const theme: DemoTheme = {
  ink: '#FBF9F5',
  inkRaised: '#F2EDE4',
  inkLine: '#E0D8CB',
  paper: '#1F2A28',
  paperRaised: '#26332F',
  paperLine: '#3A4A44',
  /** deep brass on warm paper — 5.2:1 */
  accent: '#8A6212',
  /** lifted brass for the pine band — 7.8:1 */
  accentOnPaper: '#E8B44A',
  /** slate blue, the lease side — 7.7:1 on paper white */
  accentAlt: '#2F5468',
  /** lifted slate for the pine band — 8.0:1 */
  accentAltOnPaper: '#8FC6DE',
  onAccentAlt: '#FFFFFF',
  onInk: '#1B1A16',
  /** 7.2:1 composited */
  onInkDim: 'rgba(27, 26, 22, 0.74)',
  onPaper: '#F4F1EA',
  /** 8.2:1 composited */
  onPaperDim: 'rgba(244, 241, 234, 0.76)',
  onAccent: '#FFFFFF',
  displayFont: '"Newsreader", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Hanken Grotesk", "Segoe UI", system-ui, sans-serif',
  /** Prices, square footage and file references are figures a buyer compares
   *  down a column. They are set in mono for the same reason a spec sheet is. */
  monoFont: '"IBM Plex Mono", ui-monospace, Consolas, monospace',
  displayAxes: "'opsz' 32",
  radius: '3px',
};

export const fonts = [
  { family: 'Newsreader', file: 'newsreader-latin-var.woff2', weight: '400 700' },
  { family: 'Hanken Grotesk', file: 'hanken-grotesk-latin-var.woff2', weight: '400 700' },
  { family: 'IBM Plex Mono', file: 'ibm-plex-mono-latin-400.woff2', weight: '400' },
  { family: 'IBM Plex Mono', file: 'ibm-plex-mono-latin-600.woff2', weight: '600' },
];

export const business: DemoBusiness = {
  name: 'Elena Marlowe Real Estate',
  shortName: 'Marlowe',
  positioning: 'Buying, selling and leasing across Burlington and west Halton.',
  address: {
    street: '2140 Pine Street, Suite 3',
    neighbourhood: 'Downtown Burlington',
    city: 'Burlington',
    region: 'ON',
    postalCode: 'L7R 1N9',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0146',
  phoneHref: 'tel:+19055550146',
  email: 'elena@marlowerealestate.ca',
  emailHref: 'mailto:elena@marlowerealestate.ca',
};

/** The registrant and the firm they trade under. Rendered together, always. */
export const brokerage = {
  name: 'Harbourpoint Realty Ltd., Brokerage',
  registrantTitle: 'Salesperson',
  line: 'Elena Marlowe, Salesperson · Harbourpoint Realty Ltd., Brokerage',
  office: '3300 Fairview Street, Burlington, ON',
  officePhone: '(905) 555-0100',
  /** the standard Ontario advertising disclaimer, in plain words */
  solicitation:
    'Not intended to solicit properties already listed for sale or buyers under written representation agreement.',
  independence:
    'Every listing on this site is represented by Harbourpoint Realty Ltd., Brokerage. Commission, deposits and trust funds are handled by the brokerage, never by this website.',
};

export const agent = {
  name: 'Elena Marlowe',
  title: 'Salesperson',
  since: 'Working in Halton since 2014',
  areas: 'Burlington, Waterdown, Aldershot and west Oakville',
  languages: 'English and Portuguese',
  photo: {
    file: 'agent-hero',
    subject:
      'A woman in her late thirties in a blazer standing on a residential porch, arms relaxed, ordinary street behind her, late-afternoon light. Not posed against a sold sign and not in a studio.',
    alt: 'Elena Marlowe on the porch of a listing',
  },
  photoAbout: {
    file: 'agent-about',
    subject:
      'The same agent at a kitchen island with a client, paperwork and a laptop between them, mid-sentence. Working, not smiling at camera.',
    alt: 'Elena Marlowe going over an offer with clients at a kitchen table',
  },
};

/** Not opening hours — an agent does not have a shop. This is when calls get
 *  answered, which is the thing a person actually wants to know. */
export const availability: AgentDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '09:00', close: '19:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '09:00', close: '19:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '09:00', close: '19:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '09:00', close: '19:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '09:00', close: '18:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '10:00', close: '17:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '12:00', close: '17:00', note: 'Showings only' },
];

// ── The listings ─────────────────────────────────────────────────────────
// CMS-modelled — see real-estate-agent.cms.ts. This is the collection that
// makes the CMS flag true on this playbook: an agent changes it weekly and
// cannot wait on a developer to take a sold property down.
//
// Streets are invented. Every price, tax figure and fee is invented. The pin
// coordinates place each one on the drawn area map, which is a diagram of a
// town rather than a map of one.
export const listings: Listing[] = [
  {
    id: 'kerncliff-18',
    ref: 'HP-1184',
    deal: 'sale',
    address: '18 Kerncliff Rise',
    neighbourhood: 'Tyandaga',
    city: 'Burlington',
    price: 1249000,
    type: 'Detached',
    beds: 4,
    baths: 3,
    parking: 4,
    sqft: 2410,
    lot: '52 × 118 ft',
    taxes: 6840,
    flag: 'open-house',
    openHouse: 'Open house Saturday, 2–4pm',
    blurb:
      'A 1970s four-bedroom backing onto the escarpment trail, with the kitchen and back wall opened up in 2021. The lot is the reason to see it — the rear fence line is the ravine, and nothing will ever be built behind it.',
    highlights: [
      'Backs onto protected ravine, no rear neighbours',
      'Kitchen and rear wall rebuilt in 2021',
      'Furnace and roof both under six years old',
      'Double garage plus two on the drive',
    ],
    photo: {
      file: 'listing-kerncliff',
      subject: 'Two-storey brick house on a mature suburban street, trees behind it, late afternoon',
      alt: '18 Kerncliff Rise from the street',
    },
    pin: { x: 0.22, y: 0.3 },
  },
  {
    id: 'pine-2140-802',
    ref: 'HP-1191',
    deal: 'sale',
    address: '2140 Pine Street, Unit 802',
    neighbourhood: 'Downtown Burlington',
    city: 'Burlington',
    price: 789000,
    type: 'Condo apartment',
    beds: 2,
    baths: 2,
    parking: 1,
    sqft: 1085,
    taxes: 3960,
    condoFee: 742,
    feeIncludes: ['Heat', 'Water', 'Building insurance', 'One parking space', 'Locker'],
    flag: 'new',
    blurb:
      'An eighth-floor corner unit with a south-west exposure and a balcony wide enough to eat on. Two full bathrooms and a real second bedroom, which is rarer at this size than the floor plans suggest.',
    highlights: [
      'Corner unit, windows on two sides',
      'Second bedroom fits a queen and a wardrobe',
      'Parking and locker both owned, not rented',
      'Four-minute walk to the pier',
    ],
    photo: {
      file: 'listing-pine',
      subject: 'Bright open-plan condo living room with a balcony door and a lake view beyond',
      alt: 'The living room at 2140 Pine Street, Unit 802',
    },
    pin: { x: 0.53, y: 0.63 },
  },
  {
    id: 'orchard-64',
    ref: 'HP-1176',
    deal: 'sale',
    address: '64 Wrenfield Common',
    neighbourhood: 'The Orchard',
    city: 'Burlington',
    price: 1085000,
    type: 'Semi-detached',
    beds: 3,
    baths: 3,
    parking: 2,
    sqft: 1870,
    lot: '25 × 105 ft',
    taxes: 5210,
    blurb:
      'A 2004 semi on a quiet crescent inside two school catchments, with a finished basement and a west-facing yard. The layout is the ordinary good one: kitchen at the back, sightline to the yard, powder room where it should be.',
    highlights: [
      'Finished basement with a full bathroom',
      'West-facing fenced yard, afternoon sun',
      'Walk to two elementary schools',
      'Roof replaced 2022',
    ],
    photo: {
      file: 'listing-orchard',
      subject: 'Semi-detached house with a small front garden on a quiet suburban crescent',
      alt: '64 Wrenfield Common from the crescent',
    },
    pin: { x: 0.78, y: 0.24 },
  },
  {
    id: 'aldershot-311',
    ref: 'HP-1168',
    deal: 'sale',
    address: '311 Bramble Row',
    neighbourhood: 'Aldershot',
    city: 'Burlington',
    price: 949000,
    type: 'Bungalow',
    beds: 3,
    baths: 2,
    parking: 3,
    sqft: 1320,
    lot: '60 × 140 ft',
    taxes: 4980,
    flag: 'price-improved',
    blurb:
      'A solid brick bungalow on a sixty-foot lot eight minutes from the Aldershot GO. It has been lived in rather than renovated — priced accordingly, and the separate side entrance makes the basement worth a conversation.',
    highlights: [
      '60-foot lot with mature trees front and back',
      'Separate side entrance to the lower level',
      'Eight minutes to Aldershot GO',
      'Original hardwood under the broadloom',
    ],
    photo: {
      file: 'listing-aldershot',
      subject: 'Post-war brick bungalow with a wide front lawn and a single driveway',
      alt: '311 Bramble Row from the front lawn',
    },
    pin: { x: 0.17, y: 0.58 },
  },
  {
    id: 'millcroft-7',
    ref: 'HP-1199',
    deal: 'sale',
    address: '7 Halyard Gate',
    neighbourhood: 'Millcroft',
    city: 'Burlington',
    price: 1465000,
    type: 'Detached',
    beds: 5,
    baths: 4,
    parking: 4,
    sqft: 3240,
    lot: '48 × 112 ft',
    taxes: 8120,
    flag: 'offer-held',
    blurb:
      'Five bedrooms on a golf-course crescent, with a main-floor office that is a real room and not a converted dining area. Offers are being held to Tuesday evening — call before you plan around it.',
    highlights: [
      'Main-floor office with a door and a window',
      'Primary suite with a walk-in and a five-piece',
      'Finished lower level, roughed-in kitchen',
      'Backs onto the ninth fairway',
    ],
    photo: {
      file: 'listing-millcroft',
      subject: 'Large two-storey house with a stone front and a three-car driveway, clipped lawn',
      alt: '7 Halyard Gate from the driveway',
    },
    pin: { x: 0.86, y: 0.47 },
  },
  {
    id: 'waterdown-42',
    ref: 'HP-1203',
    deal: 'sale',
    address: '42 Kilbourn Lane',
    neighbourhood: 'Waterdown',
    city: 'Hamilton',
    price: 879000,
    type: 'Townhouse',
    beds: 3,
    baths: 3,
    parking: 2,
    sqft: 1640,
    taxes: 4310,
    condoFee: 186,
    feeIncludes: ['Common element maintenance', 'Snow clearing', 'Visitor parking'],
    flag: 'new',
    blurb:
      'A 2018 freehold-plus-common-element town at the quiet end of the block, backing onto the walkway rather than another row. Low fee, and it covers the snow — which in this pocket matters more than it sounds.',
    highlights: [
      'End unit, extra windows on the south side',
      'Backs onto a walkway, not another row',
      'Common element fee is $186 and covers snow',
      'Ten minutes to the 403',
    ],
    photo: {
      file: 'listing-waterdown',
      subject: 'Modern brick-and-stucco townhouse row, end unit, small landscaped frontage',
      alt: '42 Kilbourn Lane, the end unit of the row',
    },
    pin: { x: 0.35, y: 0.12 },
  },
  {
    id: 'roseland-95',
    ref: 'HP-1157',
    deal: 'sale',
    address: '95 Thorncrest Bend',
    neighbourhood: 'Roseland',
    city: 'Burlington',
    price: 1875000,
    type: 'Detached',
    beds: 4,
    baths: 4,
    parking: 6,
    sqft: 3010,
    lot: '75 × 150 ft',
    taxes: 10420,
    blurb:
      'A 1950s side-split taken back to the studs in 2019 on a seventy-five-foot Roseland lot. The renovation was permitted and the drawings come with it, which is not always true on this street.',
    highlights: [
      'Full permitted renovation, drawings included',
      '75 × 150 ft lot, south of the highway',
      'Heated floors through the lower level',
      'Detached double garage with a loft',
    ],
    photo: {
      file: 'listing-roseland',
      subject: 'Renovated mid-century side-split with black window frames and a mature front yard',
      alt: '95 Thorncrest Bend from the street',
    },
    pin: { x: 0.63, y: 0.79 },
  },

  // ── For lease ──────────────────────────────────────────────────────────
  {
    id: 'lease-pine-2140-406',
    ref: 'HP-1188',
    deal: 'lease',
    address: '2140 Pine Street, Unit 406',
    neighbourhood: 'Downtown Burlington',
    city: 'Burlington',
    price: 2750,
    type: 'Condo apartment',
    beds: 2,
    baths: 2,
    parking: 1,
    sqft: 940,
    available: 'Available 1 October',
    leaseTerm: '12 months minimum',
    utilities: ['Heat included', 'Water included', 'Hydro paid by tenant'],
    pets: 'Cats and small dogs considered',
    flag: 'new',
    blurb:
      'Two bedrooms and two full bathrooms on the fourth floor, with parking and a locker included in the rent. Heat and water are in; hydro is metered to the unit and runs about forty dollars a month.',
    highlights: [
      'Parking and locker included',
      'In-suite laundry',
      'Building gym and roof terrace',
      'Five-minute walk to the bus terminal',
    ],
    photo: {
      file: 'listing-lease-pine',
      subject: 'Neutral rental apartment interior, empty, hardwood floor and a balcony door',
      alt: 'The living area at 2140 Pine Street, Unit 406',
    },
    pin: { x: 0.5, y: 0.66 },
  },
  {
    id: 'lease-aldershot-basement',
    ref: 'HP-1195',
    deal: 'lease',
    address: '288 Farrier Walk, Lower',
    neighbourhood: 'Aldershot',
    city: 'Burlington',
    price: 1850,
    type: 'Duplex',
    beds: 2,
    baths: 1,
    parking: 1,
    sqft: 820,
    available: 'Available immediately',
    leaseTerm: '12 months minimum',
    utilities: ['Heat included', 'Water included', 'Hydro included', 'Internet paid by tenant'],
    pets: 'No pets — allergy in the upper unit',
    blurb:
      'A legal two-bedroom lower unit with its own side entrance, above-grade windows and a separate laundry. All utilities are in the rent, which on a lower unit is worth roughly two hundred a month.',
    highlights: [
      'Legal second unit, separate side entrance',
      'Above-grade windows in both bedrooms',
      'Own washer and dryer, not shared',
      'All utilities included',
    ],
    photo: {
      file: 'listing-lease-farrier',
      subject: 'Bright lower-level apartment with above-grade windows and pale walls, unfurnished',
      alt: 'The lower unit at 288 Farrier Walk',
    },
    pin: { x: 0.24, y: 0.53 },
  },
  {
    id: 'lease-orchard-town',
    ref: 'HP-1201',
    deal: 'lease',
    address: '19 Wrenfield Common',
    neighbourhood: 'The Orchard',
    city: 'Burlington',
    price: 3400,
    type: 'Townhouse',
    beds: 3,
    baths: 3,
    parking: 2,
    sqft: 1720,
    available: 'Available 15 November',
    leaseTerm: '12 or 24 months',
    utilities: ['All utilities paid by tenant', 'Lawn and snow by landlord'],
    pets: 'Pets welcome',
    blurb:
      'A whole three-bedroom town, unfurnished, with a garage and a fenced yard. The owner is relocating for two years and would rather have one good long tenancy than turn it over annually.',
    highlights: [
      'Whole house, no shared entrance',
      'Fenced yard and a single garage',
      'Owner will consider a 24-month term',
      'Lawn cutting and snow clearing included',
    ],
    photo: {
      file: 'listing-lease-orchard',
      subject: 'Interior of an empty townhouse: open kitchen, island, patio doors to a small yard',
      alt: 'The kitchen at 19 Wrenfield Common',
    },
    pin: { x: 0.74, y: 0.19 },
  },
  {
    id: 'lease-downtown-loft',
    ref: 'HP-1206',
    deal: 'lease',
    address: '55 Brant Mill Lane, Unit 3',
    neighbourhood: 'Downtown Burlington',
    city: 'Burlington',
    price: 2150,
    type: 'Condo apartment',
    beds: 1,
    baths: 1,
    parking: 0,
    sqft: 690,
    available: 'Available 1 December',
    leaseTerm: '12 months minimum',
    utilities: ['Heat included', 'Water included', 'Hydro paid by tenant'],
    pets: 'Cats only',
    flag: 'open-house',
    openHouse: 'Viewings Thursday, 5–7pm',
    blurb:
      'A one-bedroom loft in a converted mill building, with the original beams left in and a nine-foot ceiling. No parking with the unit — there is a monthly municipal lot two doors down, and that is the honest catch.',
    highlights: [
      'Nine-foot ceilings, exposed beams',
      'In-suite laundry',
      'No parking included — municipal lot nearby',
      'On the downtown bus route',
    ],
    photo: {
      file: 'listing-lease-mill',
      subject: 'Converted mill loft interior with exposed timber beams, brick wall and tall windows',
      alt: 'The main room at 55 Brant Mill Lane, Unit 3',
    },
    pin: { x: 0.57, y: 0.72 },
  },
  {
    id: 'lease-tyandaga-main',
    ref: 'HP-1210',
    deal: 'lease',
    address: '6 Kerncliff Rise, Main Floor',
    neighbourhood: 'Tyandaga',
    city: 'Burlington',
    price: 2600,
    type: 'Detached',
    beds: 3,
    baths: 1,
    parking: 2,
    sqft: 1240,
    available: 'Available 1 October',
    leaseTerm: '12 months minimum',
    utilities: ['70% of utilities paid by tenant', 'Heat and hydro shared with the lower unit'],
    pets: 'Pets considered',
    blurb:
      'The main floor of a bungalow, three bedrooms, with the lower unit tenanted separately. Utilities are split seventy-thirty by floor area and the split is written into the lease, not left to be argued about later.',
    highlights: [
      'Three bedrooms on one floor',
      'Two driveway spaces',
      'Utility split written into the lease',
      'Shared laundry, scheduled',
    ],
    photo: {
      file: 'listing-lease-tyandaga',
      subject: 'Empty bungalow living room with a picture window and refinished hardwood',
      alt: 'The living room at 6 Kerncliff Rise',
    },
    pin: { x: 0.28, y: 0.35 },
  },
];

/** CMS-modelled. An agent adds an area page when they start working one, and
 *  these are the pages that win the searches the portals do not bother with. */
export const neighbourhoods: Neighbourhood[] = [
  {
    id: 'downtown',
    name: 'Downtown Burlington',
    blurb:
      'Condo stock between six and twenty-two storeys, plus a thin band of century semis behind Brant. You can live here without a car; you cannot park a second one.',
    typical: 'One- and two-bedroom condos, $2,000–$3,200 to lease',
  },
  {
    id: 'aldershot',
    name: 'Aldershot',
    blurb:
      'Post-war bungalows on deep lots, most of them within ten minutes of the GO. It is the part of town where the lot is worth more than the house, which cuts both ways.',
    typical: 'Bungalows and second-unit conversions, $850k–$1.1m',
  },
  {
    id: 'tyandaga',
    name: 'Tyandaga',
    blurb:
      'Seventies subdivisions against the escarpment, with mature trees and a lot of original kitchens. The ravine backings are the ones that move fastest.',
    typical: 'Four-bedroom detached, $1.1m–$1.4m',
  },
  {
    id: 'orchard',
    name: 'The Orchard',
    blurb:
      'Late-nineties and 2000s family stock, narrow lots, two elementary schools inside the loop. Bought by people with a five-year-old and sold by people with an eighteen-year-old.',
    typical: 'Semis and towns, $950k–$1.2m',
  },
  {
    id: 'millcroft',
    name: 'Millcroft',
    blurb:
      'The larger detached homes around the golf course, most built between 1990 and 2005. Big rooms, big driveways, and the price band to match.',
    typical: 'Four- and five-bedroom detached, $1.3m–$1.8m',
  },
  {
    id: 'waterdown',
    name: 'Waterdown',
    blurb:
      'Newer builds and freehold towns on the Hamilton side of the line, ten minutes to the 403. The commute is why people look here and the taxes are why they stay.',
    typical: 'Freehold towns, $780k–$950k',
  },
];

/** Fictional, like everything else here. On a real build this list is
 *  published only with the seller's consent, and it carries no civic numbers —
 *  a sold record is somebody's home and somebody's finances. */
export const soldArchive: SoldRecord[] = [
  { where: 'Farrier Walk, Aldershot', type: 'Bungalow', listed: 899000, sold: 941000, onMarket: '6 days' },
  { where: 'Halyard Gate, Millcroft', type: 'Detached', listed: 1399000, sold: 1372000, onMarket: '21 days' },
  { where: 'Brant Mill Lane, Downtown', type: 'Condo apartment', listed: 649000, sold: 641000, onMarket: '14 days' },
  { where: 'Wrenfield Common, The Orchard', type: 'Semi-detached', listed: 1025000, sold: 1060000, onMarket: '4 days' },
  { where: 'Kilbourn Lane, Waterdown', type: 'Townhouse', listed: 849000, sold: 838000, onMarket: '33 days' },
];

const BASE = '/industries/real-estate/preview/real-estate-agent/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}buy`, label: 'For Sale' },
    { href: `${BASE}rent`, label: 'For Lease' },
    { href: `${BASE}about`, label: 'About Elena' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}contact#enquiry`, label: 'Ask about a home', event: 'enquiry_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real agent or brokerage',
  linkLabel: 'See the package',
  linkHref: '/industries/real-estate',
};

export const footer: DemoFooter = {
  tagline: `${brokerage.line}. Buying, selling and leasing across Burlington and west Halton.`,
  rowsHeading: 'Calls answered',
  findUsHeading: 'Find me',
  legal: `© ${new Date().getFullYear()} Elena Marlowe · Harbourpoint Realty Ltd., Brokerage. Sample site — not a real agent, brokerage or listing. ${brokerage.solicitation}`,
};

export const pageMeta: Record<'home' | 'buy' | 'rent' | 'about' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Elena Marlowe — Real Estate in Burlington & West Halton',
    description:
      'Salesperson with Harbourpoint Realty in Burlington. Homes for sale and properties for lease across Aldershot, Tyandaga, The Orchard, Millcroft and Waterdown.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  buy: {
    title: 'Homes for Sale — Elena Marlowe, Burlington',
    description:
      'Every listing currently for sale, with taxes, lot size and condo fees on the card. Filter by area, type and price, and see where each one sits on the map.',
    ogImage: '/og/default.png',
    breadcrumb: 'For Sale',
  },
  rent: {
    title: 'Properties for Lease — Elena Marlowe, Burlington',
    description:
      'Rentals across Burlington and Aldershot with the lease term, what is included and the date it is free on every card. Filter by area, bedrooms and monthly rent.',
    ogImage: '/og/default.png',
    breadcrumb: 'For Lease',
  },
  about: {
    title: 'About Elena Marlowe — Salesperson, Harbourpoint Realty',
    description:
      'How I work, the areas I know street by street, what an offer night actually looks like, and a record of what has recently sold.',
    ogImage: '/og/default.png',
    breadcrumb: 'About Elena',
  },
  contact: {
    title: 'Contact Elena Marlowe — Burlington Real Estate',
    description:
      'Phone, email, office address and a map. Send an enquiry about a specific property and it arrives with the reference already attached.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

// ── Page copy ────────────────────────────────────────────────────────────

export const home = {
  heroEyebrow: 'Burlington · Aldershot · Waterdown · West Oakville',
  heroTitle: 'Choose the agent first. The house comes after.',
  heroBody:
    'I sell and lease in five neighbourhoods I actually know. Ask me what a street trades for and you will get a number, not a brochure.',
  heroPrimaryCta: 'See what is for sale',
  heroSecondaryCta: 'See what is for lease',
  heroCredential: brokerage.line,
  heroStats: [
    { value: '12 yrs', label: 'in Halton' },
    { value: '5', label: 'areas worked' },
    { value: 'Same day', label: 'reply, always' },
  ],

  doorsHeading: 'Two different questions',
  doorsBody: 'Buying and leasing are not the same search, so they are not the same page.',
  doors: [
    {
      id: 'buy',
      deal: 'sale' as Deal,
      title: 'I am buying',
      body: 'Taxes, lot size, condo fees and what the street actually closes at.',
      cta: 'Homes for sale',
    },
    {
      id: 'rent',
      deal: 'lease' as Deal,
      title: 'I am leasing',
      body: 'Term, what is included, what is metered, and the date you can move in.',
      cta: 'Properties for lease',
    },
  ],

  featuredHeading: 'On the market now',
  featuredBody: 'A few of the current listings. The full set is on each page.',
  featuredSaleLabel: 'For sale',
  featuredLeaseLabel: 'For lease',
  featuredSaleCta: 'All homes for sale',
  featuredLeaseCta: 'All properties for lease',

  areasHeading: 'Where I work',
  areasBody: 'Five areas and a bit of Hamilton. I do not take listings in towns I cannot price.',
  areasCta: 'More about how I work',

  howHeading: 'How this goes',
  howBody: 'No mystery, no pressure, and no offer written before you have seen the comparables.',
  how: [
    {
      title: 'A call, not a form letter',
      detail: 'Twenty minutes on the phone about what you are actually trying to do. If I am the wrong agent for it, I will say so and pass you to someone who is not.',
    },
    {
      title: 'You see the numbers I see',
      detail: 'Recent sales on the street, days on market, what came off the price. Sent to you as a document you keep, whether or not you list with me.',
    },
    {
      title: 'Showings arranged around you',
      detail: 'Evenings and weekends included. I book them; you tell me which nights are impossible.',
    },
    {
      title: 'Offer night in plain language',
      detail: 'What the conditions mean, what the deposit does, and what happens if it does not go your way. Nothing is signed at speed.',
    },
  ],

  closerHeading: 'Ask about a specific house',
  closerBody: 'Send the address or the reference and I will reply the same day with what I know about it.',
  closerCta: 'Send an enquiry',
  closerPhoneLabel: 'Or call',
};

/** Shared by both listing pages: the chip is the same vocabulary whether a
 *  property is for sale or for lease, and two copies would drift. */
export const flagLabels: Record<ListingFlag, string> = {
  new: 'New',
  'open-house': 'Open house',
  'offer-held': 'Offers held',
  'price-improved': 'Price improved',
};

export const buyPage = {
  eyebrow: 'For Sale',
  heading: 'Homes for sale',
  intro:
    'Every listing I currently hold, with the numbers a buyer asks for on the card rather than three clicks in.',
  countLabel: 'listings',
  filtersHeading: 'Narrow it down',
  filterAreaLabel: 'Area',
  filterTypeLabel: 'Property type',
  filterPriceLabel: 'Maximum price',
  filterBedsLabel: 'Bedrooms',
  anyLabel: 'Any',
  priceBands: [
    { id: 'any', label: 'Any', max: Infinity },
    { id: '900', label: 'Up to $900,000', max: 900000 },
    { id: '1100', label: 'Up to $1,100,000', max: 1100000 },
    { id: '1300', label: 'Up to $1,300,000', max: 1300000 },
    { id: '1600', label: 'Up to $1,600,000', max: 1600000 },
  ],
  bedOptions: [
    { id: 'any', label: 'Any', min: 0 },
    { id: '2', label: '2+', min: 2 },
    { id: '3', label: '3+', min: 3 },
    { id: '4', label: '4+', min: 4 },
  ],
  resetLabel: 'Clear filters',
  emptyHeading: 'Nothing matches that combination',
  emptyBody: 'Clear a filter, or tell me what you are looking for and I will call when something lands.',
  emptyCta: 'Tell me what you want',

  mapHeading: 'Where they are',
  mapBody: 'Pins are numbered to the listings below. The drawing is a diagram of the area, not a survey.',
  mapLabel: 'Area diagram — homes for sale around Burlington',

  specTaxes: 'Taxes',
  specTaxesNote: 'per year',
  specLot: 'Lot',
  specFee: 'Condo fee',
  specFeeNote: 'per month',
  specFeeIncludes: 'Fee includes',
  specSqft: 'Interior',
  specBeds: 'Bedrooms',
  specBaths: 'Bathrooms',
  specParking: 'Parking',
  specRef: 'Reference',
  highlightsLabel: 'Worth knowing',
  enquireCta: 'Ask about this one',

  disclaimerHeading: 'The small print',
  disclaimerBody: brokerage.independence,
  solicitation: brokerage.solicitation,
};

export const rentPage = {
  eyebrow: 'For Lease',
  heading: 'Properties for lease',
  intro:
    'Term, what is included, what is metered, and the date it is free — on the card, because those are the four things that decide it.',
  countLabel: 'properties',
  filtersHeading: 'Narrow it down',
  filterAreaLabel: 'Area',
  filterTypeLabel: 'Property type',
  filterPriceLabel: 'Maximum rent',
  filterBedsLabel: 'Bedrooms',
  anyLabel: 'Any',
  priceBands: [
    { id: 'any', label: 'Any', max: Infinity },
    { id: '2000', label: 'Up to $2,000', max: 2000 },
    { id: '2500', label: 'Up to $2,500', max: 2500 },
    { id: '3000', label: 'Up to $3,000', max: 3000 },
    { id: '3500', label: 'Up to $3,500', max: 3500 },
  ],
  bedOptions: [
    { id: 'any', label: 'Any', min: 0 },
    { id: '1', label: '1+', min: 1 },
    { id: '2', label: '2+', min: 2 },
    { id: '3', label: '3+', min: 3 },
  ],
  resetLabel: 'Clear filters',
  emptyHeading: 'Nothing matches that combination',
  emptyBody: 'Clear a filter, or send me your dates and budget and I will call when one comes up.',
  emptyCta: 'Tell me what you need',

  mapHeading: 'Where they are',
  mapBody: 'Pins are numbered to the properties below. The drawing is a diagram of the area, not a survey.',
  mapLabel: 'Area diagram — properties for lease around Burlington',

  perMonth: '/ month',
  specAvailable: 'Available',
  specTerm: 'Term',
  specUtilities: 'Utilities',
  specPets: 'Pets',
  specSqft: 'Interior',
  specBeds: 'Bedrooms',
  specBaths: 'Bathrooms',
  specParking: 'Parking',
  specRef: 'Reference',
  highlightsLabel: 'Worth knowing',
  enquireCta: 'Ask about this one',

  applyHeading: 'What a landlord will ask for',
  applyBody:
    'It is the same four things every time, and having them ready is most of what gets a unit held for you.',
  applyItems: [
    { title: 'Proof of income', detail: 'A letter of employment or two recent pay statements. Self-employed is fine — bring a notice of assessment instead.' },
    { title: 'Credit report', detail: 'Your own copy, pulled in the last thirty days. You do not have to let five landlords each pull a new one.' },
    { title: 'References', detail: 'The last landlord, and someone who is not a relative. A phone number that is answered beats a letter.' },
    { title: 'First and last month', detail: 'Certified funds at signing. It is a deposit against the last month, not a damage deposit — Ontario does not allow those.' },
  ],
  applyNote:
    'Deposits go to the brokerage or the landlord directly. Nothing is ever paid through this website.',
};

export const about = {
  eyebrow: 'About Elena',
  heading: 'Twelve years in the same five neighbourhoods',
  intro:
    'I registered in 2014, worked two years in leasing before I sold anything, and I still take lease listings. It is the reason I can tell a buyer what a basement unit is really worth.',
  photoCaption: 'Going over an offer, Aldershot',

  storyHeading: 'The short version',
  story: [
    'I grew up two streets from where I now work, which is either a good sign or a very small life depending on who you ask. I registered in 2014 and spent the first two years almost entirely in rentals, because that is what a new agent gets.',
    'That turned out to be the useful apprenticeship. Leasing teaches you what a unit is actually worth to somebody who has to live in it, and it teaches you to answer a phone. Both of those are still how I work.',
    'I take on fewer files than most agents on purpose. If you have ever been passed to an assistant halfway through a purchase, you already know why.',
  ],

  factsHeading: 'The facts',
  facts: [
    { label: 'Registered', value: 'Salesperson, 2014' },
    { label: 'Brokerage', value: 'Harbourpoint Realty Ltd., Brokerage' },
    { label: 'Areas', value: 'Burlington, Aldershot, Waterdown, west Oakville' },
    { label: 'Languages', value: 'English and Portuguese' },
    { label: 'Files at once', value: 'Never more than eight' },
  ],

  promiseHeading: 'What you can hold me to',
  promises: [
    { title: 'You get me', detail: 'Not a team member, not an assistant. The person at the showing is the person who writes the offer.' },
    { title: 'Same-day reply', detail: 'Every enquiry, seven days a week. If I am at a showing it will be short, but it will come the same day.' },
    { title: 'The comparables, unedited', detail: 'Including the ones that argue against my number. You cannot make a decision on half the sheet.' },
    { title: 'No pressure to sign', detail: 'A representation agreement comes when you want one, not before I will show you anything.' },
  ],

  soldHeading: 'Recently sold',
  soldBody: 'A sample of closed sales. Sold price against list, and how long it took.',
  soldTable: { where: 'Where', type: 'Type', listed: 'Listed', sold: 'Sold', days: 'On market' },
  soldNote:
    'Street and area only — a sold record is somebody\'s home and somebody\'s finances. On a live site this list is published with the seller\'s consent or not at all.',

  areasHeading: 'The areas, honestly',
  areasBody: 'What actually trades in each one, and who tends to buy there.',
  areasTypicalLabel: 'Typically',

  closerHeading: 'Start with a phone call',
  closerBody: 'Twenty minutes, no agreement to sign, and a straight answer about whether I am the right agent for it.',
  closerCta: 'Get in touch',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Call, email, or send the address',
  intro: 'Whichever is easiest. Enquiries about a specific property arrive with the reference attached.',

  phoneHeading: 'Phone',
  phoneNote: 'Answered directly. Voicemail is returned the same day.',
  emailHeading: 'Email',
  officeHeading: 'Brokerage office',
  officeNote: 'Meetings at the office by arrangement — most of the time I will come to you.',
  hoursHeading: 'When calls get answered',
  hoursNote: 'Showings run outside these hours all the time. Ask.',
  hoursTable: { day: 'Day', open: 'Hours' },
  mapLabel: 'Map — 2140 Pine Street, Burlington',

  enquiryHeading: 'Send an enquiry',
  enquiryBody:
    'The more of this you fill in, the more useful the first call is. Only the first three fields are required.',
  /** The CRM flag made visible: this is what the form is FOR. */
  crmHeading: 'Where this goes',
  crmBody:
    'On a live build these answers land in the CRM as a lead record with the property reference, the intent, the budget band and the timeline already on it — so the first call starts with the property and not with an intake questionnaire. On this sample site the form validates and then stops: nothing is sent anywhere.',

  refPrefillNote: 'Prefilled from the listing you came from.',

  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameError: 'I need a name to put on the file.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    emailError: 'Enter an email I can reply to.',
    phoneLabel: 'Phone',
    phonePlaceholder: '(905) 555-0100',
    phoneError: 'Enter a number I can call.',

    intentLabel: 'What are you doing?',
    intentError: 'Pick the one that is closest.',
    intents: [
      { id: 'buying', label: 'Buying' },
      { id: 'leasing', label: 'Looking to lease' },
      { id: 'selling', label: 'Selling or leasing out' },
      { id: 'watching', label: 'Just watching the market' },
    ],

    refLabel: 'Property reference',
    refPlaceholder: 'e.g. HP-1184, or an address',
    refNote: 'Optional. Leave it blank if you are not asking about a specific one.',

    budgetLabel: 'Budget, or monthly rent',
    budgetPlaceholder: 'Choose a range',
    budgets: [
      { id: 'unsure', label: 'Not sure yet' },
      { id: 'rent-under-2000', label: 'Lease — under $2,000' },
      { id: 'rent-2000-2750', label: 'Lease — $2,000 to $2,750' },
      { id: 'rent-2750-3500', label: 'Lease — $2,750 to $3,500' },
      { id: 'buy-under-900', label: 'Purchase — under $900,000' },
      { id: 'buy-900-1200', label: 'Purchase — $900,000 to $1.2m' },
      { id: 'buy-1200-1600', label: 'Purchase — $1.2m to $1.6m' },
      { id: 'buy-over-1600', label: 'Purchase — over $1.6m' },
    ],

    timelineLabel: 'When do you need to move?',
    timelinePlaceholder: 'Choose a timeframe',
    timelines: [
      { id: '30', label: 'Within 30 days' },
      { id: '90', label: '1 to 3 months' },
      { id: '180', label: '3 to 6 months' },
      { id: 'later', label: '6 months or more' },
    ],

    messageLabel: 'Anything else',
    messagePlaceholder: 'Schools, parking, a street you already like, a date you have to be out by.',

    consentLabel: 'Send me the monthly note on what sold in my area.',
    consentNote:
      'Optional, and separate from this enquiry. One email a month and an unsubscribe link on every one — asking about a house is not consent to a mailing list.',

    submit: 'Send enquiry',
    submitting: 'Sending',
    successHeading: 'Enquiry sent',
    successBody:
      'You would get a reply the same day, and a call if you left a number. On this sample site nothing was actually sent — the form stops here on purpose.',
    successAgain: 'Send another',
  },

  representationHeading: 'Before we go further',
  representationBody:
    'Ontario requires a written agreement before an agent represents you, and it sets out what I owe you and what it costs. I will walk you through it before anything is signed, and asking me a question about a listing does not commit you to one.',

  disclaimer: brokerage.solicitation,
};

// ── Helpers ──────────────────────────────────────────────────────────────

/** 1249000 -> "1,249,000". Hand-rolled rather than toLocaleString: the build
 *  runs on whatever Node the CI has, and ICU differences in a grouping
 *  separator are exactly the kind of thing that changes a rendered price
 *  between two machines. */
export const groupDigits = (value: number): string =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatMoney = (value: number): string => `$${groupDigits(value)}`;

export const forSale = (): Listing[] => listings.filter((listing) => listing.deal === 'sale');

export const forLease = (): Listing[] => listings.filter((listing) => listing.deal === 'lease');

export const findListing = (id: string): Listing | undefined =>
  listings.find((listing) => listing.id === id);

/** The areas that actually have something in them for this deal type — a
 *  filter offering "Roseland" on the lease page when nothing there is for
 *  lease is a filter that returns an empty list and looks broken. */
export const areasWith = (deal: Deal): string[] => [
  ...new Set(listings.filter((listing) => listing.deal === deal).map((l) => l.neighbourhood)),
];

export const typesWith = (deal: Deal): PropertyType[] => [
  ...new Set(listings.filter((listing) => listing.deal === deal).map((l) => l.type)),
];
