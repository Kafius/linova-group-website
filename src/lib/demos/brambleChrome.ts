// Chrome props and route constants for the Bramble & Bone sample site.
// Each preview page is its own file so it can be edited on its own, but the
// fifteen chrome props are identical across all five and retyping them per
// page is how four of them quietly drift out of sync.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/retail-online-store';
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
  home: '/industries/retail/preview/retail-online-store/',
  shop: '/industries/retail/preview/retail-online-store/shop',
  about: '/industries/retail/preview/retail-online-store/about',
  stockists: '/industries/retail/preview/retail-online-store/stockists',
  contact: '/industries/retail/preview/retail-online-store/contact',
} as const;
