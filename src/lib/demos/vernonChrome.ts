// Chrome props and route constants for the Vernon Street Bakehouse site.
import {
  business,
  counterHours,
  fonts,
  footer,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/retail-catalogue-wholesale';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // Counter hours only. The wholesale delivery windows are deliberately not
  // in the footer: a chef reading them would take them for opening times, and
  // a retail customer reading them would turn up at five in the morning.
  footerRows: counterHours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/restaurants/preview/retail-catalogue-wholesale/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  shop: `${BASE}shop`,
  wholesale: `${BASE}wholesale`,
  cakes: `${BASE}cakes`,
  about: `${BASE}about`,
  contact: `${BASE}contact`,
} as const;
