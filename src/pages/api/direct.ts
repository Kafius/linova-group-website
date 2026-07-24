// POST /api/direct — the AI "tour director".
//
// Takes the rooms the agent has captured and returns a cinematic ORDER plus a
// short evocative CAPTION per room, so the scroll-through tour feels authored
// rather than templated. The template still owns the animation; this only
// decides sequence + words.
//
// Contract: returns { scenes: [{ index, caption }] } where `index` refers to the
// caller's original room array. The client re-orders its rooms by that sequence
// and applies the captions (preserving each room's photos). Rooms the model
// omits are kept and appended, so nothing is ever lost.
//
// Graceful: with no ANTHROPIC_API_KEY it still returns a sensible category-based
// order (captions left blank) — the button always does something useful.

import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { serverEnv, json, clientIp } from '../../lib/estate/server';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';
import type { RoomCategory } from '../../lib/estate/types';

export const prerender = false;

interface InRoom {
  name?: string;
  category?: RoomCategory;
}
interface Body {
  listing_type?: string;
  neighbourhood?: string;
  headline?: string;
  price?: string;
  address?: string;
  rooms?: InRoom[];
}

// Canonical cinematic order: open on the arrival, build through the living
// spaces, retreat to the private rooms, finish outside / on the view.
const CATEGORY_ORDER: RoomCategory[] = [
  'exterior', 'foyer', 'living', 'kitchen', 'dining', 'office',
  'primary', 'bedroom', 'bathroom', 'basement', 'outdoor', 'view', 'detail',
];
const rank = (c?: RoomCategory) => {
  const i = c ? CATEGORY_ORDER.indexOf(c) : -1;
  return i < 0 ? CATEGORY_ORDER.length : i;
};

/** Deterministic fallback: stable sort by cinematic category rank. */
function fallbackScenes(rooms: InRoom[]): { index: number; caption: string }[] {
  return rooms
    .map((r, index) => ({ index, r }))
    .sort((a, b) => rank(a.r.category) - rank(b.r.category) || a.index - b.index)
    .map(({ index }) => ({ index, caption: '' }));
}

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'direct', 10, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const rooms = (body.rooms ?? []).slice(0, 20);
  if (!rooms.length) return json({ scenes: [] });

  const key = serverEnv('ANTHROPIC_API_KEY');
  if (!key) return json({ scenes: fallbackScenes(rooms) });

  try {
    const client = new Anthropic({ apiKey: key });
    const context = [
      body.listing_type === 'lease' ? 'This home is for lease.' : 'This home is for sale.',
      body.neighbourhood ? `Neighbourhood: ${body.neighbourhood}` : '',
      body.headline ? `Headline: ${body.headline}` : '',
      body.price ? `Price: ${body.price}` : '',
    ].filter(Boolean).join('\n');

    const roomList = rooms
      .map((r, i) => `${i}. ${r.name || 'Room'} (${r.category || 'detail'})`)
      .join('\n');

    const res = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      output_config: {
        effort: 'low',
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              scenes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    index: { type: 'integer' },
                    caption: { type: 'string' },
                  },
                  required: ['index', 'caption'],
                  additionalProperties: false,
                },
              },
            },
            required: ['scenes'],
            additionalProperties: false,
          },
        },
      } as any,
      system:
        'You are a cinematic real-estate tour director. You sequence a home tour ' +
        'so it opens strong, flows room to room the way someone would actually ' +
        'walk through, and finishes on a memorable beat (a view, the grounds). ' +
        'You also write one short, evocative caption per room: max 9 words, ' +
        'specific to the room’s role, no clichés, no exclamation marks, and never ' +
        'invent features that were not given.',
      messages: [
        {
          role: 'user',
          content:
            `${context}\n\nRooms (index. name (category)):\n${roomList}\n\n` +
            'Return scenes: every room exactly once, reordered into the best ' +
            'walkthrough, each with its caption. Use the given index for each room.',
        },
      ],
    });

    const text = res.content.find((b: any) => b.type === 'text') as any;
    const parsed = JSON.parse(text?.text ?? '{}');
    const raw: any[] = Array.isArray(parsed.scenes) ? parsed.scenes : [];

    // Validate: keep in-range, de-duplicated indices; append anything omitted.
    const seen = new Set<number>();
    const scenes: { index: number; caption: string }[] = [];
    for (const s of raw) {
      const idx = Number(s?.index);
      if (!Number.isInteger(idx) || idx < 0 || idx >= rooms.length || seen.has(idx)) continue;
      seen.add(idx);
      scenes.push({ index: idx, caption: String(s?.caption ?? '').slice(0, 120) });
    }
    if (!scenes.length) return json({ scenes: fallbackScenes(rooms) });
    rooms.forEach((_, i) => {
      if (!seen.has(i)) scenes.push({ index: i, caption: '' });
    });

    return json({ scenes });
  } catch {
    return json({ scenes: fallbackScenes(rooms) });
  }
};
