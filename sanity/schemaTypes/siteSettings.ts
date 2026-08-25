import { defineField, defineType } from 'sanity';

// Singleton — nav, footer, socials, default SEO, feature flags.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', initialValue: 'The Linova Group' }),
    defineField({
      name: 'nav',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'social',
          fields: [
            defineField({ name: 'network', type: 'string' }),
            defineField({ name: 'url', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'defaultSeo',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 2 }),
        defineField({ name: 'ogImage', type: 'image' }),
      ],
    }),
    defineField({
      name: 'features',
      type: 'object',
      description: 'Feature flags',
      fields: [
        defineField({
          name: 'googleReviews',
          type: 'boolean',
          initialValue: false,
          description: 'Off until the Google Business Profile exists (see README)',
        }),
      ],
    }),
  ],
});
