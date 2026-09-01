// schema.org for the Bramble & Bone sample site. Store on the home page,
// ItemList of Product/Offer on the shop page, BreadcrumbList on inner pages.
//
// Everything reads from the demo's data module, so the structured data and the
// visible catalogue can never drift. That is the point of the SEO line item:
// the markup is generated from the same shelf the shop sells off.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, products } from '../../data/demos/retail-online-store';

export { breadcrumbs as demoBreadcrumbs };

export function store(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'Store',
    business,
    homePath,
    image,
    hours: hours.map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      '@type': ['Store', 'PetStore'],
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      areaServed: { '@type': 'City', name: 'Guelph' },
    },
  });
}

/** The catalogue as an ordered list of offers. An out-of-stock line stays in
 *  the markup with OutOfStock availability rather than disappearing, which is
 *  what keeps the page's search value while the freezer is empty. */
export function catalogue(shopPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${business.name} catalogue`,
    url: abs(shopPath),
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        category: product.category,
        ...(product.size ? { size: product.size } : {}),
        offers: {
          '@type': 'Offer',
          price: product.price.toFixed(2),
          priceCurrency: 'CAD',
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: `${abs(shopPath)}#${product.id}`,
          seller: { '@type': 'Organization', name: business.name },
        },
      },
    })),
  };
}
