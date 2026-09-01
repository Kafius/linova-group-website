// Turn a supplied logo crop into a header-ready transparent PNG.
//
//   node scripts/prepare-demo-logo.mjs <file> <playbook-slug> [--no-badge]
//
// A file that already has real transparency is only trimmed and capped. One
// on a flat colour is matted out, and that is the part worth explaining.
//
// Binary keying — "every pixel within N of the background becomes clear" —
// cannot work on these. Set the threshold high enough to clear the ground and
// it eats low-contrast secondary text ("Halal Grocery & Butcher" disappeared
// entirely); set it low enough to keep that text and every glyph keeps a rim
// of near-background pixels, which reads as a halo once the logo sits on the
// demo's own dark header.
//
// So this computes a soft alpha from each pixel's distance to the background
// and then un-premultiplies the colour: an edge pixel that is 40% logo and
// 60% cream is recovered as 40% alpha at the logo's own colour, rather than
// as an opaque cream-tinted pixel. That is what removes the halo while
// keeping the anti-aliasing.
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import path from 'node:path';

const [, , file, slug, ...flags] = process.argv;
if (!file || !slug) {
  console.error('usage: node scripts/prepare-demo-logo.mjs <file> <playbook-slug> [--no-badge]');
  process.exit(1);
}

const OUT_DIR = 'src/assets/demos/logos';
const MAX = 900;

/**
 * Each demo's actual masthead colour, sampled off the built pages rather than
 * read from the theme tokens — several demos invert between sections and the
 * header is not always the token the name suggests. Thirteen of the nineteen
 * are light, which is the opposite of what most of the supplied logos assume.
 *
 * This is here so the script can answer the only question that matters about
 * a logo: will it be visible where it is going? Bramble & Bone arrived as a
 * cream wordmark on dark green and is invisible on that demo's cream header.
 */
const HEADER_BG = {
  'appointment-business': [17, 17, 16],
  'automotive-book-a-bay': [28, 32, 36],
  'fnb-catering-events': [51, 32, 15],
  'fnb-full-service': [23, 17, 13],
  'fnb-quick-service-launch': [25, 21, 18],
  'venue-event-space': [15, 14, 12],
  'appointment-lite': [250, 249, 247],
  'b2b-commercial-services': [244, 246, 249],
  'b2b-distributor-wholesale': [238, 240, 242],
  'clinic-practitioner': [252, 252, 251],
  'fnb-bakery-pre-order': [252, 247, 236],
  'fnb-cafe-order-ahead': [253, 252, 249],
  'fnb-food-truck-lite': [255, 239, 201],
  'multi-service-spa-salon': [244, 241, 236],
  'retail-catalogue-wholesale': [250, 248, 243],
  'retail-grocery-order-ahead': [250, 250, 248],
  'retail-large-catalogue': [252, 251, 249],
  'retail-online-store': [251, 247, 239],
  'trades-lead-generation': [255, 255, 255],
};
/** The contact-sheet crops carry an index number in the top-left. */
const BADGE = !flags.includes('--no-badge');
/**
 * Pixels shaved off every edge before anything else. A crop taken off the
 * contact sheet tends to keep a sliver of the white rule between tiles, and
 * that survives matting as a hairline down the side of the finished logo —
 * it is not the background colour, so keying leaves it and trim keeps it.
 */
const insetFlag = flags.find((f) => f.startsWith('--inset='));
const INSET = insetFlag ? Number(insetFlag.split('=')[1]) : 3;

