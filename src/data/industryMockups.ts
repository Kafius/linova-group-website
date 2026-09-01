// Interactive site mockups — one fictional client site per vertical, shown
// inside a plotted browser frame on /industries/[slug].
//
// Ported from the old site's industry pages, which each carried a clickable
// multi-page mockup ("See what we'd build for a law firm"). That device was
// the strongest thing on those pages and the rebuild dropped it; this brings
// it back data-driven, so a vertical gets one from data instead of a
// hand-written 500-line page.
//
// The interior is the CLIENT's brand world, not ours — Plotter & Marker
// stops at the browser frame. Each mockup carries the vertical's accent as
// its own brand colour so the frame and its contents still read as one page.
//
// Nothing here is a real client. Every mockup renders stamped as a concept
// (brief §8: never fake a client), including for verticals that also have a
// real live site shown further down the page.

export interface MockupPalette {
  /** page ground */
  bg: string;
  /** cards, panels, inset surfaces */
  surface: string;
  /** hairlines and dividers */
  line: string;
  /** primary text */
  text: string;
  /** secondary text */
  muted: string;
  /** the client's brand colour — the vertical accent */
  accent: string;
  /** text that sits on top of a filled accent */
  onAccent: string;
}

export type MockupBlock =
  | {
      kind: 'nav';
      brand: string;
      /** trailing character rendered in the accent, e.g. the dot in "Kept." */
      brandTail?: string;
      links: string[];
      cta: string;
    }
  | {
      kind: 'hero';
      eyebrow: string;
      /** each entry is a line; an entry wrapped in {} renders in the accent */
      title: string[];
      body: string;
      primary: string;
      secondary?: string;
      /** tonal wash behind the hero — 'accent' tints with the brand colour */
      wash?: 'accent' | 'none';
    }
  | { kind: 'stats'; items: { value: string; label: string }[] }
  | {
      kind: 'cards';
      title?: string;
      note?: string;
      cols: 2 | 3;
      /** `dim` drops the meta out of the accent — unavailable, sold out, closed */
      items: { title: string; meta: string; tone?: string; dim?: boolean }[];
    }
  | {
      kind: 'rows';
      title?: string;
      note?: string;
      items: { label: string; value: string; note?: string }[];
    }
  | {
      kind: 'gallery';
      title?: string;
      note?: string;
      items: { label: string; tone: string }[];
    }
  | {
      kind: 'form';
      title: string;
      body?: string;
      fields: { label: string; value: string; wide?: boolean }[];
      submit: string;
      note?: string;
    }
  /** The review widget as an empty slot. It carries no rating, count, quote
   *  or author on purpose: a drawn mockup that invents "4.9 from 204 reviews"
   *  and signs it with a person's name is a fabricated testimonial, and the
   *  built demos are held to the opposite standard — the aggregateRating slot
   *  on Bright Line is written and deliberately returns nothing. The caption
   *  says where the content comes from instead of pretending to be it. */
  | { kind: 'reviews'; caption: string }
  | { kind: 'band'; text: string; cta: string };

export interface MockupPage {
  /** tab label — lowercase, mono */
  id: string;
  label: string;
  blocks: MockupBlock[];
}

export interface IndustryMockup {
  /** the fictional business — never a real client name */
  business: string;
  /** shown in the frame's address bar */
  url: string;
  /** the one-line pitch above the frame */
  premise: string;
  palette: MockupPalette;
  pages: MockupPage[];
}

