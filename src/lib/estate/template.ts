// buildSiteHTML — turns one Listing into a self-contained cinematic
// single-property website (a complete HTML document as a string).
//
// Used in two places:
//   • the preview route (server-rendered per slug)
//   • the builder's live preview (client-side, injected into an <iframe srcdoc>)
//
// The generated site is built in three acts:
//   1. THE TOUR     — a scroll-driven journey through the house. Rooms cross-
//                     dissolve and pan as the buyer scrolls (falls back to a
//                     stacked gallery with no JS / reduced motion).
//   2. THE LOCATION — nearby amenities (schools, grocery, subway, park…) plus
//                     GTA access: downtown, Pearson, the 401/407/404/400, and
//                     the nearest hospital.
//   3. THE NUMBERS  — the residence's own figures, counting up on scroll.
//
// The output is dependency-free (inline CSS/JS, a Google Fonts link only) so a
// paid, unlocked listing can be exported as a single portable file.

import type { Listing, Poi, PoiType, Commute } from './types';

/** Escape a value for safe interpolation into HTML text / attributes. */
function esc(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/** Inline stroke icons keyed by POI type. */
const POI_ICONS: Record<PoiType, string> = {
  grocery:
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  school: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 3 2 6 2s6-1 6-2v-5"/>',
  transit:
    '<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M8 19l-2 3"/><path d="M16 19l2 3"/><circle cx="8.5" cy="15" r=".5"/><circle cx="15.5" cy="15" r=".5"/>',
  park: '<path d="M12 22v-6"/><path d="M12 16 6 9h4l-3-4h3L12 2l2 3h3l-3 4h4l-6 7z"/>',
  restaurant:
    '<path d="M3 2v7a3 3 0 0 0 6 0V2"/><path d="M6 2v20"/><path d="M18 2v20"/><path d="M18 8c1.5 0 3-1.5 3-4s-1.5-2-3-2"/>',
  medical: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/>',
  highway: '<path d="M4 19l4-14M20 19l-4-14M12 5v3M12 12v3M12 19v1"/>',
  shopping:
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
};

const DEST_ICONS: Record<string, string> = {
  downtown:
    '<rect x="3" y="8" width="7" height="13" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/><path d="M6 12h1M6 16h1M17 7h1M17 11h1M17 15h1"/>',
  airport:
    '<path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2 3 8l6 3-3 3-3-1-1 2 5 2 2 5 2-1-1-3 3-3 3 6 2-1z"/>',
  hospital: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>',
};

function icon(inner: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
const poiIcon = (t: PoiType) => icon(POI_ICONS[t] ?? POI_ICONS.park);

/* --------------------------------------------------------------------------
 * 1. THE TOUR — rooms flatten into scenes (one per angle) so the scroll pans
 * through each space before moving to the next.
 * ------------------------------------------------------------------------ */
interface Scene {
  url: string;
  room?: string;
  angle?: string;
  caption?: string;
}

function toScenes(listing: Listing): Scene[] {
  const out: Scene[] = [];
  for (const r of listing.rooms ?? []) {
    if (!r) continue;
    const shots =
      r.shots && r.shots.length ? r.shots : r.photo ? [{ url: r.photo }] : [];
    shots.forEach((s, i) => {
      if (!s || !s.url) return;
      out.push({ url: s.url, room: r.name, angle: s.angle, caption: i === 0 ? r.caption : undefined });
    });
  }
  if (!out.length) {
    for (const p of (listing.photos ?? []).filter(Boolean)) out.push({ url: p });
  }
  return out.slice(0, 14);
}

function tourSection(scenes: Scene[]): string {
  if (scenes.length < 2) return '';
  const n = scenes.length;
  const figures = scenes
    .map((s, i) => {
      const line = s.caption || s.angle || '';
      return `
      <figure class="scene" style="--i:${i}">
        <img src="${esc(s.url)}" alt="${esc(s.room || 'Interior view')}"${i < 2 ? '' : ' loading="lazy"'}>
        <figcaption class="scene-cap">
          <span class="scene-idx">${pad2(i + 1)}</span>
          ${s.room ? `<h3>${esc(s.room)}</h3>` : ''}
          ${line ? `<p>${esc(line)}</p>` : ''}
        </figcaption>
      </figure>`;
    })
    .join('');

  return `
  <section class="tour" id="tour" style="--rooms:${n}">
    <div class="tour-stage">
      <div class="scenes">${figures}</div>
      <div class="tour-hud" aria-hidden="true">
        <span class="tour-idx">01</span><span class="tour-sep">/</span><span>${pad2(n)}</span>
        <span class="tour-track"><span class="tour-bar"></span></span>
      </div>
      <div class="tour-hint" aria-hidden="true">Scroll to walk through</div>
    </div>
  </section>`;
}

/* --------------------------------------------------------------------------
 * 2. THE LOCATION
 * ------------------------------------------------------------------------ */
function poiGrid(pois: Poi[] | undefined): string {
  if (!pois || pois.length === 0) return '';
  const cards = pois
    .map(
      (p) => `
      <div class="loc-card reveal">
        <span class="loc-icon">${poiIcon(p.type)}</span>
        <span class="loc-name">${esc(p.name)}</span>
        <span class="loc-dist">${esc(p.dist)}</span>
      </div>`
    )
    .join('');
  return `<div class="loc-grid">${cards}</div>`;
}

function highwayBadges(c: Commute): string {
  const hwys: [string, string | undefined][] = [
    ['401', c.hwy401],
    ['407', c.hwy407],
    ['404', c.hwy404],
    ['400', c.hwy400],
  ];
  const rows = hwys
    .filter(([, v]) => v)
    .map(
      ([num, v]) => `
      <div class="hwy reveal">
        <span class="shield">${num}</span>
        <span class="hwy-time">${esc(v)}</span>
      </div>`
    )
    .join('');
  if (!rows) return '';
  return `
    <div class="access-group">
      <h4 class="access-head">On the road</h4>
      <div class="hwy-row">${rows}</div>
    </div>`;
}

function destinationRows(c: Commute): string {
  const dests: [string, string, string | undefined][] = [
    ['downtown', 'Downtown Toronto', c.downtown],
    ['airport', 'Toronto Pearson (YYZ)', c.airport],
    ['hospital', 'Nearest hospital', c.hospital],
  ];
  const rows = dests
    .filter(([, , v]) => v)
    .map(
      ([key, label, v]) => `
      <div class="dest reveal">
        <span class="dest-icon">${icon(DEST_ICONS[key])}</span>
        <span class="dest-label">${esc(label)}</span>
        <span class="dest-time">${esc(v)}</span>
      </div>`
    )
    .join('');
  if (!rows) return '';
  return `
    <div class="access-group">
      <h4 class="access-head">Getting around</h4>
      <div class="dest-list">${rows}</div>
    </div>`;
}

function locationSection(pois: Poi[] | undefined, commute: Commute | undefined): string {
  const grid = poiGrid(pois);
  const c = commute ?? {};
  const hwys = highwayBadges(c);
  const dests = destinationRows(c);
  if (!grid && !hwys && !dests) return '';
  return `
  <section class="section location">
    <div class="wrap">
      <p class="eyebrow reveal">The Location</p>
      <h2 class="section-title reveal">Everything, within reach</h2>
      ${grid}
      ${hwys || dests ? `<div class="access">${hwys}${dests}</div>` : ''}
    </div>
  </section>`;
}

/* --------------------------------------------------------------------------
 * 3. THE NUMBERS
 * ------------------------------------------------------------------------ */
function numItem(value: string | number | null | undefined, label: string, count = true): string {
  if (value === null || value === undefined || value === '' || value === 0) return '';
  const raw = String(value);
  const attr = count ? ` data-count="${esc(raw)}"` : '';
  return `<div class="num reveal"><span class="num-v"${attr}>${esc(raw)}</span><span class="num-l">${esc(
    label
  )}</span></div>`;
}

function pricePerSqft(price?: string, sqft?: number | null): string | null {
  if (!price || !sqft) return null;
  const digits = parseInt(String(price).replace(/[^0-9]/g, ''), 10);
  if (!Number.isFinite(digits) || !sqft) return null;
  const per = Math.round(digits / sqft);
  if (!Number.isFinite(per) || per <= 0) return null;
  return `$${per.toLocaleString()}`;
}

/** Is this a lease listing? Absent listing_type is treated as a sale. */
const isLease = (l: Listing) => l.listing_type === 'lease';

/** The hero/numbers money line. Appends "/ month" for leases (once). */
function priceDisplay(listing: Listing): string {
  const p = (listing.price ?? '').trim();
  if (!p) return '';
  if (!isLease(listing)) return p;
  return /month|\/\s*mo\b/i.test(p) ? p : `${p} / month`;
}

function numbersSection(listing: Listing): string {
  const lease = isLease(listing);
  const items = [
    numItem(listing.beds, 'Bedrooms'),
    numItem(listing.baths, 'Bathrooms'),
    numItem(listing.sqft ? listing.sqft.toLocaleString() : null, 'Interior Sq Ft'),
    numItem(listing.year_built, 'Year Built'),
    numItem(listing.lot_text, 'Lot', false),
    // Per-sq-ft is a sale metric; leases show rent below instead.
    lease ? '' : numItem(pricePerSqft(listing.price, listing.sqft), 'Per Sq Ft', false),
  ]
    .filter(Boolean)
    .join('');
  if (!items) return '';
  const money = priceDisplay(listing);
  return `
  <section class="section numbers">
    <div class="wrap">
      <p class="eyebrow reveal">By the Numbers</p>
      <h2 class="section-title reveal">The residence, in figures</h2>
      <div class="num-grid">${items}</div>
      ${money ? `<p class="num-price reveal">${esc(money)}</p>` : ''}
    </div>
  </section>`;
}

/* --------------------------------------------------------------------------
 * 3b. THE LEASE — terms at a glance (lease listings only)
 * ------------------------------------------------------------------------ */
function leaseTermsSection(listing: Listing): string {
  if (!isLease(listing)) return '';
  const rows: [string, string | undefined][] = [
    ['Lease term', listing.lease_term],
    ['Availability', listing.available_date],
    ['Furnished', listing.furnished],
    ['Pets', listing.pets],
    ['Utilities', listing.utilities],
    ['Deposit', listing.deposit],
  ];
  const items = rows
    .filter(([, v]) => v && String(v).trim())
    .map(
      ([label, v]) => `
      <div class="term reveal">
        <span class="term-label">${esc(label)}</span>
        <span class="term-value">${esc(v)}</span>
      </div>`
    )
    .join('');
  if (!items) return '';
  return `
  <section class="section terms">
    <div class="wrap">
      <p class="eyebrow reveal">The Lease</p>
      <h2 class="section-title reveal">Terms at a glance</h2>
      <div class="term-grid">${items}</div>
    </div>
  </section>`;
}

/* --------------------------------------------------------------------------
 * DOCUMENT
 * ------------------------------------------------------------------------ */
export interface BuildOptions {
  locked?: boolean;
  baseUrl?: string;
}

export function buildSiteHTML(listing: Listing, opts: BuildOptions = {}): string {
  const locked = opts.locked ?? listing.locked ?? true;
  const lease = isLease(listing);
  const photos = (listing.photos ?? []).filter(Boolean);
  const scenes = toScenes(listing);
  const hero = photos[0] ?? scenes[0]?.url ?? '';
  const title = listing.name || 'A Private Residence';

  const robots = locked
    ? '<meta name="robots" content="noindex,nofollow">'
    : '<meta name="robots" content="index,follow">';

  const watermark = locked
    ? `<div class="watermark" aria-hidden="true"><span>PREVIEW</span><span class="wm-sub">unlock to publish</span></div>`
    : '';

  const agentLine =
    listing.agent_name || listing.brokerage || listing.phone
      ? `<p class="cta-agent">${[listing.agent_name, listing.brokerage, listing.phone]
          .filter(Boolean)
          .map(esc)
          .join(' &middot; ')}</p>`
      : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${robots}
<title>${esc(title)}${listing.neighbourhood ? ' — ' + esc(listing.neighbourhood) : ''}</title>
<meta name="description" content="${esc(listing.headline || listing.description || title)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#1a1815; --stone:#e8e2d6; --paper:#f4f0e8;
    --brass:#a8843f; --brass-light:#c9a961; --slate:#6b6559;
    --display:'Fraunces',Georgia,serif; --body:'Archivo',system-ui,sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:var(--body);color:var(--ink);background:var(--paper);
    -webkit-font-smoothing:antialiased;line-height:1.6;overflow-x:hidden}
  img{display:block;max-width:100%;height:auto}
  .wrap{max-width:1160px;margin:0 auto;padding:0 clamp(1.25rem,5vw,3rem)}
  .eyebrow{font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;
    color:var(--brass);font-weight:600;margin-bottom:1rem}
  .section{padding:clamp(4rem,10vw,8rem) 0}
  .section-title{font-family:var(--display);font-weight:400;
    font-size:clamp(2rem,5vw,3.4rem);line-height:1.05;letter-spacing:-.01em;
    margin-bottom:2.5rem}

  /* ---- Hero ---- */
  .hero{position:relative;min-height:100svh;display:flex;align-items:flex-end;
    color:#fff;overflow:hidden}
  .hero-bg{position:absolute;inset:0;background:#2a251f center/cover no-repeat;
    ${hero ? `background-image:url('${esc(hero)}');` : ''}
    animation:kenburns 24s ease-in-out infinite alternate;will-change:transform}
  .hero::after{content:"";position:absolute;inset:0;
    background:linear-gradient(180deg,rgba(20,18,15,.25) 0%,rgba(20,18,15,0) 35%,rgba(20,18,15,.8) 100%)}
  .hero-inner{position:relative;z-index:2;width:100%;padding-bottom:clamp(2.5rem,6vw,5rem)}
  .hero .eyebrow{color:var(--brass-light)}
  .hero-title{font-family:var(--display);font-weight:400;
    font-size:clamp(2.6rem,8vw,6rem);line-height:.98;letter-spacing:-.02em;
    max-width:14ch;opacity:0;transform:translateY(24px);
    animation:rise 1s .2s cubic-bezier(.2,.7,.2,1) forwards}
  .hero-sub{margin-top:1rem;font-size:clamp(1rem,2vw,1.25rem);color:rgba(255,255,255,.85);
    max-width:44ch;opacity:0;animation:rise 1s .4s cubic-bezier(.2,.7,.2,1) forwards}
  .hero-price{margin-top:1.5rem;font-family:var(--display);font-size:clamp(1.4rem,3vw,2rem);
    color:var(--brass-light);opacity:0;animation:rise 1s .55s cubic-bezier(.2,.7,.2,1) forwards}

  /* ---- Residence intro ---- */
  .residence .wrap{max-width:820px;text-align:center}
  .residence .story{font-size:clamp(1.05rem,2vw,1.3rem);color:var(--slate);
    white-space:pre-line;margin-bottom:1.5rem;line-height:1.75}
  .residence .address{font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--brass)}

  /* ---- 1. THE TOUR ---- */
  .tour{position:relative;background:var(--ink)}
  .tour .scene{position:relative;height:82vh}
  .tour .scene img{width:100%;height:100%;object-fit:cover}
  .scene-cap{position:absolute;left:clamp(1.25rem,5vw,3.5rem);bottom:clamp(1.5rem,5vw,3.5rem);
    z-index:3;color:#fff;max-width:34ch;text-shadow:0 2px 24px rgba(0,0,0,.5)}
  .scene::after{content:"";position:absolute;inset:0;z-index:2;
    background:linear-gradient(180deg,rgba(20,18,15,.1) 0%,transparent 40%,rgba(20,18,15,.7) 100%)}
  .scene-idx{font-family:var(--display);font-size:.9rem;color:var(--brass-light);
    display:block;margin-bottom:.5rem;letter-spacing:.1em}
  .scene-cap h3{font-family:var(--display);font-weight:400;
    font-size:clamp(1.6rem,4vw,2.6rem);line-height:1.05;margin-bottom:.4rem}
  .scene-cap p{font-size:clamp(.9rem,1.6vw,1.05rem);color:rgba(255,255,255,.82)}
  .tour-hud,.tour-hint{display:none}

  /* animated (JS + motion-ok) mode */
  .tour--anim{height:calc(var(--rooms) * 100vh)}
  .tour--anim .tour-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
  .tour--anim .scenes{position:absolute;inset:0}
  .tour--anim .scene{position:absolute;inset:0;height:auto;opacity:0;
    will-change:opacity,transform}
  .tour--anim .scene img{position:absolute;inset:0}
  .tour--anim .tour-hud{position:absolute;top:clamp(1.25rem,4vw,2.5rem);
    right:clamp(1.25rem,5vw,3.5rem);z-index:4;display:flex;align-items:center;gap:.5rem;
    color:rgba(255,255,255,.8);font-size:.75rem;letter-spacing:.15em;font-family:var(--display)}
  .tour--anim .tour-sep{opacity:.5}
  .tour--anim .tour-track{width:70px;height:2px;background:rgba(255,255,255,.25);
    margin-left:.5rem;border-radius:2px;overflow:hidden}
  .tour--anim .tour-bar{display:block;height:100%;width:0;background:var(--brass-light)}
  .tour--anim .tour-hint{position:absolute;left:50%;bottom:1.5rem;transform:translateX(-50%);
    z-index:4;display:block;color:rgba(255,255,255,.65);font-size:.62rem;letter-spacing:.28em;
    text-transform:uppercase;animation:nudge 2s ease-in-out infinite}
  .tour--anim.tour-scrolled .tour-hint{opacity:0;transition:opacity .4s}

  /* ---- 2. THE LOCATION ---- */
  .location{background:var(--stone)}
  .loc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1px;
    background:rgba(26,24,21,.08);border:1px solid rgba(26,24,21,.08);margin-bottom:clamp(2rem,5vw,3.5rem)}
  .loc-card{background:var(--stone);padding:1.5rem;display:flex;flex-direction:column;gap:.55rem}
  .loc-icon{width:24px;height:24px;color:var(--brass)}
  .loc-icon svg{width:100%;height:100%}
  .loc-name{font-family:var(--display);font-size:1.1rem}
  .loc-dist{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--slate)}
  .access{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.5rem,4vw,3rem)}
  .access-head{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:var(--brass);
    font-weight:600;margin-bottom:1.1rem;padding-bottom:.6rem;border-bottom:1px solid rgba(26,24,21,.12)}
  .hwy-row{display:flex;flex-wrap:wrap;gap:.9rem}
  .hwy{display:flex;flex-direction:column;align-items:center;gap:.5rem}
  .shield{display:flex;align-items:center;justify-content:center;width:52px;height:46px;
    background:var(--ink);color:#fff;border-radius:6px;font-family:var(--display);font-size:1.05rem;
    box-shadow:inset 0 0 0 2px var(--brass-light),inset 0 0 0 4px var(--ink)}
  .hwy-time{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--slate)}
  .dest-list{display:flex;flex-direction:column}
  .dest{display:flex;align-items:center;gap:.9rem;padding:.85rem 0;
    border-bottom:1px solid rgba(26,24,21,.1)}
  .dest:last-child{border-bottom:none}
  .dest-icon{width:22px;height:22px;color:var(--brass);flex-shrink:0}
  .dest-icon svg{width:100%;height:100%}
  .dest-label{flex:1;font-size:.98rem}
  .dest-time{font-family:var(--display);font-size:1.05rem;color:var(--ink)}

  /* ---- 3. THE NUMBERS ---- */
  .numbers{background:var(--ink);color:var(--paper);text-align:center}
  .numbers .eyebrow{color:var(--brass-light)}
  .num-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
    gap:clamp(1.5rem,4vw,3rem);margin-bottom:2.5rem}
  .num{display:flex;flex-direction:column;gap:.6rem}
  .num-v{font-family:var(--display);font-size:clamp(2.2rem,5vw,3.4rem);line-height:1;
    color:var(--brass-light)}
  .num-l{font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,240,232,.55)}
  .num-price{font-family:var(--display);font-size:clamp(1.6rem,4vw,2.4rem);color:var(--paper);
    padding-top:2rem;border-top:1px solid rgba(244,240,232,.14);max-width:16ch;margin:0 auto}

  /* ---- 3b. THE LEASE — terms ---- */
  .terms{background:var(--paper)}
  .term-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;
    background:rgba(26,24,21,.1);border:1px solid rgba(26,24,21,.1)}
  .term{background:var(--paper);padding:1.5rem;display:flex;flex-direction:column;gap:.55rem}
  .term-label{font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--brass);font-weight:600}
  .term-value{font-family:var(--display);font-size:1.25rem;color:var(--ink);line-height:1.2}

  /* ---- CTA + footer ---- */
  .cta{background:var(--stone);text-align:center}
  .cta-btn{display:inline-block;margin-top:1rem;padding:1rem 2.5rem;
    border:1px solid var(--brass);color:var(--brass);text-decoration:none;
    font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;transition:background .3s,color .3s}
  .cta-btn:hover{background:var(--brass);color:var(--paper)}
  .cta-agent{margin-top:2rem;font-size:.85rem;color:var(--slate);letter-spacing:.05em}
  footer{background:var(--ink);color:rgba(244,240,232,.45);padding:2rem 0;text-align:center;
    font-size:.72rem;letter-spacing:.1em;border-top:1px solid rgba(244,240,232,.08)}

  /* ---- Reveal + watermark ---- */
  .reveal{opacity:0;transform:translateY(28px);
    transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
  .reveal.in{opacity:1;transform:none}
  .watermark{position:fixed;top:1rem;left:1rem;z-index:9999;display:flex;flex-direction:column;
    line-height:1;pointer-events:none;background:rgba(26,24,21,.85);color:#fff;padding:.6rem .9rem;
    border-radius:2px;font-size:.7rem;letter-spacing:.25em}
  .watermark span:first-child{font-weight:700}
  .wm-sub{margin-top:.35rem;font-size:.55rem;letter-spacing:.2em;color:var(--brass-light);text-transform:uppercase}

  @keyframes kenburns{from{transform:scale(1.05) translate(0,0)}to{transform:scale(1.16) translate(0,-2%)}}
  @keyframes rise{to{opacity:1;transform:none}}
  @keyframes nudge{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,4px)}}

  @media (max-width:820px){
    .access{grid-template-columns:1fr}
    .tour .scene{height:70vh}
  }
  @media (prefers-reduced-motion:reduce){
    .hero-bg{animation:none}
    .hero-title,.hero-sub,.hero-price{animation:none;opacity:1;transform:none}
    .reveal{opacity:1;transform:none;transition:none}
    html{scroll-behavior:auto}
  }
