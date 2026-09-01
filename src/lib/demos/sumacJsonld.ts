// schema.org for Sumac Street. FastFoodRestaurant with the menu inline,
// because a one-pager has no separate menu URL to point hasMenu at.
import { localBusiness, type JsonLd } from './shared';
import { business, hours, menu } from '../../data/demos/fnb-quick-service-launch';

export function fastFood(homePath: string, image: string): JsonLd {
  return localBusiness({
    type: 'FastFoodRestaurant',
    business,
    homePath,
    image,
    hours: hours.map((day) => ({ schemaDay: day.schemaDay, open: day.open, close: day.close })),
    extra: {
      priceRange: '$',
      currenciesAccepted: 'CAD',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      servesCuisine: ['Middle Eastern', 'Lebanese', 'Halal'],
      acceptsReservations: 'False',
      // Inline rather than a URL: on a one-pager the menu has no page of its
      // own, so the whole Menu object is nested here.
      hasMenu: {
        '@type': 'Menu',
        name: `${business.name} menu`,
        inLanguage: 'en-CA',
        hasMenuSection: menu.map((section) => ({
          '@type': 'MenuSection',
          name: section.name,
          hasMenuItem: section.items.map((item) => ({
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
            offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'CAD' },
          })),
        })),
      },
    },
  });
}
