import { defineField, defineType } from 'sanity';

// Mirrors src/data/industries.ts (the Industry interface) so the verticals
// can move to the CMS later without a refactor.
export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'cycleWord', type: 'string', description: 'The word shown in the homepage cycling slot' }),
    defineField({ name: 'headline', type: 'string', description: 'The pain, in their language' }),
    defineField({ name: 'problem', type: 'text', rows: 4 }),
    defineField({
      name: 'approach',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'approachItem',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'detail', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'marketingAngles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'angle',
          fields: [
            defineField({ name: 'channel', type: 'string' }),
            defineField({ name: 'angle', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'proof',
      type: 'object',
      fields: [
        defineField({ name: 'client', type: 'string' }),
        defineField({ name: 'url', type: 'url' }),
        defineField({ name: 'result', type: 'string', description: 'Real, verified result only — never invented' }),
      ],
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['live', 'concept'] },
      initialValue: 'live',
    }),
    defineField({ name: 'conceptPitch', type: 'text', rows: 3 }),
    defineField({ name: 'motif', type: 'string', description: 'Motif id in src/components/motifs' }),
    defineField({ name: 'accent', type: 'string', description: 'Hex — must hold ≥4.5:1 on navy #242460' }),
    defineField({ name: 'accentName', type: 'string' }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 2 }),
      ],
    }),
  ],
});
