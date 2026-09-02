// Fill the demo photo slots from Unsplash.
//
//   UNSPLASH_ACCESS_KEY=... node scripts/fetch-demo-photos.mjs [--dry] [--only=<demo>] [--limit=N]
//
// Each slot already carries art direction written when the demo was built —
// "Baker loading loaves into a deck oven with a peel, early morning, flour
// dust in the air" — so the search query comes from the site itself rather
// than from anything invented here.
//
// Resumable on purpose: a slot whose file already exists is skipped, so this
// can be run in batches. Unsplash demo apps allow 50 requests an hour and a
// full pass costs two calls per slot, so 84 slots does not fit in one window.
//
// ATTRIBUTION: the Unsplash API Guidelines require crediting the photographer
// and Unsplash, and require calling the download endpoint when an image is
// actually used (it is what credits the photographer, and it does not count
// against the rate limit). Both are done here, and the credits are written to
// src/data/demos/photo-credits.json for the site to render.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error('UNSPLASH_ACCESS_KEY is not set. Create a free app at');
  console.error('https://unsplash.com/oauth/applications and export the Access Key.');
  process.exit(1);
}

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1];
const NO_PEOPLE = args.includes('--no-people');
const LIMIT = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? Infinity);

// Three kinds of slot, one pipeline. A demo slot lives under
// src/assets/demos/<demo>/<file>.jpg; an industry hero is one file per
// vertical at src/assets/industries/<slug>.jpg; a service photo is one of the
// three in a group's mosaic at src/assets/services/<id>.jpg. All carry art
// direction written when they were built, so the only real difference is
// where the file lands — worth sharing the overrides, the dedupe and the
// attribution rather than forking another script.
const INDUSTRIES = args.includes('--industries');
const SERVICES = args.includes('--services');

const loadSlots = () => {
  if (SERVICES) {
    // Read from the data file rather than a generated list: a group that
    // gains a fourth picture should be picked up without touching this.
    const src = readFileSync('src/data/services.ts', 'utf-8');
    const out = [];
    // `\s*` between the fields rather than a literal newline: the repo mixes
    // CRLF and LF, and an `\n` here silently matched nothing on the CRLF side.
    // `id` appears on no other shape in this file, so it needs no anchor.
    for (const m of src.matchAll(
      /id: '([a-z0-9-]+)',\s*subject:\s*'([\s\S]*?)',\s*alt: '([^']*)'/g
    )) {
      // The lead of each mosaic is 16:9 and twice the width of the pair
      // beneath it, which are 4:3. Position in the file is the mosaic order.
      const lead = out.length % 3 === 0;
      out.push({
        demo: 'services',
        file: m[1],
        subject: m[2].replace(/\s+/g, ' ').trim(),
        alt: m[3],
        ratio: lead ? 16 / 9 : 4 / 3,
        maxWidth: lead ? 544 : 266,
        key: `services/${m[1]}`,
        dir: 'src/assets/services',
      });
    }
    return out;
  }
  if (!INDUSTRIES) {
    return JSON.parse(readFileSync('scripts/demo-photo-slots.json', 'utf-8')).map((s) => ({
      ...s,
      key: `${s.demo}/${s.file}`,
      dir: path.join('src/assets/demos', s.demo),
    }));
  }
  // Pulled from the source of truth rather than a generated list: verticals
  // get added, and a stale copy would quietly skip the new ones.
  const src = readFileSync('src/data/industries.ts', 'utf-8');
  const out = [];
  // cycleWord is the field only an industry has — the category list shares
  // the same `slug:` shape at the same indentation.
  for (const m of src.matchAll(
    /slug: '([a-z-]+)',\n\s*name: '[^']*',\n\s*cycleWord:[\s\S]*?heroPhoto: \{\s*\n?\s*subject:\s*\n?\s*'([\s\S]*?)',\s*\n\s*alt: '([^']*)'/g
  )) {
    out.push({
      demo: 'industries',
      file: m[1],
      subject: m[2].replace(/\s+/g, ' ').trim(),
      alt: m[3],
      // The hero sits in a 460px panel beside the headline, 3:2.
      ratio: 1.5,
      maxWidth: 460,
      key: `industries/${m[1]}`,
      dir: 'src/assets/industries',
    });
  }
  return out;
};

const SLOTS = loadSlots();
const CREDITS_FILE = 'src/data/demos/photo-credits.json';
const credits = existsSync(CREDITS_FILE) ? JSON.parse(readFileSync(CREDITS_FILE, 'utf-8')) : {};

/**
 * Hand-written queries for slots where the art direction does not reduce to
 * good search terms. Unsplash matches short noun phrases, not sentences.
 */
