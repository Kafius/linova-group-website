// Redline Auto Service — the sample site for the Automotive Book a Bay
// playbook. A fictional six-bay independent shop in Oshawa; nothing here is a
// real business, and the demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file. The .astro pages under
// src/pages/industries/auto/preview/automotive-book-a-bay/ hold layout and
// nothing else.
//
// Flags for this playbook: SEO, Analytics, Booking, Domain.
// Deliberately absent: e-commerce, CMS and CRM. Clover handles in-person
// payment and invoicing, so the site's whole job is to be found locally and
// capture the booking. There is no checkout anywhere in this demo.
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
  /** CAD. Null where the job cannot be priced without seeing the vehicle. */
  price: number | null;
  /** true when the price above is a starting figure rather than the job */
  from?: boolean;
  /** shown on the booking summary instead of a total */
  quoteOnly?: boolean;
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

/** Slate and concrete with one safety yellow, used only where something needs
 *  doing. Square corners throughout — the geometry is a workshop, not a spa. */
export const theme: DemoTheme = {
  ink: '#1C2024',
  inkRaised: '#252A2F',
  inkLine: '#363D44',
  paper: '#E8EAEC',
  paperRaised: '#DBDEE1',
  paperLine: '#C2C7CC',
  /** safety yellow on slate (9.7:1) */
  accent: '#F2C230',
  /** the same yellow taken down to an olive for the concrete ground (6.0:1) */
  accentOnPaper: '#6B5410',
  onInk: '#EDEFF1',
  onInkDim: 'rgba(237, 239, 241, 0.70)',
  onPaper: '#171A1D',
  onPaperDim: 'rgba(23, 26, 29, 0.72)',
  onAccent: '#1C2024',
  displayFont: '"Space Grotesk", "Segoe UI", system-ui, sans-serif',
  bodyFont: '"Barlow", "Segoe UI", system-ui, sans-serif',
  radius: '0',
};

export const fonts = [
  { family: 'Space Grotesk', file: 'space-grotesk-latin-var.woff2', weight: '400 700' },
  { family: 'Barlow', file: 'barlow-latin-400.woff2', weight: '400' },
  { family: 'Barlow', file: 'barlow-latin-700.woff2', weight: '700' },
];

export const business: DemoBusiness = {
  name: 'Redline Auto Service',
  shortName: 'Redline',
  positioning: 'Six bays on Beaton Line. Licensed technicians, written estimates, loaner cars.',
  address: {
    street: '1420 Beaton Line',
    city: 'Oshawa',
    region: 'ON',
    postalCode: 'L1H 0C4',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(905) 555-0119',
  phoneHref: 'tel:+19055550119',
  email: 'service@redlineauto.ca',
  emailHref: 'mailto:service@redlineauto.ca',
};

/** The towns the shop actually drives a shuttle to. This list is the local
 *  SEO build: it feeds the service-area copy, the schema's areaServed, and
 *  the shuttle note, so all three always name the same places. */
export const serviceArea = ['Oshawa', 'Whitby', 'Courtice', 'Bowmanville'];

export const hours: ShopDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '07:00', close: '18:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '07:00', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '07:00', close: '18:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '07:00', close: '18:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '07:00', close: '18:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '08:00', close: '14:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '00:00', close: '00:00', closed: true },
];

