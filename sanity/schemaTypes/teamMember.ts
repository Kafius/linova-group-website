import { defineField, defineType } from 'sanity';

// The Philippines marketing team — powers the homepage handoff act and the
// About page once real names, roles, and photos arrive.
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', type: 'string', initialValue: 'Philippines' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'order', type: 'number', description: 'Display order' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});
