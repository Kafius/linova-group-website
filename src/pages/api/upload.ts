// POST /api/upload — receive an image (multipart form-data, field "file"),
// store it in the Supabase `listing-photos` bucket, return its public URL.
//
// The builder compresses/resizes images client-side before posting, so bodies
// stay well under Vercel's serverless limit. Writes use the service-role key.
//
// Requires: PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and a public
// storage bucket named `listing-photos` (see supabase/migrations).

import type { APIRoute } from 'astro';
import { getAdminClient } from '../../lib/estate/supabase-admin';
import { json, clientIp } from '../../lib/estate/server';
import { checkRateLimit, tooMany } from '../../lib/estate/ratelimit';

export const prerender = false;

const BUCKET = 'listing-photos';
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB safety cap
const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit(clientIp(request), 'upload', 60, 60);
  if (!rl.ok) return tooMany(rl.retryAfter);

  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return json({ error: (e as Error).message }, 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Expected multipart form-data.' }, 400);
  }

  const file = form.get('file');
  if (!(file instanceof File)) return json({ error: 'No file provided.' }, 400);

  const ext = EXT[file.type];
  if (!ext) return json({ error: 'Only JPEG, PNG, or WebP images are allowed.' }, 415);

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES) return json({ error: 'Image is too large.' }, 413);

  const path = `listings/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });

  if (error) return json({ error: error.message }, 500);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return json({ url: data.publicUrl, path });
};
