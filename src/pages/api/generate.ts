// POST /api/generate — persist a listing and return its preview slug.
//
// Saves the builder's form data as a new row (locked = true) and returns the
// slug that drives preview.thelinovagroup.com/[slug]. Writes use the service
// role key (RLS-bypassing) so the anon browser never gets write access.
//
// Body:  ListingInput (see src/lib/estate/types.ts)
// Reply: { slug, previewUrl }

import type { APIRoute } from 'astro';
import { getAdminClient } from '../../lib/estate/supabase-admin';
import { slugify, shortId } from '../../lib/estate/slug';
import type { ListingInput, Poi, Room, Commute } from '../../lib/estate/types';

export const prerender = false;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function sanitizePois(input: unknown): Poi[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((p) => p && typeof p === 'object')
    .map((p: any) => ({
      type: String(p.type ?? 'park'),
      name: String(p.name ?? '').slice(0, 120),
      dist: String(p.dist ?? '').slice(0, 40),
    }))
    .filter((p) => p.name)
    .slice(0, 12) as Poi[];
}

function sanitizeRooms(input: unknown): Room[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((r) => r && typeof r === 'object')
    .map((r: any) => {
      const shots = Array.isArray(r.shots)
        ? r.shots
            .filter((s: any) => s && s.url)
            .map((s: any) => ({ url: String(s.url).slice(0, 500), angle: String(s.angle ?? '').slice(0, 80) }))
            .slice(0, 10)
        : [];
      const photo = String(r.photo ?? shots[0]?.url ?? '').slice(0, 500);
      return {
        name: String(r.name ?? '').slice(0, 80),
        category: String(r.category ?? '').slice(0, 20),
        guidance: String(r.guidance ?? '').slice(0, 300),
        caption: String(r.caption ?? '').slice(0, 200),
        photo,
        shots,
      };
    })
    .filter((r) => r.photo || r.shots.length)
    .slice(0, 16) as Room[];
}

function sanitizeCommute(input: unknown): Commute {
  const c = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const keys: (keyof Commute)[] = ['downtown', 'airport', 'hwy401', 'hwy407', 'hwy404', 'hwy400', 'hospital'];
  const out: Commute = {};
  for (const k of keys) {
    const v = String(c[k] ?? '').slice(0, 40);
    if (v) out[k] = v;
  }
  return out;
}

function toInt(v: unknown): number | null {
  const n = parseInt(String(v ?? '').replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(n) ? n : null;
}

export const POST: APIRoute = async ({ request }) => {
  let body: ListingInput;
  try {
    body = (await request.json()) as ListingInput;
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const name = String(body.name ?? '').trim();
  const address = String(body.address ?? '').trim();
  if (!name || !address) {
    return json({ error: 'name and address are required.' }, 400);
  }

  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return json({ error: (e as Error).message }, 503);
  }

  const photos = Array.isArray(body.photos) ? body.photos.filter(Boolean).slice(0, 24) : [];

  // Attribute the listing to the signed-in agent, if a valid token was sent.
  let agentId: string | null = null;
  const token = String((body as any).access_token ?? '');
  if (token) {
    try {
      const { data } = await supabase.auth.getUser(token);
      agentId = data?.user?.id ?? null;
    } catch {
      agentId = null;
    }
  }

  const listingType = String((body as any).listing_type ?? '') === 'lease' ? 'lease' : 'sale';

  const row = {
    slug: '', // set below
    agent_id: agentId,
    listing_type: listingType,
    name: name.slice(0, 160),
    address: address.slice(0, 240),
    neighbourhood: String(body.neighbourhood ?? '').slice(0, 120) || null,
    price: String(body.price ?? '').slice(0, 40) || null,
    beds: toInt(body.beds),
    baths: toInt(body.baths),
    sqft: toInt(body.sqft),
    year_built: toInt(body.year_built),
    lot_text: String(body.lot_text ?? '').slice(0, 60) || null,
    // lease terms (persisted regardless of type; only surfaced when leasing)
    lease_term: String((body as any).lease_term ?? '').slice(0, 60) || null,
    available_date: String((body as any).available_date ?? '').slice(0, 60) || null,
    furnished: String((body as any).furnished ?? '').slice(0, 60) || null,
    pets: String((body as any).pets ?? '').slice(0, 80) || null,
    utilities: String((body as any).utilities ?? '').slice(0, 80) || null,
    deposit: String((body as any).deposit ?? '').slice(0, 60) || null,
    headline: String(body.headline ?? '').slice(0, 200) || null,
    description: String(body.description ?? '').slice(0, 4000) || null,
    photos,
    rooms: sanitizeRooms(body.rooms),
    pois: sanitizePois(body.pois),
    commute: sanitizeCommute(body.commute),
    agent_name: String(body.agent_name ?? '').slice(0, 120) || null,
    brokerage: String(body.brokerage ?? '').slice(0, 160) || null,
    phone: String(body.phone ?? '').slice(0, 40) || null,
    email: String((body as any).email ?? '').slice(0, 160) || null,
    locked: true,
  };

  // Resolve a unique slug (base, then base-xxxx on collision).
  const base = slugify(name);
  let slug = base;
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data: clash } = await supabase
      .from('listings')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (!clash) break;
    slug = `${base}-${shortId(base.length + attempt * 977 + name.length)}`;
  }
  row.slug = slug;

  const { data, error } = await supabase.from('listings').insert(row).select('slug').single();
  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({
    slug: data.slug,
    previewUrl: `https://preview.thelinovagroup.com/${data.slug}`,
  });
};
