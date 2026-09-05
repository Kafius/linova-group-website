// CMS content model for Elena Marlowe Real Estate. Listings, neighbourhood
// pages, the sold archive, and the agent's own profile.
//
// The CMS flag is TRUE on this playbook and this collection is the whole
// reason. A listing has a life measured in weeks: it goes up, it takes a price
// change, it gets an open house added on a Thursday, it goes conditional, and
// then it has to come off the site the day it firms. None of those are a
// developer ticket. An agent who has to email someone to remove a sold
// property will simply stop updating the site, and a site with a sold house
// still on the front page is worse than no site.
//
// Two modelling decisions worth keeping if this becomes a real build:
//
//  1. `deal` is a required enum, not a boolean, and the sale-only and
//     lease-only field groups are conditional on it. A single "price" field
//     with a free-text note is how you end up with "$2,750/mo" typed into a
//     sale listing.
//
//  2. The sold archive is its own document type rather than a status on
//     `listing`. A sold record is published with the seller's consent, carries
//     no civic number, and outlives the listing it came from — three reasons
//     it should not be the same row with a flag flipped.
//
// Schema stub only — no Sanity project is stood up for a demo.

export interface CmsField {
  name: string;
  title: string;
  type: 'string' | 'text' | 'number' | 'boolean' | 'slug' | 'image' | 'array' | 'reference' | 'geopoint';
  of?: string;
  to?: string;
  description?: string;
  validation?: string;
  /** the `hidden`/`readOnly` conditional a Studio would carry */
  showsWhen?: string;
}

export interface CmsDocument {
  name: string;
  title: string;
  type: 'document';
  fields: CmsField[];
}

export const listingDocument: CmsDocument = {
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    {
      name: 'reference', title: 'File reference', type: 'string', validation: 'required, unique',
      description:
        'The brokerage\'s own file number. Not a board number — a board number is the board\'s record and belongs on the board feed.',
    },
    { name: 'address', title: 'Address', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'deal', title: 'For sale or for lease', type: 'string', validation: 'required',
      description: 'Drives which field group below applies, and which side of the site it appears on.',
    },
    {
      name: 'status', title: 'Status', type: 'string', validation: 'required',
      description:
        'Available / Offers held / Conditional / Firm. Anything past Conditional drops off the public pages automatically — nobody should have to remember to unpublish a sold house.',
    },
    { name: 'neighbourhood', title: 'Neighbourhood', type: 'reference', to: 'neighbourhood', validation: 'required' },
    { name: 'city', title: 'City', type: 'string', validation: 'required' },
    {
      name: 'price', title: 'Price', type: 'number', validation: 'required, positive',
      description: 'A sale price outright, or the monthly rent. The unit is decided by `deal`, never typed in.',
    },
    { name: 'propertyType', title: 'Property type', type: 'string', validation: 'required' },
    { name: 'beds', title: 'Bedrooms', type: 'number', validation: 'required' },
    { name: 'baths', title: 'Bathrooms', type: 'number', validation: 'required' },
    { name: 'parking', title: 'Parking spaces', type: 'number' },
    {
      name: 'sqft', title: 'Interior square feet', type: 'number',
      description: 'Leave empty where it has genuinely not been measured. An estimate typed in as fact is a liability.',
    },
    { name: 'blurb', title: 'Description', type: 'text', validation: 'required' },
    { name: 'highlights', title: 'Worth knowing', type: 'array', of: 'string' },
    { name: 'photos', title: 'Photographs', type: 'array', of: 'image', validation: 'at least one' },
    {
      name: 'flag', title: 'Card chip', type: 'string',
      description: 'New / Open house / Offers held / Price improved. Deliberately not a date — a date on a card goes stale and a stale date makes the whole site look abandoned.',
    },
    { name: 'openHouse', title: 'Open house wording', type: 'string', showsWhen: 'flag == "open-house"' },

    // ── Sale only ─────────────────────────────────────────────────────
    { name: 'lot', title: 'Lot size', type: 'string', showsWhen: 'deal == "sale"' },
    { name: 'taxes', title: 'Annual property tax', type: 'number', showsWhen: 'deal == "sale"' },
    { name: 'condoFee', title: 'Monthly condo fee', type: 'number', showsWhen: 'deal == "sale"' },
    { name: 'feeIncludes', title: 'Fee includes', type: 'array', of: 'string', showsWhen: 'deal == "sale"' },

    // ── Lease only ────────────────────────────────────────────────────
    {
      name: 'available', title: 'Available from', type: 'string', showsWhen: 'deal == "lease"',
      description: 'Month or "immediately". A full date on a demo or a long-lived listing rots; the month does not.',
    },
    { name: 'leaseTerm', title: 'Term', type: 'string', showsWhen: 'deal == "lease"' },
    {
      name: 'utilities', title: 'Utilities', type: 'array', of: 'string', showsWhen: 'deal == "lease"',
      description: 'Each line says who pays. "Utilities extra" is the single most argued-about phrase in leasing.',
    },
    { name: 'pets', title: 'Pets', type: 'string', showsWhen: 'deal == "lease"' },

    {
      name: 'pin', title: 'Map position', type: 'geopoint',
      description:
        'On the demo this is a position on a drawn diagram. On a live build it is a real coordinate, and it should be the block rather than the door — a pin on the exact house of an occupied rental is a safety problem, not a feature.',
    },
  ],
};

