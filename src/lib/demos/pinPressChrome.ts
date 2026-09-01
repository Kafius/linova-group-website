// Chrome props and route constants for the Pin & Press sample site.
import {
  business,
  fonts,
  footer,
  hours,
  navigation,
  ribbon,
  theme,
} from '../../data/demos/appointment-lite';
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

const BASE = '/industries/tailoring/preview/appointment-lite/';

/** One page. The nav items are anchors on it. */
export const routes = {
  home: BASE,
} as const;
