// Chrome props and route constants for the Stillwater sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/multi-service-spa-salon';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  footerRows: hours.map((day) => ({
    label: day.short,
    value: day.closed ? 'Closed' : `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/barbershops/preview/multi-service-spa-salon/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  hair: `${BASE}hair`,
  nails: `${BASE}nails`,
  spa: `${BASE}spa`,
  packages: `${BASE}packages`,
  book: `${BASE}book`,
  team: `${BASE}team`,
  contact: `${BASE}contact`,
} as const;

/** Category id -> its page, so the booking flow and the home page agree. */
export const categoryRoute: Record<string, string> = {
  hair: routes.hair,
  nails: routes.nails,
  spa: routes.spa,
};
