// Chrome props and route constants for The Foundry on Bay sample site.
import {
  business,
  fonts,
  footer,
  navigation,
  ribbon,
  theme,
  viewingHours,
} from '../../data/demos/venue-event-space';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // Viewing hours, not opening hours. Nobody walks into a venue, and putting
  // "Mon–Fri 9–5" in a venue footer invites exactly the wrong phone call.
  footerRows: viewingHours.map((day) => ({
    label: day.short,
    value: `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/venue/preview/venue-event-space/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  space: `${BASE}space`,
  weddings: `${BASE}weddings`,
  corporate: `${BASE}corporate`,
  gallery: `${BASE}gallery`,
  pricing: `${BASE}pricing`,
  checkADate: `${BASE}check-a-date`,
  contact: `${BASE}contact`,
} as const;
