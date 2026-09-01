// Chrome props and route constants for the Cedarview sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/retail-grocery-order-ahead';
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

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: '/industries/retail/preview/retail-grocery-order-ahead/',
  departments: '/industries/retail/preview/retail-grocery-order-ahead/departments',
  order: '/industries/retail/preview/retail-grocery-order-ahead/order-ahead',
  specials: '/industries/retail/preview/retail-grocery-order-ahead/specials',
  contact: '/industries/retail/preview/retail-grocery-order-ahead/contact',
} as const;
