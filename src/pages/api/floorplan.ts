// POST /api/floorplan — suggest a room breakdown for Step 3.
//
// Hybrid strategy:
//   • If a floor-plan image URL is supplied AND Anthropic vision is configured,
//     Claude reads the plan and proposes rooms (name + category). The agent
//     always confirms/edits — the suggestion is never trusted blindly.
//   • Otherwise (no plan, or no key) fall back to defaultRooms(beds, baths),
//     which is always reliable.
//
// Body:  { url?, beds?, baths? }
// Reply: { rooms: [{name, category}], source: 'ai' | 'template' }
//
// Optional env: ANTHROPIC_API_KEY (for the vision step).

import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { serverEnv, json, clientIp } from '../../lib/estate/server';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';
import { defaultRooms } from '../../lib/estate/rooms';
import type { RoomCategory } from '../../lib/estate/types';

export const prerender = false;

const CATEGORIES: RoomCategory[] = [
  'exterior', 'foyer', 'living', 'kitchen', 'dining', 'primary',
  'bedroom', 'bathroom', 'office', 'basement', 'outdoor', 'view', 'detail',
];

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'floorplan', 10, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  let body: { url?: string; beds?: number | null; baths?: number | null };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const key = serverEnv('ANTHROPIC_API_KEY');
  const fallback = () =>
    json({ rooms: defaultRooms(body.beds ?? null, body.baths ?? null), source: 'template' });

  if (!key || !body.url) return fallback();

  try {
    const client = new Anthropic({ apiKey: key });
    const res = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2048,
      output_config: {
        effort: 'low',
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              rooms: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    category: { type: 'string', enum: CATEGORIES },
                  },
                  required: ['name', 'category'],
                  additionalProperties: false,
                },
              },
            },
            required: ['rooms'],
            additionalProperties: false,
          },
        },
      } as any,
      system:
        'You read residential floor plans and list the rooms a real-estate photographer should capture. Include an exterior and a backyard/grounds entry. Use concise, human room names.',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'url', url: body.url } },
            {
              type: 'text',
              text: 'List the rooms/areas to photograph in a natural walkthrough order, each with the closest category.',
            },
          ],
        },
      ],
    });
    const text = res.content.find((b: any) => b.type === 'text') as any;
    const parsed = JSON.parse(text?.text ?? '{}');
    const rooms = Array.isArray(parsed.rooms) ? parsed.rooms : [];
    if (!rooms.length) return fallback();
    return json({
      rooms: rooms
        .map((r: any) => ({
          name: String(r.name ?? '').slice(0, 80),
          category: (CATEGORIES.includes(r.category) ? r.category : 'detail') as RoomCategory,
        }))
        .filter((r: any) => r.name)
        .slice(0, 16),
      source: 'ai',
    });
  } catch {
    return fallback();
  }
};
