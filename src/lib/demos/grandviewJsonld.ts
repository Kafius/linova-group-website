// schema.org for Grandview. The brief names Organization + WholesaleStore
// with areaServed, and both are here:
//
//   · WholesaleStore is the LocalBusiness — the building on Ambler Drive,
//     its hours, its two contact points.
//   · Organization carries the trading identity and the areaServed, which on
//     a distributor is fourteen municipalities across five routes rather than
//     a radius.
//
// ── NO PRICES, ANYWHERE ──────────────────────────────────────────────────
// The OfferCatalog lists the five categories as Products with their pack
// formats and storage classes. Not one carries a price, an Offer with a
// price, or an availability that implies you can buy it here. E-commerce is
// FALSE on this playbook and markup that implied otherwise would be the site
// contradicting itself in a rich result.
//
// Also not published: aggregateRating and review.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  categories,
  deliveryAreas,
  ordersDesk,
  routes as deliveryRoutes,
  storageLabels,
  warehouseHours,
} from '../../data/demos/b2b-distributor-wholesale';

export { breadcrumbs as demoBreadcrumbs };

const areaServed = (): JsonLd[] =>
  deliveryAreas.map((area) => ({
    '@type': 'City',
    name: area,
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Southern Ontario, Canada' },
  }));

export function wholesaleStore(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'WholesaleStore',
    business,
    homePath,
    image,
    hours: warehouseHours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      currenciesAccepted: 'CAD',
      paymentAccepted: 'EFT, Cheque, Credit Card',
      // Not open to the public — this is a trade counter, and saying so in
      // markup stops a rich result inviting walk-ins at five in the morning.
      publicAccess: false,
      areaServed: areaServed(),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          name: ordersDesk.name,
          telephone: ordersDesk.phone,
          email: ordersDesk.email,
          hoursAvailable: ordersDesk.hours,
          areaServed: 'CA-ON',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'billing support',
          name: 'Accounts desk',
          telephone: business.phone,
          email: business.email,
          areaServed: 'CA-ON',
          availableLanguage: 'English',
        },
      ],
    },
  });
}

/** The trading organisation. Separate from the store because the brief names
 *  both, and because the areaServed belongs to the operation rather than to
 *  the building. */
export function organization(homePath: string, aboutPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${abs(homePath)}#organization`,
    name: business.name,
    url: abs(homePath),
    description: business.positioning,
    foundingDate: '1998',
    areaServed: areaServed(),
    subOrganization: { '@type': 'WholesaleStore', '@id': abs(homePath), name: business.name },
    mainEntityOfPage: abs(aboutPath),
    knowsAbout: categories.map((category) => category.name),
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 31 },
  };
}

/** The product categories. Products with pack formats and a storage class,
 *  and deliberately no Offer and no price on any of them. */
export function catalogue(productsPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': abs(productsPath),
    name: `${business.shortName} product categories`,
    url: abs(productsPath),
    numberOfItems: categories.length,
    itemListElement: categories.map((category, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: category.name,
        description: category.blurb,
        category: storageLabels[category.storage],
        hasMeasurement: category.packs.map((pack) => ({
          '@type': 'QuantitativeValue',
          unitText: pack,
        })),
        manufacturer: { '@type': 'Organization', name: business.name },
        // No `offers` key. See the note at the top of this file.
      },
    })),
  };
}

/** The routes, as delivery-time specifications. This is the page a chef reads
 *  and the one worth making machine-readable. */
export function deliverySchedule(deliveryPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': abs(deliveryPath),
    name: `${business.shortName} delivery routes`,
    url: abs(deliveryPath),
    numberOfItems: deliveryRoutes.length,
    itemListElement: deliveryRoutes.map((route, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: route.name,
        serviceType: 'Wholesale food delivery',
        description: `${route.days} · cut-off ${route.cutOff} · arrival ${route.window}`,
        areaServed: route.areas.map((area) => ({ '@type': 'City', name: area })),
        provider: { '@type': 'WholesaleStore', name: business.name },
        // The minimum is an eligibility condition on the service, not a price
        // for it, which is the honest way to publish a minimum order.
        offers: {
          '@type': 'Offer',
          eligibleTransactionVolume: {
            '@type': 'PriceSpecification',
            minPrice: route.minimum,
            priceCurrency: 'CAD',
          },
        },
      },
    })),
  };
}

/** Exported for the build verification: nothing in the catalogue markup may
 *  carry a price. */
export const catalogueHasPrice = (productsPath: string): boolean =>
  JSON.stringify(catalogue(productsPath)).includes('"price"');
