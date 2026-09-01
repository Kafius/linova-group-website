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

const SLOTS = JSON.parse(readFileSync('scripts/demo-photo-slots.json', 'utf-8'));
const CREDITS_FILE = 'src/data/demos/photo-credits.json';
const credits = existsSync(CREDITS_FILE) ? JSON.parse(readFileSync(CREDITS_FILE, 'utf-8')) : {};

/**
 * Hand-written queries for slots where the art direction does not reduce to
 * good search terms. Unsplash matches short noun phrases, not sentences.
 */
const OVERRIDES = {
  // Auto-derived queries that matched nothing, usually because a stray word
  // from the art direction ("crop", "north") narrows the search to zero.
  'fnb-bakery-pre-order/hero-counter': 'bakery counter pastries display',
  'multi-service-spa-salon/cat-hair': 'hair salon interior styling chairs',
};

const STOP = new Set(
  ('a an and the of in on at with to from for into over under by is are was were ' +
   'shot wide close view looking mid full frame candid not posed early late soft warm ' +
   'through against behind above below around large small long its their his her ' +
   'this that these those one two three some any all no more most very just')
    .split(' ')
);

const query = (slot) => {
  if (OVERRIDES[`${slot.demo}/${slot.file}`]) return OVERRIDES[`${slot.demo}/${slot.file}`];
  const words = (slot.subject || '')
    .toLowerCase()
    .replace(/[^a-z\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  // For a named individual, keep the craft words and add framing that steers
  // away from a recognisable face.
  if (isNamedPerson(slot)) return `${words.slice(0, 3).join(' ')} ${FRAMING}`;
  return words.slice(0, 5).join(' ');
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

  const dir = path.join('src/assets/demos', slot.demo);
  const out = path.join(dir, `${slot.file}.jpg`);
  if (existsSync(out)) { skipped += 1; continue; }

  const q = query(slot);
  const o = orientation(slot);

  if (DRY) {
    console.log(`  ${slot.demo}/${slot.file}  [${o}]  "${q}"`);
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
          ? `  MISS  ${slot.demo}/${slot.file}  all ${results.length} matches already used — "${q}"`
          : `  MISS  ${slot.demo}/${slot.file}  query matched nothing — "${q}"  (add an OVERRIDE)`
      );
      continue;
    }
    usedIds.add(hit.id);

    // Required by the API guidelines whenever a photo is actually used.
    await api(hit.links.download_location);

    // Ask for roughly twice the largest box the layout gives it, capped.
    const want = Math.min(Math.max(slot.maxWidth * 2, 900), 2400);
    const img = await fetch(`${hit.urls.raw}&w=${want}&q=80&fm=jpg&fit=max`);
    if (!img.ok) throw new Error(`image fetch ${img.status}`);

    mkdirSync(dir, { recursive: true });
    writeFileSync(out, Buffer.from(await img.arrayBuffer()));

    credits[`${slot.demo}/${slot.file}`] = {
      photographer: hit.user.name,
      profile: `${hit.user.links.html}?utm_source=linova_demos&utm_medium=referral`,
      photo: `${hit.links.html}?utm_source=linova_demos&utm_medium=referral`,
      id: hit.id,
      query: q,
    };
    writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2) + '\n');

    const kb = Math.round(readFileSync(out).length / 1024);
    console.log(`  ok    ${slot.demo}/${slot.file}  ${want}px ${kb}KB  "${q}"  — ${hit.user.name}  (${remaining} left)`);
    done += 1;
  } catch (err) {
    console.error(`  FAIL  ${slot.demo}/${slot.file}: ${err.message}`);
    if (String(err.message).includes('rate limited')) break;
  }
}

console.log(`\n  fetched ${done}, already present ${skipped}, of ${SLOTS.length} slots`);
if (!DRY) console.log(`  credits -> ${CREDITS_FILE}`);