// ── SVG input ───────────────────────────────────────────────────────────
// Vector beats anything recoverable from a raster, so an SVG stays an SVG.
// Only one thing has to be stripped: the full-bleed background rect it was
// composed on, which would paint an opaque slab across the masthead.
//
// Fonts are handled by the layout rather than here. An SVG loaded through
// <img> cannot fetch anything, so a font-family naming a webfont silently
// falls back — Bricolage Grotesque becomes Arial Black. Embedding the woff2
// as a data URI fixes that but costs 100KB and duplicates a font the page has
// already downloaded for its own headings. So DemoLayout inlines the markup
// instead, where it resolves against the demo's own @font-face for free.
if (file.toLowerCase().endsWith('.svg')) {
  let svg = readFileSync(file, 'utf-8');

  const box = svg.match(/viewBox\s*=\s*"([^"]+)"/);
  const [, , vbW, vbH] = box ? box[1].trim().split(/\s+/).map(Number) : [0, 0, 0, 0];

  // Drop any rect that covers the whole canvas.
  let dropped = 0;
  svg = svg.replace(/<rect\b[^>]*\/?>(?:<\/rect>)?/g, (tag) => {
    const w = tag.match(/\bwidth\s*=\s*"([^"]+)"/)?.[1];
    const h = tag.match(/\bheight\s*=\s*"([^"]+)"/)?.[1];
    const full = (v, ref) => v === '100%' || (ref && Math.abs(parseFloat(v) - ref) < 1);
    if (w && h && full(w, vbW) && full(h, vbH) && !/\btransform\s*=/.test(tag)) {
      dropped += 1;
      return '';
    }
    return tag;
  });
  if (dropped) console.log(`  ${slug}: removed ${dropped} full-bleed background rect(s)`);

  // Repoint any font the page does not actually load. Inlined, the SVG can
  // only use faces this demo already declares; anything else falls through to
  // whatever the OS has, so a mark specified in Montserrat quietly renders in
  // Arial Black. The demo's own display face is a better answer than that, and
  // makes the mark look native to the site rather than pasted onto it.
  const demoModule = `src/data/demos/${slug}.ts`;
  let displayFamily = null;
  if (existsSync(demoModule)) {
    const src = readFileSync(demoModule, 'utf-8');
    displayFamily = src.match(/displayFont:\s*'"([^"]+)"/)?.[1] ?? null;
  }
  const hosted = existsSync('public/fonts/demos') ? readdirSync('public/fonts/demos') : [];
  const isHosted = (family) => {
    const stem = family.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return hosted.some((f) => f.startsWith(stem) && f.endsWith('.woff2'));
  };

  // Strip webfont imports. These demos self-host every face on purpose — part
  // of the pitch is that they fetch nothing from a third-party CDN, and no
  // demo page currently does. Inlined, an @import in the mark would make one.
  // The families named are already on the page, so the rule is pure cost.
  const imports = svg.match(/@import\s+url\([^)]*\)\s*;?/g) ?? [];
  if (imports.length) {
    svg = svg.replace(/@import\s+url\([^)]*\)\s*;?/g, '');
    console.log(`  ${slug}: removed ${imports.length} webfont @import — the page self-hosts these`);
  }

  const repoint = (stack) => {
    const first = stack.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
    if (!first || isHosted(first)) return null;
    if (!displayFamily) {
      console.log(`  ${slug}: NOTE "${first}" is not loaded by this demo and will fall back`);
      return null;
    }
    console.log(`  ${slug}: "${first}" is not loaded here, using "${displayFamily}" instead`);
    return `'${displayFamily}', ${stack}`;
  };

  // Presentation attributes...
  svg = svg.replace(/font-family\s*=\s*"([^"]+)"/g, (whole, stack) => {
    const next = repoint(stack);
    return next ? `font-family="${next}"` : whole;
  });
  // ...and CSS declarations, which a <style> block uses instead.
  svg = svg.replace(/font-family\s*:\s*([^;}]+)/g, (whole, stack) => {
    const next = repoint(stack.trim());
    return next ? `font-family: ${next}` : whole;
  });

  // A loose viewBox is the other silent failure. The masthead sizes the logo
  // by height, so empty canvas above and below shrinks the artwork to nothing
  // — the first Bramble & Bone SVG drew inside 800x500 but only occupied the
  // middle, and rendered 61px wide with an illegible wordmark. Rasterise and
  // measure the real content so the gap gets reported rather than shipped.
  try {
    const probe = await sharp(Buffer.from(svg), { density: 150 })
      .trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });
    const full = await sharp(Buffer.from(svg), { density: 150 }).metadata();
    const fill = (probe.info.width * probe.info.height) / (full.width * full.height);
    if (fill < 0.6) {
      console.log('');
      console.log(`  NOTE  the artwork fills only ${Math.round(fill * 100)}% of the viewBox.`);
      console.log(`        Sized by height in the masthead, the empty margin shrinks it.`);
      console.log(`        Tighten the viewBox to the content bounds and keep matching`);
      console.log(`        width/height attributes — an inline <svg> with only a ratio`);
      console.log(`        resolves width:auto to 100% and collapses to zero.`);
    }
  } catch {
    // librsvg substitutes fonts, so this is advisory only — never fatal.
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const svgOut = path.join(OUT_DIR, `${slug}.svg`);
  writeFileSync(svgOut, svg);
  // A raster of the same slug would win the glob and shadow this.
  const stale = path.join(OUT_DIR, `${slug}.png`);
  if (existsSync(stale)) {
    unlinkSync(stale);
    console.log(`  ${slug}: removed the superseded PNG`);
  }
  console.log(`  ${slug}: ${Math.round(svg.length / 1024)} KB  ->  ${svgOut}`);
  process.exit(0);
}

