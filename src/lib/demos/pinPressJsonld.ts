// schema.org for Pin & Press. ClothingStore with openingHoursSpecification,
// per the playbook brief, plus an OfferCatalog of the alteration services.
//
// The prices on this page are RANGES, and the markup says so: every service
// carries a PriceSpecification with minPrice and maxPrice rather than a single
// `price`. Publishing the bottom of a range as the price is the oldest trick
// in local-services markup and it is the reason nobody trusts the numbers in a
// rich result.
//
// Not published: aggregateRating and review.
import { breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, services } from '../../data/demos/appointment-lite';

export { breadcrumbs as demoBreadcrumbs };

export function clothingStore(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'ClothingStore',
    business,
    homePath,
    image,
    hours: hours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      // The brief names both types; ClothingStore is the specific one and
      // ProfessionalService is what a tailor also is.
      additionalType: 'https://schema.org/ProfessionalService',
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      publicAccess: true,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${business.shortName} alterations and tailoring`,
        itemListElement: services.map((group) => ({
          '@type': 'OfferCatalog',
          name: group.garment,
          description: group.blurb,
          itemListElement: group.rows.map((row) => ({
            '@type': 'Offer',
            name: `${group.garment} — ${row.service}`,
            ...(row.note ? { description: row.note } : {}),
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: row.from,
              maxPrice: row.to,
              priceCurrency: 'CAD',
              valueAddedTaxIncluded: false,
            },
            itemOffered: {
              '@type': 'Service',
              name: row.service,
              serviceType: group.garment,
              provider: { '@type': 'ClothingStore', name: business.name },
            },
          })),
        })),
      },
    },
  });
}

/** Exported for the build verification: every published price is a range, and
 *  this is the count the report quotes. */
export const priceRangeCount = (): number =>
  services.reduce((total, group) => total + group.rows.length, 0);
