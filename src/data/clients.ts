// The client roster — feeds the quiet logo band (act 6) and proof links.
//
// Logos are imported, not public/ paths: that puts them through Astro's image
// pipeline, which resizes and re-encodes them to the size they actually
// render at. Served raw from public/ they were 1.5MB for boxes no larger than
// 190x66 — one of them a 1MB JPEG. Same reason src/data/caseStudies.ts
// imports its screenshots. Drop a new logo in src/assets/clients/ and import
// it here; a missing file is a build error rather than a broken image.
import type { ImageMetadata } from 'astro';
import bikong from '../assets/clients/bikong-logo.png';
import cherrygrove from '../assets/clients/cherrygrovegroup-logo.png';
import dataverse from '../assets/clients/dataverse-logo.jpg';
import easycare from '../assets/clients/easycare-logo.png';
import gms from '../assets/clients/gms-logo.svg';
import gtlegacy from '../assets/clients/gtlegacy-logo.png';
import gtpayments from '../assets/clients/gtpayments-logo.png';
import liveroof from '../assets/clients/liveroof-ontario-logo.svg';
import macao from '../assets/clients/macao-imperial-tea-logo.jpg';
import mta from '../assets/clients/mta-logo.jpg';

export interface Client {
  name: string;
  logo: ImageMetadata;
  url: string;
  /** stacked/crest logos need the taller slot to read at the same weight */
  logoHeight: 'base' | 'tall';
  /** link into a vertical where one applies */
  industrySlug?: string;
}

export const clients: Client[] = [
  { name: 'Cherry Grove Group', logo: cherrygrove, url: 'https://www.cherrygrovegroup.com', logoHeight: 'tall', industrySlug: 'contractors' },
  { name: 'Bikong', logo: bikong, url: 'https://bikong.ca', logoHeight: 'base', industrySlug: 'restaurants' },
  { name: 'Macao Imperial Tea London', logo: macao, url: 'https://www.macaoimperialtealondon.com', logoHeight: 'base', industrySlug: 'restaurants' },
  { name: 'LiveRoof Ontario', logo: liveroof, url: 'https://www.liveroofontario.ca', logoHeight: 'base', industrySlug: 'supply' },
  { name: 'Markham Taekwondo Academy', logo: mta, url: 'https://www.markhamtaekwondo.com', logoHeight: 'base', industrySlug: 'schools' },
  { name: 'Global Music Solutions', logo: gms, url: 'https://www.globalmusicsolutions.ca', logoHeight: 'base', industrySlug: 'schools' },
  { name: 'EasyCare Trans', logo: easycare, url: 'https://www.ecaretransinc.com', logoHeight: 'tall', industrySlug: 'transport' },
  { name: 'GT Payments', logo: gtpayments, url: 'https://gtpayments.ca', logoHeight: 'base' },
  { name: 'GT Legacy', logo: gtlegacy, url: 'https://gtlegacy.com', logoHeight: 'tall' },
  { name: 'Dataverse', logo: dataverse, url: 'https://www.dataverse.ph', logoHeight: 'base' },
];
