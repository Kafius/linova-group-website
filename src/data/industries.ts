// The verticals — single source of truth for the hero cycle, /industries,
// the hero cycling slot, and /industries/[slug]. Order = the hero cycle order.
// Accents are display/graphic use on navy only (all verified >=4.5:1); see
// the accent quarantine law in the design plan.

export interface IndustryApproach {
  title: string;
  detail: string;
}

export interface IndustryAngle {
  channel: string;
  angle: string;
}

export interface Industry {
  slug: string;
  name: string;
  /** the word shown in the homepage cycling slot */
  cycleWord: string;
  /** singular attributive form for the act-2 sentence: "A <railWord> site is
   *  not a <railWord> site." Not derivable from cycleWord — "cleaners" has to
   *  become "janitorial" there, because "a cleaner site" reads as tidier. */
  railWord: string;
  /** the group this vertical files under on /industries (industryCategories) */
  category: string;
  /** the specific business types this playbook is written for — the layer a
   *  visitor scans to find themselves ("I'm a plumber", "I run a dojo").
   *  Who it's for, never a claim of work already done. */
  covers: string[];
  /** the pain, in their language — display size */
  headline: string;
  /** what's broken about how this vertical shows up online */
  problem: string;
  /** what Linova does differently for them */
  approach: IndustryApproach[];
  /** vertical-specific marketing plays — never interchangeable */
  marketingAngles: IndustryAngle[];
  proof?: {
    client: string;
    url: string;
    /** real, verified result only — never invented */
    result?: string;
  };
  /** 'concept' = spec work, labeled honestly; no client yet */
  status: 'live' | 'concept';
  /** for concept verticals: the honest pitch for the speculative piece */
  conceptPitch?: string;
  /** the visual signature for this vertical (motif id in src/lib/motifs) */
  motif: string;
  /** hex — theme color for this vertical's panel */
  accent: string;
  accentName: string;
  /** Hero photo art direction. The image itself lives at
   *  src/assets/industries/<slug>.(jpg|png|webp|avif); until one is dropped
   *  there, IndustryPhoto renders `subject` as an on-screen placeholder. */
  heroPhoto: { subject: string; alt: string };
  seo: { title: string; description: string };
}