</style>
</head>
<body class="${locked ? 'locked' : ''}">
${watermark}

<header class="hero">
  <div class="hero-bg"></div>
  <div class="hero-inner wrap">
    ${listing.neighbourhood ? `<p class="eyebrow">${esc(listing.neighbourhood)}</p>` : ''}
    <h1 class="hero-title">${esc(title)}</h1>
    ${listing.headline ? `<p class="hero-sub">${esc(listing.headline)}</p>` : ''}
    ${priceDisplay(listing) ? `<p class="hero-price">${esc(priceDisplay(listing))}</p>` : ''}
  </div>
</header>

${
  listing.description
    ? `<section class="section residence">
        <div class="wrap">
          <p class="eyebrow reveal">The Residence</p>
          <p class="story reveal">${esc(listing.description)}</p>
          ${listing.address ? `<p class="address reveal">${esc(listing.address)}</p>` : ''}
        </div>
      </section>`
    : ''
}

${tourSection(scenes)}
${locationSection(listing.pois, listing.commute)}
${numbersSection(listing)}
${leaseTermsSection(listing)}

<section class="section cta">
  <div class="wrap">
    <p class="eyebrow reveal" style="color:var(--brass)">${lease ? 'Now Leasing' : 'Private Viewing'}</p>
    <h2 class="section-title reveal">${lease ? 'Book a private viewing' : 'Arrange a private viewing'}</h2>
    <a class="cta-btn" href="${listing.phone ? 'tel:' + esc(listing.phone) : '#'}">${lease ? 'Request a Viewing' : 'Request a Showing'}</a>
    ${agentLine}
  </div>
