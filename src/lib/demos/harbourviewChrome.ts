// The chrome props every Harbourview page hands DemoLayout — brand, nav,
// ribbon, footer. Each preview page is its own file so it can be edited on
// its own, but the fifteen chrome props are identical on all five, and
// retyping them per page is how four of them quietly drift out of sync.
//
// Pages spread this and add their own title, description, current and JSON-LD.
import {
  business,
  footer,
  formatTime,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/fnb-full-service';

export const chrome = {
  theme,
  brand: business.name,
  tagline: business.positioning,
  navLinks: [...navigation.links],
  navCta: navigation.cta,
  navToggleOpen: navigation.menuToggleOpen,
  navToggleClose: navigation.menuToggleClose,
  skipLabel: navigation.skipToContent,
  ribbon,
  footerHoursHeading: footer.hoursHeading,
  footerFindHeading: footer.findUsHeading,
  footerLegal: footer.legal,
  footerAddress: [
    business.address.street,
    `${business.address.neighbourhood}, ${business.address.city}`,
    `${business.address.region} ${business.address.postalCode}`,
  ],
  footerPhone: { label: business.phone, href: business.phoneHref },
  footerEmail: { label: business.email, href: business.emailHref },
  footerHours: hours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.barClose)}`,
  })),
};

/** Route constants, so a path is written once and the JSON-LD, the nav and
 *  the breadcrumbs all agree on it. */
export const routes = {
  home: '/industries/restaurants/preview/',
  menu: '/industries/restaurants/preview/menu',
  order: '/industries/restaurants/preview/order',
  about: '/industries/restaurants/preview/about',
  contact: '/industries/restaurants/preview/contact',
} as const;
