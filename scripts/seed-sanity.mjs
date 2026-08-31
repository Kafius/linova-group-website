// One-shot seeder: pushes sanity/seed/case-studies.ndjson into the Linova
// dataset and attaches the hero screenshots from src/assets/work/.
//
//   node scripts/seed-sanity.mjs          # create-if-missing (safe to re-run)
//   node scripts/seed-sanity.mjs --force  # overwrite existing documents
//
// Needs SANITY_WRITE_TOKEN + PUBLIC_LINOVA_SANITY_PROJECT_ID in .env.
// It writes published documents (no drafts), so /work builds straight away.
//
// Document ids must stay dot-free: Sanity reads a dot as a path separator and
// anything outside the root path (caseStudy.bikong, drafts.*) is invisible to
// unauthenticated readers — the build would silently fall back to the seeds.
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Minimal .env reader — the repo has no dotenv dependency and this script
// runs outside Vite, so it can't lean on loadEnv.
const env = { ...process.env };
const envPath = join(root, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const projectId = env.PUBLIC_LINOVA_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_LINOVA_SANITY_DATASET || 'production';
const token = env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Missing PUBLIC_LINOVA_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env');
  process.exit(1);
}

const force = process.argv.includes('--force');
const client = createClient({ projectId, dataset, token, apiVersion: '2026-01-01', useCdn: false });

// Hero screenshots live in the repo (they're also the fallback images in
// src/data/caseStudies.ts); Sanity gets its own copy as an asset.
const heroImages = {
  'caseStudy-cherry-grove-group': 'src/assets/work/work-cherrygrove.png',
  'caseStudy-bikong': 'src/assets/work/work-bikong.png',
  'caseStudy-liveroof-ontario': 'src/assets/work/work-liveroof.png',
};

const docs = readFileSync(join(root, 'sanity/seed/case-studies.ndjson'), 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

for (const doc of docs) {
  const existing = await client.getDocument(doc._id).catch(() => undefined);
  if (existing && !force) {
    console.log(`· ${doc._id} exists — skipped (pass --force to overwrite)`);
    continue;
  }

  const imagePath = heroImages[doc._id];
  if (imagePath && existsSync(join(root, imagePath))) {
    const asset = await client.assets.upload('image', readFileSync(join(root, imagePath)), {
      filename: imagePath.split('/').pop(),
    });
    doc.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    console.log(`  ↑ ${imagePath} → ${asset._id}`);
  }

  await client.createOrReplace(doc);
  console.log(`✓ ${doc._id}`);
}

console.log(`\nDone. https://www.sanity.io/manage/project/${projectId}`);
