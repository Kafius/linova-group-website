// schema.org for the Ironwood Barber Co. sample site. HairSalon with the
// BarberShop subtype, opening hours, and makesOffer per service.
//
// The offers are generated from the same price list the shop prints, so the
// markup and the page can never disagree about what a fade costs.
import { breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, services } from '../../data/demos/appointment-business';

export { breadcrumbs as demoBreadcrumbs };

export function barberShop(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'HairSalon',
    business,
    homePath,
    image,
    // Monday is closed, so it is absent rather than opening and closing at
    // midnight — an OpeningHoursSpecification of 00:00-00:00 reads as open.
    hours: hours
      .filter((day) => !day.closed)
      .map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      '@type': ['HairSalon', 'BarberShop'],
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      areaServed: { '@type': 'City', name: 'Hamilton' },
      makesOffer: services.map((service) => ({
        '@type': 'Offer',
        priceCurrency: 'CAD',
        price: service.price.toFixed(2),
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@type': 'HairSalon', name: business.name },
        },
      })),
    },
  });
}
