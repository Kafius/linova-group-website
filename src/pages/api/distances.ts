// POST /api/distances — server-side Google Maps proxy.
//
// The Google Maps key lives ONLY in the GOOGLE_MAPS_KEY env var and is never
// shipped to the client (brief §5). For each POI it geocodes the origin once,
// then asks the Distance Matrix API for WALKING time, falling back to DRIVING
// when the walk is longer than ~2km. Results are cached per (address, poi) in
// Supabase so re-renders don't re-bill Google.
//
// Body:  { address: string, pois: [{ type, name }] }
// Reply: { pois: [{ type, name, dist }] }
//
// In Google Cloud, restrict GOOGLE_MAPS_KEY to the Geocoding + Distance Matrix
// APIs and to your domain, and enable billing alerts.

import type { APIRoute } from 'astro';
import { getAdminClient } from '../../lib/estate/supabase-admin';
import { clientIp } from '../../lib/estate/server';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';

export const prerender = false;

const WALK_THRESHOLD_M = 2000;

interface PoiIn {
  type: string;
  name: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function geocode(address: string, key: string): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as any;
  const loc = data?.results?.[0]?.geometry?.location;
  return loc ? `${loc.lat},${loc.lng}` : null;
}

async function distance(
  originLatLng: string,
  destination: string,
  mode: 'walking' | 'driving',
  key: string
): Promise<{ text: string; meters: number } | null> {
  const url =
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=${mode}` +
    `&origins=${encodeURIComponent(originLatLng)}&destinations=${encodeURIComponent(
      destination
    )}&key=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as any;
  const el = data?.rows?.[0]?.elements?.[0];
  if (!el || el.status !== 'OK') return null;
  return { text: el.duration?.text ?? '', meters: el.distance?.value ?? Infinity };
}

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'distances', 30, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  const key = import.meta.env.GOOGLE_MAPS_KEY ?? process.env.GOOGLE_MAPS_KEY;
  if (!key) {
    return json({ error: 'Distance lookup unavailable: GOOGLE_MAPS_KEY not set.' }, 503);
  }

  let payload: { address?: string; pois?: PoiIn[] };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const address = (payload.address ?? '').trim();
  const pois = Array.isArray(payload.pois) ? payload.pois.slice(0, 12) : [];
  if (!address || pois.length === 0) {
    return json({ error: 'address and pois are required.' }, 400);
  }

  let supabase: ReturnType<typeof getAdminClient> | null = null;
  try {
    supabase = getAdminClient();
  } catch {
    supabase = null; // caching is best-effort; proceed without it
  }

  const origin = await geocode(address, key);
  if (!origin) return json({ error: 'Could not geocode that address.' }, 422);

  const out: { type: string; name: string; dist: string }[] = [];

  for (const poi of pois) {
    const name = (poi.name ?? '').trim();
    if (!name) continue;

    // cache hit?
    if (supabase) {
      const { data: cached } = await supabase
        .from('distance_cache')
        .select('dist')
        .eq('address', address)
        .eq('poi_name', name)
        .maybeSingle();
      if (cached?.dist) {
        out.push({ type: poi.type, name, dist: cached.dist });
        continue;
      }
    }

    const walk = await distance(origin, name, 'walking', key);
    let dist: string;
    if (walk && walk.meters <= WALK_THRESHOLD_M && walk.text) {
      dist = `${walk.text} walk`;
    } else {
      const drive = await distance(origin, name, 'driving', key);
      dist = drive?.text ? `${drive.text} drive` : walk?.text ? `${walk.text} walk` : '—';
    }

    out.push({ type: poi.type, name, dist });

    if (supabase) {
      await supabase
        .from('distance_cache')
        .upsert({ address, poi_name: name, dist }, { onConflict: 'address,poi_name' });
    }
  }

  return json({ pois: out });
};
