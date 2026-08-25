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
  site: 'https://thelinovagroup.com',
  output: 'static',
  adapter: vercel(),
  build: {
    // Inline all page CSS — kills ~470ms of render-blocking requests on
    // mobile 4G (the styles are small; the fonts carry the real weight).
    inlineStylesheets: 'always',
  },
  integrations: [
    ...sanityIntegrations,
    sitemap({
      // §14: /lp/* and /studio stay out of the sitemap (robots.txt disallows
      // them too); legacy client sub-sites are not Linova pages.
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/studio') &&
        !page.includes('/sourdelusions') &&
        !page.includes('/vinyllitetech') &&
        !page.includes('/wardkraft') &&
        !page.includes('/estate-sites') &&
        !page.includes('/preview/') &&
        !page.includes('/styleguide'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
