// The five service groups, in priority order (brief §1) — marketing and
// social are a co-equal half of the business, not add-ons. 'engine' tags
// which half of the two-engine model delivers the work.
//
// Copy does not name where the marketing team sits. Dennis removed that from
// the homepage act on 2026-08-30 and this deck was aligned to match; brief §1
// still describes the team as a Philippines-based differentiator, so treat
// the brief as out of date on that point rather than reintroducing it.

export interface Service {
  slug: string;
  name: string;
  deck: string;
  deliverables: string[];
  /** The terms lifted out of the deck and deliverables on /services, so the
   *  page can be scanned rather than read start to finish. Matched
   *  case-insensitively on whole words (src/lib/emphasis.ts) — keep them to
   *  the load-bearing nouns, roughly one per line. Emphasising everything
   *  emphasises nothing. */
  keywords: string[];
  /** which engine delivers this: the build system, the marketing team, or both */
  engine: 'machine' | 'human' | 'both';
}

export const services: Service[] = [
  {
    slug: 'web-design-development',
    name: 'Web design & development',
    deck: 'Not vibe coding — a build system. Typed data architecture, fixed component patterns, and deterministic pipelines let one senior developer ship agency-grade sites fast, and have them hold up in production.',
    deliverables: [
      'Custom design and build on a static-first stack — no page builders, no plugin debt',
      'Typed content architecture: every price, hour, and menu item lives in one editable place',
      'CMS setup so you change your own content without calling a developer',
      'Booking, forms, and analytics wired in before launch, not bolted on after',
      'Accessibility and performance audited before handoff — the Lighthouse report comes with the site',
      'Mobile-first layouts tested on the phones your customers actually use'
    ],
    keywords: [
      'build system',
      'Typed data architecture',
      'static-first stack',
      'plugin debt',
      'Typed content architecture',
      'CMS setup',
      'Booking, forms, and analytics',
      'Lighthouse report',
      'Mobile-first'
    ],
    engine: 'machine'
  },
  {
    slug: 'marketing-strategy-campaigns',
    name: 'Marketing strategy & campaign execution',
    deck: 'Campaigns planned and run by real strategists — people who read a market, not a prompt. AI compresses a build; it does not do marketing judgment.',
    deliverables: [
      'Campaign strategy scoped to your vertical — a restaurant\'s slow Tuesday is not a contractor\'s bid season',
      'Paid social on Meta: creative, audiences, and budget management',
      'Landing pages that match the ad, with UTM and server-side conversion tracking wired in',
      'Offer and message testing with a straight read on what won and why',
      'Reporting in plain language: what ran, what it cost, what it brought in'
    ],
    keywords: [
      'real strategists',
      'marketing judgment',
      'Campaign strategy',
      'Paid social on Meta',
      'Landing pages',
      'conversion tracking',
      'Offer and message testing',
      'Reporting in plain language'
    ],
    engine: 'human'
  },
  {
    slug: 'social-media-content',
    name: 'Social media management & content creation',
    deck: 'A human team plans, produces, and posts your content — because knowing why one Reel lands and the next one dies is not something you can automate.',
    deliverables: [
      'Content calendars planned around your real weeks — the Friday rush, the seasonal lull',
      'Reels, carousels, and stories produced to your brand system',
      'Captions written by people, in your voice, by someone who reads the comments',
      'Community management: comments and DMs answered, not ignored',
      'A monthly report on what ran and what earned attention'
    ],
    keywords: [
      'human team',
      'Content calendars',
      'Reels, carousels, and stories',
      'Captions written by people',
      'Community management',
      'monthly report'
    ],
    engine: 'human'
  },
  {
    slug: 'brand-graphic-design',
    name: 'Brand & graphic design',
    deck: 'Identity built to survive real use — the menu, the truck, the storefront, the spec sheet — not a logo file that only works on a slide.',
    deliverables: [
      'Logo and identity systems with clear usage rules',
      'Print and physical collateral: menus, signage, vehicle graphics, business cards',
      'Social and ad templates your team can reuse without breaking the brand',
      'Brand guidelines as a working file, not a PDF nobody opens',
      'Refreshes that keep your existing equity — regulars should still recognize you'
    ],
    keywords: [
      'survive real use',
      'Logo and identity systems',
      'Print and physical collateral',
      'Social and ad templates',
      'Brand guidelines',
      'existing equity'
    ],
    engine: 'human'
  },
  {
    slug: 'analytics-seo-support',
    name: 'Analytics, SEO & ongoing support',
    deck: 'Launch is the start, not the handoff. Tracking that ties the site to booked calls, search work that compounds, and a developer who still answers.',
    deliverables: [
      'GA4 configured around actions that matter: calls booked, forms sent, menus viewed',
      'Local SEO: Google Business Profile, on-page structure, and visibility in the neighbourhoods you serve',
      'Technical SEO in the build itself: structured data, sitemaps, clean markup',
      'Content and site updates handled without a change-order ritual',
      'Monthly reporting that says what changed and what to do next'
    ],
    keywords: [
      'booked calls',
      'search work that compounds',
      'GA4',
      'Local SEO',
      'Technical SEO',
      'structured data',
      'Monthly reporting'
    ],
    engine: 'both'
  }
];
