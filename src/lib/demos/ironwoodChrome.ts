// Chrome props and route constants for the Ironwood Barber Co. sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/appointment-business';
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
  home: '/industries/barbershops/preview/appointment-business/',
  services: '/industries/barbershops/preview/appointment-business/services',
  book: '/industries/barbershops/preview/appointment-business/book',
  barbers: '/industries/barbershops/preview/appointment-business/barbers',
  contact: '/industries/barbershops/preview/appointment-business/contact',
} as const;
