// schema.org for Almond & Rye. Bakery with hasMenu and
// openingHoursSpecification, per the playbook brief.
//
// Two things this markup does that most bakery markup does not:
//
//   · `availability` is set per item. Three of the four loaves are pre-order
//     only, and PreOrder is a different promise from InStock. A rich result
//     that says a walk-in can have a seeded sourdough at nine on a Tuesday
//     would be a lie the counter has to apologise for.
//   · The custom cakes carry NO Offer at all — only a price range in prose on
//     the page. A cake is quoted, so publishing "from $58" as an offer price
//     would be selling something nobody has priced yet.
//
// Not published: aggregateRating and review.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, itemsIn, menuLines } from '../../data/demos/fnb-bakery-pre-order';

export { breadcrumbs as demoBreadcrumbs };

export function bakery(homePath: string, menuPath: string, image: string): JsonLd {
  return localBusiness({
    type: 'Bakery',
    business,
    homePath,
    image,
    // The brief names openingHoursSpecification explicitly, and on a bakery
    // it is the single most looked-up fact on the site.
    hours: hours.map((day) => ({
      schemaDay: day.schemaDay,
      open: day.open,
      close: day.close,
    })),
    extra: {
      priceRange: '$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      servesCuisine: ['Bakery'],
      hasMenu: abs(menuPath),
      acceptsReservations: 'False',
      publicAccess: true,
    },
  });
}

/** The board. Prices published because they are on the page, and availability
 *  told honestly per item. */
export function boardMenu(menuPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': abs(menuPath),
    name: `${business.name} daily menu`,
    url: abs(menuPath),
    inLanguage: 'en-CA',
    hasMenuSection: menuLines.map((line) => ({
      '@type': 'MenuSection',
      name: line.name,
      description: line.blurb,
      hasMenuItem: itemsIn(line.id).map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.dietary?.length
          ? {
              suitableForDiet: item.dietary.map((d): string =>
                d === 'VG' ? 'https://schema.org/VeganDiet' : 'https://schema.org/VegetarianDiet'
              ),
            }
          : {}),
        offers: {
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'CAD',
          eligibleQuantity: { '@type': 'QuantitativeValue', unitText: item.unit },
          availability: item.preOrderOnly
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/InStoreOnly',
        },
      })),
    })),
  };
}

/** Exported for the build verification: how many menu items are published as
 *  PreOrder rather than InStoreOnly, which must match the data. */
export const preOrderCount = (): number =>
  menuLines.flatMap((line) => itemsIn(line.id)).filter((item) => item.preOrderOnly).length;