const OVERRIDES = {
  // Auto-derived queries that matched nothing. Unsplash narrows hard as terms
  // are added, so a five-word phrase off the art direction can return zero
  // even when each word is reasonable on its own.
  'fnb-bakery-pre-order/hero-counter': 'bakery counter pastries display',
  'multi-service-spa-salon/cat-hair': 'hair salon interior styling chairs',
  'retail-catalogue-wholesale/oven': 'bakery bread oven',
  'retail-grocery-order-ahead/dept-dairy': 'dairy refrigerated case',
  'retail-grocery-order-ahead/hero-counter': 'butcher shop counter',
  'retail-large-catalogue/hero-showroom': 'furniture showroom',
  'trades-lead-generation/ajax-before': 'old wooden kitchen cabinets',
  'trades-lead-generation/pickering-before': 'empty office corridor',
  // The last three. "Foundry hall" and "stucco before" are the kind of phrase
  // that describes the picture perfectly and matches nothing in a stock
  // library, which indexes on plain nouns.
  'venue-event-space/hero-hall': 'empty warehouse event space brick',
  'retail-large-catalogue/warehouse': 'warehouse racking boxes',
  'trades-lead-generation/ajax-stucco-before': 'suburban house exterior stucco',
  'industries/bakeries': 'bakery bread loaves',
  // Three heroes that matched something plausible for the words but wrong for
  // the trade. "Treatment room" is a hospital in a stock library, not a spa;
  // "butcher counter" returned a cafe brunch plate; "showroom floor" returned
  // an antiques shop. All three needed the trade naming itself.
  'industries/spas-salons': 'spa massage table',
  'industries/grocery': 'grocery store produce aisle',
  'industries/furniture': 'modern furniture showroom sofas',

  // The service mosaics. Their art direction is written as a sentence with
  // the lighting and framing in it, and the first four words off that reads
  // like "phone held hand showing" — grammar, not nouns. Every one of these
  // is a plain noun phrase for what should be in the frame.
  'services/web-build-desk': 'developer desk code monitor',
  'services/web-build-wireframe': 'website wireframe sketch paper',
  'services/web-build-mobile': 'smartphone website screen browsing',
  'services/marketing-planning': 'marketing team planning meeting',
  'services/marketing-print': 'brochure print design stack',
  'services/marketing-review': 'marketing report charts desk',
  'services/social-shoot': 'camera tripod food photography',
  'services/social-editing': 'video editing laptop timeline',
  'services/social-filming': 'phone recording video hand',
  'services/brand-sketching': 'logo sketches sketchbook pencil',
  'services/brand-proofs': 'blank business cards stack paper',
  // "Colour" is the spelling on the page; a stock library indexes the other.
  'services/brand-colour': 'color swatches paper samples',
  'services/analytics-dashboard': 'analytics dashboard screen charts',
  'services/analytics-report': 'printed report charts desk',
  'services/analytics-review': 'google search results laptop',
  // marketing-print, social-filming and analytics-review are on their second
  // query. The first ones matched the words and missed the picture: "flyers
  // brochures" returned a blank mockup template, "filming phone shop counter"
  // a shop counter with no phone in it, and "laptop analytics graphs" a laptop
  // with nobody at it — each leaving alt text describing something the image
  // did not show. Check the picture, not just that a file arrived.
};

const STOP = new Set(
  ('a an and the of in on at with to from for into over under by is are was were ' +
   'shot wide close view looking mid full frame candid not posed early late soft warm ' +
   'through against behind above below around large small long its their his her ' +
   'this that these those one two three some any all no more most very just')
    .split(' ')
);

