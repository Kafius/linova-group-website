// schema.org for Northline. ProfessionalService with areaServed and
// serviceType, per the playbook brief, plus BreadcrumbList on inner pages.
//
// What is deliberately NOT published: aggregateRating and review. A contractor
// with no reviews is not improved by inventing some, and a demo that ships
// fabricated ratings teaches the client the wrong lesson about markup.
//
// Prices are absent for the same reason they are absent from the page: every
// site is quoted after a walkthrough, so any figure here would be fiction.
import { abs, breadcrumbs, localBusiness, openingHours, type JsonLd } from './shared';
import {
  business,
  officeHours,
  serviceArea,
  services,
} from '../../data/demos/b2b-commercial-services';

export { breadcrumbs as demoBreadcrumbs };

const areaServed = (): JsonLd[] =>
  serviceArea.map((city) => ({
    '@type': 'City',
    name: city,
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
  }));

export function professionalService(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'ProfessionalService',
    business,
    homePath,
    image,
    hours: officeHours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      // The brief names both of these explicitly.
      areaServed: areaServed(),
      serviceType: services.map((service) => service.name),
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cheque, EFT, Credit Card',
      // Every line of work is quoted after a walkthrough, so the catalogue
      // carries descriptions and no prices.
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${business.name} services`,
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.summary,
            serviceType: service.name,
            provider: { '@id': abs(homePath) },
          },
        })),
      },
    },
  });
}

/** The services page publishes the same catalogue as an ItemList, which is
 *  the shape a listing page should carry. */
export function serviceList(servicesPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': abs(servicesPath),
    name: `${business.name} scope of services`,
    url: abs(servicesPath),
    numberOfItems: services.length,
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.summary,
        serviceType: service.name,
        areaServed: areaServed(),
        provider: { '@type': 'ProfessionalService', name: business.name },
      },
    })),
  };
}

/** Exported for the build verification, which asserts the office hours in the
 *  markup and the hours in the schema are the same seven rows. */
export const officeHoursSchema = (): JsonLd[] =>
  openingHours(
    officeHours.map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close }))
  );
