// Chrome props and route constants for the Gravel Road Tacos sample site.
//
// There is no gravelRoadJsonld.ts alongside this file, and that is the point:
// the Food Truck Lite playbook has no SEO Setup line item, so the demo ships
// no schema.org at all. Every other demo in the catalogue has one.
import {
  business,
  fonts,
  footer,
  navigation,
  ribbon,
  schedule,
  theme,
} from '../../data/demos/fnb-food-truck-lite';
import { buildChrome, formatTime } from './shared';

export const chrome = buildChrome({
  business,
  theme,
  fonts,
  navigation,
  ribbon,
  footer,
  // The footer column is this week's stops rather than opening hours, because
  // a truck does not have opening hours — it has a place to be. Closed days
  // carry the place name instead of a time range.
  footerRows: schedule.map((stop) => ({
    label: stop.day.slice(0, 3),
    value: stop.from ? `${formatTime(stop.from)} · ${stop.place}` : stop.place,
  })),
});

const BASE = '/industries/restaurants/preview/fnb-food-truck-lite/';

/** One page. The nav items are anchors on it. */
export const routes = {
  home: BASE,
} as const;