export const industries: Industry[] = [
  {
    slug: 'barbershops',
    name: 'Barbershops & salons',
    cycleWord: 'barbershops',
    railWord: 'barbershop',
    category: 'personal',
    covers: [
      'barbershop',
      'hair salon',
      'nail salon',
      'lashes & brows',
      'esthetics & spa',
      'tattoo studio'
    ],
    headline: 'Your work is on Instagram. Your bookings aren\'t.',
    problem: 'A shop\'s real portfolio is its Instagram grid — but the path from a Reel to a booked chair runs through DMs, and DMs are where bookings die. The website, if there is one, is a template with stale hours and a stock photo of scissors, and it does nothing about the no-shows eating chair time. Meanwhile the walk-in standing outside at 6pm is reading your Google reviews, not your feed.',
    approach: [
      {
        title: 'Booking one tap from the bio',
        detail: 'The link in your bio goes straight to picking a barber, a service, and a slot — no "you free Saturday?" DMs. We wire the site into the booking tool that already holds your book, whether that\'s Booksy, Square Appointments, or Fresha.'
      },
      {
        title: 'No-shows pay something',
        detail: 'Deposits and reminder windows configured into the booking flow, so an empty chair at 2pm costs the client who ghosted — not the barber sitting in it.'
      },
      {
        title: 'A page per chair',
        detail: 'Clients follow barbers, not shops. Each barber gets their own page — their cuts, their book, their Instagram — so a new client lands on the person who\'ll actually hold the clippers.'
      },
      {
        title: 'Reviews aimed at the walk-in',
        detail: 'Google Business Profile set up and kept current: hours accurate to the minute, photos of fresh cuts, a review ask at the station. "Barber near me" at 6pm is decided by stars, not by your grid.'
      },
      {
        title: 'The site looks like the feed',
        detail: 'Big photos of real cuts from your chairs, not stock scissors. If the grid is the portfolio, the site should read like its best nine posts.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Instagram Reels',
        angle: 'The transformation cut is the native format: chair-side, before to after, trending audio, booking link one tap away. Post from the barber\'s account, not just the shop\'s — clients book a person, and a barber\'s Reel travels further than a shop page ever does.'
      },
      {
        channel: 'Booking flow',
        angle: 'Count the taps from Reel to booked slot — every extra one, and every "DM to book," is a lead going cold while you\'re mid-fade. Live slots per barber behind the bio link, deposits on, and the DM becomes the fallback instead of the front door.'
      },
      {
        channel: 'Google Business Profile',
        angle: 'Walk-ins read stars before they read the grid. Fresh-cut photos uploaded weekly, hours that match the door, and a QR at the station that asks for the review while the client is still checking the fade in the mirror.'
      },
      {
        channel: 'SMS rebooking',
        angle: 'A fade grows out on a clock. Rebook nudges timed to the grow-out — landing before the client starts scrolling for whoever posted a Reel last night — keep the book full of regulars instead of gambling on walk-ins.'
      }
    ],
    status: 'concept',
    conceptPitch: 'No shop on the roster yet — so we built one on spec. It\'s a complete concept piece: a shop site with a page per barber, a Reels-style cut gallery, and a booking flow you can tap through end to end. If you run chairs, book a call and measure it against what you have now.',
    motif: 'pole-helix',
    accent: '#3EC1E8',
    accentName: 'Barbicide Cyan',
    heroPhoto: {
      subject:
        'A fade in progress, shot close over the barber\'s shoulder — clippers in the hand, the client\'s face only in the mirror. Real chair, real shop, no stock scissors.',
      alt: 'A barber using clippers on a client seated in the chair under a patterned cape'
    },
    seo: {
      title: 'Barbershop websites that fill chairs | The Linova Group',
      description: 'Websites for barbershops and salons: booking straight from a Reel, a book per barber, and Google reviews that win the walk-in. Built in the GTA.'
    }
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    cycleWord: 'restaurants',
    railWord: 'restaurant',
    category: 'food',
    covers: [
      'dine-in',
      'takeout & delivery',
      'café',
      'bakery',
      'bubble tea',
      'caterer'
    ],
    headline: 'Your menu is a PDF and Google is your homepage',
    problem: 'Most restaurant sites lose the sale before the kitchen gets a chance. The menu is a PDF that fights every phone screen, the hours on Google are wrong, and the photos doing the actual selling are whatever customers uploaded to Maps. Meanwhile the delivery apps own the online order and the margin that goes with it. You already do the hard part every service — the website just has to stop losing you tables.',
    approach: [
      {
        title: 'Menus built as real pages',
        detail: 'Every dish lives as typed data and renders as fast, readable HTML — no pinch-zooming a PDF to find the specials. Change a price or 86 a dish and the site is updated before the dinner rush.'
      },
      {
        title: 'Photos that do the selling',
        detail: 'Full-bleed food photography, compressed to load fast on cell data in a lineup. If customers\' Maps uploads look better than your own site, the site is costing you covers.'
      },
      {
        title: 'Direct orders ahead of the apps',
        detail: 'Reserve, order, call, directions — the four things a hungry visitor does — sit one tap from the top. Where you take direct orders, the third-party links become the fallback, not the default, so the app\'s cut stays off more of your tickets.'
      },
      {
        title: 'Maps treated as the front door',
        detail: 'Hours, menu link, photos, and review replies kept consistent with the site, because plenty of diners decide from the Maps pane without ever tapping through. This is how we built it for Bikong and Macao Imperial Tea London.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Instagram Reels',
        angle: 'Food is the one product that sells itself on video — the pour, the sizzle, the cheese pull. Our creative team plans Reels around your actual menu and posts them when people are deciding where to eat, not whenever it\'s convenient to film.'
      },
      {
        channel: 'Google Business Profile',
        angle: 'Wrong hours on a long weekend cost real covers. We keep hours, menu links, photos, and review replies current so the profile sells as hard as the site does — and the one-star reviews get answered instead of festering.'
      },
      {
        channel: 'Geo-targeted Meta ads',
        angle: 'A restaurant\'s market is a delivery radius, not a region. We run paid social inside that radius — a signature dish, a holiday menu, a slow-night special — pointed at a landing page that repeats the offer instead of dumping people on the homepage.'
      },
      {
        channel: 'Facebook community groups',
        angle: 'Word of mouth for a new spot travels through neighbourhood and diaspora food groups — it\'s where Filipino restaurants like Bikong get talked about in the GTA. We post where your community already talks about food.'
      }
    ],
    proof: {
      client: 'Bikong',
      url: 'https://bikong.ca'
    },
    status: 'live',
    motif: 'floor-plan-tops',
    accent: '#FF5A4E',
    accentName: 'Chili Crimson',
    heroPhoto: {
      subject:
        'The pass at service: a plate going up under the heat lamp, a server\'s hands reaching in. Steam and a little motion blur are the point — this is the room at 7:30pm, not a styled flat-lay.',
      alt: 'A chef plating a row of dishes along a stainless steel pass in a restaurant kitchen'
    },
    seo: {
      title: 'Restaurant website design & marketing | The Linova Group',
      description: 'Restaurant websites and marketing from The Linova Group: readable phone menus, direct orders ahead of app commissions, and food-first creative.'
    }
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    cycleWord: 'contractors',
    railWord: 'contractor',
    category: 'trades',
    covers: [
      'interlock & landscaping',
      'decks & fencing',
      'kitchen & bath reno',
      'basement finishing',
      'roofing & exteriors',
      'HVAC, electrical & plumbing'
    ],
    headline: 'Your best work is trapped in your camera roll',
    problem: 'A homeowner getting three bids checks three websites before a single callback happens. Most contractor sites give them a logo, a stock handshake, and a form that goes nowhere — while the real proof, the before-and-afters from every finished job, sits on a phone. So the comparison collapses to price, and the cheapest bid wins. Word of mouth got you this far, but it only travels as far as your last client\'s street.',
    approach: [
      {
        title: 'Proof built from your camera roll',
        detail: 'We turn the photos already on your phone into project pages a homeowner can weigh a bid against — before, after, scope, neighbourhood. Send new jobs from the truck; we keep the gallery current.'
      },
      {
        title: 'Quote requests that qualify themselves',
        detail: 'The form asks what your estimator would: project type, rough budget, timeline, address. You stop driving across town to price jobs that were never real, and the serious requests stand out the moment they land.'
      },
      {
        title: 'Found where homeowners actually search',
        detail: 'Service-area pages and a tuned Google Business Profile, so \'deck builder Vaughan\' or \'basement reno Markham\' surfaces you — not just the franchise with the ad budget.'
      },
      {
        title: 'Built for the evening phone scroll',
        detail: 'Homeowners research contractors on their phone, usually at night. Every page loads fast on mobile and keeps tap-to-call and the quote form within one thumb move.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Google Business Profile',
        angle: 'Every finished job becomes a photo post with the city named, and the review ask goes out at the final walkthrough while the homeowner is still thrilled. That is how you hold a spot in the map pack when a neighbour searches \'kitchen reno near me\'.'
      },
      {
        channel: 'Instagram Reels & Facebook',
        angle: 'Demo-day clips, framing timelapses, and before/after swipes cut from footage your crew already shoots. Homeowners follow a reno account for months before they ever request a quote — the account they follow should be yours.'
      },
      {
        channel: 'Seasonal lead campaigns',
        angle: 'Deck and exterior ads go live in late winter while homeowners are planning and competitors are quiet; interiors get the push in fall. The goal is a calendar booked before the season opens, not a scramble in the middle of it.'
      },
      {
        channel: 'Post-job email',
        angle: 'A short sequence after the final walkthrough: the review ask, then the referral ask. It is the word of mouth that built your business, with a system behind it — so it stops depending on who your last client happens to run into.'
      }
    ],
    proof: {
      client: 'Cherry Grove Group',
      url: 'https://www.cherrygrovegroup.com'
    },
    status: 'live',
    motif: 'dimension-lines',
    accent: '#FFD426',
    accentName: 'Hi-Vis Yellow',
    heroPhoto: {
      subject:
        'Mid-build, never the finished reveal: a crew framing a deck, tape measure extended, sawdust in raking afternoon light. The work in progress is the credential.',
      alt: 'Gloved hands driving a cordless drill into timber on a job site'
    },
    seo: {
      title: 'Contractor websites & marketing | The Linova Group',
      description: 'Websites and marketing for contractors. Turn finished jobs into proof, quote requests into booked work, and slow seasons into a pipeline. Book a call.'
    }
  },
  {
    slug: 'schools',
    name: 'Schools & instruction',
    cycleWord: 'dojos',
    railWord: 'dojo',
    category: 'personal',
    covers: [
      'martial arts & dojos',
      'music lessons',
      'dance studios',
      'tutoring & test prep',
      'swim & sports',
      'summer camps'
    ],
    headline: 'Parents pick your school before they ever walk in',
    problem: 'A parent researching taekwondo or piano lessons does it at night, on a phone, comparing three schools at once. Most school sites can\'t answer the three things that parent needs — what ages, which class times, how to try it — and the schedule is a PDF from last term. The trial class, the thing that actually fills a program, sits behind "call us for details." Whoever lets that parent book tonight wins the student.',
    approach: [
      {
        title: 'Trial bookings, not phone tag',
        detail: 'The trial class is a booking the parent completes in one sitting — pick a class, get a confirmation — instead of a contact form that turns into three missed calls.'
      },
      {
        title: 'A schedule you edit in one place',
        detail: 'Class times live as structured data, not a PDF. When the Tuesday 6pm class moves, one edit updates every page that mentions it.'
      },
      {
        title: 'Pages that answer the parent',
        detail: 'Ages, programs, what the first class actually looks like, what to wear, what it costs to start. The questions get answered on the page so the front desk stops repeating them.'
      },
      {
        title: 'Built around enrolment seasons',
        detail: 'September intake, January restarts, summer camp — the site swaps its offer by season instead of advertising "sign up any time" year-round.'
      },
      {
        title: 'A site for current families too',
        detail: 'Belt test dates, recital details, holiday closures — posted where parents already look, so retention isn\'t running through a group chat.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Instagram Reels',
        angle: 'Belt tests, board breaks, recital performances — the visible progress parents are paying for. Instructors film in class, the team cuts the clips, and every post ends at the trial-class link.'
      },
      {
        channel: 'Google Business Profile',
        angle: '"Taekwondo near me" and "piano lessons Markham" are parent searches with intent. Current hours, real class photos, and review asks timed to belt tests — the moment parents are proudest — keep the profile converting.'
      },
      {
        channel: 'Meta ads on the enrolment calendar',
        angle: 'Ads run when parents decide: late August, the first week of January, and June for camps. Each campaign lands on a page that matches the ad and ends in a trial booking, not a homepage.'
      },
      {
        channel: 'Email to current families',
        angle: 'Belt test reminders, recital dates, and bring-a-friend weeks. The easiest student to enrol is a sibling or a classmate\'s friend, and the parents who refer them are already on the list.'
      }
    ],
    proof: {
      client: 'Markham Taekwondo Academy',
      url: 'https://www.markhamtaekwondo.com'
    },
    status: 'live',
    motif: 'strike-arc',
    accent: '#A48CFF',
    accentName: 'Belt Purple',
    heroPhoto: {
      subject:
        'A class mid-drill shot from the back of the mat — a row of students holding a stance, the instructor\'s hand correcting one of them. Get written consent for any minor who is identifiable, or shoot the adult class.',
      alt: 'Students in white gi moving through a drill on the red mats of a dojo'
    },
    seo: {
      title: 'Websites for dojos, academies & music schools | Linova',
      description: 'Websites for dojos and music schools that book trial classes, keep schedules current, and fill enrolment seasons. Built for Markham Taekwondo Academy.'
    }
  },
  {
    slug: 'supply',
    name: 'B2B & supply',
    cycleWord: 'roofing suppliers',
    railWord: 'roofing supplier',
    category: 'shops',
    covers: [
      'building products',
      'roofing & envelope',
      'landscape supply',
      'industrial distribution',
      'manufacturers’ reps',
      'wholesale trade'
    ],
    headline: 'Architects specify what they can find',
    problem: 'Most supplier sites are brochures aimed at nobody in particular. The architect at design stage needs assembly details and spec sheets; the estimator at tender needs lead times and a pricing contact; both get a hero image and a generic contact form instead. Then homeowner one-offs land in the same inbox as live RFQs, and sales sorts them by hand.',
    approach: [
      {
        title: 'Spec sheets architects can find',
        detail: 'Every system gets its own indexable page with downloadable spec sheets and detail drawings — named and structured the way an architect searches, not buried three clicks deep in a resources tab.'
      },
      {
        title: 'Project galleries sorted by building',
        detail: 'Completed installs organized by building type and region, because an estimator pricing a school wants to see your system on a school, not a stock photo of a roof.'
      },
      {
        title: 'Forms that qualify the lead',
        detail: 'The inquiry form asks who is writing — architect, estimator, contractor, property manager — and routes each one differently. Sales stops sorting homeowner emails out of the RFQ pipeline.'
      },
      {
        title: 'Territory built into the site',
        detail: 'Coverage stated plainly on the page, so an out-of-territory inquiry reaches the right distributor instead of stalling in an inbox for a week.'
      },
      {
        title: 'Content for the long cycle',
        detail: 'A spec download often happens months before the RFQ. We build the resource library and the follow-up that keep your system in the project file until it prices.'
      }
    ],
    marketingAngles: [
      {
        channel: 'spec-sheet SEO',
        angle: 'Rank the documents, not the homepage. Architects search assembly names and detail terms at design stage, so each spec page is built to be the landing page for exactly one of those searches.'
      },
      {
        channel: 'LinkedIn',
        angle: 'Project-completion posts that tag the architect, landscape architect, and GC on the job. The audience that matters is a short list of specifiers in your territory, and they all see whose project you just delivered.'
      },
      {
        channel: 'email nurture',
        angle: 'A spec download can sit months ahead of the tender. Downloads feed a sequence paced to project stages — detail drawings, install references, maintenance docs — so you are still in the file when the estimator starts pricing.'
      },
      {
        channel: 'display retargeting',
        angle: 'Long cycles make retargeting cheap: the audience is small and already qualified. Keep the system name in front of spec and gallery visitors through the gap between design and tender.'
      }
    ],
    proof: {
      client: 'LiveRoof Ontario',
      url: 'https://www.liveroofontario.ca'
    },
    status: 'live',
    motif: 'pitch-triangle',
    accent: '#8FBF4D',
    accentName: 'Sedum Green',
    heroPhoto: {
      subject:
        'The yard at 6:30am, not the boardroom: shingle bundles on a forklift, a contractor loading a pickup at the will-call counter. Buyers here recognise their own morning.',
      alt: 'A forklift parked in front of racking stacked with timber in a supply warehouse'
    },
    seo: {
      title: 'Web design for building product suppliers | The Linova Group',
      description: 'Spec-sheet pages architects can find, project galleries that prove the install, and forms that qualify the lead. Built for suppliers on long sales cycles.'
    }
  },
  {
    slug: 'retail',
    name: 'Retail',
    cycleWord: 'retail',
    railWord: 'retail',
    category: 'shops',
    covers: [
      'boutique & apparel',
      'gift & home',
      'records & hobby',
      'specialty grocery',
      'pet supply',
      'furniture & decor'
    ],
    headline: 'Your window display works harder than your website',
    problem: 'Shoppers check the phone before they cross the street. If your hours are wrong on Google, they don\'t come in — they go to whoever shows up under "open now". Meanwhile the real shop window is your Instagram, and the website behind it still lists stock that sold out in March. Foot traffic didn\'t die; it just starts online now.',
    approach: [
      {
        title: 'Stock that stays true',
        detail: 'Product pages driven by one typed data file, so what\'s online matches what\'s on the shelf. Marking an item sold out is an edit you make yourself — not an email to a web guy that gets answered next week.'
      },
      {
        title: 'Win the open-now search',
        detail: 'Google Business Profile kept current, hours consistent everywhere they appear, and LocalBusiness and Product structured data on every page — so "near me" searches surface your shop with the right hours and directions.'
      },
      {
        title: 'Instagram wired to the shelf',
        detail: 'Your feed is the window; the site is the counter. Every post links to the product it shows, so a Reel that lands becomes a visit instead of an unanswered DM asking "is this still in stock?"'
      },
      {
        title: 'Seasonal turns, planned ahead',
        detail: 'Gift guides, holiday pages, and Boxing Day markdowns built before the rush, not during it. The build system makes a seasonal refresh a small job, so the site changes as often as the front window does.'
      },
      {
        title: 'Fast on a sidewalk phone',
        detail: 'Static pages that load fast on mobile data — because the person checking your hours is standing on the sidewalk deciding whether to walk in.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Instagram Reels',
        angle: 'New-arrival drops and behind-the-counter content on a posting rhythm a small shop can actually sustain — produced by our marketing team, with every post pointing at the exact product page it shows, not just a link in bio.'
      },
      {
        channel: 'Google Business Profile',
        angle: 'Weekly product posts, fresh photos, review replies, and hours that never go stale — because for a shop, ranking in the map pack for "open now" beats ranking anywhere else.'
      },
      {
        channel: 'Product-page SEO',
        angle: 'Category and product pages written the way people search — "vinyl records markham", not "curated audio experiences" — with Product schema so your shelf shows up when someone nearby wants exactly what\'s on it.'
      },
      {
        channel: 'Seasonal email',
        angle: 'A calendar worked backward from Q4: gift guides and Boxing Day previews sent to your list before the rush, so December customers hear from you in November — not from a big-box flyer.'
      }
    ],
    status: 'concept',
    conceptPitch: 'We haven\'t taken on a retail client yet — so we designed the shop we\'d want to walk past. This is spec work, labeled as such: a concept storefront showing product pages that track the shelf, hours managed in one place, and an Instagram feed wired into the site. If you run a shop, it\'s a preview of yours — book a call and we\'ll walk through it.',
    motif: 'barcode-stack',
    accent: '#F45FAD',
    accentName: 'Label Pink',
    heroPhoto: {
      subject:
        'Hands at the counter — a wrapped item passing across it, shelves falling soft behind. Alternative: the shopfront at dusk with the lights on and someone visible inside.',
      alt: 'A shopper browsing a densely packed clothing rack in a dimly lit store'
    },
    seo: {
      title: 'Retail website design & marketing | The Linova Group',
      description: 'Websites and marketing for retail shops: stock that\'s right online, open-now searches that find you, and an Instagram that sends people in the door.'
    }
  },
  {
    slug: 'transport',
    name: 'Services & transport',
    cycleWord: 'transport',
    railWord: 'transport',
    category: 'vehicles',
    covers: [
      'medical & accessible transport',
      'courier & delivery',
      'moving & removals',
      'towing & roadside',
      'shuttle & charter',
      'last-mile logistics'
    ],
    headline: 'Families vet you before they ever call dispatch',
    problem: 'Most transport sites are a phone number, a stock photo of a van, and the word "reliable." Nothing answers what a family actually asks before trusting you with their mother: is the van wheelchair-accessible, are the drivers screened, will someone help her from the front door to the seat. So those questions get asked on the booking line instead — mid-route, while dispatch is working the board — or they never get asked, because the competitor\'s site answered them first.',
    approach: [
      {
        title: 'Pages families actually read',
        detail: 'Insurance, driver screening, and vehicle accessibility each get a plain-language page. The person booking for a parent reads those before they dial — that page is what closes the ride.'
      },
      {
        title: 'Booking requests dispatch can use',
        detail: 'A ride-request form that captures pickup, destination, appointment time, and mobility needs — so dispatch confirms rides instead of transcribing them, and after-hours requests land in an inbox instead of voicemail.'
      },
      {
        title: 'Drivers and vans, shown',
        detail: 'Real drivers and real vehicles, named and photographed. Someone choosing who drives their father wants a face and a clean van, not stock photography of a fleet you don\'t own.'
      },
      {
        title: 'Coverage spelled out',
        detail: 'Service area listed city by city, alongside the runs you actually do — hospital discharges, dialysis schedules, standing orders — so wrong-area calls stop tying up the line and the right ones start.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Google Business Profile',
        angle: 'The search happens at a discharge desk: "wheelchair transportation near me," needed today. A complete profile with real vehicle photos, accessible-transport categories, and a review ask built into post-ride follow-up is what wins that moment.'
      },
      {
        channel: 'service-area SEO',
        angle: 'City and route pages that name the hospitals, dialysis clinics, and long-term-care homes you serve — because discharge planners and case workers search by institution and city, not by "transport company."'
      },
      {
        channel: 'care-facility referral kits',
        angle: 'Steady volume comes from discharge planners, clinic coordinators, and retirement homes, not one-off riders. A printable rate sheet, a direct booking line, and a page they can hand to families turns each contact into a standing referral channel.'
      },
      {
        channel: 'Facebook',
        angle: 'The person booking is often the rider\'s adult child, and that\'s who is on Facebook. Posts showing real drivers, real vans, and door-through-door care get shared into local caregiver groups — the referral that costs nothing.'
      }
    ],
    proof: {
      client: 'EasyCare Trans',
      url: 'https://www.ecaretransinc.com'
    },
    status: 'live',
    motif: 'route-polyline',
    accent: '#23C9B6',
    accentName: 'Route Teal',
    heroPhoto: {
      subject:
        'The moment of arrival, not the highway: a van at the curb, side door open, driver stepping out with a handheld scanner. Branded vehicle if you have one.',
      alt: 'A driver loading parcels into the open back of a box truck at the curb'
    },
    seo: {
      title: 'Web design for transport & medical ride services | Linova',
      description: 'Websites for medical and accessible transport companies: pages families read, booking forms dispatch can use, local search that fills routes.'
    }
  },
  {
    slug: 'cleaning',
    name: 'Janitorial & cleaning',
    cycleWord: 'cleaners',
    railWord: 'janitorial',
    category: 'trades',
    covers: [
      'office & commercial janitorial',
      'residential & recurring',
      'post-construction clean-up',
      'window & pressure washing',
      'carpet & floor care',
      'move-in / move-out'
    ],
    headline: 'Two businesses, one uniform — and a site that serves neither.',
    problem: 'Cleaning gets sold two completely different ways. A homeowner searches at 9pm and books whoever shows a price and an open slot. A facilities manager builds a shortlist from insurance certificates, the square footage you have actually handled, and whether your crew works after the building empties. Most cleaning sites answer neither: a gloved hand on a stock photo, a list of adjectives, and a contact form nobody watches on a Sunday.',
    approach: [
      {
        title: 'A quote before the phone call',
        detail: 'Square footage for commercial, bedrooms and bathrooms for residential, and a real number at the end of it. The quote request that takes three days to answer is the one that loses to the company that answered in an hour.'
      },
      {
        title: 'The paperwork a shortlist needs',
        detail: 'WSIB clearance, liability coverage, bonding, and police checks on the page as documents a property manager can forward — not a line saying "fully insured" that they have to take on faith.'
      },
      {
        title: 'Two front doors',
        detail: 'Commercial and residential split from the first click, with their own pages, their own proof, and their own pricing logic. A homeowner should never land in an RFP, and a facilities manager should never land in a bedroom count.'
      },
      {
        title: 'Recurring is the whole business',
        detail: 'The site sells the plan, not the one-off: weekly or biweekly, card on file, skip or reschedule without a phone call. The one-time clean is the trial, not the product.'
      },
      {
        title: 'Proof that survives the walkthrough',
        detail: 'Before-and-afters of real jobs, the scope checklist you actually work to, and your crew in your own uniform — so the trust is built before anyone unlocks a door for you.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Google Business Profile',
        angle: 'Cleaning is a map-pack decision. Service-area polygons that match where your crews actually go, hours that include the evening calls, and enough review velocity to sit above the franchise that bought the ads.'
      },
      {
        channel: 'Commercial outbound',
        angle: 'Property managers and facilities leads don\'t search — they get pitched and keep a folder. A one-page capability sheet hosted on the site, sent by email and LinkedIn, is the asset that lands in that folder.'
      },
      {
        channel: 'Suburb landing pages',
        angle: '"Biweekly house cleaning in [suburb]" is a page, not a keyword you sprinkle. One per area you genuinely serve, with the drive time and the crew that covers it, beats one page listing thirty cities.'
      },
      {
        channel: 'SMS review timing',
        angle: 'The ask goes out while the client is standing in a spotless kitchen, not three days later. That single change in timing is most of the difference in review volume.'
      }
    ],
    status: 'concept',
    motif: 'squeegee-sweep',
    accent: '#d6e84f',
    accentName: 'Citrus Lime',
    heroPhoto: {
      subject:
        'A cleaner mid-job in a real space — mop or microfibre in hand, cart in frame, light coming off a wet floor. Uniformed and working, not posed with a spray bottle.',
      alt: 'A cleaner pushing a mop and bucket along the outside of a glass office building'
    },
    seo: {
      title: 'Cleaning company websites | The Linova Group',
      description: 'Cleaning company websites that quote before the phone rings: commercial and residential split properly, insurance and bonding up front.'
    }
  },
  {
    slug: 'clinic',
    name: 'Clinics & practices',
    cycleWord: 'clinics',
    railWord: 'clinic',
    category: 'health',
    covers: [
      'physiotherapy',
      'chiropractic',
      'massage therapy',
      'dental',
      'optometry',
      'counselling & mental health'
    ],
    headline: 'They picked a clinic while your phone was still ringing.',
    problem: 'Patients don\'t call around any more. They search a symptom, read the reviews, check whether you direct-bill, and book whoever has a slot this week. A clinic that takes bookings by phone during business hours is invisible to every one of those decisions. And because college advertising rules punish overclaiming, most clinic sites overcorrect into saying nothing at all — an hours table, a fax number, and a stock photo of a stethoscope.',
    approach: [
      {
        title: 'Booking wired to the real schedule',
        detail: 'Online booking that writes into the practice management software you already run — Jane, Juvonno, whatever holds the day — instead of a form that becomes a callback and then a voicemail.'
      },
      {
        title: 'Pages for what you treat, not what you are',
        detail: 'Nobody searches "multidisciplinary clinic." They search plantar fasciitis, TMJ, a torn rotator cuff. Every condition you actually treat gets a page in plain language, which is also the only SEO that works in health.'
      },
      {
        title: 'Billing answered before the call',
        detail: 'Direct billing, which insurers, what a first visit costs, whether a referral is needed. Your receptionist answers these forty times a day; putting them on the page gives that time back.'
      },
      {
        title: 'Copy that stays inside the rules',
        detail: 'Claims written to your college\'s advertising standards — no outcome promises, no testimonials where they are prohibited, no superlatives that invite a complaint. Careful doesn\'t have to mean empty.'
      },
      {
        title: 'Practitioners people can choose',
        detail: 'Credentials, languages spoken, and what the first appointment actually involves. Patients pick a person, and a nervous patient picks the one whose page told them what would happen.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Condition and city search',
        angle: 'The traffic that converts is "physiotherapy for sciatica [city]," not "clinic near me." That is won with one honest page per condition, not a services list.'
      },
      {
        channel: 'Google Business Profile',
        angle: 'A booking link on the profile, photos of the real reception and treatment rooms, and review replies written so they never confirm that a particular person was a patient.'
      },
      {
        channel: 'Intake before arrival',
        angle: 'Forms sent with the confirmation so the first fifteen minutes are treatment instead of a clipboard. It reads as competence and it buys back schedule.'
      },
      {
        channel: 'Referral loop with adjacent providers',
        angle: 'Family doctors, massage therapists, chiros, and trainers refer to whoever they can describe in one sentence. Give them the page that does the describing.'
      }
    ],
    status: 'concept',
    motif: 'pulse-cross',
    accent: '#3fe08d',
    accentName: 'Scrubs Green',
    heroPhoto: {
      subject:
        'A clinician with a patient in a real treatment room — hands-on, mid-assessment, the room readable behind them. No stethoscope-on-white stock, and nobody identifiable as a real patient.',
      alt: 'A therapist assessing a patient\'s knee during a treatment session'
    },
    seo: {
      title: 'Clinic websites that fill the schedule | The Linova Group',
      description: 'Websites for clinics: booking wired to the software you already run, a page per condition you treat, and copy that stays inside the rules.'
    }
  },
  {
    slug: 'herbal',
    name: 'Herbal & natural health',
    cycleWord: 'herbalists',
    railWord: 'herbalist',
    category: 'health',
    covers: [
      'herbal dispensary',
      'TCM & acupuncture',
      'supplements & vitamins',
      'apothecary',
      'practitioner wholesale',
      'natural skincare'
    ],
    headline: 'The person behind the counter is the product. No website has ever hired them.',
    problem: 'What sells a tincture is ten minutes with someone who knows what it is for, how much to take, and what not to mix it with. Online that conversation disappears and you are left with a grid of bottles. The category is fenced in from both sides too: Health Canada governs what a licensed product may claim, and the ad platforms restrict natural health hard enough that paid traffic is never a plan you can rely on.',
    approach: [
      {
        title: 'Claims you can actually defend',
        detail: 'Copy anchored to the licensed claim on the NPN — the wording the product is already allowed to carry. It reads plainer than the competition, and it doesn\'t invite a complaint or a pulled ad account.'
      },
      {
        title: 'The counter conversation, written down',
        detail: 'What it is for, how to take it, how long before you notice anything, what it interacts with. That is the product page. Everything else is a photograph of a bottle.'
      },
      {
        title: 'Retail and practitioner, separated',
        detail: 'Practitioner and wholesale pricing behind a login while the retail shop stays open and public. One catalogue, two audiences, and no trade pricing sitting on a page a customer can read.'
      },
      {
        title: 'Search that speaks how customers ask',
        detail: 'People look for the traditional name, the English name, and the condition — often not in English. Search and product data built for all three, because a customer who can\'t find it assumes you don\'t carry it.'
      },
      {
        title: 'Channels nobody can switch off',
        detail: 'Email, SMS, and organic search carry this category, because paid is gated and can vanish on a policy update. The site is built to grow a list from day one instead of renting an audience.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Ingredient and use search',
        angle: 'Long, specific, and barely contested — someone searching a herb by name and a use is closer to buying than anyone you could pay to reach.'
      },
      {
        channel: 'Owned email and SMS',
        angle: 'The one channel a platform policy update cannot take away from you. Reorder reminders timed to the supply cycle are the highest-return message this category sends.'
      },
      {
        channel: 'Shelf to phone',
        angle: 'A QR at the shelf edge that opens the product page with dosage and interactions — so the staff conversation continues after the customer leaves, and the reorder happens online.'
      },
      {
        channel: 'Community and language channels',
        angle: 'For a lot of these shops the real audience is on WeChat or in WhatsApp groups, not on Instagram. Meet them there and let the site be the reference the message links to.'
      }
    ],
    status: 'concept',
    motif: 'leaf-vein',
    accent: '#6fe05a',
    accentName: 'Tincture Green',
    heroPhoto: {
      subject:
        'The counter or the wall of jars — dried herbs, labelled drawers, a hand weighing or scooping. The shop\'s expertise made visible, not a flat-lay of supplement tubs on white.',
      alt: 'Amber bottles and open jars of dried herbs on an apothecary table'
    },
    seo: {
      title: 'Herbal & natural health ecommerce | The Linova Group',
      description: 'Ecommerce for herbal and natural health retailers: claims anchored to the licensed NPN wording, practitioner pricing behind a login.'
    }
  },
  {
    slug: 'auto',
    name: 'Auto shops',
    cycleWord: 'auto shops',
    railWord: 'auto shop',
    category: 'vehicles',
    covers: [
      'general repair',
      'tires & alignment',
      'European & import',
      'hybrid & EV service',
      'body & collision',
      'fleet service'
    ],
    headline: 'Nobody picks a mechanic on a Tuesday. They pick one when the car won\'t start.',
    problem: 'The decision happens on a phone, in a parking lot, in about two minutes, out of the map pack. Three things decide it: the reviews, whether you are open, and whether anyone will answer "can you look at it today?" Most shop sites are a splash page, a phone number, and a services list identical to the shop four hundred metres away — no prices, no availability, and no reason to pick you.',
    approach: [
      {
        title: 'Answer the emergency first',
        detail: 'Call button, today\'s availability, and what to do if it isn\'t drivable — above everything else. Somebody stranded is not scrolling to your About page.'
      },
      {
        title: 'Price the jobs people shop on',
        detail: 'Brakes, oil, a safety, an AC recharge, the diagnostic fee: a range and what moves it. Silence on price doesn\'t read as premium, it reads as expensive.'
      },
      {
        title: 'The estimate, with photographs',
        detail: 'Photograph the worn pad, text the link, and let them approve line by line from the office. It ends the phone tag, and it is the single biggest trust move available in this trade.'
      },
      {
        title: 'Reviews are the storefront',
        detail: 'The profile is doing more selling than the website is. Recent reviews, replies to the bad ones, and photographs of a clean bay with your own techs in it.'
      },
      {
        title: 'A page per specialty',
        detail: 'European, hybrid and EV, diesel, fleet. The searches that convert are make-and-problem specific, and a generic services list ranks for none of them.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Map pack, open now',
        angle: 'Hours correct to the minute, including the Saturday you actually open. "Mechanic near me open now" is the highest-intent search in the trade, and it is decided on the profile rather than the site.'
      },
      {
        channel: 'Make and repair pages',
        angle: '"BMW brake repair [city]" is a page you can own outright. The dealership doesn\'t want it and the national chain can\'t write it credibly.'
      },
      {
        channel: 'Fleet and commercial accounts',
        angle: 'A few contractors or a courier company with twelve vans changes the shape of the year. That is outbound plus one page proving you can turn a van around overnight.'
      },
      {
        channel: 'Service-interval SMS',
        angle: 'Oil, seasonal tire changeover, safety renewal. The customer who already trusts you is the cheapest booking you will ever get, and the only reason they haven\'t come back is that they forgot.'
      }
    ],
    status: 'concept',
    motif: 'rotor-disc',
    accent: '#ff8b3d',
    accentName: 'Shop Orange',
    heroPhoto: {
      subject:
        'Under the hood or on the hoist — a tech with a real tool in hand, bay lighting, a car actually up in the air. Grease and clutter are credibility here; a showroom-clean stock garage is not.',
      alt: 'A mechanic\'s hand turning a wrench on a car engine'
    },
    seo: {
      title: 'Auto shop websites that get calls | The Linova Group',
      description: 'Websites for auto repair shops: today\'s availability up front, common jobs priced, photo estimates by text, and a Google profile built for mechanic-near-me.'
    }
  },
  {
    slug: 'carwash',
    name: 'Car wash & detailing',
    cycleWord: 'detailers',
    railWord: 'detailer',
    category: 'vehicles',
    covers: [
      'tunnel & in-bay wash',
      'unlimited memberships',
      'mobile detailing',
      'paint correction & ceramic',
      'interior detailing',
      'dealer & fleet recon'
    ],
    headline: 'A fifteen dollar impulse and a four hundred dollar booking, sharing one website.',
    problem: 'A wash is decided by location and a sign on the road. Detailing is researched, compared, and booked days ahead at twenty times the price. Most sites lead with the wash and bury detailing three clicks down, so the valuable customer never finds it — or they look cheap enough that nobody would trust them with a ceramic coating. And the membership, which is the actual profit engine, exists as a sign in the lot and nowhere online.',
    approach: [
      {
        title: 'Membership is the product',
        detail: 'Unlimited plans bought, paused, and cancelled online without a phone call. The friction you put in front of cancelling is the same friction that stops people signing up.'
      },
      {
        title: 'Detailing books like a service',
        detail: 'Package, duration, vehicle size, deposit, and a real date. Nobody books a four hundred dollar job through a contact form.'
      },
      {
        title: 'The finish, at full resolution',
        detail: 'Paint correction and interior before-and-afters, shot properly and shown large. This category is sold entirely on photographs, and most sites are using the ones the equipment supplier handed them.'
      },
      {
        title: 'The lot\'s realities, on the page',
        detail: 'Bay height, whether a lifted truck fits, hours, wait times, and whether you run in February. Every one of those is a phone call you stop having to take.'
      },
      {
        title: 'Two doors in one building',
        detail: 'The impulse wash and the booked detail get separate paths from the first click, so neither one makes the other look like a mistake.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Map pack and live hours',
        angle: '"Car wash near me" gets decided in the car. Accurate hours, wait times, and recent photos do more here than any campaign you could run.'
      },
      {
        channel: 'Reels of paint correction',
        angle: 'The swirl-marks-to-mirror clip is one of the few genuinely native formats in local business. It travels, and it sells the highest-margin service on your list.'
      },
      {
        channel: 'Membership retention',
        angle: 'Usage-based email and SMS: a member who hasn\'t come in for six weeks is about to cancel, and one well-timed message usually stops it.'
      },
      {
        channel: 'Dealer and fleet detailing',
        angle: 'Lot prep and reconditioning is steady, unglamorous, weekday revenue that never arrives from a consumer search. It arrives from a page and a phone call.'
      }
    ],
    status: 'concept',
    motif: 'spray-fan',
    accent: '#6b9fff',
    accentName: 'Rinse Blue',
    heroPhoto: {
      subject:
        'Water and light on paint — foam sheeting off a panel, a polisher on a hood, or the reflection in a finished door. Close and wet, not a wide shot of an empty bay.',
      alt: 'The front of a car covered in wash foam'
    },
    seo: {
      title: 'Websites that sell car wash memberships | The Linova Group',
      description: 'Sites for car washes and detailers: memberships sold and managed online, detailing booked with deposits, and the before-and-afters that sell paint correction.'
    }
  },
  {
    slug: 'tailoring',
    name: 'Tailoring & alterations',
    cycleWord: 'tailors',
    railWord: 'tailor',
    category: 'personal',
    covers: [
      'alterations & hemming',
      'bridal & formalwear',
      'suiting & menswear',
      'leather & outerwear repair',
      'dry cleaning',
      'made-to-measure'
    ],
    headline: 'A measurement, a date, and a carbon-copy ticket.',
    problem: 'The whole business runs on a paper stub and a pin board, and the customer walks out knowing neither what it will cost nor when it is ready — so they phone on Thursday to ask. Meanwhile the work worth the most, a wedding dress or a suit for an interview, is chosen weeks earlier by somebody searching for exactly that, who has no way to tell from your website whether you even do it.',
    approach: [
      {
        title: 'Price the list',
        detail: 'Hem, taper, sleeve, zipper, waist, with the turnaround beside each one. Publishing it doesn\'t lose you anything to price shoppers; it stops you answering the same call nine times a day.'
      },
      {
        title: 'A ticket the customer can see',
        detail: 'A drop-off confirmation with the item, the work, and the date, then a ready-for-pickup text. The paper stub stays exactly as it is; the Thursday phone call goes away.'
      },
      {
        title: 'Bridal and suiting get their own pages',
        detail: 'Different money, different timeline, different anxiety. How many fittings, when to book relative to the date, and what the deposit covers.'
      },
      {
        title: 'Rush is a product, not a favour',
        detail: 'Name it, price it, and cap how many you take. The customer who needs it by Friday will gladly pay for it, and right now you are absorbing that for free.'
      },
      {
        title: 'Photograph the work, not a mannequin',
        detail: 'Cuffs, a re-cut shoulder, a lining. The craft is invisible in a wide shot and obvious in a close one — and it is the whole reason somebody picks a tailor over a dry cleaner.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Local intent search',
        angle: '"Suit alterations near me" and "wedding dress alterations [city]" are small, specific, and almost entirely uncontested by anyone who has written a real page for them.'
      },
      {
        channel: 'Bridal and menswear referrals',
        angle: 'The shop that sold the dress gets asked "who hems this?" every day of the week. Being the answer is worth more than any ad, and it costs a conversation and a stack of cards.'
      },
      {
        channel: 'Google Business Profile',
        angle: 'Turnaround time in the description, a photo of the price list, and reviews that name the specific garment. This category converts almost entirely on the profile.'
      },
      {
        channel: 'Before-and-after on fit',
        angle: 'The same jacket off the rack and then altered, side by side. It is the only way to show a service most people don\'t know they need.'
      }
    ],
    status: 'concept',
    motif: 'seam-allowance',
    accent: '#e8c49a',
    accentName: 'Tailor\'s Chalk',
    heroPhoto: {
      subject:
        'Hands at the machine or pinning a garment on a form — chalk, pins, tape around the neck. Close on the work, with the shop readable behind it.',
      alt: 'A tailor cutting dark fabric with shears beside a tape measure'
    },
    seo: {
      title: 'Websites for tailors & alteration shops | The Linova Group',
      description: 'Sites for tailoring and alterations: a published price and turnaround list, ready-for-pickup texts instead of Thursday phone calls, real bridal pages.'
    }
  },
  {
    slug: 'venue',
    name: 'Event venues',
    cycleWord: 'venues',
    railWord: 'venue',
    category: 'food',
    covers: [
      'wedding & banquet halls',
      'corporate & offsite space',
      'photo & film studios',
      'community & church halls',
      'breweries & tasting rooms',
      'pop-up & gallery space'
    ],
    headline: 'Every enquiry asks the same three questions. Most venue sites answer none of them.',
    problem: 'Is the date free, how many does it hold, and what does it cost. A planner sends those three questions to five venues and books whoever comes back with real answers first. Most venue sites reply with a form, a brochure request, and a gallery of an empty room — so the booking goes to the venue that made it easy, not to the better room.',
    approach: [
      {
        title: 'Availability, not an enquiry form',
        detail: 'A live calendar where the system allows it, and at minimum the dates already gone. Nothing loses a booking faster than making somebody wait two days to find out you were booked.'
      },
      {
        title: 'Capacity and price band up front',
        detail: 'Seated against standing, minimum spend, what a Saturday in June costs next to a Thursday in February. Hiding it doesn\'t filter out the cheap enquiries, it filters out the serious ones.'
      },
      {
        title: 'The room set, not empty',
        detail: 'Real events in real configurations — long tables, rounds, theatre, a dance floor. A planner can\'t picture their day in an empty hall, and an empty hall is what everyone photographs.'
      },
      {
        title: 'The logistics sheet, downloadable',
        detail: 'Floor plans, load-in, parking, kitchen, AV, accessibility, curfew. The document a planner can forward internally is the document that gets you shortlisted.'
      },
      {
        title: 'An enquiry that doesn\'t go cold',
        detail: 'An instant reply carrying the package and a link to book a tour, because the first real answer wins. The follow-up sequence matters more in this vertical than the homepage does.'
      }
    ],
    marketingAngles: [
      {
        channel: 'Event-type search and directories',
        angle: '"Wedding venue [region]" and "corporate offsite space [city]" are separate audiences that need separate pages. The directories still convert here, and they are worth the listing fee when the landing page is right.'
      },
      {
        channel: 'Instagram and Pinterest',
        angle: 'This is where venues get discovered and saved months before an enquiry arrives. Every event you host is content you are allowed to post, and most venues never think to ask.'
      },
      {
        channel: 'Planner and vendor network',
        angle: 'Photographers, caterers, and planners recommend the rooms they know work. A vendor page with floor plans and load-in details makes you the easy recommendation.'
      },
      {
        channel: 'The tour is the conversion',
        angle: 'The goal of the site is not a booking, it is a walkthrough. Sell the tour, automate the reminder, and let the room do the closing.'
      }
    ],
    status: 'concept',
    motif: 'stage-arch',
    accent: '#e87fff',
    accentName: 'Stage Violet',
    heroPhoto: {
      subject:
        'A room set for an event before the doors open, or mid-event with the lights on — long tables, strung lighting, a stage. It has to feel occupied; the empty-hall shot is exactly the mistake everyone makes.',
      alt: 'Guests raising glasses at a long table under strings of lights'
    },
    seo: {
      title: 'Event venue websites | The Linova Group',
      description: 'Websites for event venues: availability and price bands up front, rooms shown set not empty, floor plans to download, and an enquiry that books the tour.'
    }
  }
];

