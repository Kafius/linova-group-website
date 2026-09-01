// Lakeshore Chiropractic & Wellness — the sample site for the Clinic /
// Practitioner playbook. A fictional clinic in Etobicoke; nothing here is a
// real business, and the demo ribbon says so on every page.
//
// EVERY string the preview renders lives in this file.
//
// ── COPY RULE FOR THIS DEMO ─────────────────────────────────────────────
// Health copy is written conservatively throughout. Everything below either
// describes what physically happens at an appointment, or states a
// credential, a fee, or a regulatory fact. There are no outcome claims, no
// conditions named as things the clinic treats or improves, no testimonials,
// and no language implying a result. Where a sentence felt borderline it was
// cut rather than softened. If you extend this file, hold that line — a
// regulated health profession in Ontario is advertising when it says these
// things, and the College takes a view on it.
//
// Flags: SEO, CMS, Analytics, Booking, Domain.
// Deliberately absent: e-commerce and CRM. All payment stays on the Clover
// terminal, which is the point: patient payment data never touches the site.
import type {
  DemoBusiness,
  DemoFooter,
  DemoNavigation,
  DemoRibbon,
  DemoTheme,
} from '../../lib/demos/shared';

export type ServiceGroup = 'chiropractic' | 'massage' | 'orthotics';

export interface Service {
  id: string;
  name: string;
  /** what happens in the appointment. Never what it is for. */
  description: string;
  group: ServiceGroup;
  minutes: number | null;
  /** CAD */
  price: number;
  from?: boolean;
  /** shown where the appointment has a prerequisite */
  requires?: string;
}

