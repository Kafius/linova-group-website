// Shared scaffolding for the sample sites. Twenty demos each need the same
// chrome props assembled, the same absolute-URL handling, and the same
// PostalAddress and BreadcrumbList blocks; only the business and the schema
// type differ. Writing that twenty times is how nineteen of them quietly
// drift out of sync with the first.
//
// What is NOT here: anything that varies by trade. A restaurant's Menu schema
// and a clinic's MedicalClinic schema live with their own demo.
import { site } from '../../data/site';

export type JsonLd = Record<string, unknown>;

/** Absolute URL on the Linova host, which is where the demos are served. */
export const abs = (path: string): string => new URL(path, site.url).href;

export interface DemoAddress {
  street: string;
  /** the neighbourhood, where the business trades on having one */
  neighbourhood?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface DemoBusiness {
  name: string;
  shortName: string;
  positioning: string;
  address: DemoAddress;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export interface DemoTheme {
  ink: string;
  inkRaised: string;
  inkLine: string;
  paper: string;
  paperRaised: string;
  paperLine: string;
  accent: string;
  accentOnPaper: string;
  /** an optional second accent, for a demo that genuinely has two product
   *  lines to separate. Falls back to the first accent when absent. */
  accentAlt?: string;
  accentAltOnPaper?: string;
  onAccentAlt?: string;
  onInk: string;
  onInkDim: string;
  onPaper: string;
  onPaperDim: string;
  onAccent: string;
  displayFont: string;
  bodyFont: string;
  /** an optional mono face, for a demo whose register wants its figures set
   *  apart — spec sheets, tender documents, price lists. Falls back to the
   *  system mono stack when absent. */
  monoFont?: string;
  /** font-variation-settings for the display face; omit if it has no axes */
  displayAxes?: string;
  /** corner radius on buttons and inputs — geometry is part of the identity */
  radius?: string;
  /** body line-height, for demos whose brief asks for roomier reading */
  leading?: string;
  /** replaces the default body-size clamp outright */
  bodySize?: string;
}

/** A self-hosted face for one demo, under public/fonts/demos/. */
export interface DemoFont {
  family: string;
  file: string;
  weight: string;
}

export interface DemoNavigation {
  links: { href: string; label: string }[];
  cta: { href: string; label: string; event?: string };
  /** one-pagers set this, because their nav links are anchors */
  brandHref?: string;
  menuToggleOpen: string;
  menuToggleClose: string;
  skipToContent: string;
}

export interface DemoRibbon {
  text: string;
  linkLabel: string;
  linkHref: string;
}

export interface DemoFooter {
  tagline: string;
  /** heading over the right-hand column — hours, service areas, whatever the
   *  trade actually wants a visitor to check before they call */
  rowsHeading: string;
  findUsHeading: string;
  legal: string;
}

/** The minimum a demo module must export for buildChrome to assemble it. */
export interface DemoCore {
  business: DemoBusiness;
  theme: DemoTheme;
  /** display face first — DemoLayout preloads it */
  fonts: DemoFont[];
  navigation: DemoNavigation;
  ribbon: DemoRibbon;
  footer: DemoFooter;
  /** the right-hand footer column: opening hours, service areas, lead times */
  footerRows: { label: string; value: string }[];
}

/** The fifteen chrome props DemoLayout takes, assembled once per demo.
 *  Pages spread this and add their own title, description, current and
 *  JSON-LD — retyping it per page is how four of five pages drift. */
export const buildChrome = (core: DemoCore) => ({
  theme: core.theme,
  fonts: core.fonts,
  brand: core.business.name,
  tagline: core.business.positioning,
  navLinks: [...core.navigation.links],
  navCta: core.navigation.cta,
  ...(core.navigation.brandHref ? { brandHref: core.navigation.brandHref } : {}),
  navToggleOpen: core.navigation.menuToggleOpen,
  navToggleClose: core.navigation.menuToggleClose,
  skipLabel: core.navigation.skipToContent,
  ribbon: core.ribbon,
  footerHoursHeading: core.footer.rowsHeading,
  footerFindHeading: core.footer.findUsHeading,
  footerLegal: core.footer.legal,
  footerAddress: [
    core.business.address.street,
    core.business.address.neighbourhood
      ? `${core.business.address.neighbourhood}, ${core.business.address.city}`
      : core.business.address.city,
    `${core.business.address.region} ${core.business.address.postalCode}`,
  ],
  footerPhone: { label: core.business.phone, href: core.business.phoneHref },
  footerEmail: { label: core.business.email, href: core.business.emailHref },
  footerHours: core.footerRows,
});

export const postalAddress = (address: DemoAddress): JsonLd => ({
  '@type': 'PostalAddress',
  streetAddress: address.street,
  addressLocality: address.city,
  addressRegion: address.region,
  postalCode: address.postalCode,
  addressCountry: address.country,
});

export interface DemoDay {
  /** schema.org day token, e.g. 'Monday' */
  schemaDay: string;
  /** 24h "HH:MM"; values past midnight carry on past 24, e.g. "25:00" */
  open: string;
  close: string;
}

/** "25:00" -> "01:00" for schema.org, which wants a wall clock. */
export const toSchemaTime = (time: string): string => {
  const [h = '0', m = '0'] = time.split(':');
  const total = (Number(h) * 60 + Number(m)) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

export const openingHours = (days: DemoDay[]): JsonLd[] =>
  days.map((day) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${day.schemaDay}`,
    opens: toSchemaTime(day.open),
    closes: toSchemaTime(day.close),
  }));

export const breadcrumbs = (items: { name: string; path: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

/** The common LocalBusiness shape. `type` is the schema.org subtype the
 *  playbook's brief names — Store, AutoRepair, MedicalClinic and so on — and
 *  `extra` carries whatever that subtype adds on top. */
export const localBusiness = (options: {
  type: string;
  business: DemoBusiness;
  homePath: string;
  image: string;
  hours?: DemoDay[];
  extra?: JsonLd;
}): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': options.type,
  '@id': abs(options.homePath),
  name: options.business.name,
  description: options.business.positioning,
  url: abs(options.homePath),
  image: abs(options.image),
  telephone: options.business.phone,
  email: options.business.email,
  address: postalAddress(options.business.address),
  ...(options.hours ? { openingHoursSpecification: openingHours(options.hours) } : {}),
  ...options.extra,
});

/** 12 -> "12", 8.5 -> "8.50". Money is written once, the same way, everywhere. */
export const formatPrice = (price: number): string =>
  price % 1 === 0 ? `${price}` : price.toFixed(2);

/** "11:30" -> "11:30 am". Hours past midnight wrap for display only. */
export const formatTime = (time: string): string => {
  const [h = '0', m = '0'] = time.split(':');
  const total = (Number(h) * 60 + Number(m)) % (24 * 60);
  const hour24 = Math.floor(total / 60);
  const minute = total % 60;
  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return minute === 0 ? `${hour12} ${suffix}` : `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
};