export const services: Service[] = [
  {
    id: 'oil-change',
    name: 'Oil & Filter Change',
    description: 'Full synthetic, new filter, fluids topped and a twelve-point look over the rest of it. Out in under an hour.',
    price: 89,
    from: true,
  },
  {
    id: 'seasonal-swap',
    name: 'Seasonal Tire Swap',
    description: 'Four wheels off, four on, torqued to spec and pressures set. Book early in October and again in April.',
    price: 80,
  },
  {
    id: 'tire-install',
    name: 'Tire Install & Balance',
    description: 'Mount, balance and new valve stems on four wheels. Old tires disposed of at no charge.',
    price: 140,
    from: true,
  },
  {
    id: 'safety-inspection',
    name: 'Safety Standards Certificate',
    description: 'Full provincial safety inspection with a written pass or a written list of what it needs.',
    price: 120,
  },
  {
    id: 'diagnostic',
    name: 'Diagnostic Scan',
    description: 'Codes pulled and traced to the actual fault, not just read out. The fee comes off the repair if you go ahead with it.',
    price: 140,
  },
  {
    id: 'alignment',
    name: 'Four-Wheel Alignment',
    description: 'Camber, caster and toe set to the manufacturer figures, with a printout before and after.',
    price: 130,
  },
  {
    id: 'battery',
    name: 'Battery Test & Replace',
    description: 'Load-tested first, because it is often the alternator. Replacement includes the terminal clean-up.',
    price: 210,
    from: true,
  },
  {
    id: 'ac-service',
    name: 'Air Conditioning Service',
    description: 'Pressure test, leak check, evacuate and recharge. Booked in May, mostly.',
    price: 180,
    from: true,
  },
  {
    id: 'pre-purchase',
    name: 'Pre-Purchase Inspection',
    description: 'Two hours on a hoist before you buy someone else’s problem. You get the report whether we like the car or not.',
    price: 160,
  },
  {
    id: 'brakes',
    name: 'Brake Service',
    description: 'Pads, rotors, calipers and lines, front or rear. Priced once we have measured what is left.',
    price: null,
    quoteOnly: true,
  },
  {
    id: 'suspension',
    name: 'Suspension & Steering',
    description: 'Struts, shocks, bushings, tie rods. Every one of these depends on what else has worn with it.',
    price: null,
    quoteOnly: true,
  },
  {
    id: 'exhaust',
    name: 'Exhaust Repair',
    description: 'Welded sections, hangers, and cat replacement where it is legal to. Quoted after it is up on the hoist.',
    price: null,
    quoteOnly: true,
  },
  {
    id: 'fleet',
    name: 'Fleet Maintenance',
    description: 'Scheduled servicing on accounts, with one invoice a month and priority on the bays.',
    price: null,
    quoteOnly: true,
  },
];

