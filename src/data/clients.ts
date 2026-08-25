// The client roster — feeds the quiet logo band (act 6) and proof links.
// Logos live in /public/clients/.

export interface Client {
  name: string;
  logo: string;
  url: string;
  /** stacked/crest logos need the taller slot to read at the same weight */
  logoHeight: 'base' | 'tall';
  /** link into a vertical where one applies */
  industrySlug?: string;
}

export const clients: Client[] = [
  { name: 'Cherry Grove Group', logo: '/clients/cherrygrovegroup-logo.png', url: 'https://www.cherrygrovegroup.com', logoHeight: 'tall', industrySlug: 'contractors' },
  { name: 'Bikong', logo: '/clients/bikong-logo.png', url: 'https://bikong.ca', logoHeight: 'base', industrySlug: 'restaurants' },
  { name: 'Macao Imperial Tea London', logo: '/clients/macao-imperial-tea-logo.jpg', url: 'https://www.macaoimperialtealondon.com', logoHeight: 'base', industrySlug: 'restaurants' },
  { name: 'LiveRoof Ontario', logo: '/clients/liveroof-ontario-logo.svg', url: 'https://www.liveroofontario.ca', logoHeight: 'base', industrySlug: 'supply' },
  { name: 'Markham Taekwondo Academy', logo: '/clients/mta-logo.jpg', url: 'https://www.markhamtaekwondo.com', logoHeight: 'base', industrySlug: 'schools' },
  { name: 'Global Music Solutions', logo: '/clients/gms-logo.svg', url: 'https://www.globalmusicsolutions.ca', logoHeight: 'base', industrySlug: 'schools' },
  { name: 'EasyCare Trans', logo: '/clients/easycare-logo.png', url: 'https://www.ecaretransinc.com', logoHeight: 'tall', industrySlug: 'transport' },
  { name: 'GT Payments', logo: '/clients/gtpayments-logo.png', url: 'https://gtpayments.ca', logoHeight: 'base' },
  { name: 'GT Legacy', logo: '/clients/gtlegacy-logo.png', url: 'https://gtlegacy.com', logoHeight: 'tall' },
  { name: 'Dataverse', logo: '/clients/dataverse-logo.jpg', url: 'https://www.dataverse.ph', logoHeight: 'base' },
];
