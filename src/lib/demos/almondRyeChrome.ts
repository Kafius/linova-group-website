// Chrome props and route constants for the Almond & Rye sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/fnb-bakery-pre-order';
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

const BASE = '/industries/restaurants/preview/fnb-bakery-pre-order/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  menu: `${BASE}menu`,
  preOrder: `${BASE}pre-order`,
  cakes: `${BASE}cakes`,
  contact: `${BASE}contact`,
} as const;
