// Chrome props and route constants for the Bright Line Painting site.
import {
  business,
  fonts,
  footer,
  navigation,
  officeHours,
  ribbon,
  theme,
} from '../../data/demos/trades-lead-generation';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  footerRows: officeHours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/contractors/preview/trades-lead-generation/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  services: `${BASE}services`,
  work: `${BASE}work`,
  estimate: `${BASE}estimate`,
  contact: `${BASE}contact`,
} as const;
