// Site-wide constants. Values that are still unknown are read from env and
// noted in the README (§0 of the rebuild brief).

export const site = {
  name: 'The Linova Group',
  shortName: 'Linova',
  url: 'https://thelinovagroup.com',
  tagline: 'Machine-fast delivery. Human-real marketing.',
  description:
    'The Linova Group is a web design, development, and digital marketing studio in Thornhill, Ontario — an AI-implemented build system plus a human marketing team, serving small and mid-sized businesses across the GTA, Canada, and the US.',
  founder: 'Dennis De Leon',
  locality: 'Thornhill',
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
