// schema.org for the Redline Auto Service sample site.
//
// Local SEO is the whole build for this playbook, so the AutoRepair block
// carries areaServed built from the same town list the page copy names, plus
// opening hours and the service catalogue.
import { breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, serviceArea, services } from '../../data/demos/automotive-book-a-bay';

export { breadcrumbs as demoBreadcrumbs };

// ── aggregateRating slot ─────────────────────────────────────────────────
// The brief asks for an aggregateRating slot, and this is the slot. It stays
// null on a sample site: a rating in schema.org is a factual claim search
// engines surface as stars, and inventing one for a fictional business would
// publish a fabricated record. On a live build, set this from the client's
// real Google Business Profile figures and the block below starts emitting.
const RATING: { value: number; count: number } | null = null;

export function autoRepair(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'AutoRepair',
    business,
    homePath,
    image,
    hours: hours
      .filter((day) => !day.closed)
      .map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      areaServed: serviceArea.map((name) => ({
        '@type': 'City',
        name,
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Durham Region, Ontario' },
      })),
      ...(RATING
        ? {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: RATING.value,
              reviewCount: RATING.count,
            },
          }
        : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${business.name} services`,
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          ...(service.price === null
            ? {}
            : { price: service.price.toFixed(2), priceCurrency: 'CAD' }),
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            serviceType: 'Auto repair',
            areaServed: serviceArea.map((name) => ({ '@type': 'City', name })),
            provider: { '@type': 'AutoRepair', name: business.name },
          },
        })),
      },
    },
  });
}