export interface Practitioner {
  id: string;
  name: string;
  designation: string;
  role: string;
  /** credential and registration only */
  credentials: string[];
  bio: string;
  groups: ServiceGroup[];
  photo: { file: string; subject: string; alt: string };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ClinicDay {
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

/** Soft white, deep teal, warm grey. Every pairing below clears WCAG AAA
 *  (7:1) rather than AA, the body size is set larger and the leading roomier —
 *  the brief asks for the accessibility here to be visibly better than the
 *  other demos, and those are the three levers that make that true rather
 *  than asserted. */
export const theme: DemoTheme = {
  ink: '#FCFCFB',
  inkRaised: '#F2F2F0',
  inkLine: '#DEDEDA',
  paper: '#0E3D44',
  paperRaised: '#14494F',
  paperLine: '#215C63',
  /** deep teal on soft white — 8.2:1, AAA */
  accent: '#0B565E',
  /** lifted for the teal band — 7.1:1, AAA */
  accentOnPaper: '#8FD4DA',
  /** 16.1:1 */
  onInk: '#1A1F1E',
  /** 8.1:1 — dimmed text still clears AAA here, unlike the other demos */
  onInkDim: 'rgba(26, 31, 30, 0.78)',
  onPaper: '#F0F7F7',
  /** 7.9:1 */
  onPaperDim: 'rgba(240, 247, 247, 0.82)',
  onAccent: '#FFFFFF',
  displayFont: '"Source Serif 4", "Iowan Old Style", Georgia, serif',
  /** Atkinson Hyperlegible, drawn by the Braille Institute specifically to
   *  make similar letterforms distinguishable at low vision. */
  bodyFont: '"Atkinson Hyperlegible", "Segoe UI", system-ui, sans-serif',
  displayAxes: "'opsz' 32",
  radius: '8px',
  leading: '1.78',
  bodySize: 'clamp(1.08rem, 1.02rem + 0.3vw, 1.2rem)',
};

export const fonts = [
  { family: 'Source Serif 4', file: 'source-serif-4-latin-var.woff2', weight: '400 700' },
  { family: 'Atkinson Hyperlegible', file: 'atkinson-hyperlegible-latin-400.woff2', weight: '400' },
  { family: 'Atkinson Hyperlegible', file: 'atkinson-hyperlegible-latin-700.woff2', weight: '700' },
];

export const business: DemoBusiness = {
  name: 'Lakeshore Chiropractic & Wellness',
  shortName: 'Lakeshore',
  positioning: 'Chiropractic, massage therapy and custom orthotics in Etobicoke.',
  address: {
    street: '1180 Lakeshore Crescent',
    neighbourhood: 'Mimico',
    city: 'Etobicoke',
    region: 'ON',
    postalCode: 'M8V 0B4',
    country: 'CA',
  },
  /** 555-01xx is the reserved fictional block — this number cannot ring anyone */
  phone: '(416) 555-0192',
  phoneHref: 'tel:+14165550192',
  email: 'reception@lakeshorechiro.ca',
  emailHref: 'mailto:reception@lakeshorechiro.ca',
};

export const hours: ClinicDay[] = [
  { day: 'Monday', short: 'Mon', schemaDay: 'Monday', open: '08:00', close: '19:00' },
  { day: 'Tuesday', short: 'Tue', schemaDay: 'Tuesday', open: '08:00', close: '19:00' },
  { day: 'Wednesday', short: 'Wed', schemaDay: 'Wednesday', open: '08:00', close: '19:00' },
  { day: 'Thursday', short: 'Thu', schemaDay: 'Thursday', open: '08:00', close: '19:00' },
  { day: 'Friday', short: 'Fri', schemaDay: 'Friday', open: '08:00', close: '16:00' },
  { day: 'Saturday', short: 'Sat', schemaDay: 'Saturday', open: '09:00', close: '14:00' },
  { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday', open: '00:00', close: '00:00', closed: true },
];

export const groups: { id: ServiceGroup; name: string; blurb: string }[] = [
  {
    id: 'chiropractic',
    name: 'Chiropractic',
    blurb: 'Assessment first, then treatment planned and reviewed with you. Provided by chiropractors registered with the College of Chiropractors of Ontario.',
  },
  {
    id: 'massage',
    name: 'Massage Therapy',
    blurb: 'Provided by a Registered Massage Therapist. Appointments are booked by length, and the time shown is hands-on time.',
  },
  {
    id: 'orthotics',
    name: 'Custom Orthotics',
    blurb: 'A gait assessment and a cast taken in clinic, from which orthotics are fabricated by an external lab.',
  },
];

/** The service list. This is a CMS-modelled collection — see the .cms.ts
 *  stub. Every description says what happens in the room and nothing about
 *  what the appointment is for. */
export const services: Service[] = [
  {
    id: 'chiro-initial', name: 'Initial Chiropractic Assessment', group: 'chiropractic', minutes: 45, price: 120,
    description: 'A health history, a physical and orthopaedic examination, and a discussion of what was found. Treatment is not provided at this visit unless the assessment is complete and you have consented to it.',
  },
  {
    id: 'chiro-visit', name: 'Chiropractic Treatment', group: 'chiropractic', minutes: 20, price: 65,
    description: 'A follow-up appointment carried out according to the plan agreed at your assessment.',
    requires: 'Initial assessment required first',
  },
  {
    id: 'chiro-review', name: 'Progress Review', group: 'chiropractic', minutes: 30, price: 85,
    description: 'A scheduled re-examination and a conversation about whether and how the plan should change.',
    requires: 'Existing patients',
  },
  {
    id: 'rmt-30', name: 'Massage Therapy, 30 minutes', group: 'massage', minutes: 30, price: 70,
    description: 'Thirty minutes of hands-on treatment with a Registered Massage Therapist, plus a short intake at your first visit.',
  },
  {
    id: 'rmt-45', name: 'Massage Therapy, 45 minutes', group: 'massage', minutes: 45, price: 95,
    description: 'Forty-five minutes of hands-on treatment with a Registered Massage Therapist.',
  },
  {
    id: 'rmt-60', name: 'Massage Therapy, 60 minutes', group: 'massage', minutes: 60, price: 120,
    description: 'An hour of hands-on treatment with a Registered Massage Therapist.',
  },
  {
    id: 'rmt-90', name: 'Massage Therapy, 90 minutes', group: 'massage', minutes: 90, price: 170,
    description: 'Ninety minutes of hands-on treatment with a Registered Massage Therapist.',
  },
  {
    id: 'gait-assessment', name: 'Gait Assessment & Casting', group: 'orthotics', minutes: 45, price: 95,
    description: 'A walking and standing assessment, followed by a foam or plaster cast of each foot taken in clinic.',
  },
  {
    id: 'custom-orthotics', name: 'Custom Orthotics', group: 'orthotics', minutes: null, price: 550, from: true,
    description: 'Fabricated by an external lab from the cast taken at your assessment, and fitted at a follow-up appointment. Price varies with the device prescribed.',
  },
];

export const practitioners: Practitioner[] = [
  {
    id: 'sandhu', name: 'Amrit Sandhu', designation: 'DC', role: 'Chiropractor',
    credentials: [
      'Doctor of Chiropractic, Canadian Memorial Chiropractic College',
      'Registered with the College of Chiropractors of Ontario',
    ],
    bio: 'Practising in Etobicoke since 2013. Sees patients for assessment, treatment and scheduled progress reviews.',
    groups: ['chiropractic'],
    photo: { file: 'staff-sandhu', subject: 'Chiropractor in clinic attire beside a treatment table, calm daylight, no equipment in use', alt: 'Amrit Sandhu, DC, in the clinic' },
  },
  {
    id: 'sorensen', name: 'Hana Sorensen', designation: 'RMT', role: 'Registered Massage Therapist',
    credentials: [
      'Registered with the College of Massage Therapists of Ontario',
      '2200-hour diploma programme',
    ],
    bio: 'Books thirty, forty-five, sixty and ninety-minute appointments. Issues receipts under her own registration number.',
    groups: ['massage'],
    photo: { file: 'staff-sorensen', subject: 'Massage therapist setting linens on a table in a quiet treatment room', alt: 'Hana Sorensen, RMT, preparing a treatment room' },
  },
  {
    id: 'barakat', name: 'Youssef Barakat', designation: 'DC', role: 'Chiropractor · Orthotics',
    credentials: [
      'Doctor of Chiropractic, Canadian Memorial Chiropractic College',
      'Registered with the College of Chiropractors of Ontario',
    ],
    bio: 'Carries out gait assessments and orthotic casting alongside general chiropractic appointments.',
    groups: ['chiropractic', 'orthotics'],
    photo: { file: 'staff-barakat', subject: 'Chiropractor at a desk reviewing a gait assessment printout, natural light', alt: 'Youssef Barakat, DC, reviewing a gait assessment' },
  },
];

/** CMS-modelled. Reception changes these more often than anything else on the
 *  site, which is half the reason this playbook carries a CMS. */
export const faq: FaqItem[] = [
  {
    id: 'referral', question: 'Do I need a referral?',
    answer: 'No. Chiropractic and massage therapy are direct-access professions in Ontario, so you can book without seeing a physician first. Some insurance plans ask for a referral before they will reimburse — check your plan, not us.',
  },
  {
    id: 'first-visit', question: 'What happens at a first visit?',
    answer: 'You complete an intake form, then the practitioner takes a health history and carries out an examination. They will explain what they found and what they propose, and you decide whether to go ahead. Allow forty-five minutes.',
  },
  {
    id: 'wear', question: 'What should I wear?',
    answer: 'Comfortable clothing you can move in. For massage therapy you will be draped throughout and only the area being worked on is uncovered.',
  },
  {
    id: 'direct-billing', question: 'Do you bill my insurance directly?',
    answer: 'We submit directly to most major insurers where your plan permits it. If a claim is declined or only partly covered, the balance is due at the visit and we will give you the paperwork to submit yourself.',
  },
  {
    id: 'receipts', question: 'Will I get a receipt?',
    answer: 'Every visit, by email or on paper, showing the practitioner’s name and registration number. Keep them for your insurer or for tax.',
  },
  {
    id: 'cancellation', question: 'What is your cancellation policy?',
    answer: 'Twenty-four hours’ notice, or the appointment is charged in full. Insurance does not reimburse a missed appointment.',
  },
  {
    id: 'someone-else', question: 'Can I book for someone else?',
    answer: 'Yes. Put their name on the booking and bring them with photo identification if it is a first visit. A parent or guardian must attend with anyone under sixteen.',
  },
  {
    id: 'parking', question: 'Is there parking?',
    answer: 'Twelve spaces behind the building, entered from the lane. Two are accessible spaces beside the level entrance.',
  },
];

const BASE = '/industries/clinic/preview/clinic-practitioner/';

export const navigation: DemoNavigation = {
  links: [
    { href: BASE, label: 'Home' },
    { href: `${BASE}services`, label: 'Services' },
    { href: `${BASE}practitioners`, label: 'Our Practitioners' },
    { href: `${BASE}new-patients`, label: 'New Patients' },
    { href: `${BASE}insurance`, label: 'Insurance & Fees' },
    { href: `${BASE}faq`, label: 'FAQ' },
    { href: `${BASE}contact`, label: 'Contact' },
  ],
  cta: { href: `${BASE}booking`, label: 'Book', event: 'book_cta_nav' },
  menuToggleOpen: 'Open menu',
  menuToggleClose: 'Close menu',
  skipToContent: 'Skip to content',
};

export const ribbon: DemoRibbon = {
  text: 'Sample site built by The Linova Group — demo content, not a real business',
  linkLabel: 'See the package',
  linkHref: '/industries/clinic',
};

export const footer: DemoFooter = {
  tagline: 'Chiropractic, massage therapy and custom orthotics in Etobicoke. Closed Sundays.',
  rowsHeading: 'Hours',
  findUsHeading: 'Find us',
  legal: `© ${new Date().getFullYear()} Lakeshore Chiropractic & Wellness. Sample site — not a real business.`,
};

export const pageMeta: Record<
  'home' | 'services' | 'practitioners' | 'newPatients' | 'booking' | 'faq' | 'insurance' | 'contact',
  DemoPageMeta
> = {
  home: {
    title: 'Lakeshore Chiropractic & Wellness — Etobicoke',
    description: 'Chiropractic, registered massage therapy and custom orthotics on Lakeshore Crescent, Etobicoke. Direct insurance billing and evening appointments.',
    ogImage: '/og/default.png', breadcrumb: 'Home',
  },
  services: {
    title: 'Services & Fees — Lakeshore Chiropractic & Wellness',
    description: 'Chiropractic assessments and treatment, massage therapy by length, and custom orthotics. What each appointment involves and what it costs.',
    ogImage: '/og/default.png', breadcrumb: 'Services',
  },
  practitioners: {
    title: 'Our Practitioners — Lakeshore Chiropractic & Wellness',
    description: 'Two chiropractors and a registered massage therapist, with their qualifications and the colleges they are registered with.',
    ogImage: '/og/default.png', breadcrumb: 'Our Practitioners',
  },
  newPatients: {
    title: 'New Patients — Lakeshore Chiropractic & Wellness',
    description: 'What to bring, what happens at a first appointment, and the intake form you can complete before you arrive.',
    ogImage: '/og/default.png', breadcrumb: 'New Patients',
  },
  booking: {
    title: 'Booking — Lakeshore Chiropractic & Wellness, Etobicoke',
    description: 'Request an appointment in five steps: service, practitioner, day, time and your details. Reception confirms by phone.',
    ogImage: '/og/default.png', breadcrumb: 'Booking',
  },
  faq: {
    title: 'Questions — Lakeshore Chiropractic & Wellness',
    description: 'Referrals, first visits, direct billing, receipts, cancellations and parking. The eight questions reception is asked most.',
    ogImage: '/og/default.png', breadcrumb: 'FAQ',
  },
  insurance: {
    title: 'Insurance & Fees — Lakeshore Chiropractic & Wellness',
    description: 'Every fee in one table, how direct billing works, what to bring, and what happens when a claim is declined.',
    ogImage: '/og/default.png', breadcrumb: 'Insurance & Fees',
  },
  contact: {
    title: 'Contact & Hours — Lakeshore Chiropractic & Wellness, Etobicoke',
    description: 'Address, phone, hours, parking and accessibility for the clinic on Lakeshore Crescent, Etobicoke. Open to 7pm weekdays.',
    ogImage: '/og/default.png', breadcrumb: 'Contact',
  },
};

export const home = {
  heroEyebrow: 'Mimico, Etobicoke',
  heroTitle: 'A clinic that explains itself before it treats you',
  heroBody: 'Chiropractic, registered massage therapy and custom orthotics. Every first appointment starts with an assessment and a conversation about what we found.',
  heroPrimaryCta: 'Request an appointment',
  heroSecondaryCta: 'What happens at a first visit',
  heroPhoto: {
    file: 'hero-clinic',
    subject: 'Clinic reception and waiting area, plain and bright, chairs and a plant, nobody in frame',
    alt: 'The reception and waiting area at Lakeshore Chiropractic & Wellness',
  },
  groupsHeading: 'What we offer',
  groupsCta: 'All services and fees',
  firstVisitHeading: 'The first appointment',
  firstVisitBody: 'Forty-five minutes. An intake form, a health history, a physical and orthopaedic examination, and then a plain explanation of what was found and what the practitioner proposes. Nothing is done to you before that conversation.',
  firstVisitPoints: [
    'Bring your health card, insurance details and a list of any medication',
    'Wear something you can move in',
    'A parent or guardian attends with anyone under sixteen',
  ],
  firstVisitCta: 'New patient information',
  insuranceHeading: 'Insurance and payment',
  insuranceBody: 'We submit directly to most major insurers where your plan permits it, and issue a receipt with the practitioner’s registration number every visit. Payment is taken at the desk on our terminal — the website never handles it.',
  insuranceCta: 'Insurance and fees',
  closerHeading: 'Request an appointment',
  closerBody: 'Five steps. Reception calls to confirm the time, and nothing is charged until you are here.',
  closerCta: 'Request an appointment',
};

export const servicesPage = {
  eyebrow: 'Services & Fees',
  heading: 'What each appointment involves',
  intro: 'The descriptions below say what happens in the room. What is appropriate for you is a conversation with a practitioner, not something a website can answer.',
  durationLabel: 'min',
  fromLabel: 'from',
  bookCta: 'Request this',
  feeNote: 'Fees are what you pay at the desk. Where your plan allows direct billing, we submit first and you pay only any balance.',
  allCta: 'Request an appointment',
};

export const practitionersPage = {
  eyebrow: 'Our Practitioners',
  heading: 'Who you will see',
  intro: 'Qualifications and registrations, as they appear on the public register of each college.',
  credentialsLabel: 'Qualifications',
  seesLabel: 'Books for',
  bookCta: 'Request an appointment',
  registerNote: 'Registration status for any Ontario chiropractor or massage therapist can be checked on their college’s public register.',
};

export const newPatients = {
  eyebrow: 'New Patients',
  heading: 'Before your first appointment',
  intro: 'Forty-five minutes, most of it talking and examining. Here is what to bring and what will happen.',
  bringHeading: 'What to bring',
  bring: [
    { title: 'Photo identification', detail: 'For the file, and for your insurer if we are billing directly.' },
    { title: 'Insurance details', detail: 'Policy and certificate numbers, or the card itself. Bring both plans if you have two.' },
    { title: 'A medication list', detail: 'Anything prescribed or over the counter, including supplements.' },
    { title: 'Imaging or reports', detail: 'Only if you already have them. We will not ask you to go and get any.' },
  ],
  expectHeading: 'What happens',
  expect: [
    { title: 'Intake', detail: 'The form below, or on paper when you arrive. It takes about five minutes.' },
    { title: 'History', detail: 'The practitioner asks about your health, previous injuries and what brought you in.' },
    { title: 'Examination', detail: 'A physical and orthopaedic examination. You will be told what is being done and why before each part.' },
    { title: 'Findings and consent', detail: 'A plain explanation of what was found and what is proposed. You decide whether to proceed, and you can stop at any point.' },
  ],
  formHeading: 'Intake form',
  formNote: 'Completing this ahead saves five minutes at the desk. It is not a booking — request an appointment separately.',
  form: {
    nameLabel: 'Full name', namePlaceholder: 'As it appears on your insurance', nameError: 'Enter your full name.',
    emailLabel: 'Email', emailPlaceholder: 'you@example.com', emailError: 'Enter an email we can confirm to.',
    phoneLabel: 'Phone', phonePlaceholder: '(416) 555-0100', phoneError: 'Enter a phone number for reception.',
    reasonLabel: 'Reason for your visit',
    reasonPlaceholder: 'In your own words. The practitioner will take a full history at the appointment.',
    reasonError: 'Tell us briefly what brings you in.',
    insurerLabel: 'Insurance provider',
    insurerPlaceholder: 'Provider name, or leave blank if paying directly',
    insurerNote: 'Optional. Policy and certificate numbers are taken at the desk, never through this form.',
    consentLabel:
      'I consent to Lakeshore Chiropractic & Wellness collecting the information above in order to prepare for my appointment.',
    consentNote:
      'This is not consent to treatment. Consent to treat is discussed with your practitioner and signed in clinic, after the examination and before anything is done.',
    consentError: 'We need your consent before we can accept this form.',
    submit: 'Send intake form',
    submitting: 'Sending',
    successHeading: 'Intake received',
    successBody: 'Thanks. Reception will have this on file. If you have not requested an appointment yet, that is a separate step.',
    successCta: 'Request an appointment',
  },
};

export const bookingPage = {
  eyebrow: 'Booking',
  heading: 'Request an appointment',
  intro: 'Five steps. Reception calls to confirm the exact time, and nothing is charged until you are at the desk.',
  stepLabel: 'Step',
  ofLabel: 'of',
  steps: [
    { id: 'service', title: 'Which appointment?', hint: 'If you have not been before, choose an initial assessment.' },
    { id: 'practitioner', title: 'With whom?', hint: 'Or take the first available, which is usually sooner.' },
    { id: 'date', title: 'Which day?', hint: 'Open to 7pm Monday to Thursday, and Saturday mornings.' },
    { id: 'time', title: 'What time?', hint: 'Greyed-out times are already taken.' },
    { id: 'you', title: 'Your details', hint: 'Reception calls to confirm. We send one reminder and nothing else.' },
  ],
  anyPractitioner: { id: 'any', name: 'First available', role: 'Whoever is free', detail: 'Usually the shortest wait.' },
  nextLabel: 'Next',
  backLabel: 'Back',
  confirmLabel: 'Request this appointment',
  summaryHeading: 'Your request',
  serviceLabel: 'Appointment',
  practitionerLabel: 'With',
  dateLabel: 'Date',
  timeLabel: 'Time',
  feeLabel: 'Fee',
  form: {
    nameLabel: 'Name', namePlaceholder: 'Your name', nameError: 'We need a name for the appointment.',
    phoneLabel: 'Phone', phonePlaceholder: '(416) 555-0100', phoneError: 'Enter a number reception can call.',
    emailLabel: 'Email', emailPlaceholder: 'you@example.com', emailError: 'Enter an email for the confirmation.',
    newPatientLabel: 'This is my first appointment here',
  },
  errors: {
    service: 'Choose an appointment type to carry on.',
    practitioner: 'Choose a practitioner, or take the first available.',
    date: 'Choose a day.',
    time: 'Choose a time.',
  },
  successHeading: 'Request sent',
  successBody: 'Reception will call to confirm the time. If this is your first appointment, completing the intake form ahead saves five minutes at the desk.',
  successAgain: 'Request another',
  successIntakeCta: 'New patient intake form',
  phoneNote: 'Reception answers the phone during opening hours, and that is the faster route if you need something soon.',
};

export const slots = {
  times: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  taken: ['09:00', '13:00', '16:00'],
  takenLabel: 'Taken',
};

export const faqPage = {
  eyebrow: 'Questions',
  heading: 'What reception gets asked',
  intro: 'If your question is about whether an appointment is appropriate for you, that is a conversation with a practitioner rather than a web page. Call and ask.',
  contactCta: 'Call the clinic',
  bookCta: 'Request an appointment',
};

export const insurancePage = {
  eyebrow: 'Insurance & Fees',
  heading: 'What it costs and how billing works',
  intro: 'Every fee is on this page. Nothing is quoted at the desk that is not here.',
  feesHeading: 'Fees',
  feesTable: { service: 'Appointment', duration: 'Length', fee: 'Fee' },
  durationLabel: 'min',
  fromLabel: 'from',
  billingHeading: 'Direct billing',
  billingPoints: [
    { title: 'We submit first', detail: 'Where your plan permits direct billing, we submit the claim at the visit and you pay only what is left.' },
    { title: 'Declined or partial claims', detail: 'The balance is due at the visit. We give you the paperwork to submit yourself, and we will explain what the insurer said.' },
    { title: 'Two plans', detail: 'Bring both. We submit to the primary plan first and give you what you need for the second.' },
    { title: 'Receipts every visit', detail: 'Showing the practitioner’s name and registration number, which is what insurers and the CRA ask for.' },
  ],
  paymentHeading: 'Paying',
  paymentBody: 'Payment is taken at the desk on our card terminal. The website never handles a payment and never stores a card, which is deliberate: it keeps patient payment information off the internet entirely.',
  cancellationHeading: 'Cancellations',
  cancellationBody: 'Twenty-four hours’ notice, or the appointment is charged in full. Insurers do not reimburse a missed appointment, so that charge is yours.',
  bookCta: 'Request an appointment',
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Lakeshore Crescent, Mimico',
  addressHeading: 'Address',
  phoneHeading: 'Phone',
  emailHeading: 'Email',
  hoursHeading: 'Hours',
  hoursNote: 'Closed Sundays. The last appointment of the day starts an hour before close.',
  hoursTable: { day: 'Day', open: 'Open' },
  closedLabel: 'Closed',
  gettingHereHeading: 'Parking and access',
  gettingHere: [
    { title: 'Parking', detail: 'Twelve spaces behind the building, entered from the lane. Two accessible spaces beside the level entrance.' },
    { title: 'Step-free access', detail: 'Level entry at the rear. One treatment room and the washroom are wheelchair accessible.' },
    { title: 'Transit', detail: 'TTC routes along Lake Shore Boulevard stop two minutes away. Mimico GO is a ten-minute walk.' },
  ],
  mapLabel: 'Map — 1180 Lakeshore Crescent, Etobicoke',
  urgentHeading: 'If it is urgent',
  urgentBody: 'This clinic is not an emergency service and the website is not monitored. For a medical emergency call 911, and for urgent advice call Health Connect Ontario at 811.',
  bookCta: 'Request an appointment',
};

export const servicesIn = (group: ServiceGroup): Service[] =>
  services.filter((service) => service.group === group);

export const findService = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const bookableServices = (): Service[] => services.filter((s) => s.minutes !== null);
