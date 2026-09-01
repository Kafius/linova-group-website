// schema.org for The Foundry on Bay. EventVenue with maximumAttendeeCapacity
// and amenityFeature, per the playbook brief, plus BreadcrumbList on inner
// pages and an ImageGallery on the gallery page.
//
// What is deliberately NOT published:
//   · aggregateRating and review — a venue with no reviews is not improved by
//     inventing some, and a demo that ships fabricated ratings teaches the
//     client the wrong lesson about markup.
//   · Event documents. Publishing Event markup for weddings that have not
//     happened would put fictional dates into a rich result. The venue is a
//     Place; the events are somebody else's.
//
// Prices ARE published here, because unlike Northline every package on the
// pricing page carries a real from-rate. The one that does not — film, which
// is quoted per project — carries no priceSpecification rather than a zero.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  business,
  capacity,
  gallery,
  included,
  packages,
  rooms,
  viewingHours,
} from '../../data/demos/venue-event-space';

export { breadcrumbs as demoBreadcrumbs };

/** The brief names amenityFeature explicitly. Each is a real thing in the
 *  building, taken from the inventory the page publishes. */
const amenities = (): JsonLd[] =>
  included.map((entry) => ({
    '@type': 'LocationFeatureSpecification',
    name: entry.title,
    value: true,
  }));

export function eventVenue(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'EventVenue',
    business,
    homePath,
    image,
    hours: viewingHours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      // Both named in the brief.
      maximumAttendeeCapacity: capacity.standing,
      amenityFeature: amenities(),
      currenciesAccepted: 'CAD',
      paymentAccepted: 'EFT, Cheque, Credit Card',
      isAccessibleForFree: false,
      publicAccess: false,
      smokingAllowed: false,
      // The seated figure is the one planners actually search on, so it is
      // published as a named sub-capacity rather than lost.
      containsPlace: rooms.map((room) => ({
        '@type': 'Room',
        name: room.name,
        description: room.blurb,
      })),
      makesOffer: packages
        .filter((tier) => tier.fromPrice !== null)
        .map((tier) => ({
          '@type': 'Offer',
          name: tier.name,
          description: tier.summary,
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: tier.fromPrice,
            priceCurrency: 'CAD',
            valueAddedTaxIncluded: false,
          },
        })),
    },
  });
}

/** The gallery page. ImageGallery is the honest type for a set of photographs
 *  of one place — it is not a Product listing and it is not a set of Events. */
export function imageGallery(galleryPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': abs(galleryPath),
    name: `${business.name} gallery`,
    url: abs(galleryPath),
    inLanguage: 'en-CA',
    about: { '@type': 'EventVenue', name: business.name },
    // The photographer credit is a published obligation, not decoration —
    // the release is conditional on it, so it belongs in the markup too.
    image: gallery.map((item) => ({
      '@type': 'ImageObject',
      caption: item.caption,
      description: item.photo.alt,
      creditText: item.credit,
      creator: { '@type': 'Person', name: item.credit },
      copyrightNotice: `© ${item.credit}`,
      contentLocation: { '@type': 'Place', name: `${item.room}, ${business.name}` },
    })),
  };
}

/** Exported for the build verification, which asserts the capacity in the
 *  markup and the capacity in the schema are the same number. */
export const publishedCapacity = (): { seated: number; standing: number } => ({
  seated: capacity.seated,
  standing: capacity.standing,
});
