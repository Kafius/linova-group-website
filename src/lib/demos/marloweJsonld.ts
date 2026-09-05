// schema.org for the Elena Marlowe sample site. RealEstateAgent for the
// business, a Person for the registrant, and an ItemList of Offers on each of
// the two listing pages.
//
// Three things are deliberately NOT here:
//
//  · No aggregateRating and no review markup. A fictional agent must not
//    publish a rating, and a real one should not invent one — search engines
//    render this as fact.
//  · No REALTOR or MLS terms anywhere, in the visible copy or in the markup.
//    Those are certification marks; a site earns them through its own
//    membership, not through our template.
//  · No exact geo coordinates on a rental. A pin on the door of an occupied
//    unit is a safety problem, and structured data is the last place anyone
//    would think to look for one.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import {
  agent,
  availability,
  brokerage,
  business,
  listings,
  neighbourhoods,
  type Deal,
  type Listing,
} from '../../data/demos/real-estate-agent';

export { breadcrumbs as demoBreadcrumbs };

/** The accommodation subtype for each of our property types. Anything that is
 *  not a stacked unit files as a single-family residence; a duplex is neither,
 *  so it stays on the generic Residence. */
const accommodationType = (listing: Listing): string => {
  if (listing.type === 'Condo apartment') return 'Apartment';
  if (listing.type === 'Duplex') return 'Residence';
  return 'SingleFamilyResidence';
};

export function realEstateAgent(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'RealEstateAgent',
    business,
    homePath,
    image,
    hours: availability.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      parentOrganization: {
        '@type': 'RealEstateAgent',
        name: brokerage.name,
        address: brokerage.office,
        telephone: brokerage.officePhone,
      },
      employee: {
        '@type': 'Person',
        name: agent.name,
        jobTitle: agent.title,
        worksFor: { '@type': 'Organization', name: brokerage.name },
      },
      // The city each area sits in, read off the listings rather than
      // written twice: five of the six are Burlington and Waterdown is on the
      // Hamilton side of the line, and that is a fact the listings already
      // carry. Falls back to Burlington for an area with nothing on it yet.
      areaServed: neighbourhoods.map((area) => ({
        '@type': 'Place',
        name: `${area.name}, ${
          listings.find((listing) => listing.neighbourhood === area.name)?.city ?? 'Burlington'
        }, ON`,
      })),
      knowsLanguage: ['en', 'pt'],
      currenciesAccepted: 'CAD',
      disambiguatingDescription: brokerage.solicitation,
    },
  });
}

/** One Offer per listing, wrapped in an ItemList so the order on the page and
 *  the order in the markup are the same order. A sale is a Sell offer with a
 *  flat price; a lease is a LeaseOut offer priced per month, which is a
 *  UnitPriceSpecification rather than a bare number — the difference matters,
 *  because "2750" with no unit reads as the price of the apartment. */
export function listingList(path: string, deal: Deal, heading: string): JsonLd {
  const matching = listings.filter((listing) => listing.deal === deal);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: heading,
    url: abs(path),
    numberOfItems: matching.length,
    itemListElement: matching.map((listing, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Offer',
        name: listing.address,
        description: listing.blurb,
        identifier: listing.ref,
        url: abs(path),
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        businessFunction:
          deal === 'sale'
            ? 'http://purl.org/goodrelations/v1#Sell'
            : 'http://purl.org/goodrelations/v1#LeaseOut',
        ...(deal === 'sale'
          ? { price: listing.price }
          : {
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: listing.price,
                priceCurrency: 'CAD',
                unitCode: 'MON',
                referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
              },
            }),
        seller: { '@type': 'RealEstateAgent', name: business.name, '@id': abs('/industries/real-estate/preview/real-estate-agent/') },
        itemOffered: {
          '@type': accommodationType(listing),
          name: listing.address,
          numberOfBedrooms: listing.beds,
          numberOfBathroomsTotal: listing.baths,
          ...(listing.sqft
            ? {
                floorSize: {
                  '@type': 'QuantitativeValue',
                  value: listing.sqft,
                  unitCode: 'FTK',
                },
              }
            : {}),
          address: {
            '@type': 'PostalAddress',
            // Street only where it is a lease: the unit is occupied, and a
            // full civic address in structured data is a lookup waiting to
            // happen.
            ...(deal === 'sale' ? { streetAddress: listing.address } : {}),
            addressLocality: listing.city,
            addressRegion: 'ON',
            addressCountry: 'CA',
          },
        },
      },
    })),
  };
}

/** The registrant, on the about page. Name, category and brokerage — the
 *  three things Ontario advertising rules put together — and nothing that
 *  claims a result. */
export function agentPerson(aboutPath: string, image: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${abs(aboutPath)}#elena`,
    name: agent.name,
    jobTitle: agent.title,
    image: abs(image),
    url: abs(aboutPath),
    telephone: business.phone,
    email: business.email,
    knowsLanguage: ['en', 'pt'],
    worksFor: {
      '@type': 'RealEstateAgent',
      name: brokerage.name,
      address: brokerage.office,
    },
    areaServed: agent.areas,
  };
}
