// Chrome props and route constants for the Halden Home Furnishings site.
import {
  business,
  fonts,
  footer,
  navigation,
  ribbon,
  showroomHours,
  theme,
} from '../../data/demos/retail-large-catalogue';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  footerRows: showroomHours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/retail/preview/retail-large-catalogue/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  living: `${BASE}living`,
  bedroom: `${BASE}bedroom`,
  dining: `${BASE}dining`,
  appliances: `${BASE}appliances`,
  delivery: `${BASE}delivery`,
  about: `${BASE}about`,
  contact: `${BASE}contact`,
} as const;

/** The route for a category id, so the four category pages and the home page
 *  cannot disagree about where a category lives. */
export const categoryRoute = (id: 'living' | 'bedroom' | 'dining' | 'appliances'): string => routes[id];