const query = (slot) => {
  if (OVERRIDES[slot.key]) return OVERRIDES[slot.key];
  const words = (slot.subject || '')
    .toLowerCase()
    .replace(/[^a-z\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  // For a named individual, keep the craft words and add framing that steers
  // away from a recognisable face.
  if (isNamedPerson(slot)) return `${words.slice(0, 3).join(' ')} ${FRAMING}`;
  // Four words, not five. Unsplash narrows sharply as terms are added, and at
  // five a fair number of these returned no results at all.
  return words.slice(0, 4).join(' ');
};

/**
 * Slots the page labels with an invented name and job title — "Nadia
 * Halloran, owner of Harbourview Bar & Grill". A stock headshot there puts a
 * real, identifiable person's face behind a fabricated identity, which is the
 * same problem as the invented review counts and worse for involving someone
 * real. These demos publish no fake ratings; they should not publish fake
 * people either.
 *
 * The art direction mostly already asks for the work rather than the face
 * ("hands in frame", "close crop"), so the query is steered that way and the
 * search is never run as a portrait, which is what returns headshots.
 */
const isNamedPerson = (slot) => /^(staff|barber|technician)-[a-z]+$/.test(slot.file);
const FRAMING = 'hands close up over shoulder anonymous';

const orientation = (slot) => {
  if (isNamedPerson(slot)) return 'squarish';
  const r = slot.ratio;
  return r >= 1.25 ? 'landscape' : r <= 0.85 ? 'portrait' : 'squarish';
};

const api = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' },
  });
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (res.status === 403) {
    throw new Error(`rate limited (remaining ${remaining}) — wait for the window to reset`);
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${url}`);
  return { body: await res.json(), remaining };
};

// Seeded from the credits already on disk so a resumed batch does not reuse a
// photo an earlier batch already placed.
const usedIds = new Set(Object.values(credits).map((c) => c.id).filter(Boolean));

let done = 0;
let skipped = 0;

for (const slot of SLOTS) {
  if (ONLY && slot.demo !== ONLY) continue;
  // The framing steer reduces the odds of a recognisable face on a slot the
  // page labels with an invented name, but cannot guarantee it — no face
  // detection here. --no-people leaves those slots on their placeholders.
  if (NO_PEOPLE && isNamedPerson(slot)) continue;
  if (done >= LIMIT) break;

  const dir = slot.dir;
  const out = path.join(dir, `${slot.file}.jpg`);
  if (existsSync(out)) { skipped += 1; continue; }

  const q = query(slot);
  const o = orientation(slot);

  if (DRY) {
    console.log(`  ${slot.key}  [${o}]  "${q}"`);
    done += 1;
    continue;
  }

  try {
    const { body, remaining } = await api(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}` +
        `&orientation=${o}&per_page=12&content_filter=high`
    );
    // Never reuse a photo. Four barbers on one page whose art direction reads
    // almost the same all match the same top result, and taking results[0]
    // every time gave three byte-identical files for three different people.
    const results = body.results ?? [];
    const hit = results.find((r) => !usedIds.has(r.id));
    if (!hit) {
      // Distinguish the two causes: a query that matched nothing needs better
      // words, whereas every match already being used needs a wider search.
      console.log(
        results.length
          ? `  MISS  ${slot.key}  all ${results.length} matches already used — "${q}"`
          : `  MISS  ${slot.key}  query matched nothing — "${q}"  (add an OVERRIDE)`
      );
      continue;
    }
    usedIds.add(hit.id);

    // Required by the API guidelines whenever a photo is actually used.
    await api(hit.links.download_location);

    // Ask for roughly twice the largest box the layout gives it, capped.
    const want = Math.min(Math.max(slot.maxWidth * 2, 900), 2400);

    // The image CDN throttles separately from the API, and abandoning the slot
    // on a 429 wastes the two API calls already spent on it — a whole window
    // once went on searches whose downloads all 429'd, and produced nothing.
    // So the download retries with backoff before the slot is given up.
    let img = null;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      img = await fetch(`${hit.urls.raw}&w=${want}&q=80&fm=jpg&fit=max`);
      if (img.ok) break;
      if (img.status !== 429 && img.status < 500) break;
      const wait = 2000 * 2 ** attempt;
      console.log(`        ${slot.file}: image ${img.status}, retrying in ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
    }
    if (!img || !img.ok) throw new Error(`image fetch ${img ? img.status : 'failed'}`);

    mkdirSync(dir, { recursive: true });
    writeFileSync(out, Buffer.from(await img.arrayBuffer()));

    credits[slot.key] = {
      photographer: hit.user.name,
      profile: `${hit.user.links.html}?utm_source=linova_demos&utm_medium=referral`,
      photo: `${hit.links.html}?utm_source=linova_demos&utm_medium=referral`,
      id: hit.id,
      query: q,
    };
    writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2) + '\n');

    const kb = Math.round(readFileSync(out).length / 1024);
    console.log(`  ok    ${slot.key}  ${want}px ${kb}KB  "${q}"  — ${hit.user.name}  (${remaining} left)`);
    done += 1;
    // Paced deliberately. Downloading as fast as the loop allows is what
    // tripped the CDN's own throttle in the first place.
    await new Promise((r) => setTimeout(r, 1200));
  } catch (err) {
    console.error(`  FAIL  ${slot.key}: ${err.message}`);
    if (String(err.message).includes('rate limited')) break;
  }
}

console.log(`\n  fetched ${done}, already present ${skipped}, of ${SLOTS.length} slots`);
if (!DRY) console.log(`  credits -> ${CREDITS_FILE}`);
