// schema.org builders for the restaurant demo. Kept out of src/lib/jsonld.ts,
// which describes Linova itself — a fictional restaurant has no business in
// the builders that emit our own Organization and LocalBusiness blocks.
//
// Everything here reads from the demo's data module, so the structured data
// and the visible page can never drift apart. That is the point of the SEO
// line item: the markup is generated from the same menu the kitchen prints.
import { site } from '../../data/site';
import {
  business,
  hours,
  menu,
  toSchemaTime,
  type MenuSection,
} from '../../data/demos/fnb-full-service';

type JsonLd = Record<string, unknown>;

const abs = (path: string): string => new URL(path, site.url).href;

const postalAddress = (): JsonLd => ({
  '@type': 'PostalAddress',
  streetAddress: business.address.street,
  addressLocality: business.address.city,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
});

/** Venue hours are the bar's — the kitchen's earlier close is a separate fact
 *  the page states in prose, and schema.org has no field for it. */
const openingHours = (): JsonLd[] =>
  hours.map((day) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${day.schemaDay}`,
    opens: toSchemaTime(day.open),
    closes: toSchemaTime(day.barClose),
  }));

export function restaurant(homePath: string, menuPath: string, ogImage: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': abs(homePath),
    name: business.name,
    description: business.positioning,
    url: abs(homePath),
    image: abs(ogImage),
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    servesCuisine: [...business.cuisine],
    address: postalAddress(),
    openingHoursSpecification: openingHours(),
    hasMenu: abs(menuPath),
    acceptsReservations: 'False',
  };
}

const menuSection = (section: MenuSection): JsonLd => ({
  '@type': 'MenuSection',
  name: section.name,
  ...(section.note ? { description: section.note } : {}),
  hasMenuItem: section.items.map((item) => ({
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    ...(item.dietary?.length ? { suitableForDiet: dietUris(item.dietary) } : {}),
    offers: {
      '@type': 'Offer',
      price: item.price.toFixed(2),
      priceCurrency: 'CAD',
    },
  })),
});

const dietUris = (markers: readonly string[]): string[] =>
  markers
    .map((marker) => {
      if (marker === 'V') return 'https://schema.org/VegetarianDiet';
      if (marker === 'VG') return 'https://schema.org/VeganDiet';
      if (marker === 'GF') return 'https://schema.org/GlutenFreeDiet';
      return null;
    })
    .filter((uri): uri is string => uri !== null);

export function restaurantMenu(menuPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': abs(menuPath),
    name: `${business.name} menu`,
    url: abs(menuPath),
    inLanguage: 'en-CA',
    hasMenuSection: menu.map(menuSection),
  };
}

export function demoBreadcrumbs(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