export const navigation: DemoNavigation = {
  links: [
    { href: '/industries/auto/preview/automotive-book-a-bay/', label: 'Home' },
    { href: '/industries/auto/preview/automotive-book-a-bay/services', label: 'Services' },
    { href: '/industries/auto/preview/automotive-book-a-bay/book', label: 'Book a Bay' },
    { href: '/industries/auto/preview/automotive-book-a-bay/why-us', label: 'Why Us' },
    { href: '/industries/auto/preview/automotive-book-a-bay/contact', label: 'Contact' },
  ],
  cta: { href: '/industries/auto/preview/automotive-book-a-bay/book', label: 'Book a bay', event: 'book_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/auto',
};

export const footer: DemoFooter = {
  tagline: 'Independent six-bay shop in Oshawa, serving Durham Region.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Redline Auto Service. Sample site — not a real business.`,
};

export const pageMeta: Record<'home' | 'services' | 'book' | 'whyUs' | 'contact', DemoPageMeta> = {
  home: {
    title: 'Redline Auto Service — Auto Repair in Oshawa, Whitby & Courtice',
    description: 'Independent six-bay shop on Beaton Line, Oshawa. Safety inspections, tires, diagnostics and brakes, with loaner cars and a shuttle across Durham Region.',
    ogImage: '/og/default.png',
    breadcrumb: 'Home',
  },
  services: {
    title: 'Services & Pricing — Redline Auto Service, Oshawa',
    description: 'Oil changes from $89, safety certificates at $120, alignments at $130, plus brake, suspension and exhaust work quoted after inspection. Prices in CAD.',
    ogImage: '/og/default.png',
    breadcrumb: 'Services',
  },
  book: {
    title: 'Book a Bay — Redline Auto Service, Oshawa',
    description: 'Book a bay in five steps: what it needs, what you drive, when, whether you are waiting, and how to reach you. No account and no deposit.',
    ogImage: '/og/default.png',
    breadcrumb: 'Book a Bay',
  },
  whyUs: {
    title: 'Why Us — Redline Auto Service, Oshawa',
    description: 'Licensed technicians, written estimates before any work, loaner cars and a Durham Region shuttle. How we quote, and what we will tell you not to fix.',
    ogImage: '/og/default.png',
    breadcrumb: 'Why Us',
  },
  contact: {
    title: 'Contact & Hours — Redline Auto Service, Oshawa',
    description: 'Address, phone, hours and directions for Redline Auto Service on Beaton Line in Oshawa. Open at 7am weekdays, closed Sundays.',
    ogImage: '/og/default.png',
    breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Oshawa · Durham Region',
  heroTitle: 'Six bays, and a written estimate before anything is touched',
  heroBody: 'Licensed technicians on tires, brakes, diagnostics and safeties. Loaner cars, and a shuttle anywhere in Durham.',
  heroPrimaryCta: 'Book a bay',
  heroSecondaryCta: 'Services and prices',
  heroPhoto: {
    file: 'hero-bays',
    subject: 'Six-bay workshop from the forecourt, doors up, cars on hoists, morning light across the concrete',
    alt: 'The six bays at Redline Auto Service with the doors up and cars on the hoists',
  },
  quickHeading: 'Booked most often',
  quickNote: 'Fixed prices, no surprises at the counter.',
  /** ids must exist in `services` — the page looks them up */
  quickIds: ['oil-change', 'safety-inspection', 'seasonal-swap', 'alignment'],
  quickCta: 'Every service and price',
  areaHeading: 'Who we look after',
  areaBody: 'We are on Beaton Line in Oshawa, and the shuttle runs across Durham. Most customers come from one of these four.',
  areaNote: 'Loaner cars are first come, first served — say so when you book and we will hold one.',
  proofHeading: 'What you get either way',
  proof: [
    { title: 'A written estimate', detail: 'Before a spanner moves. If the job changes on the hoist, we call before we carry on.' },
    { title: 'The old parts back', detail: 'In a box, on request. If we say a rotor was scored, you can see the scoring.' },
    { title: 'Licensed technicians', detail: 'Every job is done by a licensed 310S, not by whoever is free.' },
  ],
  closerHeading: 'Book a bay',
  closerBody: 'Five steps, about ninety seconds. No deposit and no account.',
  closerCta: 'Book a bay',
  closerPhoneLabel: 'Or call the desk',
};

export const servicesPage = {
  eyebrow: 'Services',
  heading: 'What we do, and what it costs',
  intro: 'Fixed prices where a job can be priced. Where it cannot, we put it on the hoist, measure it and give you a written number before anything starts.',
  fromLabel: 'from',
  quoteLabel: 'Quoted after inspection',
  fixedHeading: 'Fixed price',
  quotedHeading: 'Quoted after inspection',
  quotedNote: 'These depend entirely on what has worn. Booking one of these books the inspection, not the repair.',
  bookCta: 'Book this',
  allCta: 'Book a bay',
};

export const bookPage = {
  eyebrow: 'Book a bay',
  heading: 'Book a bay',
  intro: 'Five steps. No account, no deposit, and nothing charged until the work is done and you are standing at the counter.',
  stepLabel: 'Step',
  ofLabel: 'of',
  steps: [
    { id: 'service', title: 'What does it need?', hint: 'Not sure? Pick the diagnostic and we will find it.' },
    { id: 'vehicle', title: 'What do you drive?', hint: 'Year, make and model is enough to pull the right parts.' },
    { id: 'when', title: 'When suits?', hint: 'We will confirm the exact time by phone the day before.' },
    { id: 'wait', title: 'Waiting or dropping off?', hint: 'Loaners are limited, so tell us early if you need one.' },
    { id: 'you', title: 'How do we reach you?', hint: 'We call before starting any work that was not on the estimate.' },
  ],
  nextLabel: 'Next',
  backLabel: 'Back',
  confirmLabel: 'Request this bay',
  summaryHeading: 'Your booking',
  serviceLabel: 'Service',
  vehicleLabel: 'Vehicle',
  dateLabel: 'Preferred date',
  dropLabel: 'Arrangement',
  totalLabel: 'Price',
  quoteTotal: 'Quoted after inspection',
  vehicle: {
    yearLabel: 'Year',
    yearPlaceholder: '2018',
    yearError: 'Enter the model year.',
    makeLabel: 'Make',
    makePlaceholder: 'Honda',
    makeError: 'Enter the make.',
    modelLabel: 'Model',
    modelPlaceholder: 'CR-V',
    modelError: 'Enter the model.',
    kmLabel: 'Odometer (km)',
    kmPlaceholder: 'Optional',
  },
  dropOptions: [
    { id: 'wait', name: 'I will wait', detail: 'There is a room with decent coffee and a window onto the bays.' },
    { id: 'drop', name: 'Dropping it off', detail: 'Key drop by the side door if you are here before seven.' },
    { id: 'loaner', name: 'I need a loaner', detail: 'Subject to one being free. We confirm when we call.' },
    { id: 'shuttle', name: 'Shuttle me home', detail: 'Anywhere in Durham Region, weekdays.' },
  ],
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameError: 'We need a name for the work order.',
    phoneLabel: 'Phone',
    phonePlaceholder: '(905) 555-0100',
    phoneError: 'Enter a number we can reach you on during the day.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    emailError: 'Enter an email for the written estimate.',
    notesLabel: 'What is it doing?',
    notesPlaceholder: 'Noises, warning lights, when it happens — anything helps',
  },
  errors: {
    service: 'Pick what it needs to carry on.',
    vehicle: 'Fill in the year, make and model.',
    date: 'Pick a preferred date.',
    drop: 'Tell us whether you are waiting.',
  },
  successHeading: 'Bay requested',
  successBody: 'We will call to confirm the time and, where the job needs quoting, to talk you through the estimate before anything starts.',
  successAgain: 'Book another',
  callNote: 'Need it today? Call the desk — we keep one bay back for emergencies.',
};

export const whyUs = {
  eyebrow: 'Why us',
  heading: 'The estimate comes first',
  intro: 'An independent shop lives or dies on whether people believe the invoice. Here is how we try to make that easy.',
  pillars: [
    {
      title: 'Nothing starts without a number',
      detail: 'You get a written estimate before any work begins. If we open something up and it is worse than it looked, we stop and call you. There is no version of this where you find out at the counter.',
    },
    {
      title: 'We will tell you not to fix things',
      detail: 'Brakes at forty percent do not need doing today. We will note it, tell you roughly how long you have, and let you spend the money when it actually needs spending.',
    },
    {
      title: 'The car goes back on a hoist, not a guess',
      detail: 'Diagnostics are traced to the fault. Where the code is ambiguous we say so, and we do not replace parts hoping one of them is it.',
    },
    {
      title: 'You are not stranded',
      detail: 'Loaner cars, a shuttle across Durham, and a key drop for anyone starting work before we open.',
    },
  ],
  creditHeading: 'Licences and standards',
  credits: [
    { label: '310S licensed', detail: 'Every technician on the floor holds a provincial automotive service licence.' },
    { label: 'Motor Vehicle Inspection Station', detail: 'Licensed to issue Safety Standards Certificates.' },
    { label: 'Written estimates', detail: 'Required by the Consumer Protection Act, and we follow it to the letter.' },
    { label: 'Parts warranty', detail: 'Twelve months or twenty thousand kilometres on parts and labour.' },
  ],
  photo: {
    file: 'technician',
    subject: 'Technician under a raised car with a work light, reading a measurement, hands and tools in focus',
    alt: 'A licensed technician working under a raised vehicle at Redline Auto Service',
  },
  closerHeading: 'Bring it in',
  closerBody: 'Book a bay online, or call the desk and talk to somebody who will be there when you arrive.',
  closerCta: 'Book a bay',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Beaton Line, Oshawa',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'Open at seven on weekdays, so you can drop a car before work. Closed Sundays.',
  hoursTable: { day: 'Day', open: 'Open' },
  closedLabel: 'Closed',
  gettingHereHeading: 'Getting here',
  gettingHere: [
    { title: 'Parking', detail: 'Customer lot off Beaton Line, past the bay doors. Do not block the forecourt.' },
    { title: 'Key drop', detail: 'Side door, left of the office. Envelopes and a pen are in the box.' },
    { title: 'Shuttle', detail: 'Weekdays across Durham Region. Ask when you book and we will schedule it.' },
  ],
  mapLabel: 'Map — 1420 Beaton Line, Oshawa',
  areaHeading: 'Service area',
  areaNote: 'The shuttle runs to all four, weekdays.',
  bookCta: 'Book a bay',
};

export const findService = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const fixedServices = (): Service[] => services.filter((s) => !s.quoteOnly);
export const quotedServices = (): Service[] => services.filter((s) => s.quoteOnly);