/** Every mockup interior is dark or light on its own terms — see palette. */
export const industryMockups: Record<string, IndustryMockup> = {
  /* ── Barbershops & salons ─────────────────────────────────────── */
  barbershops: {
    business: 'Northfade Barbers',
    url: 'northfade.ca',
    premise:
      'A shop site where the booking lives one tap from the bio link, every barber keeps their own book, and the walk-in reads the stars before the grid.',
    palette: {
      bg: '#101014',
      surface: 'rgba(245,246,248,0.06)',
      line: 'rgba(62,193,232,0.22)',
      text: '#f5f6f8',
      muted: 'rgba(245,246,248,0.58)',
      accent: '#3EC1E8',
      onAccent: '#101014',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'nav', brand: 'NORTH', brandTail: 'FADE', links: ['Barbers', 'Services', 'Gallery'], cta: 'Book a chair' },
          {
            kind: 'hero',
            eyebrow: 'walk-ins till 8 · king st n',
            title: ['Walk in scruffy.', '{Walk out sharp.}'],
            body: 'Four chairs, no appointments lost to DMs. Pick your barber, pick your slot, deposit holds it.',
            primary: 'Book a chair',
            secondary: 'See the cuts',
            wash: 'accent',
          },
          {
            kind: 'cards',
            title: 'Pick your barber',
            note: 'live availability · pulled from the shop book',
            cols: 3,
            items: [
              { title: 'MJ', meta: 'next slot · today 2:30' },
              { title: 'Rico', meta: 'next slot · today 4:15' },
              { title: 'Dee', meta: 'next slot · tomorrow 10:00' },
            ],
          },
          { kind: 'reviews', caption: 'Live Google rating and recent reviews, pulled from the business profile.' },
        ],
      },
      {
        id: 'services',
        label: 'services',
        blocks: [
          { kind: 'nav', brand: 'NORTH', brandTail: 'FADE', links: ['Barbers', 'Services', 'Gallery'], cta: 'Book a chair' },
          {
            kind: 'rows',
            title: 'Services & pricing',
            note: 'deposits on · no-shows charged half',
            items: [
              { label: 'Skin fade', value: '$45', note: '45 min' },
              { label: 'Scissor cut', value: '$40', note: '45 min' },
              { label: 'Cut + beard', value: '$60', note: '1 hr' },
              { label: 'Hot towel shave', value: '$38', note: '30 min' },
              { label: 'Kids (under 12)', value: '$28', note: '30 min' },
            ],
          },
          {
            kind: 'gallery',
            title: 'From the chairs',
            note: 'shot in shop · not stock',
            items: [
              { label: 'taper', tone: '#1d3440' },
              { label: 'burst fade', tone: '#24404d' },
              { label: 'lineup', tone: '#1a2b35' },
              { label: 'beard sculpt', tone: '#2a4a58' },
            ],
          },
        ],
      },
      {
        id: 'book',
        label: 'book',
        blocks: [
          { kind: 'nav', brand: 'NORTH', brandTail: 'FADE', links: ['Barbers', 'Services', 'Gallery'], cta: 'Book a chair' },
          {
            kind: 'form',
            title: 'Book a chair',
            body: 'Three taps from the link in our bio. Deposit holds the slot.',
            fields: [
              { label: 'barber', value: 'Rico' },
              { label: 'service', value: 'Cut + beard · $60' },
              { label: 'day', value: 'Thursday, the 14th' },
              { label: 'time', value: '4:15 pm' },
              { label: 'mobile', value: '(416) 555‑0148', wide: true },
            ],
            submit: 'Confirm — $15 deposit',
            note: 'Reminder at 24 hrs and 2 hrs. Reschedule free up to 12 hrs out.',
          },
        ],
      },
    ],
  },

  /* ── Restaurants ──────────────────────────────────────────────── */
  restaurants: {
    business: "Tita's Table",
    url: 'titastable.ca',
    premise:
      'A menu that is real pages instead of a PDF, direct ordering ahead of the apps, and the four things a hungry visitor actually taps sitting at the top.',
    palette: {
      bg: '#16100f',
      surface: 'rgba(255,240,236,0.06)',
      line: 'rgba(255,90,78,0.24)',
      text: '#fdf3f0',
      muted: 'rgba(253,243,240,0.58)',
      accent: '#FF5A4E',
      onAccent: '#16100f',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'nav', brand: "TITA'S", brandTail: ' TABLE', links: ['Menu', 'Order', 'Visit'], cta: 'Reserve' },
          {
            kind: 'hero',
            eyebrow: 'filipino kitchen · open till 10',
            title: ['Sunday lunch,', '{every day of the week.}'],
            body: 'Kare-kare, lechon kawali, and a sinigang worth the drive. Dine in, take out, or order direct — the apps take a cut, we would rather you keep it.',
            primary: 'Order direct',
            secondary: 'See the menu',
            wash: 'accent',
          },
          {
            kind: 'cards',
            cols: 2,
            items: [
              { title: 'Order direct', meta: 'ready in 20 min · no app fee' },
              { title: 'Reserve a table', meta: 'parties up to 12' },
              { title: 'Directions', meta: '1420 Steeles Ave W' },
              { title: 'Call the kitchen', meta: '(905) 555‑0113' },
            ],
          },
          {
            kind: 'gallery',
            title: 'Tonight on the pass',
            note: 'shot this week · never stock',
            items: [
              { label: 'kare-kare', tone: '#4a2318' },
              { label: 'lechon kawali', tone: '#5c2f1c' },
              { label: 'sinigang', tone: '#38301c' },
              { label: 'halo-halo', tone: '#432840' },
            ],
          },
        ],
      },
      {
        id: 'menu',
        label: 'menu',
        blocks: [
          { kind: 'nav', brand: "TITA'S", brandTail: ' TABLE', links: ['Menu', 'Order', 'Visit'], cta: 'Reserve' },
          {
            kind: 'rows',
            title: 'Mains',
            note: 'prices edited in one place · live before the dinner rush',
            items: [
              { label: 'Kare-kare', value: '$26', note: 'oxtail, peanut, bagoong' },
              { label: 'Lechon kawali', value: '$24', note: 'crisp pork belly, liver sauce' },
              { label: 'Sinigang na hipon', value: '$25', note: 'prawn, tamarind, kangkong' },
              { label: 'Chicken adobo', value: '$21', note: 'soy, vinegar, garlic rice' },
              { label: 'Pancit palabok', value: '$18', note: 'shrimp gravy, chicharrón' },
            ],
          },
          {
            kind: 'rows',
            title: 'Sweets & drinks',
            items: [
              { label: 'Halo-halo', value: '$11', note: 'ube, leche flan, shaved ice' },
              { label: 'Turon', value: '$8', note: 'banana, jackfruit, caramel' },
              { label: 'Calamansi soda', value: '$5' },
            ],
          },
        ],
      },
      {
        id: 'order',
        label: 'order',
        blocks: [
          { kind: 'nav', brand: "TITA'S", brandTail: ' TABLE', links: ['Menu', 'Order', 'Visit'], cta: 'Reserve' },
          {
            kind: 'form',
            title: 'Order direct',
            body: 'Same kitchen, same 20 minutes — without the third-party commission.',
            fields: [
              { label: 'order', value: '1× kare-kare · 1× pancit palabok' },
              { label: 'pickup', value: 'Today, 6:40 pm' },
              { label: 'name', value: 'D. Ramos' },
              { label: 'mobile', value: '(416) 555‑0177' },
              { label: 'notes for the kitchen', value: 'Extra bagoong on the side', wide: true },
            ],
            submit: 'Place order — $44.00',
            note: 'You pay the restaurant, not a platform. Text when it is on the pass.',
          },
        ],
      },
    ],
  },

  /* ── Contractors ──────────────────────────────────────────────── */
  contractors: {
    business: 'Redpost Build',
    url: 'redpostbuild.ca',
    premise:
      'The camera roll turned into project pages a homeowner can weigh a bid against, and a quote form that qualifies the lead before you drive across town.',
    palette: {
      bg: '#14140c',
      surface: 'rgba(255,252,235,0.06)',
      line: 'rgba(255,212,38,0.22)',
      text: '#fbfaf2',
      muted: 'rgba(251,250,242,0.58)',
      accent: '#FFD426',
      onAccent: '#14140c',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'nav', brand: 'REDPOST', brandTail: ' BUILD', links: ['Projects', 'Services', 'About'], cta: 'Get a quote' },
          {
            kind: 'hero',
            eyebrow: 'decks · basements · kitchens · vaughan & markham',
            title: ['Three bids in.', '{Ours has the photos.}'],
            body: 'Every finished job on this site is ours — before, after, scope, and the street it is on. Compare it to whatever else is on your kitchen table.',
            primary: 'Request a quote',
            secondary: 'See finished jobs',
            wash: 'accent',
          },
          { kind: 'stats', items: [{ value: '18 yrs', label: 'in the trade' }, { value: '340+', label: 'jobs finished' }, { value: '2 yr', label: 'workmanship warranty' }] },
          {
            kind: 'gallery',
            title: 'Recent work',
            note: 'sent from the truck · gallery stays current',
            items: [
              { label: 'deck · Maple', tone: '#3d3418' },
              { label: 'basement · Oakville', tone: '#2e2a15' },
              { label: 'kitchen · Richmond Hill', tone: '#463c1b' },
              { label: 'ensuite · Markham', tone: '#332d16' },
            ],
          },
        ],
      },
      {
        id: 'projects',
        label: 'projects',
        blocks: [
          { kind: 'nav', brand: 'REDPOST', brandTail: ' BUILD', links: ['Projects', 'Services', 'About'], cta: 'Get a quote' },
          {
            kind: 'cards',
            title: 'Cedar deck · Maple',
            note: 'before / after · 3 weeks · permit pulled',
            cols: 2,
            items: [
              { title: 'Before', meta: 'rotted pressure-treated, 2004', tone: '#2a2413' },
              { title: 'After', meta: 'cedar, hidden fasteners, glass rail', tone: '#4d4220' },
            ],
          },
          {
            kind: 'rows',
            title: 'Scope',
            items: [
              { label: 'Tear-out & disposal', value: 'week 1' },
              { label: 'Footings & framing', value: 'week 1–2', note: 'inspection passed' },
              { label: 'Cedar decking', value: 'week 2' },
              { label: 'Glass rail & lighting', value: 'week 3' },
            ],
          },
        ],
      },
      {
        id: 'quote',
        label: 'quote',
        blocks: [
          { kind: 'nav', brand: 'REDPOST', brandTail: ' BUILD', links: ['Projects', 'Services', 'About'], cta: 'Get a quote' },
          {
            kind: 'form',
            title: 'Request a quote',
            body: 'The form asks what the estimator would — so the serious requests stand out the moment they land.',
            fields: [
              { label: 'project type', value: 'Basement finish' },
              { label: 'rough budget', value: '$60k – $90k' },
              { label: 'timeline', value: 'Start in spring' },
              { label: 'address', value: 'Oakville, ON' },
              { label: 'what you are picturing', value: 'Two bedrooms, full bath, separate entrance', wide: true },
            ],
            submit: 'Send to the estimator',
            note: 'Photos welcome. We reply within one business day with a site-visit window.',
          },
        ],
      },
    ],
  },

  /* ── Schools & instruction ────────────────────────────────────── */
  schools: {
    business: 'Ironwood Taekwondo',
    url: 'ironwoodtkd.ca',
    premise:
      'The three things a parent needs at 9pm on a phone — what ages, which times, how to try it — answered on the page, ending in a booked trial class.',
    palette: {
      bg: '#14101f',
      surface: 'rgba(244,241,255,0.06)',
      line: 'rgba(164,140,255,0.24)',
      text: '#f4f1ff',
      muted: 'rgba(244,241,255,0.58)',
      accent: '#A48CFF',
      onAccent: '#14101f',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'nav', brand: 'IRONWOOD', brandTail: ' TKD', links: ['Programs', 'Schedule', 'Belt tests'], cta: 'Free trial class' },
          {
            kind: 'hero',
            eyebrow: 'ages 4 to adult · markham',
            title: ['Book the trial class', '{before you close the tab.}'],
            body: 'Pick an age group, pick a night, get a confirmation. No "call us for details," no three missed calls.',
            primary: 'Book a free trial',
            secondary: 'See the schedule',
            wash: 'accent',
          },
          {
            kind: 'cards',
            title: 'Programs',
            cols: 3,
            items: [
              { title: 'Little Tigers', meta: 'ages 4–6 · 30 min' },
              { title: 'Juniors', meta: 'ages 7–12 · 45 min' },
              { title: 'Teens & adults', meta: 'ages 13+ · 60 min' },
            ],
          },
          { kind: 'reviews', caption: 'Live Google rating and recent reviews, pulled from the business profile.' },
        ],
      },
      {
        id: 'schedule',
        label: 'schedule',
        blocks: [
          { kind: 'nav', brand: 'IRONWOOD', brandTail: ' TKD', links: ['Programs', 'Schedule', 'Belt tests'], cta: 'Free trial class' },
          {
            kind: 'rows',
            title: 'Weekly classes',
            note: 'one edit moves this everywhere it appears — never a PDF',
            items: [
              { label: 'Little Tigers', value: 'Tue & Thu · 4:30 pm', note: 'ages 4–6' },
              { label: 'Juniors', value: 'Mon, Wed, Fri · 5:30 pm', note: 'ages 7–12' },
              { label: 'Juniors (Saturday)', value: 'Sat · 9:30 am', note: 'ages 7–12' },
              { label: 'Teens & adults', value: 'Mon–Thu · 7:00 pm', note: 'ages 13+' },
              { label: 'Sparring squad', value: 'Sat · 11:00 am', note: 'green belt and up' },
            ],
          },
          {
            kind: 'rows',
            title: 'This term',
            items: [
              { label: 'Belt testing', value: 'Sat, Nov 22' },
              { label: 'Holiday closure', value: 'Dec 24 – Jan 2' },
              { label: 'Winter intake', value: 'Week of Jan 6' },
            ],
          },
        ],
      },
      {
        id: 'trial',
        label: 'trial',
        blocks: [
          { kind: 'nav', brand: 'IRONWOOD', brandTail: ' TKD', links: ['Programs', 'Schedule', 'Belt tests'], cta: 'Free trial class' },
          {
            kind: 'form',
            title: 'Book a free trial class',
            body: 'One sitting, one confirmation. Wear loose clothes; we lend the belt.',
            fields: [
              { label: "student's age", value: '8' },
              { label: 'program', value: 'Juniors · ages 7–12' },
              { label: 'class', value: 'Wednesday, 5:30 pm' },
              { label: 'parent name', value: 'S. Nakamura' },
              { label: 'email', value: 's.nakamura@example.com', wide: true },
            ],
            submit: 'Confirm the trial class',
            note: 'Confirmation by email now, reminder the day before. Nothing to pay.',
          },
        ],
      },
    ],
  },

  /* ── B2B & supply ─────────────────────────────────────────────── */
  supply: {
    business: 'Cedarline Systems',
    url: 'cedarlinesystems.ca',
    premise:
      'Spec sheets an architect can actually find at design stage, galleries sorted by building type, and one form that routes the architect and the estimator differently.',
    palette: {
      bg: '#f4f6f1',
      surface: '#ffffff',
      line: 'rgba(24,36,18,0.14)',
      text: '#1a2413',
      muted: 'rgba(26,36,19,0.62)',
      accent: '#5d8a2b',
      onAccent: '#ffffff',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'nav', brand: 'CEDARLINE', brandTail: ' SYSTEMS', links: ['Systems', 'Specs', 'Projects'], cta: 'Request pricing' },
          {
            kind: 'hero',
            eyebrow: 'vegetated roof assemblies · ontario & western quebec',
            title: ['Specified because', '{it was findable.}'],
            body: 'Assembly details, spec sheets, and install references — indexed the way an architect searches at design stage, not buried in a resources tab.',
            primary: 'Download spec sheets',
            secondary: 'See installed projects',
          },
          {
            kind: 'cards',
            title: 'Systems',
            cols: 3,
            items: [
              { title: 'CL‑200 Extensive', meta: '100 mm · 145 kg/m² saturated' },
              { title: 'CL‑400 Semi-intensive', meta: '200 mm · 290 kg/m² saturated' },
              { title: 'CL‑Blue Retention', meta: 'detention layer · 60 mm storage' },
            ],
          },
          { kind: 'stats', items: [{ value: '1.2M', label: 'ft² installed' }, { value: 'CSA A123', label: 'tested assemblies' }, { value: '20 yr', label: 'system warranty' }] },
        ],
      },
      {
        id: 'specs',
        label: 'specs',
        blocks: [
          { kind: 'nav', brand: 'CEDARLINE', brandTail: ' SYSTEMS', links: ['Systems', 'Specs', 'Projects'], cta: 'Request pricing' },
          {
            kind: 'rows',
            title: 'CL‑200 Extensive — documents',
            note: 'each document is its own indexable page, named the way it is searched',
            items: [
              { label: 'Assembly detail — parapet edge', value: 'PDF · DWG', note: 'rev C' },
              { label: 'Assembly detail — drain sump', value: 'PDF · DWG', note: 'rev C' },
              { label: 'Section 07 55 63 — guide spec', value: 'DOC', note: 'CSC format' },
              { label: 'Wind uplift test summary', value: 'PDF', note: 'CSA A123.21' },
              { label: 'Maintenance schedule', value: 'PDF', note: 'yr 1–5' },
            ],
          },
          {
            kind: 'rows',
            title: 'Performance',
            items: [
              { label: 'Saturated weight', value: '145 kg/m²' },
              { label: 'Water retention', value: '48%' },
              { label: 'Growth medium depth', value: '100 mm' },
              { label: 'Fire classification', value: 'Class A' },
            ],
          },
        ],
      },
      {
        id: 'contact',
        label: 'pricing',
        blocks: [
          { kind: 'nav', brand: 'CEDARLINE', brandTail: ' SYSTEMS', links: ['Systems', 'Specs', 'Projects'], cta: 'Request pricing' },
          {
            kind: 'form',
            title: 'Request pricing',
            body: 'Tell us who is writing and the request routes itself — specifiers to technical, tenders to sales.',
            fields: [
              { label: 'i am a', value: 'Estimator — general contractor' },
              { label: 'project', value: 'Secondary school addition' },
              { label: 'area', value: '1,850 m²' },
              { label: 'tender close', value: 'Nov 28' },
              { label: 'system under consideration', value: 'CL‑200 Extensive', wide: true },
            ],
            submit: 'Send to sales',
            note: 'Architects reach technical support instead, with details and guide spec attached.',
          },
        ],
      },
    ],
  },

  /* ── Retail ───────────────────────────────────────────────────── */
  retail: {
    business: 'Kept.',
    url: 'keptgoods.ca',
    premise:
      'Stock that matches the shelf, hours that win the open-now search, and a feed wired so a Reel becomes a visit instead of a DM asking if it is still in.',
    palette: {
      bg: '#faf6f2',
      surface: '#ffffff',
      line: 'rgba(34,26,30,0.12)',
      text: '#221a1e',
      muted: 'rgba(34,26,30,0.6)',
      accent: '#c2317b',
      onAccent: '#ffffff',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'band', text: 'open till 8 tonight · queen st e', cta: 'Directions' },
          { kind: 'nav', brand: 'Kept', brandTail: '.', links: ['Shop', 'New in', 'Visit'], cta: 'Shop all' },
          {
            kind: 'hero',
            eyebrow: 'small goods, kept well',
            title: ['What you see here', '{is on the shelf.}'],
            body: 'Stock updates the moment something sells. No driving over for a mug that went in March.',
            primary: 'Shop new arrivals',
            secondary: 'Visit the shop',
          },
          {
            kind: 'cards',
            title: 'New this week',
            note: 'stock synced to the till',
            cols: 3,
            items: [
              { title: 'Stoneware mug', meta: '$28 · 6 in stock', tone: '#e7d8c9' },
              { title: 'Field notebook', meta: '$14 · 12 in stock', tone: '#f0c9dc' },
              { title: 'Beeswax candle', meta: '$22 · 3 left', tone: '#d9e3d0' },
            ],
          },
        ],
      },
      {
        id: 'shop',
        label: 'shop',
        blocks: [
          { kind: 'nav', brand: 'Kept', brandTail: '.', links: ['Shop', 'New in', 'Visit'], cta: 'Shop all' },
          {
            kind: 'cards',
            title: 'Kitchen & table',
            cols: 3,
            items: [
              { title: 'Stoneware mug', meta: '$28 · in stock', tone: '#e7d8c9' },
              { title: 'Linen tea towel', meta: '$19 · in stock', tone: '#dfe4ea' },
              { title: 'Olive wood board', meta: '$54 · 2 left', tone: '#d8cdb6' },
              { title: 'Enamel jug', meta: '$36 · sold out', tone: '#e3e3e3', dim: true },
              { title: 'Brass spoon set', meta: '$32 · in stock', tone: '#ecdcc0' },
              { title: 'Ceramic bowl', meta: '$26 · in stock', tone: '#e0d3dd' },
            ],
          },
          {
            kind: 'rows',
            title: 'From the feed',
            note: 'every post links to the product it shows',
            items: [
              { label: '@keptgoods · Tuesday', value: 'Stoneware mug', note: 'restocked' },
              { label: '@keptgoods · Sunday', value: 'Olive wood board', note: '2 left' },
            ],
          },
        ],
      },
      {
        id: 'visit',
        label: 'visit',
        blocks: [
          { kind: 'nav', brand: 'Kept', brandTail: '.', links: ['Shop', 'New in', 'Visit'], cta: 'Shop all' },
          {
            kind: 'rows',
            title: 'Hours',
            note: 'one source · matches Google exactly',
            items: [
              { label: 'Monday – Wednesday', value: '10 – 6' },
              { label: 'Thursday – Friday', value: '10 – 8' },
              { label: 'Saturday', value: '10 – 6' },
              { label: 'Sunday', value: '12 – 5' },
              { label: 'Holiday hours', value: 'Dec 24 · 10 – 3' },
            ],
          },
          { kind: 'reviews', caption: 'Live Google rating and recent reviews, pulled from the business profile.' },
        ],
      },
    ],
  },

  /* ── Services & transport ─────────────────────────────────────── */
  transport: {
    business: 'Northside Care Rides',
    url: 'northsidecarerides.ca',
    premise:
      'The pages a family reads before they trust you with their mother — accessibility, screening, door-through-door — and a ride request dispatch can actually use.',
    palette: {
      bg: '#f2f7f6',
      surface: '#ffffff',
      line: 'rgba(12,42,39,0.14)',
      text: '#0c2a27',
      muted: 'rgba(12,42,39,0.70)',
      accent: '#12796d',
      onAccent: '#ffffff',
    },
    pages: [
      {
        id: 'home',
        label: 'home',
        blocks: [
          { kind: 'nav', brand: 'NORTHSIDE', brandTail: ' CARE RIDES', links: ['Services', 'Our drivers', 'Coverage'], cta: 'Request a ride' },
          {
            kind: 'hero',
            eyebrow: 'wheelchair-accessible · gta & york region',
            title: ['Door through door.', '{Not curb to curb.}'],
            body: 'Screened drivers, accessible vans, and someone who walks your parent from the front door to the seat — and from the seat into the appointment.',
            primary: 'Request a ride',
            secondary: 'Meet the drivers',
          },
          {
            kind: 'cards',
            title: 'What families ask first',
            cols: 3,
            items: [
              { title: 'Accessibility', meta: 'ramp vans · 400 kg lift' },
              { title: 'Driver screening', meta: 'vulnerable sector checked' },
              { title: 'Insurance', meta: '$5M commercial liability' },
            ],
          },
          { kind: 'reviews', caption: 'Live Google rating and recent reviews, pulled from the business profile.' },
        ],
      },
      {
        id: 'services',
        label: 'services',
        blocks: [
          { kind: 'nav', brand: 'NORTHSIDE', brandTail: ' CARE RIDES', links: ['Services', 'Our drivers', 'Coverage'], cta: 'Request a ride' },
          {
            kind: 'rows',
            title: 'Rides we run',
            note: 'standing orders billed monthly',
            items: [
              { label: 'Dialysis — standing order', value: '3×/week', note: 'same driver where possible' },
              { label: 'Hospital discharge', value: 'same day', note: 'often within 2 hrs' },
              { label: 'Specialist appointments', value: 'scheduled', note: 'driver waits up to 90 min' },
              { label: 'Long-term care transfers', value: 'scheduled' },
              { label: 'Family events', value: 'by quote' },
            ],
          },
          {
            kind: 'rows',
            title: 'Coverage',
            note: 'city by city — wrong-area calls stop tying up the line',
            items: [
              { label: 'Toronto · North York · Scarborough', value: 'daily' },
              { label: 'Markham · Richmond Hill · Vaughan', value: 'daily' },
              { label: 'Newmarket · Aurora', value: 'by arrangement' },
            ],
          },
        ],
      },
      {
        id: 'request',
        label: 'request',
        blocks: [
          { kind: 'nav', brand: 'NORTHSIDE', brandTail: ' CARE RIDES', links: ['Services', 'Our drivers', 'Coverage'], cta: 'Request a ride' },
          {
            kind: 'form',
            title: 'Request a ride',
            body: 'Everything dispatch needs, captured once — so they confirm the ride instead of transcribing it off a voicemail.',
            fields: [
              { label: 'pickup', value: 'Bayview Retirement Residence, Markham' },
              { label: 'destination', value: 'Sunnybrook — Odette Centre' },
              { label: 'appointment time', value: 'Thu Nov 20, 10:15 am' },
              { label: 'mobility needs', value: 'Wheelchair · ramp van' },
              { label: 'return trip', value: 'Yes — driver waits' },
              { label: 'who to call', value: 'Daughter · (647) 555‑0192' },
            ],
            submit: 'Send to dispatch',
            note: 'After-hours requests land in the inbox, not voicemail. Confirmation by text.',
          },
        ],
      },
    ],
  },
};

export const getMockup = (slug: string): IndustryMockup | undefined =>
  industryMockups[slug];
