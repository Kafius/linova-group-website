import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'client', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'industry', type: 'reference', to: [{ type: 'industry' }] }),
    defineField({ name: 'summary', type: 'text', rows: 3, description: 'One or two sentences for the /work index' }),
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
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Featured studies appear on the homepage' }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'heroImage' },
  },
});
