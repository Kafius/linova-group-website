// CMS content model for Halden Home Furnishings.
//
// The CMS flag is TRUE on the Retail Large Catalogue playbook, and this is the
// build where it earns the line item outright: forty-five products, four
// category pages and two filter facets, all of which have to move when the
// floor does. A retailer who cannot retire a discontinued sofa without ringing
// a developer will have a website that lies about the floor within a month.
//
// The taxonomy is the part worth showing a client:
//
//   · category — the four rooms. Owns the page, its intro and its order.
//   · productType — the first filter facet, scoped to a category. "Sofas"
//     belongs to Living; "Refrigeration" belongs to Appliances. Adding a type
//     adds a filter option, and the filter CSS is generated from the data, so
//     nothing has to be written twice.
//   · priceBand — the second facet. A document rather than a computed range
//     so a sale can move a piece into a lower band without its price changing.
//   · product — the item itself.
//
// This is a schema stub on purpose. No Sanity project is stood up for a demo.
// On a live build these definitions go into the studio's schema folder and
// `products` in retail-large-catalogue.ts becomes the first import.
//
// The category component carries a comment marking it as CMS-driven.

/** Mirrors the Sanity field shape closely enough to paste into a studio. */
export interface CmsField {
  name: string;
  title: string;
  type: 'string' | 'text' | 'number' | 'boolean' | 'slug' | 'image' | 'array' | 'reference' | 'date';
  /** for arrays — what the array holds */
  of?: string;
  /** for references — the document type pointed at */
  to?: string;
  description?: string;
  /** rules the studio should enforce before publish */
  validation?: string;
}

export interface CmsDocument {
  name: string;
  title: string;
  type: 'document';
  fields: CmsField[];
}

export const categoryDocument: CmsDocument = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'navLabel',
      title: 'Nav label',
      type: 'string',
      description: 'Shorter than the title. Eight nav items is already a lot on a laptop.',
      validation: 'required, max 14 characters',
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'text',
      description: 'Two sentences under the page heading. Say something true about the range, not about furniture.',
      validation: 'required, max 260 characters',
    },
    { name: 'order', title: 'Order', type: 'number', description: 'Position in the nav and on the home page.' },
  ],
};

export const productTypeDocument: CmsDocument = {
  name: 'productType',
  title: 'Product type',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: 'category',
      description: 'A type belongs to one room. This is what scopes the filter row on each page.',
      validation: 'required',
    },
    { name: 'order', title: 'Order', type: 'number', description: 'Position in the type filter. Lower shows first.' },
  ],
};

export const priceBandDocument: CmsDocument = {
  name: 'priceBand',
  title: 'Price band',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Label',
      type: 'string',
      description: 'As it reads in the filter — "Under $500", "$1,500 – $3,000".',
      validation: 'required',
    },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    { name: 'order', title: 'Order', type: 'number', validation: 'required' },
  ],
};

export const productDocument: CmsDocument = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'One or two sentences a salesperson would actually say. What it is made of and what it is like to live with, not adjectives.',
      validation: 'required, max 220 characters',
    },
    { name: 'category', title: 'Category', type: 'reference', to: 'category', validation: 'required' },
    {
      name: 'productType',
      title: 'Type',
      type: 'reference',
      to: 'productType',
      description: 'Must belong to the category above. The studio filters the options to match.',
      validation: 'required',
    },
    { name: 'price', title: 'Price (CAD)', type: 'number', validation: 'required, positive' },
    {
      name: 'priceBand',
      title: 'Price band',
      type: 'reference',
      to: 'priceBand',
      description:
        'Set explicitly rather than computed, so a sale can move a piece into a lower band without changing what the tag says.',
      validation: 'required',
    },
    {
      name: 'finish',
      title: 'Finish',
      type: 'string',
      description: 'As written on the swing tag — "White oak, oiled", "Wool blend, oatmeal".',
      validation: 'required',
    },
    {
      name: 'spec',
      title: 'Size or capacity',
      type: 'string',
      description: 'W x D x H in inches for furniture, capacity and width for an appliance.',
      validation: 'required',
    },
    {
      name: 'stock',
      title: 'Availability',
      type: 'string',
      description:
        'On the floor / In the warehouse / Ordered in. These are three different promises and the markup publishes them as three different availability values.',
      validation: 'required',
    },
    {
      name: 'depositEligible',
      title: 'Can be held with a deposit',
      type: 'boolean',
      description:
        'Untick for anything the store will not hold — clearance, floor models being sold as seen. The deposit line disappears from the card.',
    },
    { name: 'image', title: 'Photo', type: 'image', description: 'Landscape. This grid is image-led and a missing photo shows.' },
  ],
};

/** Everything the studio would register for this demo. */
export const schemaTypes: CmsDocument[] = [
  categoryDocument,
  productTypeDocument,
  priceBandDocument,
  productDocument,
];
