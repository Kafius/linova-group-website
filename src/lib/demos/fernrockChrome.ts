// Chrome props and route constants for the Fernrock sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/fnb-cafe-order-ahead';
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
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/restaurants/preview/fnb-cafe-order-ahead/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  menu: `${BASE}menu`,
  order: `${BASE}order`,
  coffee: `${BASE}coffee`,
  contact: `${BASE}contact`,
} as const;
