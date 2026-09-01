// CMS content model for the Bramble & Bone catalogue.
//
// The CMS flag is TRUE on the Retail Online Store playbook, and this is what
// that flag buys: the product catalogue is a modelled collection the owner
// edits, not markup a developer edits. A pet shop changes prices and drops
// lines constantly, which is the whole argument for CMS being in this package
// and out of the F&B Full Service one.
//
// This is a schema stub on purpose. No Sanity project is stood up for a demo —
// the point is to show the shape the content takes and where it plugs in. On a
// live build these definitions go into the studio's schema folder and
// `products` in retail-online-store.ts becomes the seed for the first import.
//
// Components that render CMS-driven content carry a comment saying so.

/** Mirrors the Sanity field shape closely enough to paste into a studio. */
export interface CmsField {
  name: string;
  title: string;
  type: 'string' | 'text' | 'number' | 'boolean' | 'slug' | 'image' | 'array' | 'reference';
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

export const productCategoryDocument: CmsDocument = {
  name: 'productCategory',
  title: 'Product category',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'blurb',
      title: 'Shelf line',
      type: 'text',
      description: 'One sentence under the category heading on the shop page.',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position in the filter row. Lower shows first.',
    },
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
      description: 'Two sentences maximum. This is the shelf-talker, not a spec sheet.',
      validation: 'required, max 240 characters',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: 'productCategory',
      validation: 'required',
    },
    {
      name: 'price',
      title: 'Price (CAD)',
      type: 'number',
      description: 'Pre-tax shelf price. Kept in step with Clover by hand, or synced on a live build.',
      validation: 'required, positive',
    },
    {
      name: 'size',
      title: 'Pack size',
      type: 'string',
      description: 'As written on the shelf label — "1 kg · 4 pucks", "12 biscuits".',
    },
    {
      name: 'tags',
      title: 'Shelf tags',
      type: 'array',
      of: 'string',
      description: 'Short claims only: "Made in-house", "Ontario raised", "Grain-free".',
    },
    {
      name: 'inStock',
      title: 'In stock',
      type: 'boolean',
      description: 'Unticking this greys the product out rather than hiding it, so the page keeps its search value.',
    },
    { name: 'image', title: 'Photo', type: 'image' },
  ],
};

/** Everything the studio would register for this demo. */
export const schemaTypes: CmsDocument[] = [productCategoryDocument, productDocument];
