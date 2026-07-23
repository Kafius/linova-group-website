// Small server-only helpers shared by the Estate Sites API routes.

/** Read a server env var from either Vite (dev) or the Node runtime (Vercel). */
export function serverEnv(name: string): string | undefined {
  return (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** Best-effort client IP for rate limiting (Vercel sets x-forwarded-for). */
export function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'anon';
}

/** Geocode a full address → "lat,lng" (or null). Requires GOOGLE_MAPS_KEY. */
export async function geocode(address: string, key: string): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as any;
  const loc = data?.results?.[0]?.geometry?.location;
  return loc ? `${loc.lat},${loc.lng}` : null;
}

/** Distance Matrix duration for one origin→destination in a travel mode. */
export async function travelTime(
  origin: string,
  destination: string,
  mode: 'walking' | 'driving',
  key: string
): Promise<{ text: string; meters: number } | null> {
  const url =
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=${mode}` +
    `&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as any;
  const el = data?.rows?.[0]?.elements?.[0];
  if (!el || el.status !== 'OK') return null;
  return { text: el.duration?.text ?? '', meters: el.distance?.value ?? Infinity };
}
