// Sanity Studio config — embedded at /studio (noindexed) once
// PUBLIC_LINOVA_SANITY_PROJECT_ID is set. See README → Sanity setup.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

// This file is bundled into the browser, where `process.env` does not exist
// and Vite does not inline it — reading it there shipped a Studio pointed at
// `placeholder.api.sanity.io`. Vite DOES inline `import.meta.env.PUBLIC_*`;
// the process.env fallback is for tooling that loads this config outside Vite.
//
// The last resort is the real project id, not a placeholder: under the Sanity
// CLI (`sanity build` / `sanity deploy`) neither lookup resolves — it only
// auto-loads SANITY_STUDIO_* — and a placeholder there builds a Studio that
// talks to a project which doesn't exist. The id is public regardless.
const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
  ?.env;
const projectId =
  import.meta.env?.PUBLIC_LINOVA_SANITY_PROJECT_ID ??
  nodeEnv?.PUBLIC_LINOVA_SANITY_PROJECT_ID ??
  '99tmdxsd';
const dataset =
  import.meta.env?.PUBLIC_LINOVA_SANITY_DATASET ?? nodeEnv?.PUBLIC_LINOVA_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'linova',
  title: 'The Linova Group',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('caseStudy').title('Case studies'),
            S.documentTypeListItem('industry').title('Industries'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('teamMember').title('Team members'),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
