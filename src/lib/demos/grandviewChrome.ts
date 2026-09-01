// Chrome props and route constants for the Grandview Food Distribution site.
import {
  business,
  fonts,
  footer,
  navigation,
  ribbon,
  theme,
  warehouseHours,
} from '../../data/demos/b2b-distributor-wholesale';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // Warehouse hours, not office hours. A distributor's customers care what
  // time the building is open, because that is when will-call collection is
  // possible and when the desks can be reached.
  footerRows: warehouseHours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/supply/preview/b2b-distributor-wholesale/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  products: `${BASE}products`,
  delivery: `${BASE}delivery`,
  apply: `${BASE}apply`,
  about: `${BASE}about`,
  contact: `${BASE}contact`,
} as const;
