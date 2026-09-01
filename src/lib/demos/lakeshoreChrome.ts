// Chrome props and route constants for the Lakeshore sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/clinic-practitioner';
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

const BASE = '/industries/clinic/preview/clinic-practitioner/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  services: `${BASE}services`,
  practitioners: `${BASE}practitioners`,
  newPatients: `${BASE}new-patients`,
  booking: `${BASE}booking`,
  faq: `${BASE}faq`,
  insurance: `${BASE}insurance`,
  contact: `${BASE}contact`,
} as const;
