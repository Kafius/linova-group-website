// Halden Home Furnishings — the sample site for the Retail Large Catalogue
// playbook. A fictional furniture and appliance retailer in Vaughan, Ontario;
// nothing here is a real business, and the demo ribbon says so.
//
// EVERY string the preview renders lives in this file.
//
// Flags: SEO, E-Commerce, CMS, Analytics, Domain.
// Deliberately absent: CRM and booking.
//
// ── WHAT MAKES THIS ONE DIFFERENT ────────────────────────────────────────
// Forty-five products across four category pages — the largest catalogue in
// the set, and the reason this playbook needs real filtering rather than a
// list. Each category page filters on two facets, type and price band, and
// both are pure CSS: radio inputs plus :has() on the wrapper. Two independent
// rules that each hide non-matching items intersect on their own, so the cost
// is linear in options rather than combinatorial.
//
// The Clover slot is framed for DEPOSITS, not full payment. A $3,200 sofa is
// not a web checkout: the customer pays a deposit online to hold the piece and
// settles the balance on delivery. That framing is the honest one for
// big-ticket retail and it is what the explainer on every category page says.
//
// Third demo on the `retail` vertical. Bramble & Bone is cream and forest
// green, Cedarview is white and deep green — both green-dominant. This one is
// showroom white, warm oak and one deep wine, which is the fastest way to tell
// three retail demos apart in the same switcher.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type CategoryId = 'living' | 'bedroom' | 'dining' | 'appliances';
export type PriceBand = 'under-500' | '500-1500' | '1500-3000' | 'over-3000';
export type Stock = 'in-stock' | 'showroom' | 'order';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  /** the first facet — a sub-type within the category */
  type: string;
  /** CAD */
  price: number;
  /** the second facet, derived once here so markup and filter cannot disagree */
  band: PriceBand;
  /** what it is made of, in the words on the swing tag */
  finish: string;
  /** W x D x H in inches, or capacity for an appliance */
  spec: string;
  stock: Stock;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** the nav label, which is shorter than the page title */
  navLabel: string;
  heading: string;
  intro: string;
  /** facet one, in the order the filter row shows them */
  types: string[];
}

export interface DemoPageMeta {
  title: string;
  description: string;
  ogImage: string;
  breadcrumb: string;
}

/** Showroom white, warm oak neutrals, one deep wine. Sharp corners, wide
 *  grid, and the product image doing the talking. */
export const theme: DemoTheme = {
  ink: '#FCFBF9',
  inkRaised: '#F2EDE4',
  inkLine: '#E0D7C9',
  /** deep wine band */
  paper: '#5A1F36',
  paperRaised: '#6B2440',
  paperLine: '#7E3752',
  /** wine on showroom white (10.4:1) */
  accent: '#6B2440',
  /** warm oak cream on the wine band (7.9:1) */
  accentOnPaper: '#EBC9A0',
  onInk: '#241F1A',
  onInkDim: 'rgba(36, 31, 26, 0.74)',
  onPaper: '#F7EFE6',
  onPaperDim: 'rgba(247, 239, 230, 0.82)',
  onAccent: '#FFFFFF',
  displayFont: '"Literata", "Iowan Old Style", Georgia, serif',
  bodyFont: '"Hanken Grotesk", "Segoe UI", system-ui, sans-serif',
  radius: '0',
};

export const fonts = [
  { family: 'Literata', file: 'literata-latin-var.woff2', weight: '400 600' },
  { family: 'Hanken Grotesk', file: 'hanken-grotesk-latin-var.woff2', weight: '400 700' },
];

