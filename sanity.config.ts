// Sanity Studio config — embedded at /studio (noindexed) once
// PUBLIC_LINOVA_SANITY_PROJECT_ID is set. See README → Sanity setup.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'linova',
  title: 'The Linova Group',
  projectId: process.env.PUBLIC_LINOVA_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.PUBLIC_LINOVA_SANITY_DATASET ?? 'production',
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
