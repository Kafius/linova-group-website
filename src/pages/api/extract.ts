// POST /api/extract — derive listing metadata from Step 1 basics.
//
//   • neighbourhood  — from the address's geocoded components (Google), else ''
//   • heroTitle      — the street line of the address (client can also do this)
//   • headline/story — AI-drafted from the facts (Anthropic), else ''
//
// Everything degrades to '' so Step 2 simply presents empty, editable fields
// when the keys aren't configured.
//
// Optional env: GOOGLE_MAPS_KEY (neighbourhood), ANTHROPIC_API_KEY (copy).

import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { serverEnv, json, clientIp } from '../../lib/estate/server';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';

export const prerender = false;

interface Body {
  address?: string;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  year_built?: number | null;
  price?: string;
  neighbourhood?: string;
}

function heroTitleFrom(address: string): string {
  return (address.split(',')[0] || address).trim();
}

async function neighbourhoodFrom(address: string, key: string): Promise<string> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${key}`;
    const data = (await (await fetch(url)).json()) as any;
    const comps = data?.results?.[0]?.address_components ?? [];
    const pick = (type: string) =>
      comps.find((c: any) => c.types?.includes(type))?.long_name as string | undefined;
    return pick('neighborhood') || pick('sublocality') || pick('locality') || '';
  } catch {
    return '';
  }
}

async function draftCopy(body: Body): Promise<{ headline: string; description: string }> {
  const key = serverEnv('ANTHROPIC_API_KEY');
  if (!key) return { headline: '', description: '' };
  try {
    const client = new Anthropic({ apiKey: key });
    const facts = [
      `Address: ${body.address ?? ''}`,
      body.neighbourhood ? `Neighbourhood: ${body.neighbourhood}` : '',
      body.beds ? `Bedrooms: ${body.beds}` : '',
      body.baths ? `Bathrooms: ${body.baths}` : '',
      body.sqft ? `Interior: ${body.sqft} sq ft` : '',
      body.year_built ? `Year built: ${body.year_built}` : '',
      body.price ? `Price: ${body.price}` : '',
    ]
      .filter(Boolean)
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
              headline: { type: 'string' },
              description: { type: 'string' },
            },
            required: ['headline', 'description'],
            additionalProperties: false,
          },
        },
      } as any,
      system:
        'You are a luxury real-estate copywriter. Write restrained, evocative listing copy — no clichés, no exclamation marks, no fabricated features. Only use the facts given.',
      messages: [
        {
          role: 'user',
          content:
            `Write listing copy for this home.\n\n${facts}\n\n` +
            'headline: a short, elegant hero headline (max 8 words). ' +
            'description: 2–3 sentences of story that sells the lifestyle, grounded only in these facts.',
        },
      ],
    });
    const text = res.content.find((b: any) => b.type === 'text') as any;
    const parsed = JSON.parse(text?.text ?? '{}');
    return {
      headline: String(parsed.headline ?? '').slice(0, 200),
      description: String(parsed.description ?? '').slice(0, 1200),
    };
  } catch {
    return { headline: '', description: '' };
  }
}

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'extract', 20, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  const address = (body.address ?? '').trim();
  if (!address) return json({ error: 'address is required.' }, 400);

  const mapsKey = serverEnv('GOOGLE_MAPS_KEY');
  const [neighbourhood, copy] = await Promise.all([
    body.neighbourhood
      ? Promise.resolve(body.neighbourhood)
      : mapsKey
        ? neighbourhoodFrom(address, mapsKey)
        : Promise.resolve(''),
    draftCopy(body),
  ]);

  return json({
    neighbourhood,
    heroTitle: heroTitleFrom(address),
    headline: copy.headline,
    description: copy.description,
  });
};
