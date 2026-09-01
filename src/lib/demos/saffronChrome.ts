// Chrome props and route constants for the Saffron Table sample site.
import {
  business,
  counterHours,
  fonts,
  footer,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/fnb-catering-events';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // Counter hours only. Catering has no opening hours — it has lead times,
  // and those live on the packages page where somebody planning an event
  // will actually read them.
  footerRows: counterHours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/restaurants/preview/fnb-catering-events/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  menu: `${BASE}menu`,
  catering: `${BASE}catering`,
  consultation: `${BASE}consultation`,
  contact: `${BASE}contact`,
} as const;
