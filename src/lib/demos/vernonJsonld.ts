// schema.org for Vernon Street Bakehouse. The brief names two shapes, one per
// audience, and they stay as separate as the pages do:
//
//   · Bakery with hasMenu — the retail side. The counter catalogue is a Menu
//     with a section per shelf and a CAD price on every item.
//   · Organization detail — the wholesale side. A sales contactPoint on its
//     own number and inbox, the delivery cities as areaServed, and the supply
//     lines as an OfferCatalog carrying NO prices.
//
// That last point is deliberate and matches the page: wholesale case prices
// are on a PDF the bakery hands out, not in markup. Publishing them here
// would put a competitor's pricing homework into a rich result.
//
// Also not published: aggregateRating and review. A bakery with no reviews is
// not improved by inventing some.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  cakes,
  counterHours,
  deliveryZones,
  shelf,
  shelfCategories,
  wholesaleContact,
  wholesaleLines,
} from '../../data/demos/retail-catalogue-wholesale';

export { breadcrumbs as demoBreadcrumbs };

export function bakery(homePath: string, shopPath: string, image: string): JsonLd {
  return localBusiness({
    type: 'Bakery',
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
      servesCuisine: ['Bakery'],
      hasMenu: abs(shopPath),
      publicAccess: true,
      // The wholesale desk is a second contact point on the same business,
      // which is the honest way to say "two front doors" in markup.
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
          name: wholesaleContact.name,
          telephone: wholesaleContact.phone,
          email: wholesaleContact.email,
          areaServed: 'CA-ON',
          availableLanguage: 'English',
        },
      ],
    },
  });
}

/** The retail catalogue as a Menu, one section per shelf. Prices published
 *  because they are the shelf prices, and they are on the page anyway. */
export function counterMenu(shopPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': abs(shopPath),
    name: `${business.name} counter catalogue`,
    url: abs(shopPath),
    inLanguage: 'en-CA',
    hasMenuSection: shelfCategories.map((category) => ({
      '@type': 'MenuSection',
      name: category.name,
      description: category.blurb,
      hasMenuItem: shelf
        .filter((item) => item.category === category.id)
        .map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          ...(item.dietary?.length
            ? {
                suitableForDiet: item.dietary.map((d) =>
                  d === 'VG' ? 'https://schema.org/VeganDiet' : 'https://schema.org/VegetarianDiet'
                ),
              }
            : {}),
          offers: {
            '@type': 'Offer',
            price: item.price.toFixed(2),
            priceCurrency: 'CAD',
            eligibleQuantity: { '@type': 'QuantitativeValue', unitText: item.unit },
          },
        })),
    })),
  };
}

/** The wholesale side. An Organization with a sales contact, the delivery
 *  cities, and a catalogue of supply lines with no prices on it. */
export function wholesaleOrganization(wholesalePath: string, homePath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${abs(homePath)}#wholesale`,
    name: `${business.name} — Wholesale`,
    url: abs(wholesalePath),
    parentOrganization: { '@type': 'Bakery', '@id': abs(homePath), name: business.name },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      name: wholesaleContact.name,
      telephone: wholesaleContact.phone,
      email: wholesaleContact.email,
      availableLanguage: 'English',
    },
    areaServed: deliveryZones.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
    })),
    // No price on any of these. The case prices are on the PDF.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wholesale supply lines',
      itemListElement: wholesaleLines.map((line) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: line.name,
          description: line.detail,
          category: line.format,
        },
        eligibleQuantity: { '@type': 'QuantitativeValue', unitText: line.caseSize },
      })),
    },
  };
}

/** The seasonal cakes, which do carry prices — they are on the page in CAD,
 *  one Offer per size. */
export function cakeList(cakesPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': abs(cakesPath),
    name: `${business.name} seasonal cake collection`,
    url: abs(cakesPath),
    numberOfItems: cakes.length,
    itemListElement: cakes.map((cake, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: cake.name,
        description: cake.description,
        category: 'Celebration cake',
        brand: { '@type': 'Bakery', name: business.name },
        offers: cake.sizes.map((size) => ({
          '@type': 'Offer',
          name: `${size.size} — serves ${size.serves}`,
          price: size.price.toFixed(2),
          priceCurrency: 'CAD',
          availability: 'https://schema.org/PreOrder',
        })),
      },
    })),
  };
}
