// schema.org for Fernrock. CafeOrCoffeeShop with the menu as a separate page,
// plus BreadcrumbList on inner pages.
//
// The customisation choices are published as MenuItem `offers` with a
// `menuAddOn` for the oat-milk surcharge — it is the only choice that costs
// anything, and a price shown without it would be understated.
import { abs, breadcrumbs, localBusiness, type JsonLd } from './shared';
import { business, hours, lines, menu, itemsIn } from '../../data/demos/fnb-cafe-order-ahead';

export { breadcrumbs as demoBreadcrumbs };

export function cafe(homePath: string, menuPath: string, image: string): JsonLd {
  return localBusiness({
    type: 'CafeOrCoffeeShop',
    business,
    homePath,
    image,
    hours: hours.map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      priceRange: '$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      servesCuisine: ['Coffee', 'Bubble Tea', 'Bakery'],
      acceptsReservations: 'False',
      hasMenu: abs(menuPath),
      publicAccess: true,
    },
  });
}

export function cafeMenu(menuPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': abs(menuPath),
    name: `${business.name} menu`,
    url: abs(menuPath),
    inLanguage: 'en-CA',
    hasMenuSection: lines.map((line) => ({
      '@type': 'MenuSection',
      name: line.name,
      description: line.blurb,
      hasMenuItem: itemsIn(line.id).map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.dietary?.length
          ? {
              suitableForDiet: item.dietary.map((d) =>
                d === 'VG' ? 'https://schema.org/VeganDiet' : 'https://schema.org/VegetarianDiet'
              ),
            }
          : {}),
        offers: {
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'CAD',
        },
        // The only customisation that changes the price. Publishing the rest
        // as add-ons would imply they cost something, which they do not.
        ...(item.customisable
          ? {
              menuAddOn: [
                {
                  '@type': 'MenuItem',
                  name: 'Oat milk',
                  offers: { '@type': 'Offer', price: '0.75', priceCurrency: 'CAD' },
                },
              ],
            }
          : {}),
      })),
    })),
  };
}

/** Sanity check used by the build verification: every menu item appears once. */
export const menuItemCount = (): number => menu.length;