let src = readFileSync(file);
let meta = await sharp(src).metadata();

if (INSET > 0 && meta.width > INSET * 2 + 8 && meta.height > INSET * 2 + 8) {
  src = await sharp(src)
    .extract({
      left: INSET,
      top: INSET,
      width: meta.width - INSET * 2,
      height: meta.height - INSET * 2,
    })
    .toBuffer();
  meta = await sharp(src).metadata();
}

let pipeline;

if (meta.hasAlpha) {
  // Already a real cutout — leave the matte alone.
  console.log(`  ${slug}: source already has alpha, trimming only`);
  pipeline = sharp(src);
} else {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const at = (x, y) => {
    const p = (y * W + x) * C;
    return [data[p], data[p + 1], data[p + 2]];
  };

  // Background = modal colour around the border ring, quantised to 8 levels
  // per channel so compression noise does not split the vote.
  const tally = new Map();
  const note = (x, y) => {
    const c = at(x, y);
    const k = `${c[0] >> 3},${c[1] >> 3},${c[2] >> 3}`;
    const e = tally.get(k) ?? { n: 0, c };
    e.n += 1;
    tally.set(k, e);
  };
  for (let x = 0; x < W; x += 1) { note(x, 0); note(x, H - 1); }
  for (let y = 0; y < H; y += 1) { note(0, y); note(W - 1, y); }
  const bg = [...tally.values()].sort((a, b) => b.n - a.n)[0].c;

  const px = Buffer.from(data);

  // Paint the index badge out with the background before matting, or it
  // survives as artwork — it is the same ink as the logo.
  if (BADGE) {
    const bw = Math.round(W * 0.13);
    const bh = Math.round(H * 0.24);
    for (let y = 0; y < bh; y += 1) {
      for (let x = 0; x < bw; x += 1) {
        const p = (y * W + x) * C;
        px[p] = bg[0]; px[p + 1] = bg[1]; px[p + 2] = bg[2]; px[p + 3] = 255;
      }
    }
  }

  // Soft matte. LO is the noise floor of the flat ground; above HI the pixel
  // is entirely logo. Between them alpha ramps, and the colour is recovered.
  const LO = 26;
  const HI = 72;
  for (let p = 0; p < px.length; p += C) {
    const d = Math.max(
      Math.abs(px[p] - bg[0]),
      Math.abs(px[p + 1] - bg[1]),
      Math.abs(px[p + 2] - bg[2])
    );
    let a = (d - LO) / (HI - LO);
    a = a < 0 ? 0 : a > 1 ? 1 : a;
    if (a === 0) { px[p + 3] = 0; continue; }
    if (a < 1) {
      // colour = (observed - bg * (1 - a)) / a
      for (let ch = 0; ch < 3; ch += 1) {
        const v = (px[p + ch] - bg[ch] * (1 - a)) / a;
        px[p + ch] = v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
      }
    }
    px[p + 3] = Math.round(a * 255);
  }

  // Clear a ring around the edge outright. Insetting the crop first is not
  // enough on its own: several of these carry a hairline from the contact
  // sheet's rule a few pixels in, and because it is not the background colour
  // the matte keeps it and trim treats it as artwork — it shows up as a stray
  // rule floating above the logo in the masthead. The tiles all have generous
  // padding, so a few pixels costs nothing.
  const RING = 4;
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      if (x >= RING && x < W - RING && y >= RING && y < H - RING) continue;
      px[(y * W + x) * C + 3] = 0;
    }
  }

  // Some rules sit further in than the ring reaches, so find them by shape
  // instead: a hairline is a run of a few rows that are largely opaque with
  // near-empty rows either side, near the top or bottom edge. A wordmark is
  // never that — it spans many consecutive rows — so this cannot eat artwork.
  const rowFill = new Array(H).fill(0);
  for (let y = 0; y < H; y += 1) {
    let n = 0;
    for (let x = 0; x < W; x += 1) if (px[(y * W + x) * C + 3] > 128) n += 1;
    rowFill[y] = n / W;
  }
  const EDGE = Math.round(H * 0.25);
  let y = 0;
  while (y < H) {
    if (rowFill[y] <= 0.35) { y += 1; continue; }
    let end = y;
    while (end + 1 < H && rowFill[end + 1] > 0.35) end += 1;
    const height = end - y + 1;
    const nearEdge = y < EDGE || end > H - EDGE;
    const isolatedAbove = y === 0 || rowFill[y - 1] < 0.08;
    const isolatedBelow = end === H - 1 || rowFill[end + 1] < 0.08;
    if (height <= 5 && nearEdge && isolatedAbove && isolatedBelow) {
      for (let r = y; r <= end; r += 1) {
        for (let x = 0; x < W; x += 1) px[(r * W + x) * C + 3] = 0;
      }
      console.log(`  ${slug}: cleared a ${height}px rule at row ${y}`);
    }
    y = end + 1;
  }

  console.log(`  ${slug}: matted against rgb(${bg.join(',')})`);
  pipeline = sharp(px, { raw: { width: W, height: H, channels: 4 } });
}

