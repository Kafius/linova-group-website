// The plotted motifs — one visual signature per vertical (design plan).
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

  // Janitorial & cleaning — the squeegee sweep: a blade and the arcs it leaves
  'squeegee-sweep': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M250 62 l92 40" stroke-width="10" stroke-linecap="round"/>
      <path d="M296 82 l28 -46" stroke-width="4" stroke-linecap="round"/>
      <path d="M60 208 C 122 150, 202 120, 300 106" stroke-width="2.5"/>
      <path d="M62 238 C 132 178, 216 146, 318 130" stroke-width="2.5" opacity="0.7"/>
      <path d="M64 182 C 118 130, 188 98, 282 84" stroke-width="2.5" opacity="0.45"/>
      <circle cx="98" cy="122" r="5" stroke-width="2" opacity="0.7"/>
      <circle cx="142" cy="96" r="3.5" stroke-width="2" opacity="0.55"/>
      <circle cx="76" cy="86" r="3" stroke-width="2" opacity="0.4"/>`,
  },

  // Clinics — the pulse crossing the cross: vitals over the caring symbol
  'pulse-cross': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M170 44 h60 v66 h66 v60 h-66 v66 h-60 v-66 h-66 v-60 h66 z" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M18 140 h56 l16 -42 l26 88 l20 -46 h30" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M296 140 h68" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <circle cx="376" cy="140" r="7" stroke-width="2" opacity="0.7"/>`,
  },

  // Herbal & natural health — the specimen leaf, drawn as a botanical plate
  'leaf-vein': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M58 224 C 88 122, 190 50, 328 58 C 334 192, 218 246, 58 224 Z" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M58 224 C 150 182, 250 122, 328 58" stroke-width="2"/>
      <path d="M110 198 C 138 172, 148 142, 150 114" stroke-width="1.5" opacity="0.7"/>
      <path d="M164 180 C 194 154, 206 126, 210 98" stroke-width="1.5" opacity="0.7"/>
      <path d="M220 156 C 248 132, 260 108, 264 84" stroke-width="1.5" opacity="0.7"/>
      <path d="M124 216 C 156 210, 184 198, 204 184" stroke-width="1.5" opacity="0.45"/>
      <path d="M328 58 l36 -24" stroke-width="1.5" opacity="0.6"/>
      <circle cx="370" cy="28" r="4" stroke-width="1.5" opacity="0.6"/>`,
  },

  // Auto shops — the rotor: bolt circle, vent ring, machined faces
  'rotor-disc': {
    viewBox: '0 0 400 280',
    svg: `
      <circle cx="200" cy="140" r="106" stroke-width="2.5"/>
      <circle cx="200" cy="140" r="90" stroke-width="1.5" opacity="0.6"/>
      <circle cx="200" cy="140" r="46" stroke-width="2.5"/>
      <circle cx="200" cy="140" r="13" stroke-width="2" opacity="0.7"/>
      <circle cx="244" cy="140" r="6" stroke-width="2"/>
      <circle cx="222" cy="102" r="6" stroke-width="2"/>
      <circle cx="178" cy="102" r="6" stroke-width="2"/>
      <circle cx="156" cy="140" r="6" stroke-width="2"/>
      <circle cx="178" cy="178" r="6" stroke-width="2"/>
      <circle cx="222" cy="178" r="6" stroke-width="2"/>
      <path d="M200 34 v-18 M306 140 h18 M200 246 v18 M94 140 h-18" stroke-width="1.5" opacity="0.5"/>`,
  },

  // Car wash & detailing — the spray fan off a nozzle
  'spray-fan': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M36 128 h68 v24 h-68 z" stroke-width="2"/>
      <path d="M104 126 l28 14 l-28 14 z" stroke-width="2"/>
      <path d="M138 140 L356 58" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M138 140 L368 114" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
      <path d="M138 140 L368 166" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
      <path d="M138 140 L356 222" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="298" cy="86" r="4" stroke-width="2" opacity="0.6"/>
      <circle cx="330" cy="150" r="5" stroke-width="2" opacity="0.6"/>
      <circle cx="294" cy="196" r="4" stroke-width="2" opacity="0.6"/>`,
  },

  // Tailoring & alterations — the tape edge and the seam it marks out
  'seam-allowance': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M40 66 h324" stroke-width="2"/>
      <path d="M62 66 v16 M102 66 v26 M142 66 v16 M182 66 v26 M222 66 v16 M262 66 v26 M302 66 v16 M342 66 v26" stroke-width="1.5" opacity="0.7"/>
      <path d="M50 192 C 132 148, 252 232, 356 174" stroke-width="2.5" stroke-dasharray="12 9"/>
      <path d="M98 176 l6 28 M188 190 l2 28 M278 210 l-4 28" stroke-width="1.5" opacity="0.6"/>
      <circle cx="50" cy="192" r="5" stroke-width="2"/>
      <path d="M356 174 l20 -10 M356 174 l20 10" stroke-width="2" opacity="0.7"/>`,
  },

  // Event venues — the proscenium arch and its bulb run
  'stage-arch': {
    viewBox: '0 0 400 280',
    svg: `
      <path d="M70 250 V150 A130 130 0 0 1 330 150 V250" stroke-width="2.5"/>
      <path d="M104 250 V156 A96 96 0 0 1 296 156 V250" stroke-width="1.5" opacity="0.5"/>
      <path d="M36 250 h328" stroke-width="2.5"/>
      <circle cx="88" cy="150" r="5" stroke-width="2"/>
      <circle cx="103" cy="94" r="5" stroke-width="2" opacity="0.85"/>
      <circle cx="144" cy="53" r="5" stroke-width="2" opacity="0.7"/>
      <circle cx="200" cy="38" r="5" stroke-width="2" opacity="0.85"/>
      <circle cx="256" cy="53" r="5" stroke-width="2" opacity="0.7"/>
      <circle cx="297" cy="94" r="5" stroke-width="2" opacity="0.85"/>
      <circle cx="312" cy="150" r="5" stroke-width="2"/>`,
  },

  // Real estate — the lot plan: a surveyed property line, the footprint
  // inside it, the driveway to the road, and a north arrow. The one drawing
  // every listing actually has behind it.
  'lot-plan': {
    viewBox: '0 0 400 300',
    svg: `
      <rect x="28" y="34" width="344" height="222" stroke-width="1.5" stroke-dasharray="10 7" opacity="0.6"/>
      <path d="M108 88 h152 v70 h60 v92 h-212 z" stroke-width="2.5"/>
      <path d="M184 88 v162" stroke-width="1.5" opacity="0.7"/>
      <path d="M108 176 h76" stroke-width="1.5" opacity="0.7"/>
      <path d="M148 250 a26 26 0 0 0 26 -26" stroke-width="1.5" opacity="0.8"/>
      <path d="M268 256 v34 M312 256 v34" stroke-width="1.5" opacity="0.6"/>
      <path d="M14 290 h372" stroke-width="4"/>
      <path d="M28 34 v-16 M372 34 v-16 M28 24 h344" stroke-width="1.5" opacity="0.55"/>
      <circle cx="336" cy="70" r="17" stroke-width="1.5" opacity="0.6"/>
      <path d="M336 56 l8 22 l-8 -8 l-8 8 z" stroke-width="1.5" fill="currentColor"/>`,
  },
};

export const getMotif = (id: string): Motif | undefined => motifs[id];
