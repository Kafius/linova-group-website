// schema.org for Halden Home Furnishings. FurnitureStore with Product/Offer
// and deliveryMethod, per the playbook brief.
//
// Two things worth pointing at on a call:
//
//   · Every Offer carries `deliveryMethod` and a `shippingDetails` block with
//     the real per-zone rate. A furniture retailer's delivery fee is a
//     purchase decision, not a footnote, and it is the one field most
//     furniture markup leaves out.
//   · `availability` is mapped from the stock field honestly: InStock,
//     InStoreOnly and PreOrder are three different promises and this
//     catalogue makes all three.
//
// Not published: aggregateRating, review, and any financing rate. The rate is
// the finance provider's to disclose, not ours to publish.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  categories,
  deliveryPage,
  deposit,
  products,
  productsIn,
  showroomHours,
  type CategoryId,
} from '../../data/demos/retail-large-catalogue';

export { breadcrumbs as demoBreadcrumbs };

const availabilityFor = (stock: string): string => {
  if (stock === 'in-stock') return 'https://schema.org/InStock';
  if (stock === 'showroom') return 'https://schema.org/InStoreOnly';
  return 'https://schema.org/PreOrder';
};

/** The delivery rates, published as shipping rate specifications. The cheapest
 *  zone is attached to every Offer; the full table is on the delivery page. */
const shippingDetails = (): JsonLd => {
  const cheapest = deliveryPage.zones.reduce((low, zone) => (zone.price < low.price ? zone : low));
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: cheapest.price,
      currency: 'CAD',
    },
    shippingDestination: deliveryPage.zones.map((zone) => ({
      '@type': 'DefinedRegion',
      addressCountry: 'CA',
      addressRegion: 'ON',
      name: zone.zone,
    })),
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 2,
        unitCode: 'DAY',
      },
    },
  };
};

export function furnitureStore(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'FurnitureStore',
    business,
    homePath,
    image,
    hours: showroomHours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      priceRange: '$$-$$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card, Financing',
      publicAccess: true,
      department: categories.map((category) => ({
        '@type': 'FurnitureStore',
        name: `${business.shortName} — ${category.name}`,
        description: category.intro,
      })),
      // The brief names deliveryMethod explicitly. DeliveryModeOwnFleet is the
      // value that matches the page: three crews and three trucks, employed
      // here. ParcelService and OnSitePickup would both be untrue, and markup
      // that contradicts the copy is worse than markup that is absent.
      makesOffer: {
        '@type': 'Offer',
        name: 'Delivery, assembly and appliance installation',
        description: deliveryPage.applianceBody,
        deliveryMethod: 'https://schema.org/DeliveryModeOwnFleet',
        priceSpecification: {
          '@type': 'DeliveryChargeSpecification',
          priceCurrency: 'CAD',
          minPrice: Math.min(...deliveryPage.zones.map((z) => z.price)),
          maxPrice: Math.max(...deliveryPage.zones.map((z) => z.price)),
          appliesToDeliveryMethod: 'https://schema.org/DeliveryModeOwnFleet',
        },
      },
    },
  });
}

/** One category page's products, as an ItemList of Product/Offer. */
export function categoryList(category: CategoryId, path: string): JsonLd {
  const items = productsIn(category);
  const shipping = shippingDetails();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': abs(path),
    name: `${business.shortName} — ${category}`,
    url: abs(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        description: item.description,
        category: item.type,
        material: item.finish,
        size: item.spec,
        brand: { '@type': 'Brand', name: business.shortName },
        offers: {
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'CAD',
          availability: availabilityFor(item.stock),
          availableDeliveryMethod: 'https://schema.org/DeliveryModeOwnFleet',
          shippingDetails: shipping,
          seller: { '@type': 'FurnitureStore', name: business.name },
        },
      },
    })),
  };
}

/** Exported for the build verification, which asserts the deposit shown on a
 *  card and the deposit rule on the delivery page are the same arithmetic. */
export const depositFor = (price: number): number =>
  Math.max(deposit.minimum, Math.round((price * deposit.percent) / 100));

/** Also exported for verification: the catalogue should be the largest in the
 *  set, and this is the number the report quotes. */
export const catalogueSize = (): number => products.length;
