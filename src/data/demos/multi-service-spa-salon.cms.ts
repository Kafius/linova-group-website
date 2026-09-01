// CMS content model for the Stillwater service menu and team.
//
// The CMS flag is TRUE on this playbook, and this is the reason: a spa
// reprices seasonally and moves practitioners between rooms, and neither of
// those should need a developer. Contrast with the F&B Full Service playbook,
// where CMS is deliberately OFF because a restaurant menu changes twice a year
// and a system nobody logs into is a subscription rather than a feature.
//
// This is a schema stub. No Sanity project is stood up for a demo — the point
// is the shape the content takes and where it plugs in. On a live build these
// go into the studio's schema folder, and `services`, `practitioners` and
// `packages` in multi-service-spa-salon.ts become the seed for the import.
//
// Components rendering CMS-driven content carry a CMS-DRIVEN comment.

export interface CmsField {
  name: string;
  title: string;
  type: 'string' | 'text' | 'number' | 'boolean' | 'slug' | 'image' | 'array' | 'reference';
  /** for arrays — what the array holds */
  of?: string;
  /** for references — the document type pointed at */
  to?: string;
  description?: string;
  validation?: string;
}

export interface CmsDocument {
  name: string;
  title: string;
  type: 'document';
  fields: CmsField[];
}

export const serviceCategoryDocument: CmsDocument = {
  name: 'serviceCategory',
  title: 'Room',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    { name: 'blurb', title: 'Room line', type: 'text', description: 'One or two sentences under the room heading.' },
    { name: 'image', title: 'Photo', type: 'image' },
    { name: 'order', title: 'Order', type: 'number', description: 'Position in the nav and on the home page.' },
  ],
};

export const serviceDocument: CmsDocument = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'description', title: 'Description', type: 'text',
      description: 'Two sentences. What it is and who it suits, not a list of products used.',
      validation: 'required, max 260 characters',
    },
    { name: 'category', title: 'Room', type: 'reference', to: 'serviceCategory', validation: 'required' },
    {
      name: 'minutes', title: 'Minutes', type: 'number',
      description: 'How long the room is held, including turnaround. Drives the booking slots.',
      validation: 'required, positive',
    },
    {
      name: 'price', title: 'Price (CAD)', type: 'number',
      description: 'THE field this CMS exists for. Reviewed twice a year; changing it here changes it on the menu, the room page and the booking summary at once.',
      validation: 'required, positive',
    },
    {
      name: 'from', title: 'Starting price', type: 'boolean',
      description: 'Tick where length or condition moves the final figure. Renders as "from $x".',
    },
    {
      name: 'practitioners', title: 'Who takes it', type: 'array', of: 'reference',
      description: 'Leave empty to offer it to everyone in the room.',
    },
  ],
};

export const practitionerDocument: CmsDocument = {
  name: 'practitioner',
  title: 'Practitioner',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    { name: 'role', title: 'Role', type: 'string', description: 'As it should read on the team page and in the booking flow.' },
    { name: 'bio', title: 'Bio', type: 'text', validation: 'max 240 characters' },
    {
      name: 'categories', title: 'Rooms', type: 'array', of: 'reference',
      description: 'Which rooms they take bookings in. Drives who appears at booking step three.',
      validation: 'at least one',
    },
    { name: 'image', title: 'Portrait', type: 'image' },
    {
      name: 'takingBookings', title: 'Taking bookings', type: 'boolean',
      description: 'Unticking removes them from the booking flow but keeps them on the team page.',
    },
  ],
};

export const packageDocument: CmsDocument = {
  name: 'servicePackage',
  title: 'Package',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    { name: 'description', title: 'Description', type: 'text', validation: 'required' },
    {
      name: 'includes', title: 'Services included', type: 'array', of: 'reference',
      description: 'In the order they are taken.', validation: 'at least two',
    },
    {
      name: 'minutes', title: 'Total minutes', type: 'number',
      description: 'What the day actually takes. Not the sum — some services run in parallel in the couples’ room.',
      validation: 'required, positive',
    },
    { name: 'price', title: 'Price (CAD)', type: 'number', validation: 'required, positive' },
    {
      name: 'saves', title: 'Saving (CAD)', type: 'number',
      description: 'Leave empty where the package is priced for two people — a saving figure would mislead.',
    },
    { name: 'note', title: 'Note', type: 'text', description: 'Booking lead times, room limits, anything with a condition on it.' },
  ],
};

export const schemaTypes: CmsDocument[] = [
  serviceCategoryDocument,
  serviceDocument,
  practitionerDocument,
  packageDocument,
];
