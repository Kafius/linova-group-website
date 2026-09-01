// schema.org for Saffron Table. The brief names two shapes and they map onto
// the two paths through the site:
//
//   · FoodEstablishment with hasMenu — the takeout counter. Priced per item.
//   · CateringService with areaServed — the catering business. Priced per
//     head, so every Offer carries a UnitPriceSpecification with a PER-PERSON
//     unit and an eligibleQuantity carrying the minimum headcount. A flat
//     `price` on a catering package would be a lie: $48 is not what anybody
//     pays, $48 x 60 is.
//
// Not published: aggregateRating, review, and any allergen guarantee. The
// dietary markers on the menu are ingredient statements, not cross-contact
// claims, and the markup does not upgrade them into one.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  cateringContact,
  counterHours,
  menu,
  menuLines,
  packages,
  serviceArea,
} from '../../data/demos/fnb-catering-events';

export { breadcrumbs as demoBreadcrumbs };

const areaServed = (): JsonLd[] =>
  serviceArea.map((city) => ({
    '@type': 'City',
    name: city,
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
  }));

export function foodEstablishment(homePath: string, menuPath: string, image: string): JsonLd {
  return localBusiness({
    type: 'FoodEstablishment',
    business,
    homePath,
    image,
    hours: counterHours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      servesCuisine: ['Indian', 'South Asian'],
      hasMenu: abs(menuPath),
      acceptsReservations: 'False',
      publicAccess: true,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          name: 'Counter',
          telephone: business.phone,
          email: business.email,
          areaServed: 'CA-ON',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          name: cateringContact.name,
          telephone: cateringContact.phone,
          email: cateringContact.email,
          areaServed: 'CA-ON',
          availableLanguage: 'English',
        },
      ],
    },
  });
}

/** The counter menu. Per-item prices, published because they are on the page. */
export function counterMenu(menuPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': abs(menuPath),
    name: `${business.name} takeout menu`,
    url: abs(menuPath),
    inLanguage: 'en-CA',
    hasMenuSection: menuLines.map((line) => ({
      '@type': 'MenuSection',
      name: line.name,
      description: line.blurb,
      hasMenuItem: menu
        .filter((item) => item.line === line.id)
        .map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          ...(item.dietary?.length
            ? {
                // The ternary always yields a URI, so there is nothing to
                // filter out — and a `uri is string` predicate over a literal
                // union does not typecheck, which is how the same mistake got
                // caught in the Harbourview module.
                suitableForDiet: item.dietary.map((d): string =>
                  d === 'VG'
                    ? 'https://schema.org/VeganDiet'
                    : d === 'V'
                      ? 'https://schema.org/VegetarianDiet'
                      : 'https://schema.org/GlutenFreeDiet'
                ),
              }
            : {}),
          offers: {
            '@type': 'Offer',
            price: item.price.toFixed(2),
            priceCurrency: 'CAD',
            eligibleQuantity: { '@type': 'QuantitativeValue', unitText: item.portion },
          },
        })),
    })),
  };
}

/** The catering side. Per-head pricing expressed as a unit price with a
 *  minimum headcount, which is the only honest way to publish it. */
export function cateringService(cateringPath: string, homePath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CateringService',
    '@id': `${abs(homePath)}#catering`,
    name: `${business.name} — Catering`,
    url: abs(cateringPath),
    description: business.positioning,
    parentOrganization: { '@type': 'FoodEstablishment', '@id': abs(homePath), name: business.name },
    telephone: cateringContact.phone,
    email: cateringContact.email,
    // The brief names areaServed explicitly.
    areaServed: areaServed(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catering packages',
      itemListElement: packages.map((pack) => ({
        '@type': 'Offer',
        name: pack.name,
        description: pack.summary,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: pack.perHead.toFixed(2),
          priceCurrency: 'CAD',
          unitText: 'per person',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' },
        },
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          minValue: pack.minimum,
          unitText: 'guests',
        },
        itemOffered: {
          '@type': 'Service',
          name: pack.name,
          serviceType: pack.serviceStyle,
          areaServed: areaServed(),
          provider: { '@type': 'CateringService', name: business.name },
        },
      })),
    },
  };
}

/** Exported for the build verification: the minimum spend implied by each
 *  package, which the report quotes and which nothing on the page states
 *  directly (deliberately — it is per head times minimum, and a reader can
 *  do that themselves). */
export const minimumSpend = (): { name: string; total: number }[] =>
  packages.map((pack) => ({ name: pack.name, total: pack.perHead * pack.minimum }));