mkdirSync(OUT_DIR, { recursive: true });
const out = path.join(OUT_DIR, `${slug}.png`);

await pipeline
  .trim({ threshold: 2 })
  .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(out);

const m = await sharp(readFileSync(out)).metadata();
const kb = Math.round(readFileSync(out).length / 1024);
console.log(`  ${slug}: ${m.width}x${m.height}  ${kb} KB  ->  ${out}`);

// ── Will it actually be visible on this demo's masthead? ────────────────
// Not a mean: averaging a dark mark with a light wordmark lands in the middle
// and reports "fine" for a logo whose wordmark is invisible, which is exactly
// what Bramble & Bone does. Instead every solid pixel is contrast-tested
// against the real header colour and the failing share is reported.
{
  const bg = HEADER_BG[slug];
  const { data, info } = await sharp(readFileSync(out))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const chan = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const lum = (r, g, b) => 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);

  if (!bg) {
    console.log(`  ${slug}: no masthead colour on record, skipping the visibility check`);
  } else {
    const Lbg = lum(...bg);
    let solid = 0;
    let faint = 0;
    for (let p = 0; p < data.length; p += info.channels) {
      if (data[p + 3] < 200) continue;
      solid += 1;
      const L = lum(data[p], data[p + 1], data[p + 2]);
      const ratio = (Math.max(L, Lbg) + 0.05) / (Math.min(L, Lbg) + 0.05);
      if (ratio < 2) faint += 1;
    }
    const pct = solid ? Math.round((faint / solid) * 100) : 0;
    console.log(`  ${slug}: ${pct}% of the artwork is under 2:1 against the masthead`);

    if (pct >= 20) {
      console.log('');
      console.log(`  WARNING  ${pct}% of this logo will not read on ${slug}'s masthead`);
      console.log(`           (rgb(${bg.join(',')})). It was drawn for the opposite ground.`);
      console.log(`           The file was written anyway — delete it to fall back to the`);
      console.log(`           text wordmark until a usable version exists.`);
    }
  }
}

if (!existsSync(out)) process.exit(1);