/** A group of verticals — the top layer of the /industries index. */
export interface IndustryCategory {
  slug: string;
  name: string;
  /** one line of orientation on the category front */
  blurb: string;
}

/**
 * Six groups over the fourteen playbooks. Ordering is editorial, not by
 * volume — a directory whose sections reshuffle as the roster grows is a
 * directory nobody learns. Every group holds at least two verticals; a
 * category of one reads as a mistake in the rail.
 */
export const industryCategories: IndustryCategory[] = [
  {
    slug: 'trades',
    name: 'Trades & property',
    blurb: 'Work that gets quoted, scheduled, and photographed — where the proof lives on a phone and the lead starts with an estimate.',
  },
  {
    slug: 'food',
    name: 'Food & venues',
    blurb: 'Rooms people book and kitchens people order from, decided on a phone by someone who is hungry or planning a date.',
  },
  {
    slug: 'health',
    name: 'Health & wellness',
    blurb: 'Regulated categories where the copy has to stay inside the rules and the booking has to reach a real schedule.',
  },
  {
    slug: 'personal',
    name: 'Personal care & lessons',
    blurb: 'One person serving one customer on a booked slot — the chair, the fitting, the class.',
  },
  {
    slug: 'vehicles',
    name: 'Vehicles & transport',
    blurb: 'Bays, vans, and routes: decided in a parking lot, at a discharge desk, or wherever the car stopped working.',
  },
  {
    slug: 'shops',
    name: 'Shops & suppliers',
    blurb: 'Selling goods over a counter or into a spec — stock that has to be right online and a catalogue buyers can search.',
  },
];

export const getIndustry = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);

export const getCategory = (slug: string): IndustryCategory | undefined =>
  industryCategories.find((c) => c.slug === slug);

export const industriesIn = (categorySlug: string): Industry[] =>
  industries.filter((i) => i.category === categorySlug);

/** The category menu — empty groups are dropped rather than offered. */
export const categoryMenu = (): (IndustryCategory & { count: number })[] =>
  industryCategories
    .map((category) => ({ ...category, count: industriesIn(category.slug).length }))
    .filter((category) => category.count > 0);