export const business: DemoBusiness = {
  name: 'Halden Home Furnishings',
  shortName: 'Halden',
  positioning: 'Furniture and major appliances. Showroom in Vaughan, delivery across the GTA.',
  address: {
    street: '2450 Rutherford Road, Unit 7',
    city: 'Vaughan',
    region: 'ON',
    postalCode: 'L4K 2N7',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0138',
  phoneHref: 'tel:+19055550138',
  email: 'showroom@haldenhome.ca',
  emailHref: 'mailto:showroom@haldenhome.ca',
};

export const showroomHours: { day: string; short: string; schemaDay: string; open: string; close: string }[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '10:00', close: '18:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '10:00', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '10:00', close: '18:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '10:00', close: '20:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '10:00', close: '20:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '09:00', close: '18:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '11:00', close: '17:00' },
];

export const priceBands: { id: PriceBand; label: string }[] = [
  { id: 'under-500', label: 'Under $500' },
  { id: '500-1500', label: '$500 – $1,500' },
  { id: '1500-3000', label: '$1,500 – $3,000' },
  { id: 'over-3000', label: 'Over $3,000' },
];

export const stockLabels: Record<Stock, string> = {
  'in-stock': 'In the warehouse',
  showroom: 'On the floor',
  order: 'Ordered in',
};

export const categories: Category[] = [
  {
    id: 'living',
    name: 'Living',
    navLabel: 'Living',
    heading: 'Living room',
    intro:
      'Sofas, chairs, tables and the things that go under them. Everything here is on the floor in Vaughan — sit on it before you buy it.',
    types: ['Sofas', 'Chairs', 'Tables', 'Storage', 'Rugs'],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    navLabel: 'Bedroom',
    heading: 'Bedroom',
    intro:
      'Beds, mattresses and storage. Mattresses are sold with a 100-night exchange because nobody knows from ten minutes in a showroom.',
    types: ['Beds', 'Mattresses', 'Storage', 'Nightstands'],
  },
  {
    id: 'dining',
    name: 'Dining',
    navLabel: 'Dining',
    heading: 'Dining room',
    intro:
      'Tables that seat what they say they seat, chairs that survive children, and sideboards with real backs on them.',
    types: ['Tables', 'Chairs', 'Storage', 'Stools'],
  },
  {
    id: 'appliances',
    name: 'Appliances',
    navLabel: 'Appliances',
    heading: 'Major appliances',
    intro:
      'Refrigeration, cooking and laundry. Every appliance price on this page includes installation and haul-away of the old one.',
    types: ['Refrigeration', 'Cooking', 'Dishwashers', 'Laundry'],
  },
];

/** ── CMS-MODELLED ────────────────────────────────────────────────────────
 *  Seed data for the `product` collection, with `category` and `productType`
 *  as the taxonomy behind it. See retail-large-catalogue.cms.ts.
 *
 *  Bands are stored, not computed at render time, so the filter markup and
 *  the price on the card can never disagree — and so the studio can override
 *  a band during a sale without the price moving.
 *  ───────────────────────────────────────────────────────────────────────── */
export const products: Product[] = [
  // ── Living ─────────────────────────────────────────────────────────────
  { id: 'aldis-sofa', name: 'Aldis 3-Seat Sofa', description: 'Feather-wrapped foam, kiln-dried hardwood frame, removable covers you can actually get back on.', category: 'living', type: 'Sofas', price: 3450, band: 'over-3000', finish: 'Wool blend, oatmeal', spec: '84 × 38 × 31 in', stock: 'showroom' },
  { id: 'niven-sofa', name: 'Niven 2-Seat Sofa', description: 'A small sofa that is genuinely comfortable, which is harder than it sounds at this width.', category: 'living', type: 'Sofas', price: 2150, band: '1500-3000', finish: 'Boucle, chalk', spec: '64 × 36 × 30 in', stock: 'in-stock' },
  { id: 'orrin-sectional', name: 'Orrin Sectional', description: 'Chaise reverses left or right on assembly. Comes in three boxes and up a stairwell.', category: 'living', type: 'Sofas', price: 4290, band: 'over-3000', finish: 'Performance weave, slate', spec: '112 × 66 × 32 in', stock: 'order' },
  { id: 'bramwell-chair', name: 'Bramwell Armchair', description: 'High back, low arms, a seat depth that suits people under five foot six.', category: 'living', type: 'Chairs', price: 1290, band: '500-1500', finish: 'Leather, chestnut', spec: '31 × 34 × 39 in', stock: 'showroom' },
  { id: 'kestrel-chair', name: 'Kestrel Lounge Chair', description: 'Bent ply shell on a walnut base. Reads mid-century without being a reproduction of one.', category: 'living', type: 'Chairs', price: 980, band: '500-1500', finish: 'Walnut and wool', spec: '29 × 31 × 33 in', stock: 'in-stock' },
  { id: 'ledbury-ottoman', name: 'Ledbury Ottoman', description: 'Storage under the lid, and a top firm enough to put a tray on.', category: 'living', type: 'Chairs', price: 420, band: 'under-500', finish: 'Linen, flax', spec: '36 × 20 × 17 in', stock: 'in-stock' },
  { id: 'thorne-coffee', name: 'Thorne Coffee Table', description: 'Solid white oak with a mitred edge. It will mark, and it will sand back.', category: 'living', type: 'Tables', price: 1150, band: '500-1500', finish: 'White oak, oiled', spec: '48 × 26 × 16 in', stock: 'showroom' },
  { id: 'ferris-side', name: 'Ferris Side Table', description: 'Narrow enough for a sofa arm, heavy enough not to go over.', category: 'living', type: 'Tables', price: 320, band: 'under-500', finish: 'Blackened steel', spec: '16 × 16 × 22 in', stock: 'in-stock' },
  { id: 'ardley-console', name: 'Ardley Console', description: 'Two drawers and a cable cut-out, sized to sit behind a sofa or under a television.', category: 'living', type: 'Storage', price: 1680, band: '1500-3000', finish: 'White oak veneer', spec: '60 × 16 × 30 in', stock: 'order' },
  { id: 'marlow-media', name: 'Marlow Media Unit', description: 'Vented backs, adjustable shelves, and doors that close on a soft hinge.', category: 'living', type: 'Storage', price: 2250, band: '1500-3000', finish: 'Walnut veneer', spec: '72 × 18 × 22 in', stock: 'showroom' },
  { id: 'saltern-rug', name: 'Saltern Wool Rug', description: 'Hand-loomed, 12 mm pile. Sheds for a month and then behaves for a decade.', category: 'living', type: 'Rugs', price: 890, band: '500-1500', finish: 'Wool, undyed', spec: '8 × 10 ft', stock: 'in-stock' },
  { id: 'penna-rug', name: 'Penna Flatweave Rug', description: 'Reversible and washable, which is the reason it is in most of our delivery vans.', category: 'living', type: 'Rugs', price: 340, band: 'under-500', finish: 'Cotton blend', spec: '5 × 8 ft', stock: 'in-stock' },

  // ── Bedroom ────────────────────────────────────────────────────────────
  { id: 'hallam-bed', name: 'Hallam Upholstered Bed', description: 'Slatted base, no box spring needed, and a headboard you can sit up against.', category: 'bedroom', type: 'Beds', price: 1850, band: '1500-3000', finish: 'Linen, ash grey', spec: 'Queen · 64 × 86 in', stock: 'showroom' },
  { id: 'crayle-bed', name: 'Crayle Oak Bed', description: 'Solid oak, bolted not dowelled, so it comes apart for the next house.', category: 'bedroom', type: 'Beds', price: 2480, band: '1500-3000', finish: 'White oak, oiled', spec: 'King · 80 × 88 in', stock: 'order' },
  { id: 'foss-bed', name: 'Foss Platform Bed', description: 'Low, plain and cheap in the good sense. The one most first apartments leave with.', category: 'bedroom', type: 'Beds', price: 690, band: '500-1500', finish: 'Birch ply', spec: 'Double · 56 × 80 in', stock: 'in-stock' },
  { id: 'aveley-mattress', name: 'Aveley Pocket Coil Mattress', description: 'Individually pocketed coils with a foam top. Medium-firm and honestly labelled.', category: 'bedroom', type: 'Mattresses', price: 1450, band: '500-1500', finish: '11 in profile', spec: 'Queen · 60 × 80 in', stock: 'in-stock' },
  { id: 'linden-mattress', name: 'Linden Latex Mattress', description: 'Natural latex over pocket coils. Heavy, cool, and the one our own staff buy.', category: 'bedroom', type: 'Mattresses', price: 2650, band: '1500-3000', finish: '13 in profile', spec: 'King · 76 × 80 in', stock: 'order' },
  { id: 'weald-mattress', name: 'Weald Foam Mattress', description: 'Rolled and boxed. Give it forty-eight hours before you decide anything about it.', category: 'bedroom', type: 'Mattresses', price: 480, band: 'under-500', finish: '10 in profile', spec: 'Double · 54 × 75 in', stock: 'in-stock' },
  { id: 'holt-dresser', name: 'Holt Six-Drawer Dresser', description: 'Dovetailed drawers on full-extension runners. The back is solid, not card.', category: 'bedroom', type: 'Storage', price: 2190, band: '1500-3000', finish: 'White oak', spec: '64 × 19 × 32 in', stock: 'showroom' },
  { id: 'ryedale-wardrobe', name: 'Ryedale Wardrobe', description: 'Hanging on one side, shelves on the other, and it fits through a 30 inch door.', category: 'bedroom', type: 'Storage', price: 3280, band: 'over-3000', finish: 'Walnut veneer', spec: '48 × 24 × 79 in', stock: 'order' },
  { id: 'cobb-chest', name: 'Cobb Three-Drawer Chest', description: 'Small, sturdy, and sized for a room where the bed already takes most of it.', category: 'bedroom', type: 'Storage', price: 740, band: '500-1500', finish: 'Birch, natural', spec: '32 × 18 × 30 in', stock: 'in-stock' },
  { id: 'perrin-nightstand', name: 'Perrin Nightstand', description: 'One drawer, one open shelf, and a socket cut-out at the back for a phone cable.', category: 'bedroom', type: 'Nightstands', price: 390, band: 'under-500', finish: 'White oak', spec: '20 × 16 × 24 in', stock: 'in-stock' },
  { id: 'garrow-nightstand', name: 'Garrow Floating Nightstand', description: 'Wall-mounted, which is how you get a nightstand into a room that has no space for one.', category: 'bedroom', type: 'Nightstands', price: 280, band: 'under-500', finish: 'Walnut veneer', spec: '18 × 12 × 8 in', stock: 'in-stock' },

  // ── Dining ─────────────────────────────────────────────────────────────
  { id: 'brenner-table', name: 'Brenner Extending Table', description: 'Seats six, then eight with the leaf in. The leaf lives inside the table, not in a cupboard.', category: 'dining', type: 'Tables', price: 2890, band: '1500-3000', finish: 'White oak, matt', spec: '71–95 × 38 × 30 in', stock: 'showroom' },
  { id: 'ivelet-table', name: 'Ivelet Round Table', description: 'A pedestal base, so nobody gets a leg between their knees. Seats four properly.', category: 'dining', type: 'Tables', price: 1420, band: '500-1500', finish: 'Ash, walnut stain', spec: '47 in diameter', stock: 'in-stock' },
  { id: 'stanmer-table', name: 'Stanmer Dining Table', description: 'Eight seats, a 40 mm top and a frame that does not wobble when somebody leans on the end.', category: 'dining', type: 'Tables', price: 3650, band: 'over-3000', finish: 'Solid walnut', spec: '94 × 40 × 30 in', stock: 'order' },
  { id: 'orbec-chair', name: 'Orbec Dining Chair', description: 'Stackable, wipeable and rated to 300 lb. Sold singly, usually bought in sixes.', category: 'dining', type: 'Chairs', price: 245, band: 'under-500', finish: 'Beech and vinyl', spec: '18 × 21 × 32 in', stock: 'in-stock' },
  { id: 'wrayle-chair', name: 'Wrayle Upholstered Chair', description: 'A dining chair you can stay in after the plates are cleared. Removable seat cover.', category: 'dining', type: 'Chairs', price: 420, band: 'under-500', finish: 'Wool, moss', spec: '20 × 23 × 33 in', stock: 'showroom' },
  { id: 'tarn-bench', name: 'Tarn Dining Bench', description: 'Fits under the Brenner and the Stanmer. Seats two adults or four children, briefly.', category: 'dining', type: 'Chairs', price: 680, band: '500-1500', finish: 'White oak', spec: '60 × 14 × 18 in', stock: 'in-stock' },
  { id: 'ellon-sideboard', name: 'Ellon Sideboard', description: 'Four doors, adjustable shelves and a top deep enough to serve from.', category: 'dining', type: 'Storage', price: 2450, band: '1500-3000', finish: 'White oak veneer', spec: '72 × 18 × 32 in', stock: 'showroom' },
  { id: 'kelso-cabinet', name: 'Kelso Display Cabinet', description: 'Glass fronts, lit shelves, and a cable route so the light does not run across the floor.', category: 'dining', type: 'Storage', price: 3150, band: 'over-3000', finish: 'Walnut and glass', spec: '40 × 16 × 76 in', stock: 'order' },
  { id: 'nairn-stool', name: 'Nairn Counter Stool', description: '24 inch seat for a standard counter. Footrest is steel, not a plastic ring.', category: 'dining', type: 'Stools', price: 290, band: 'under-500', finish: 'Ash and leather', spec: '17 × 17 × 34 in', stock: 'in-stock' },
  { id: 'vellan-stool', name: 'Vellan Bar Stool', description: '30 inch seat with a low back, for an island that people actually eat at.', category: 'dining', type: 'Stools', price: 340, band: 'under-500', finish: 'Walnut and wool', spec: '18 × 18 × 41 in', stock: 'in-stock' },

  // ── Appliances ─────────────────────────────────────────────────────────
  { id: 'french-door-fridge', name: '36 in French Door Refrigerator', description: 'Counter-depth, 22 cu ft, internal water. Fits a standard 36 inch opening without a trim kit.', category: 'appliances', type: 'Refrigeration', price: 3480, band: 'over-3000', finish: 'Stainless', spec: '22 cu ft · 36 in', stock: 'showroom' },
  { id: 'bottom-freezer', name: '30 in Bottom-Freezer Refrigerator', description: 'The one that fits a condo kitchen. Reversible door and a freezer drawer that pulls right out.', category: 'appliances', type: 'Refrigeration', price: 1890, band: '1500-3000', finish: 'Stainless', spec: '18 cu ft · 30 in', stock: 'in-stock' },
  { id: 'beverage-fridge', name: '24 in Beverage Centre', description: 'Under-counter, glass door, two temperature zones. Installs with a front vent.', category: 'appliances', type: 'Refrigeration', price: 1290, band: '500-1500', finish: 'Stainless and glass', spec: '5.3 cu ft · 24 in', stock: 'order' },
  { id: 'induction-range', name: '30 in Induction Range', description: 'Four zones and a convection oven. Needs a 40A circuit, which our installer will confirm before delivery.', category: 'appliances', type: 'Cooking', price: 3290, band: 'over-3000', finish: 'Stainless', spec: '5.3 cu ft oven · 30 in', stock: 'showroom' },
  { id: 'gas-range', name: '30 in Gas Range', description: 'Five burners including a simmer ring. Gas connection by a licensed fitter, arranged by us.', category: 'appliances', type: 'Cooking', price: 2150, band: '1500-3000', finish: 'Stainless', spec: '5.0 cu ft oven · 30 in', stock: 'in-stock' },
  { id: 'wall-oven', name: '30 in Wall Oven', description: 'Single, true convection, with a telescopic rack on the middle runner.', category: 'appliances', type: 'Cooking', price: 2680, band: '1500-3000', finish: 'Stainless', spec: '5.0 cu ft · 30 in', stock: 'order' },
  { id: 'range-hood', name: '30 in Chimney Hood', description: '600 CFM, ducted or recirculating. Ducting is quoted after the installer sees the run.', category: 'appliances', type: 'Cooking', price: 890, band: '500-1500', finish: 'Stainless', spec: '600 CFM · 30 in', stock: 'in-stock' },
  { id: 'dishwasher-quiet', name: '24 in Dishwasher, 42 dBA', description: 'Third rack, adjustable middle rack, and quiet enough to run in an open-plan kitchen.', category: 'appliances', type: 'Dishwashers', price: 1350, band: '500-1500', finish: 'Stainless', spec: '42 dBA · 24 in', stock: 'showroom' },
  { id: 'dishwasher-basic', name: '24 in Dishwasher, 50 dBA', description: 'Plain, reliable, plastic tub. The right appliance for a rental or a basement suite.', category: 'appliances', type: 'Dishwashers', price: 720, band: '500-1500', finish: 'Stainless', spec: '50 dBA · 24 in', stock: 'in-stock' },
  { id: 'washer-dryer-pair', name: 'Front-Load Washer and Dryer Pair', description: 'Stackable with the kit, or side by side on pedestals. Priced and delivered as a pair.', category: 'appliances', type: 'Laundry', price: 2890, band: '1500-3000', finish: 'White', spec: '5.2 cu ft · 27 in each', stock: 'in-stock' },
  { id: 'laundry-centre', name: '24 in Laundry Centre', description: 'Washer and dryer in one column for a closet. Needs a 30A circuit and a vent.', category: 'appliances', type: 'Laundry', price: 2340, band: '1500-3000', finish: 'White', spec: '3.9 cu ft · 24 in', stock: 'order' },
  { id: 'compact-washer', name: '24 in Compact Washer', description: 'Ventless condensing dryer available to match. The pair fits a bathroom cupboard.', category: 'appliances', type: 'Laundry', price: 1480, band: '500-1500', finish: 'White', spec: '2.4 cu ft · 24 in', stock: 'order' },
];

/** The deposit rule, written once. It appears on every category page and on
 *  the delivery page, and a demo where the three disagree is worse than one
 *  that does not mention it. */
export const deposit = {
  percent: 20,
  minimum: 100,
  holdDays: 14,
};

const BASE = '/industries/retail/preview/retail-large-catalogue/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}living`, label: 'Living' },
    { href: `${BASE}bedroom`, label: 'Bedroom' },
    { href: `${BASE}dining`, label: 'Dining' },
    { href: `${BASE}appliances`, label: 'Appliances' },
    { href: `${BASE}delivery`, label: 'Delivery' },
    { href: `${BASE}about`, label: 'About' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}living`, label: 'Shop the floor', event: 'shop_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/retail',
};

export const footer: DemoFooter = {
  tagline: 'Furniture and major appliances on Rutherford Road. Delivery, installation and haul-away across the GTA.',
  rowsHeading: 'Showroom hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Halden Home Furnishings. Sample site — not a real business.`,
};

