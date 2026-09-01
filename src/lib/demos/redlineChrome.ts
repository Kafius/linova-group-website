// Chrome props and route constants for the Redline Auto Service sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/automotive-book-a-bay';
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

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: '/industries/auto/preview/automotive-book-a-bay/',
  services: '/industries/auto/preview/automotive-book-a-bay/services',
  book: '/industries/auto/preview/automotive-book-a-bay/book',
  whyUs: '/industries/auto/preview/automotive-book-a-bay/why-us',
  contact: '/industries/auto/preview/automotive-book-a-bay/contact',
} as const;
