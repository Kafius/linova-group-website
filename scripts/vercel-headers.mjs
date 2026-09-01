// Security headers, written into the Vercel Build Output config.
//
// WHY THIS EXISTS RATHER THAN vercel.json
// ---------------------------------------
// The Astro Vercel adapter builds through the Build Output API, so the routing
// source of truth is `.vercel/output/config.json`. Vercel reads its routing
// from that file; `headers` in vercel.json belong to the other build path and
// are not merged in. The adapter itself only ever opens vercel.json to warn
// about a trailingSlash conflict — it does not carry headers across. Putting
// them in vercel.json therefore looks right and does nothing.
//
// So they are injected here instead, in the same shape the adapter already
// uses for the immutable cache-control rule on /_astro: a matching route with
// `continue: true`, placed before the filesystem handler so it annotates the
// response and lets routing carry on.
//
// Run as part of `npm run build`, after `astro build` has written the config.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const CONFIG = '.vercel/output/config.json';

/** Applied to every response. */
const SITE_HEADERS = {
  // Only frame-ancestors: a full CSP would need the inline Consent Mode block
  // reworked, which is a separate job with real breakage risk.
  'content-security-policy': "frame-ancestors 'self'",
  'x-frame-options': 'SAMEORIGIN',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

/** Kept out of the index by header, since neither route templates its own head. */
const NOINDEX = {
  'x-robots-tag': 'noindex, nofollow',
};

const RULES = [
  { src: '^/studio(?:/.*)?$', headers: NOINDEX },
  { src: '^/lp(?:/.*)?$', headers: NOINDEX },
  { src: '^/.*$', headers: SITE_HEADERS },
];

if (!existsSync(CONFIG)) {
  console.error(`[headers] ${CONFIG} not found — did astro build run?`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(CONFIG, 'utf-8'));
config.routes ??= [];

// Idempotent: drop any rule this script added before re-adding it, so running
// the script twice — or building twice without a clean — does not stack
// duplicates. Matched on src rather than a marker property, because a marker
// would either leak into the output Vercel reads or have to be stripped, and
// stripping it is what makes the next run blind to its own rules.
const OWNED = new Set(RULES.map((r) => r.src));
config.routes = config.routes.filter(
  (r) => !(r.continue && r.headers && OWNED.has(r.src))
);

const injected = RULES.map((rule) => ({
  src: rule.src,
  headers: rule.headers,
  continue: true,
}));

// Before the filesystem handler, so the headers apply to static files too.
const fsIndex = config.routes.findIndex((r) => r.handle === 'filesystem');
const at = fsIndex === -1 ? config.routes.length : fsIndex;
config.routes.splice(at, 0, ...injected);

writeFileSync(CONFIG, JSON.stringify(config, null, 2));

console.log(`[headers] ${injected.length} header rules written into ${CONFIG}`);
for (const rule of RULES) {
  console.log(`  ${rule.src}  ->  ${Object.keys(rule.headers).join(', ')}`);
}
