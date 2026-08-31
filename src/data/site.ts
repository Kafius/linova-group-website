// Site-wide constants. Values that are still unknown are read from env and
// noted in the README (§0 of the rebuild brief).

export const site = {
  name: 'The Linova Group',
  shortName: 'Linova',
  // Vercel serves www and 301s the apex to it, so this is the canonical host.
  // Canonicals, og:url and JSON-LD are all built from it (BaseLayout,
  // lib/jsonld). If the apex is ever made primary in Vercel, change this and
  // `site` in astro.config.mjs together — they must always agree with what is
  // actually served, or every canonical points at a redirect.
  url: 'https://www.thelinovagroup.com',
  tagline: 'Machine-fast delivery. Human-real marketing.',
  description:
    'Web design, development, and marketing for small and mid-sized businesses across the GTA, Canada, and the US — a fast build system plus a human marketing team.',
  founder: 'Dennis De Leon',
  region: 'ON',
  country: 'CA',
  areaServed: ['Greater Toronto Area', 'Canada', 'United States'],
  logo: '/linova-logo.svg',
  ogImage: '/og/default.png',
} as const;

export const nav = {
  links: [
    { href: '/work', label: 'Work' },
    { href: '/industries', label: 'Industries' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
  ],
  cta: { href: '/book', label: 'Book a call' },
} as const;

/** Published contact details for the footer and contact page.
 *  Empty string = not published yet, and the footer renders nothing rather
 *  than a dead link. Neither of these exists anywhere on the current live
 *  site, so they are Dennis's to fill in. */
export const contact = {
  email: '',
  phone: '',
} as const;

export type SocialProfile = {
  label: string;
  href: string;
  icon: 'instagram' | 'facebook' | 'linkedin' | 'tiktok';
};

/** Social profiles, in the order they should appear in the footer. The footer
 *  maps over this, so removing an entry removes its icon — an empty array
 *  renders no row at all rather than icons that go nowhere. */
export const social: SocialProfile[] = [
  { label: 'Instagram', href: 'https://instagram.com/thelinovagroup', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/thelinovagroup', icon: 'linkedin' },
];
