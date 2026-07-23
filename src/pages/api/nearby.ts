// POST /api/nearby — Google Places suggestions + GTA commute auto-fill.
//
// Given a full address it geocodes once, then:
//   • finds the nearest amenity of each key type (grocery, school, subway,
//     park, restaurant, hospital) and its walk/drive time,
//   • estimates drive times to Downtown Toronto, Pearson (YYZ), the 400-series
//     highways, and the nearest hospital.
//
// Body:  { address }
// Reply: { pois: [{type,name,dist}], commute: {...}, fallback?: true }
//
// Graceful: with no GOOGLE_MAPS_KEY it returns empty suggestions + fallback:true
// so the builder simply lets the agent enter everything by hand.
//
// Needs the Geocoding, Places, and Distance Matrix APIs enabled on the key.

import type { APIRoute } from 'astro';
import { serverEnv, json, geocode, travelTime, clientIp } from '../../lib/estate/server';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';
import { getAdminClient } from '../../lib/estate/supabase-admin';
import type { PoiType, Commute } from '../../lib/estate/types';

export const prerender = false;

const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const WALK_THRESHOLD_M = 2000;

const AMENITIES: { type: PoiType; place: string }[] = [
  { type: 'grocery', place: 'supermarket' },
  { type: 'school', place: 'school' },
  { type: 'transit', place: 'subway_station' },
  { type: 'park', place: 'park' },
  { type: 'restaurant', place: 'restaurant' },
  { type: 'medical', place: 'hospital' },
];

async function nearest(
  origin: string,
  placeType: string,
  key: string
): Promise<{ name: string; loc: string } | null> {
  const [lat, lng] = origin.split(',');
  const url =
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}` +
    `&rankby=distance&type=${placeType}&key=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as any;
  const r = data?.results?.[0];
  if (!r) return null;
  const loc = r.geometry?.location;
  return { name: r.name, loc: loc ? `${loc.lat},${loc.lng}` : origin };
}

async function bestTime(origin: string, dest: string, key: string): Promise<string> {
  const walk = await travelTime(origin, dest, 'walking', key);
  if (walk && walk.meters <= WALK_THRESHOLD_M && walk.text) return `${walk.text} walk`;
  const drive = await travelTime(origin, dest, 'driving', key);
  return drive?.text ? `${drive.text} drive` : walk?.text ? `${walk.text} walk` : '';
}

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'nearby', 20, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  const key = serverEnv('GOOGLE_MAPS_KEY');

  let body: { address?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  const address = (body.address ?? '').trim();
  if (!address) return json({ error: 'address is required.' }, 400);

  // Cache (best-effort) — keyed by normalized address, avoids re-billing Google.
  const cacheKey = address.toLowerCase();
  let supabase: ReturnType<typeof getAdminClient> | null = null;
  try {
    supabase = getAdminClient();
    const { data: hit } = await supabase
      .from('nearby_cache')
      .select('data, created_at')
      .eq('address', cacheKey)
      .maybeSingle();
    if (hit && Date.now() - new Date(hit.created_at).getTime() < CACHE_TTL_MS) {
      return json(hit.data);
    }
  } catch {
    supabase = null;
  }

  if (!key) return json({ pois: [], commute: {}, fallback: true });

  const origin = await geocode(address, key);
  if (!origin) return json({ pois: [], commute: {}, fallback: true });

  // Amenities (best-effort, in parallel).
  const pois = (
    await Promise.all(
      AMENITIES.map(async ({ type, place }) => {
        const hit = await nearest(origin, place, key);
        if (!hit) return null;
        const dist = await bestTime(origin, hit.loc, key);
        return dist ? { type, name: hit.name, dist } : null;
      })
    )
  ).filter(Boolean);

  // Commute (drive times to fixed GTA destinations).
  const dests: [keyof Commute, string][] = [
    ['downtown', 'Downtown Toronto, ON'],
    ['airport', 'Toronto Pearson International Airport'],
    ['hwy401', 'Ontario Highway 401'],
    ['hwy407', 'Ontario Highway 407'],
    ['hwy404', 'Ontario Highway 404'],
    ['hwy400', 'Ontario Highway 400'],
  ];
  const commute: Commute = {};
  await Promise.all(
    dests.map(async ([field, dest]) => {
      const t = await travelTime(origin, dest, 'driving', key);
      if (t?.text) commute[field] = `${t.text} drive`;
    })
  );
  // Nearest hospital drive time.
  const hosp = await nearest(origin, 'hospital', key);
  if (hosp) {
    const t = await travelTime(origin, hosp.loc, 'driving', key);
    if (t?.text) commute.hospital = `${t.text} drive`;
  }

  const result = { pois, commute };
  if (supabase) {
    await supabase.from('nearby_cache').upsert({ address: cacheKey, data: result, created_at: new Date().toISOString() });
  }
  return json(result);
};