</section>

<footer>
  ${esc(title)} &nbsp;·&nbsp; Presented by ${esc(listing.brokerage || listing.agent_name || 'The Linova Group')}
</footer>

<script>
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el){ io.observe(el); });
  }

  // Count-up on "By the Numbers"
  if (!reduce && 'IntersectionObserver' in window) {
    document.querySelectorAll('.num-v[data-count]').forEach(function(el){
      var raw = el.getAttribute('data-count') || '';
      var target = parseFloat(String(raw).replace(/[^0-9.]/g,''));
      if (!isFinite(target) || target === 0) return;
      var suffix = String(raw).replace(/[0-9.,]/g,'');
      var hasComma = String(raw).indexOf(',') > -1;
      var seen = false;
      var so = new IntersectionObserver(function(en){
        en.forEach(function(e){
          if (!e.isIntersecting || seen) return; seen = true;
          var start = null, dur = 1400;
          function step(ts){
            if (start === null) start = ts;
            var p = Math.min((ts - start)/dur, 1);
            var val = Math.floor((0.5 - Math.cos(p*Math.PI)/2) * target);
            el.textContent = (hasComma ? val.toLocaleString() : val) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.5 });
      so.observe(el);
    });
  }

  // ---- Scroll-driven house tour ----
  var tour = document.getElementById('tour');
  if (tour && !reduce) {
    var scenes = Array.prototype.slice.call(tour.querySelectorAll('.scene'));
    var n = scenes.length;
    if (n >= 2) {
      tour.classList.add('tour--anim');
      var idxEl = tour.querySelector('.tour-idx');
      var barEl = tour.querySelector('.tour-bar');
      var ticking = false;

      function render(){
        var vh = window.innerHeight;
        var total = tour.offsetHeight - vh;
        var top = tour.getBoundingClientRect().top;
        var scrolled = Math.min(Math.max(-top, 0), total > 0 ? total : 0);
        var p = total > 0 ? scrolled / total : 0;   // 0..1 through the tour
        var pos = p * (n - 1);                        // floating room position

        for (var i = 0; i < n; i++){
          var local = pos - i;                        // <0 upcoming, >0 passed
          var dist = Math.abs(local);
          var s = scenes[i];
          var op = Math.max(0, 1 - dist);
          s.style.opacity = op.toFixed(3);
          // rooms drift up and scale slightly as you move through/past them
          var scale = 1 + Math.min(dist, 1) * 0.09;
          var shiftY = (-local * 4).toFixed(2);
          var driftX = ((i % 2 ? 1 : -1) * local * 1.5).toFixed(2);
          s.style.transform = 'translate(' + driftX + '%,' + shiftY + 'vh) scale(' + scale.toFixed(3) + ')';
          s.style.zIndex = String(50 - Math.round(dist * 10));
          s.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        }

        var active = Math.round(pos);
        if (idxEl) idxEl.textContent = ('0' + (active + 1)).slice(-2);
        if (barEl) barEl.style.width = (p * 100).toFixed(1) + '%';
        if (p > 0.02) tour.classList.add('tour-scrolled');
        ticking = false;
      }
      function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(render); } }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      render();
    }
  }
})();
</script>
</body>
</html>`;
}
