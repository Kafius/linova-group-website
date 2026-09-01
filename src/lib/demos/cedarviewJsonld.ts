// schema.org for Cedarview. GroceryStore with a `department` for each counter
// and an offer catalogue for the butcher's list.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  cuts,
  departments,
  hours,
} from '../../data/demos/retail-grocery-order-ahead';

export { breadcrumbs as demoBreadcrumbs };

export function groceryStore(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'GroceryStore',
    business,
    homePath,
    image,
    hours: hours.map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      areaServed: { '@type': 'City', name: 'Kitchener' },
      // Each counter as its own department, which is what schema.org's
      // `department` is for and what a grocer's rich result can use.
      department: departments.map((dept) => ({
        '@type': 'Store',
        name: dept.name,
        description: dept.description,
        url: `${abs(homePath)}departments#${dept.id}`,
      })),
    },
  });
}

/** The butcher's counter list. Priced per kilogram, with the unit stated,
 *  because an unqualified price on a per-weight product is a false claim. */
export function butcherCatalogue(orderPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${business.name} butcher counter`,
    url: abs(orderPath),
    numberOfItems: cuts.length,
    itemListElement: cuts.map((cut, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: cut.name,
        description: cut.description,
        category: cut.kind,
        offers: {
          '@type': 'Offer',
          price: cut.pricePerKg.toFixed(2),
          priceCurrency: 'CAD',
          eligibleQuantity: { '@type': 'QuantitativeValue', unitCode: 'KGM', value: 1 },
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'GroceryStore', name: business.name },
        },
      },
    })),
  };
}