export const neighbourhoodDocument: CmsDocument = {
  name: 'neighbourhood',
  title: 'Neighbourhood',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'blurb', title: 'What it is actually like', type: 'text', validation: 'required',
      description:
        'In a buyer\'s terms, including the drawbacks. This is the field that wins the searches the portals do not bother writing for.',
    },
    {
      name: 'typical', title: 'What trades here', type: 'string',
      description: 'Stock type and price band. Reviewed quarterly — a stale band is worse than none.',
    },
  ],
};

export const soldRecordDocument: CmsDocument = {
  name: 'soldRecord',
  title: 'Sold record',
  type: 'document',
  fields: [
    {
      name: 'where', title: 'Street and area', type: 'string', validation: 'required',
      description: 'Street and area only. Never a civic number — that is somebody\'s home and somebody\'s finances.',
    },
    { name: 'propertyType', title: 'Type', type: 'string', validation: 'required' },
    { name: 'listed', title: 'List price', type: 'number', validation: 'required' },
    { name: 'sold', title: 'Sold price', type: 'number', validation: 'required' },
    { name: 'onMarket', title: 'Days on market', type: 'string' },
    {
      name: 'consent', title: 'Seller consented to publication', type: 'boolean', validation: 'required, must be true',
      description:
        'Hard gate. Nothing publishes without it, and the field exists so the answer is recorded rather than remembered.',
    },
  ],
};

export const agentProfileDocument: CmsDocument = {
  name: 'agentProfile',
  title: 'Agent profile',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name as registered', type: 'string', validation: 'required' },
    {
      name: 'registrationCategory', title: 'Registration category', type: 'string', validation: 'required',
      description: 'Salesperson or Broker. It appears next to the name in advertising, so it is not free text on a live build — it is a fixed list.',
    },
    {
      name: 'brokerage', title: 'Brokerage name', type: 'string', validation: 'required',
      description:
        'The registered name, ending in "Brokerage". Rendered on every page beside the agent\'s name; the layout does not offer a way to show one without the other.',
    },
    { name: 'portrait', title: 'Portrait', type: 'image', validation: 'required' },
    { name: 'bio', title: 'Biography', type: 'array', of: 'text' },
    { name: 'areas', title: 'Areas worked', type: 'array', of: 'reference' },
    { name: 'languages', title: 'Languages', type: 'string' },
  ],
};

export const cmsDocuments: CmsDocument[] = [
  listingDocument,
  neighbourhoodDocument,
  soldRecordDocument,
  agentProfileDocument,
];
