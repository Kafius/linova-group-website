// Chrome props and route constants for the Elena Marlowe sample site.
import {
  availability,
  business,
  fonts,
  footer,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/real-estate-agent';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // Not opening hours — an agent has no shop door. The right-hand footer
  // column answers "if I call, will anyone pick up", which is the question a
  // person standing outside a house at 6pm on a Sunday is actually asking.
  footerRows: availability.map((day) => ({
    label: day.short,
    value: day.note
      ? `${formatTime(day.open)} – ${formatTime(day.close)} · ${day.note}`
      : `${formatTime(day.open)} – ${formatTime(day.close)}`,
  })),
});

const BASE = '/industries/real-estate/preview/real-estate-agent/';

/** Written once, so the JSON-LD, the nav and the breadcrumbs all agree. */
export const routes = {
  home: BASE,
  buy: `${BASE}buy`,
  rent: `${BASE}rent`,
  about: `${BASE}about`,
  contact: `${BASE}contact`,
  enquiry: `${BASE}contact#enquiry`,
} as const;

/** The enquiry link for one listing. The reference rides in the query string
 *  and the contact form reads it back — which is the whole point of giving a
 *  listing a reference the agent controls rather than a board's number. */
export const enquiryFor = (ref: string): string =>
  `${routes.contact}?ref=${encodeURIComponent(ref)}#enquiry`;
