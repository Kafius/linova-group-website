import { defineField, defineType } from 'sanity';
import { industries } from '../../src/data/industries';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'client', type: 'string', validation: (r) => r.required() }),
    // The section a study files under on /work — the news rail is built from
    // these. Industries stay a code-side source of truth (accents, motifs and
    // the homepage cycle all read src/data/industries.ts), so this is a slug
    // picker against that module, not a reference to 14 mirror documents.
    defineField({
      name: 'industrySlug',
      title: 'Section',
      type: 'string',
      options: { list: industries.map((i) => ({ title: i.name, value: i.slug })) },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'The dek on /work — two short sentences, ~25 words. It is read, not scanned past.',
      validation: (r) => r.max(260),
    }),
    defineField({ name: 'challenge', type: 'text', rows: 5 }),
    defineField({
      name: 'approach',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The build story — portable text',
    }),
    defineField({
      name: 'results',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'result',
          fields: [
            defineField({ name: 'metric', type: 'string', description: 'e.g. "Lighthouse mobile" — real, verified numbers only' }),
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'context', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'testimonial', type: 'reference', to: [{ type: 'testimonial' }] }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
      description: 'Front-page story — eligible to lead /work and to run on the homepage',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      description: 'The dateline. /work orders newest first on this.',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'heroImage' },
  },
});
