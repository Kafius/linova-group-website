// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const sanityProjectId = env.PUBLIC_LINOVA_SANITY_PROJECT_ID || process.env.PUBLIC_LINOVA_SANITY_PROJECT_ID;
const sanityDataset = env.PUBLIC_LINOVA_SANITY_DATASET || process.env.PUBLIC_LINOVA_SANITY_DATASET || 'production';

// The Studio mounts at /studio only once the Sanity project exists
// (PUBLIC_LINOVA_SANITY_PROJECT_ID set — see README). Until then the site
// builds without it and /work renders from the seeded local module.
const sanityIntegrations = sanityProjectId
  ? [
      sanity({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        useCdn: false, // build-time fetches get fresh content
        studioBasePath: '/studio',
      }),
      react(),
    ]
  : [];

export default defineConfig({
  // The host Vercel serves; the apex 301s here. Keep in step with
  // `url` in src/data/site.ts, which drives canonicals and JSON-LD.
  site: 'https://www.thelinovagroup.com',
  output: 'static',
  adapter: vercel(),
  redirects: {
    // /discovery was the old booking landing page; /book replaces it on the
    // same Calendly event. Kept as a permanent redirect so ads, emails and
    // bookmarks pointing at it still land somewhere real.
    '/discovery': '/book',
  },
  build: {
    // Inline all page CSS — kills ~470ms of render-blocking requests on
    // mobile 4G (the styles are small; the fonts carry the real weight).
    inlineStylesheets: 'always',
  },
  integrations: [
    ...sanityIntegrations,
    sitemap({
      // §14: /lp/* and /studio stay out of the sitemap (robots.txt disallows
      // them too); the styleguide is an internal build artifact. /work/section/*
      // and /industries/category/* are noindexed navigation views over content
      // /work and /industries already publish in full, and the thank-you pages
      // are confirmation screens with nothing to offer search.
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/studio') &&
        !page.includes('/work/section/') &&
        !page.includes('/industries/category/') &&
        !page.includes('/thank-you-') &&
        !page.includes('/styleguide'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
