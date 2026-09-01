// schema.org for Bright Line Painting. HousePainter with areaServed, per the
// playbook brief, plus a documented aggregateRating slot.
//
// ── THE aggregateRating SLOT ─────────────────────────────────────────────
// The brief asks for an aggregateRating slot on this playbook, and this is it:
// the shape is written, the function exists, and it returns null.
//
// It returns null because Bright Line Painting has no reviews. Emitting
// `{ ratingValue: 4.9, reviewCount: 87 }` on a business that has never had a
// customer is the single most common lie in local-trades markup, it is a
// Google structured-data policy violation, and on a site whose entire job is
// local search it is the one thing that can get the client's rich result
// pulled. A demo that ships it teaches the wrong lesson.
//
// On a live build the client connects a review source, real numbers come back,
// and `aggregateRating()` starts returning a block. Until then the slot is
// visible in the code and absent from the page, which is the honest state.
// ─────────────────────────────────────────────────────────────────────────
import { breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  officeHours,
  projects,
  serviceArea,
  services,
} from '../../data/demos/trades-lead-generation';

export { breadcrumbs as demoBreadcrumbs };

/** The four towns, as schema Cities. The same array drives the prose on three
 *  pages, so the markup and the copy cannot name different places. */
const areaServed = (): JsonLd[] =>
  serviceArea.map((area) => ({
    '@type': 'City',
    name: area.town,
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Durham Region, Ontario, Canada' },
  }));

/** THE SLOT. See the note at the top of this file.
 *
 *  When the client has a connected review source, this returns:
 *
 *    {
 *      '@type': 'AggregateRating',
 *      ratingValue: <real average>,
 *      reviewCount: <real count>,
 *      bestRating: 5,
 *      worstRating: 1,
 *    }
 *
 *  Until then it returns null and nothing is emitted. */
export const aggregateRating = (): JsonLd | null => null;

export function housePainter(homePath: string, image: string): JsonLd {
  const rating = aggregateRating();
  return localBusiness({
    type: 'HousePainter',
    business,
    homePath,
    image,
    hours: officeHours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cheque, EFT, Credit Card',
      // The brief names areaServed explicitly, and local search is the whole
      // build on this playbook.
      areaServed: areaServed(),
      serviceType: services.map((service) => service.name),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${business.shortName} services`,
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.summary,
            serviceType: service.name,
            areaServed: areaServed(),
            provider: { '@type': 'HousePainter', name: business.name },
          },
        })),
      },
      // Spread rather than assigned, so a null slot emits no key at all.
      ...(rating ? { aggregateRating: rating } : {}),
    },
  });
}

/** The work page. Each project is a CreativeWork about a place in one of the
 *  four towns — which is the local-search value of the page, and the reason
 *  every project carries its town. */
export function workList(workPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${workPath}#work`,
    name: `${business.name} recent projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.detail,
        about: project.scope,
        locationCreated: {
          '@type': 'City',
          name: project.town,
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Durham Region, Ontario, Canada' },
        },
        creator: { '@type': 'HousePainter', name: business.name },
      },
    })),
  };
}

/** Exported for the build verification: the towns named in the markup must be
 *  exactly the towns named in the copy. */
export const townsInSchema = (): string[] => serviceArea.map((area) => area.town);
