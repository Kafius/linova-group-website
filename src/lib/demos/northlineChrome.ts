// Chrome props and route constants for the Northline sample site.
import {
  business,
  coverage,
  fonts,
  footer,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/b2b-commercial-services';
import { buildChrome } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // Every other demo puts opening hours in this column. A contractor's
  // visitor wants to know when a crew is in the building instead.
  footerRows: coverage,
});

const BASE = '/industries/cleaning/preview/b2b-commercial-services/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  services: `${BASE}services`,
  industries: `${BASE}industries`,
  quote: `${BASE}quote`,
  contact: `${BASE}contact`,
} as const;
