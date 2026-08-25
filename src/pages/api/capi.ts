// Meta Conversions API — server-side Lead / Schedule events for /lp/*
// (§10). Browser pixel fires the same event with the same event_id so Meta
// deduplicates. PII is SHA-256-hashed here before it leaves the server.
import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

export const prerender = false;

const PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;
const ACCESS_TOKEN = import.meta.env.META_CAPI_ACCESS_TOKEN as string | undefined;

const ALLOWED_EVENTS = new Set(['Lead', 'Schedule']);

const sha256 = (value: string) =>
  createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'capi_not_configured', hint: 'Set PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN (see README).' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400 });
  }

  const eventName = String(body.event_name ?? '');
  const eventId = String(body.event_id ?? '');
  if (!ALLOWED_EVENTS.has(eventName) || !eventId) {
    return new Response(JSON.stringify({ error: 'invalid_event' }), { status: 400 });
  }

  const userData: Record<string, unknown> = {
    client_ip_address: clientAddress,
    client_user_agent: request.headers.get('user-agent') ?? undefined,
  };
  if (typeof body.email === 'string' && body.email) userData.em = [sha256(body.email)];
  if (typeof body.phone === 'string' && body.phone) userData.ph = [sha256(body.phone.replace(/[^0-9+]/g, ''))];
  if (typeof body.fbclid === 'string' && body.fbclid) {
    userData.fbc = `fb.1.${Date.now()}.${body.fbclid}`;
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: typeof body.url === 'string' ? body.url : undefined,
        action_source: 'website',
        user_data: userData,
        custom_data: typeof body.utm === 'object' && body.utm ? body.utm : undefined,
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error('[capi] meta rejected event', res.status, detail.slice(0, 500));
    return new Response(JSON.stringify({ error: 'meta_rejected' }), { status: 502 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
