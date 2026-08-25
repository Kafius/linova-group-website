// The seven plotted motifs — one visual signature per vertical (design plan).
// Rules: inline SVG only, stroke = currentColor (the vertical's accent is set
// by the consumer), fill none, no filters. Every path is drawable via
// stroke-dashoffset. Each motif stays under ~2KB.

export interface Motif {
  viewBox: string;
  /** inner SVG markup — paths/shapes only, stroke uses currentColor */
  svg: string;
}

export const motifs: Record<string, Motif> = {
  // Barbershops — the pole helix: diagonal stripes climbing a column
  'pole-helix': {
    viewBox: '0 0 240 360',
    svg: `
      <rect x="60" y="20" width="120" height="320" rx="60" stroke-width="2" opacity="0.5"/>
      <path d="M62 120 L178 60" stroke-width="10" stroke-linecap="round"/>
      <path d="M62 190 L178 130" stroke-width="10" stroke-linecap="round"/>
      <path d="M62 260 L178 200" stroke-width="10" stroke-linecap="round"/>
      <path d="M62 330 L178 270" stroke-width="10" stroke-linecap="round"/>`,
  },

  // Restaurants — floor-plan tops: 2-tops and 4-tops on the pass
  'floor-plan-tops': {
    viewBox: '0 0 360 300',
    svg: `
      <circle cx="90" cy="80" r="38" stroke-width="2"/>
      <path d="M90 30 v-14 M90 130 v14 M40 80 h-14 M140 80 h14" stroke-width="6" stroke-linecap="round"/>
      <circle cx="250" cy="90" r="52" stroke-width="2"/>
      <path d="M250 26 v-14 M250 154 v14 M186 90 h-14 M314 90 h14 M205 45 l-10 -10 M295 45 l10 -10 M205 135 l-10 10 M295 135 l10 10" stroke-width="6" stroke-linecap="round"/>
      <circle cx="120" cy="220" r="44" stroke-width="2"/>
      <path d="M120 164 v-14 M120 276 v14 M64 220 h-14 M176 220 h14" stroke-width="6" stroke-linecap="round"/>
      <rect x="230" y="190" width="110" height="60" rx="4" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/>`,
  },

  // Contractors — dimension lines: extension lines, arrowheads, tick callouts
  'dimension-lines': {
    viewBox: '0 0 400 280',
    svg: `
      <rect x="60" y="60" width="280" height="140" stroke-width="2"/>
      <path d="M60 230 h280" stroke-width="1.5"/>
      <path d="M60 216 v28 M340 216 v28" stroke-width="1.5"/>
      <path d="M60 230 l16 -6 v12 z M340 230 l-16 -6 v12 z" stroke-width="1.5" fill="currentColor"/>
      <path d="M30 60 v140" stroke-width="1.5"/>
      <path d="M16 60 h28 M16 200 h28" stroke-width="1.5"/>
      <path d="M30 60 l-6 16 h12 z M30 200 l-6 -16 h12 z" stroke-width="1.5" fill="currentColor"/>
      <path d="M130 60 v-24 M270 60 v-24 M130 36 h140" stroke-width="1.5" opacity="0.6"/>`,
  },

  // Schools & instruction — the strike arc: a motion-capture trajectory
  'strike-arc': {
    viewBox: '0 0 400 300',
    svg: `
      <path d="M40 260 C 100 250, 200 220, 280 140 S 350 50, 360 40" stroke-width="3"/>
      <circle cx="40" cy="260" r="7" stroke-width="2"/>
      <circle cx="152" cy="235" r="5" stroke-width="2" opacity="0.75"/>
      <circle cx="248" cy="170" r="5" stroke-width="2" opacity="0.75"/>
      <circle cx="322" cy="88" r="5" stroke-width="2" opacity="0.75"/>
      <circle cx="360" cy="40" r="9" stroke-width="3"/>
      <path d="M348 20 l24 0 M360 8 l0 24" stroke-width="2" opacity="0.6"/>`,
  },

  // B2B & supply — the pitch triangle: rise over run, spec-sheet style
  'pitch-triangle': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M40 240 H360 L40 60 Z" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M40 240 h34 v-34" stroke-width="2" opacity="0.7"/>
      <path d="M20 60 v180 M12 60 h16 M12 240 h16" stroke-width="1.5" opacity="0.7"/>
      <path d="M40 260 h320 M40 252 v16 M360 252 v16" stroke-width="1.5" opacity="0.7"/>
      <path d="M212 150 l26 0 M225 137 l0 26" stroke-width="2" opacity="0.5"/>`,
  },

  // Retail — the barcode stack with a swing tag
  'barcode-stack': {
    viewBox: '0 0 360 300',
    svg: `
      <path d="M60 60 v180" stroke-width="10"/>
      <path d="M88 60 v180" stroke-width="4"/>
      <path d="M110 60 v180" stroke-width="14"/>
      <path d="M140 60 v180" stroke-width="4"/>
      <path d="M162 60 v180" stroke-width="8"/>
      <path d="M188 60 v180" stroke-width="14"/>
      <path d="M216 60 v180" stroke-width="4"/>
      <path d="M238 60 v180" stroke-width="10"/>
      <path d="M262 120 q 30 18 28 52" stroke-width="2" stroke-dasharray="5 5" opacity="0.7"/>
      <rect x="272" y="168" width="66" height="42" rx="4" stroke-width="2" transform="rotate(8 305 189)"/>
      <circle cx="284" cy="180" r="3" stroke-width="2" transform="rotate(8 305 189)"/>`,
  },

  // Services & transport — the route polyline: A to B with waypoints
  'route-polyline': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M50 230 C 110 230, 120 150, 190 150 S 280 80, 350 60" stroke-width="3" stroke-dasharray="10 8"/>
      <circle cx="50" cy="230" r="10" stroke-width="3"/>
      <circle cx="190" cy="150" r="6" stroke-width="2" opacity="0.75"/>
      <circle cx="350" cy="60" r="10" stroke-width="3"/>
      <path d="M350 38 l0 -14 M350 24 a4 4 0 1 1 0.1 0" stroke-width="2" opacity="0.6"/>`,
  },
};

export const getMotif = (id: string): Motif | undefined => motifs[id];
