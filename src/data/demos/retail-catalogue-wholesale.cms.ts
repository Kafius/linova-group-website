// CMS content model for Vernon Street Bakehouse.
//
// The CMS flag is TRUE on the Retail Catalogue + Wholesale playbook, and this
// is what it buys: two collections, both of which move without a developer.
//
//   · shelfItem — the counter catalogue. A loaf comes off in February, a price
//     moves in March, a special runs for three weeks. On a live build this
//     collection is also what the Clover product list is reconciled against.
//   · seasonalCake — the collection rotates four times a year, and it rotates
//     on a Tuesday because that is when somebody has an afternoon.
//
// What is deliberately NOT modelled: the wholesale terms, the delivery zones
// and the bake schedule. Those change once a year and belong in code, where
// they cannot be edited into an inconsistency at half past four on a Friday.
// Scoping CMS to what actually churns is the argument; putting the whole site
// in a studio because the tier includes one is not.
//
// This is a schema stub on purpose. No Sanity project is stood up for a demo —
// the point is to show the shape the content takes and where it plugs in. On a
// live build these definitions go into the studio's schema folder and `shelf`
// and `cakes` in retail-catalogue-wholesale.ts become the first import.
//
// The retail shop page and the cakes page each carry a comment marking them
// as CMS-driven.

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

/** Shelves are documents rather than a hardcoded list so the counter can add
 *  one — "Christmas", say — without a deploy in the second week of December. */
export const shelfDocument: CmsDocument = {
  name: 'shelf',
  title: 'Shelf',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'blurb',
      title: 'Shelf line',
      type: 'text',
      description: 'One or two sentences under the shelf heading on the retail page.',
      validation: 'max 220 characters',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position in the filter row and on the page. Lower shows first.',
    },
  ],
};

export const shelfItemDocument: CmsDocument = {
  name: 'shelfItem',
  title: 'Shelf item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Two sentences at most. This is the shelf label, not a recipe.',
      validation: 'required, max 200 characters',
    },
    { name: 'shelf', title: 'Shelf', type: 'reference', to: 'shelf', validation: 'required' },
    {
      name: 'price',
      title: 'Retail price (CAD)',
      type: 'number',
      description:
        'The counter price, tax out. Wholesale case prices are NOT held here — they live on the price list, which is a separate upload.',
      validation: 'required, positive',
    },
    {
      name: 'unit',
      title: 'Sold as',
      type: 'string',
      description: 'As written on the shelf label — "900 g loaf", "Each", "250 ml jar".',
      validation: 'required',
    },
    {
      name: 'bakedOn',
      title: 'Baked on',
      type: 'string',
      description:
        'Leave empty for anything baked every day the counter is open. Filling it in publishes a "Baked Friday to Sunday" line, which stops the Wednesday phone call.',
    },
    {
      name: 'dietary',
      title: 'Dietary markers',
      type: 'array',
      of: 'string',
      description:
        'V or VG only. Not a substitute for the allergen conversation — everything here is made in one room with wheat, egg, dairy, nuts and sesame in it.',
    },
    {
      name: 'available',
      title: 'On the shelf',
      type: 'boolean',
      description:
        'Unticking greys the item out rather than hiding it, so a seasonal line keeps the search traffic it built.',
    },
    { name: 'image', title: 'Photo', type: 'image' },
  ],
};

export const seasonalCakeDocument: CmsDocument = {
  name: 'seasonalCake',
  title: 'Seasonal cake',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'How it tastes and who it is for. Three sentences at most.',
      validation: 'required, max 300 characters',
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'Spring, Summer, Autumn, Winter or "All year" for the two that never come off.',
      validation: 'required',
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: 'cakeSize',
      description: 'Each row is a size, a serving range and a price. At least one is required.',
      validation: 'required, min 1',
    },
    {
      name: 'allergens',
      title: 'Contains',
      type: 'array',
      of: 'string',
      description:
        'What is deliberately in this cake. Required on every document — a cake published without it is a phone call the counter cannot answer.',
      validation: 'required, min 1',
    },
    {
      name: 'inCollection',
      title: 'In the collection',
      type: 'boolean',
      description:
        'The page shows four. Unticking retires a cake without deleting it, so next autumn it comes back with its prices intact.',
    },
    {
      name: 'leadTimeDays',
      title: 'Lead time (days)',
      type: 'number',
      description: 'Overrides the site-wide seven days. Used for anything above ten inches.',
    },
    { name: 'image', title: 'Photo', type: 'image' },
  ],
};

/** An object type rather than a document — sizes only exist inside a cake. */
export const cakeSizeObject = {
  name: 'cakeSize',
  title: 'Cake size',
  type: 'object' as const,
  fields: [
    { name: 'size', title: 'Size', type: 'string' as const, validation: 'required' },
    { name: 'serves', title: 'Serves', type: 'string' as const, validation: 'required' },
    { name: 'price', title: 'Price (CAD)', type: 'number' as const, validation: 'required, positive' },
  ],
};

/** Everything the studio would register for this demo. */
export const schemaTypes: CmsDocument[] = [shelfDocument, shelfItemDocument, seasonalCakeDocument];
