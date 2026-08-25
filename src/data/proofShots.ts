// Real screenshots of live client sites, keyed by vertical — the proof layer
// for /industries/[slug]. Concept verticals have no entry on purpose.
import type { ImageMetadata } from 'astro';
import cherrygrove from '../assets/work/work-cherrygrove.png';
import bikong from '../assets/work/work-bikong.png';
import liveroof from '../assets/work/work-liveroof.png';
import mta from '../assets/work/work-mta.png';
import easycare from '../assets/work/work-easycare.png';

export const proofShots: Record<string, ImageMetadata> = {
  restaurants: bikong,
  contractors: cherrygrove,
  supply: liveroof,
  schools: mta,
  transport: easycare,
};
