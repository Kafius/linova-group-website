// schema.org for Stillwater. DaySpa with the BeautySalon subtype, opening
// hours, and makesOffer per service generated from the CMS-modelled menu.
import { breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, services } from '../../data/demos/multi-service-spa-salon';

export { breadcrumbs as demoBreadcrumbs };

export function daySpa(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'DaySpa',
    business,
    homePath,
    image,
    // Monday is closed, so it is absent rather than opening and closing at
    // midnight, which reads as open.
    hours: hours
      .filter((day) => !day.closed)
      .map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      '@type': ['DaySpa', 'BeautySalon'],
      priceRange: '$$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      areaServed: { '@type': 'City', name: 'Burlington' },
      // Generated from the same menu the CMS drives, so a seasonal reprice
      // updates the page and the structured data together.
      makesOffer: services.map((service) => ({
        '@type': 'Offer',
        price: service.price.toFixed(2),
        priceCurrency: 'CAD',
        ...(service.from ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: service.price, priceCurrency: 'CAD' } } : {}),
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@type': 'DaySpa', name: business.name },
        },
      })),
    },
  });
}
