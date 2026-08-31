// JSON-LD builders — typed, assembled per page, injected by BaseLayout.

import { site } from '../data/site';

type JsonLd = Record<string, unknown>;

export function organization(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    founder: { '@type': 'Person', name: site.founder },
  };
}

export function localBusiness(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    image: `${site.url}${site.logo}`,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    founder: { '@type': 'Person', name: site.founder },
  };
}

export function service(name: string, description: string, slug: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.url}/services#${slug}`,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: site.areaServed.map((n) => ({ '@type': 'Place', name: n })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Ordered index of pages — /work publishes its case studies this way. */
export function itemList(name: string, items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
    })),
  };
}
