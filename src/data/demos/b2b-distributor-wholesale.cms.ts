// CMS content model for Grandview Food Distribution.
//
// The CMS flag is TRUE on this playbook, and the collection it buys is the
// product catalogue — five categories and the representative lines under
// them, which a buyer edits when a line comes on or goes off.
//
// ── THE MODEL HAS NO PRICE FIELD ─────────────────────────────────────────
// That is the design, not an omission, and it is the thing to point at on a
// call. E-commerce is FALSE on this playbook because a distributor's prices
// are account-specific, move weekly with produce, and would put a
// competitor's homework on the open web. A CMS with a price field on it is a
// CMS somebody will eventually fill in, and then the site is either wrong or
// it is a price list for the competition.
//
// So the studio can publish what a line IS — pack format, storage class, lot
// traceability, whether it is stocked — and cannot publish what it costs.
// Prices live on the account, are emailed the day it is approved, and are
// updated weekly.
//
// What is deliberately NOT modelled: the routes, the cut-off times and the
// account terms. Those are operational facts that change once a year and
// belong in code, where a Friday afternoon edit cannot turn a 2:00 pm cut-off
// into a 2:00 am one.
//
// This is a schema stub on purpose. No Sanity project is stood up for a demo.
// On a live build these definitions go into the studio's schema folder and
// `categories` in b2b-distributor-wholesale.ts becomes the first import.

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

/** Storage class is a document rather than a string so the three temperature
 *  zones are named once. A line filed under the wrong zone is a line that
 *  goes on the wrong trailer. */
export const storageClassDocument: CmsDocument = {
  name: 'storageClass',
  title: 'Storage class',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Label',
      type: 'string',
      description: 'As published — "Ambient", "Chilled 2–4°C", "Frozen −18°C".',
      validation: 'required',
    },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'trailer',
      title: 'Trailer type',
      type: 'string',
      description: 'Not published. Used internally to work out which truck a category can go on.',
    },
  ],
};

export const productCategoryDocument: CmsDocument = {
  name: 'productCategory',
  title: 'Product category',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'blurb',
      title: 'Description',
      type: 'text',
      description:
        'Two or three sentences a chef would recognise. Say something true about how the category is bought or carried, not that it is high quality.',
      validation: 'required, max 300 characters',
    },
    {
      name: 'storageClass',
      title: 'Storage class',
      type: 'reference',
      to: 'storageClass',
      validation: 'required',
    },
    {
      name: 'lines',
      title: 'Lines carried',
      type: 'number',
      description:
        'How many SKUs sit under this category. Published, and the home-page total is the sum of these — so one edit here moves both numbers and they cannot disagree.',
      validation: 'required, positive integer',
    },
    {
      name: 'packs',
      title: 'Pack formats',
      type: 'array',
      of: 'string',
      description: 'As they read on an invoice — "20 kg sack", "6 × #10 tin", "4 × 2.5 kg".',
      validation: 'required, min 1',
    },
    {
      name: 'examples',
      title: 'Representative lines',
      type: 'array',
      of: 'string',
      description:
        'Six or so, to show the shape of the range. NOT the full list, which runs to sixty pages and is issued with an account.',
      validation: 'max 8',
    },
    {
      name: 'leadTime',
      title: 'Lead time',
      type: 'string',
      description: 'Usually "Next route". Produce carries its own because of the terminal buy.',
      validation: 'required',
    },
    {
      name: 'stocked',
      title: 'Currently stocked',
      type: 'boolean',
      description:
        'Unticking greys the category rather than deleting it, so a seasonal line keeps the search traffic it built.',
    },
    { name: 'order', title: 'Order', type: 'number', description: 'Position on the products page.' },
    // ── NO PRICE FIELD. See the note at the top of this file. ──
  ],
};

/** Everything the studio would register for this demo. */
export const schemaTypes: CmsDocument[] = [storageClassDocument, productCategoryDocument];

/** Asserted by the build verification: no field in this model is a price.
 *  If somebody adds one later, the check fails and asks why. */
export const hasPriceField = (): boolean =>
  schemaTypes.some((doc) =>
    doc.fields.some((field) => /price|cost|rate|\$/i.test(field.name) || /price|cost/i.test(field.title))
  );
