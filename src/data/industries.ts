// The seven verticals — single source of truth for the industries rail,
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
  seo: { title: string; description: string };
}

export const industries: Industry[] = [
  {
    slug: 'barbershops',
    name: 'Barbershops & salons',
    cycleWord: 'barbershops',
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
    seo: {
      title: 'Barbershop websites that fill chairs | The Linova Group',
      description: 'Websites for barbershops and salons: booking straight from a Reel, a book per barber, and Google reviews that win the walk-in. Built in the GTA.'
    }
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    cycleWord: 'restaurants',
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
    seo: {
      title: 'Restaurant website design & marketing | The Linova Group',
      description: 'Restaurant websites and marketing from The Linova Group: readable phone menus, direct orders ahead of app commissions, and food-first creative.'
    }
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    cycleWord: 'contractors',
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
    seo: {
      title: 'Contractor websites & marketing | The Linova Group',
      description: 'Websites and marketing for contractors. Turn finished jobs into proof, quote requests into booked work, and slow seasons into a pipeline. Book a call.'
    }
  },
  {
    slug: 'schools',
    name: 'Schools & instruction',
    cycleWord: 'dojos',
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
    seo: {
      title: 'Websites for dojos, academies & music schools | Linova',
      description: 'Websites for dojos and music schools that book trial classes, keep schedules current, and fill enrolment seasons. Built for Markham Taekwondo Academy.'
    }
  },
  {
    slug: 'supply',
    name: 'B2B & supply',
    cycleWord: 'roofing suppliers',
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
    seo: {
      title: 'Web design for building product suppliers | The Linova Group',
      description: 'Spec-sheet pages architects can find, project galleries that prove the install, and forms that qualify the lead. Built for suppliers on long sales cycles.'
    }
  },
  {
    slug: 'retail',
    name: 'Retail',
    cycleWord: 'retail',
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
    seo: {
      title: 'Retail website design & marketing | The Linova Group',
      description: 'Websites and marketing for retail shops: stock that\'s right online, open-now searches that find you, and an Instagram that sends people in the door.'
    }
  },
  {
    slug: 'transport',
    name: 'Services & transport',
    cycleWord: 'transport',
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
    seo: {
      title: 'Web design for transport & medical ride services | Linova',
      description: 'Websites for medical and accessible transport companies: pages families read, booking forms dispatch can use, local search that fills routes.'
    }
  }
];

export const getIndustry = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);