export const pageMeta: Record<
  'home' | 'living' | 'bedroom' | 'dining' | 'appliances' | 'delivery' | 'about' | 'contact',
  DemoPageMeta
> = {
  home: {
    title: 'Halden Home Furnishings — Furniture and Appliances, Vaughan',
    description:
      'Furniture and major appliances with a showroom on Rutherford Road in Vaughan. Delivery, installation and haul-away across the GTA, and a deposit option on big-ticket pieces.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  living: {
    title: 'Living Room Furniture — Halden Home Furnishings, Vaughan',
    description:
      'Sofas, armchairs, coffee tables, media storage and rugs, filtered by type and price. Twelve pieces, most of them on the floor in Vaughan.',
    ogImage: '/og/default.png',
    breadcrumb: 'Living',
  },
  bedroom: {
    title: 'Bedroom Furniture and Mattresses — Halden Home Furnishings',
    description:
      'Beds, mattresses, dressers, wardrobes and nightstands, filtered by type and price. Mattresses carry a 100-night exchange.',
    ogImage: '/og/default.png',
    breadcrumb: 'Bedroom',
  },
  dining: {
    title: 'Dining Furniture — Halden Home Furnishings, Vaughan',
    description:
      'Dining tables, chairs, benches, sideboards and stools, filtered by type and price. Seating counts are the real ones.',
    ogImage: '/og/default.png',
    breadcrumb: 'Dining',
  },
  appliances: {
    title: 'Major Appliances — Halden Home Furnishings, Vaughan',
    description:
      'Refrigeration, cooking, dishwashers and laundry. Every price includes installation and haul-away of the old appliance.',
    ogImage: '/og/default.png',
    breadcrumb: 'Appliances',
  },
  delivery: {
    title: 'Delivery, Installation and Financing — Halden Home Furnishings',
    description:
      'Delivery rates by zone across the GTA, appliance installation and haul-away, the deposit option on big-ticket items, and how financing applications work.',
    ogImage: '/og/default.png',
    breadcrumb: 'Delivery & Financing',
  },
  about: {
    title: 'About — Halden Home Furnishings, Vaughan',
    description:
      'A single showroom on Rutherford Road, our own delivery crews, and a buying policy that keeps the floor to about forty-five pieces.',
    ogImage: '/og/default.png',
    breadcrumb: 'About',
  },
  contact: {
    title: 'Contact and Showroom Hours — Halden Home Furnishings',
    description:
      'Showroom hours, address and parking for 2450 Rutherford Road, Vaughan, plus the numbers for delivery and service.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Rutherford Road, Vaughan',
  heroTitle: 'Forty-five pieces, all of them on the floor',
  heroBody:
    'We buy narrow and deep. If it is on this website it is in the showroom or in the warehouse behind it, and somebody here has sat on it.',
  heroPrimaryCta: 'Shop the floor',
  heroSecondaryCta: 'Delivery and financing',
  heroPhoto: {
    file: 'hero-showroom',
    subject:
      'Bright furniture showroom with a sofa, oak coffee table and rug arranged as a room set, tall windows, pale floor',
    alt: 'A room set on the showroom floor at Halden Home Furnishings',
  },
  categoriesHeading: 'Four rooms',
  categoriesCount: 'pieces',
  depositHeading: 'Pay a deposit online, balance in store',
  depositBody:
    'A sofa is not a web checkout. Put a deposit down online to hold a piece at the current price, then settle the balance when it is delivered or when you collect it.',
  depositPoints: [
    'Deposit holds the piece and the price',
    'Balance on delivery or at the till',
    'Deposit is refundable up to delivery week',
  ],
  depositCta: 'How delivery works',
  serviceHeading: 'What is in the price',
  service: [
    {
      title: 'Delivery by our own crew',
      detail: 'Two people, into the room you want it in, boxes taken away. Not a courier and not a curbside drop.',
    },
    {
      title: 'Appliance installation',
      detail: 'Levelled, connected and tested, with the old appliance taken away on the same trip.',
    },
    {
      title: 'Assembly included',
      detail: 'Beds, tables and wardrobes are built in the room. Nothing leaves here in a flat pack unless you ask.',
    },
  ],
  aboutHeading: 'One showroom, no branches',
  aboutBody:
    'Everything is bought by the two people who run the floor, which is why the range is narrow and why nobody here has to read a spec sheet to answer you.',
  aboutCta: 'About Halden',
};

/** Shared strings for all four category pages. Written once so the four
 *  pages cannot drift into four different filter UIs. */
export const catalogue = {
  filterHeading: 'Filter',
  typeLabel: 'Type',
  priceLabel: 'Price',
  allLabel: 'All',
  resultsNote: 'Filters combine. Choosing a type and a price band shows only pieces that match both.',
  specLabel: 'Size',
  finishLabel: 'Finish',
  embedLabel: 'Clover Online Store — embeds here',
  embedNote: 'This is the slot the live store sits in.',
  embedHeading: 'Deposit online',
  embedBodyPrefix: 'Hold any piece on this page with a',
  embedBodySuffix:
    'deposit through the shop’s existing Clover merchant account. The balance is settled on delivery or at the till, so the website never has to take three thousand dollars from somebody who has not seen the sofa.',
  embedNoFees: 'No second gateway and no extra processing fees — it is the same merchant account the showroom till runs on.',
  depositLineLabel: 'Deposit',
  applianceNote: 'Appliance prices include installation and haul-away of the old unit.',
  // Shown when a type and a price band have no overlap. Which pairs those are
  // is computed from the catalogue at build time, so the message appears for
  // exactly the empty combinations and nothing has to be maintained by hand.
  emptyHeading: 'Nothing in that combination',
  emptyBody: 'We buy narrow, so some types simply do not exist at some prices. Widen the price band or pick another type.',
};

export const deliveryPage = {
  eyebrow: 'Delivery & Financing',
  heading: 'Getting it into the room',
  intro:
    'Our own crews, our own trucks, and a rate that depends on how far the truck goes rather than on what is in it.',
  zonesHeading: 'Delivery rates',
  zonesNote:
    'Flat per delivery, whatever the load. One trip can carry a bedroom and a fridge for the same money as a nightstand.',
  zones: [
    { zone: 'Vaughan, Richmond Hill, Markham', price: 89, days: 'Next day on stock' },
    { zone: 'Toronto, North York, Scarborough, Etobicoke', price: 119, days: '2 to 4 days' },
    { zone: 'Mississauga, Brampton, Caledon, Aurora', price: 129, days: '2 to 4 days' },
    { zone: 'Oakville, Burlington, Whitby, Newmarket', price: 159, days: '3 to 6 days' },
  ],
  includedHeading: 'What the delivery fee covers',
  included: [
    'Two crew, into the room of your choice, on any floor with a stair or a lift',
    'Assembly of beds, tables, wardrobes and anything else that arrives in parts',
    'All packaging removed on the same visit',
    'A two-hour arrival window texted the morning of',
  ],
  applianceHeading: 'Appliance installation and haul-away',
  applianceBody:
    'Included in every appliance price on this site. The installer levels it, connects it, runs it once and takes the old one away.',
  appliancePoints: [
    { title: 'Before the truck', detail: 'We check the circuit, the opening and the door swing with you on the phone. Most problems are found here, not in your kitchen.' },
    { title: 'Gas and water', detail: 'Gas connections are made by a licensed fitter we arrange. Water lines for a fridge are included; a new shut-off valve is quoted.' },
    { title: 'Haul-away', detail: 'The old appliance goes on the truck. It is disposed of at a regional facility, not left at the curb.' },
    { title: 'What we will not do', detail: 'We do not cut cabinetry, move gas lines or run new circuits. We will tell you before delivery day, not on it.' },
  ],
  depositHeading: 'The deposit option',
  depositBody:
    'Big-ticket pieces can be held online with a deposit, which is what the store slot on every category page is for. The balance is settled on delivery or at the till.',
  depositTerms: [
    { label: 'Deposit', value: '20% of the item price' },
    { label: 'Minimum', value: '$100' },
    { label: 'Holds the price for', value: '14 days' },
    { label: 'Refundable', value: 'Until delivery week' },
  ],
  financeHeading: 'Financing',
  financeBody:
    'Equal-payment plans over 12 and 24 months are available through a third-party finance provider. Applications are made in the showroom, decided by the provider, and the rate, fees and terms are disclosed on the application before anything is signed. We do not quote a rate here because it is not ours to quote.',
  financePoints: [
    'Applied for in the showroom, not on this website',
    'Approval and terms are the provider’s decision, not ours',
    'The full cost of borrowing is disclosed before signing',
    'A declined application does not affect the deposit or the hold',
  ],
  ctaHeading: 'Questions about a specific room',
  ctaBody: 'Ring the showroom with the measurements. Most delivery problems are a stairwell, and they are solvable on the phone.',
};

export const aboutPage = {
  eyebrow: 'About',
  heading: 'Narrow and deep',
  intro:
    'One showroom, no branches, and about forty-five pieces at a time. That is a buying policy, not a limitation.',
  whyHeading: 'Why the range is small',
  whyBody:
    'A furniture retailer with four thousand SKUs has never sat on most of them. We carry a fraction of that, we have all of it on the floor, and the two people who buy it are the two people who will answer your question about it.',
  factsHeading: 'The short version',
  facts: [
    { label: 'Pieces on the floor', value: '45' },
    { label: 'Showroom square feet', value: '11,000' },
    { label: 'Delivery crews', value: '3' },
    { label: 'Open since', value: '2011' },
  ],
  crewHeading: 'Our own trucks',
  crewBody:
    'Three crews, all employed here. A third-party courier does not know that the Orrin sectional comes apart, and will leave it in your hallway in three boxes.',
  floorHeading: 'The floor',
  floorBody:
    'Eleven thousand square feet on Rutherford Road, arranged as rooms rather than aisles. Everything on this website is in it or in the warehouse behind it.',
  ctaHeading: 'Come and sit on it',
  ctaBody: 'Thursday and Friday evenings are the quietest. Saturday afternoon is not.',
  ctaLabel: 'Hours and address',
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: '2450 Rutherford Road',
  showroomHeading: 'Showroom',
  deliveryHeading: 'Delivery and service',
  addressHeading: 'Address',
  hoursHeading: 'Showroom hours',
  hoursNote: 'Open seven days. Thursday and Friday run late; Sunday is short.',
  hoursTable: { day: 'Day', open: 'Open' },
  visitHeading: 'Getting here',
  visit: [
    { title: 'Parking', detail: 'Forty spaces in front, free. The loading bay at the side is for the trucks, not for customer collection.' },
    { title: 'Collection', detail: 'Stock items can be collected from the warehouse door with two days’ notice. Bring straps and a second person.' },
    { title: 'Accessibility', detail: 'Level entry, wide aisles throughout the floor and an accessible washroom past the dining room set.' },
  ],
  mapLabel: 'Map — 2450 Rutherford Road, Vaughan',
  deliveryNote: 'Delivery scheduling, installation questions and anything about an order already placed.',
  ctaLabel: 'Delivery and financing',
};

export const productsIn = (category: CategoryId): Product[] =>
  products.filter((product) => product.category === category);

export const categoryById = (id: CategoryId): Category | undefined =>
  categories.find((category) => category.id === id);

/** Slugified facet value, used for the data attribute and the input id.
 *  One function so the markup and the CSS selectors cannot drift. */
export const slug = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const formatPrice = (price: number): string => new Intl.NumberFormat('en-CA').format(price);
