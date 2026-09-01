// CMS content model for The Foundry on Bay gallery.
//
// The CMS flag is TRUE on the Venue / Event Space playbook, and this is the
// collection it buys. A venue's gallery is the one thing on the site that
// changes every month — a wedding photographer sends a set, the owner wants
// six of them up that week, and nobody is paying a developer to do it. The
// rooms, the packages and the terms change once a year and stay in code.
//
// That split is the argument: CMS is scoped to the collection that actually
// churns, not bolted onto the whole site because the tier includes it.
//
// This is a schema stub on purpose. No Sanity project is stood up for a demo —
// the point is to show the shape the content takes and where it plugs in. On a
// live build these definitions go into the studio's schema folder and
// `gallery` in venue-event-space.ts becomes the seed for the first import.
//
// The gallery page carries a comment marking it as CMS-driven.

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

/** Event type is a document rather than a string list so the filter row on the
 *  gallery page is editable. Adding "Film and photography" should not be a
 *  deploy. */
export const eventKindDocument: CmsDocument = {
  name: 'eventKind',
  title: 'Event type',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position in the gallery filter row. Lower shows first.',
    },
  ],
};

/** Rooms are referenced rather than typed free-hand, so a caption cannot say
 *  "Mezanine" on one photograph and "Mezzanine" on the next. */
export const roomDocument: CmsDocument = {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'seated',
      title: 'Seated capacity',
      type: 'number',
      description: 'Leave empty for spaces that are standing only.',
    },
    { name: 'standing', title: 'Standing capacity', type: 'number' },
  ],
};

export const galleryItemDocument: CmsDocument = {
  name: 'galleryItem',
  title: 'Gallery photograph',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Photograph',
      type: 'image',
      description: 'Landscape crops sit best in the grid. Hot-spot is respected on the tall tiles.',
      validation: 'required',
    },
    {
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description:
        'What is in the picture, for somebody who cannot see it. Not the caption, and not the photographer credit.',
      validation: 'required, max 160 characters',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'One line, specific. "Main Hall set for 180 at rounds" beats "A beautiful evening".',
      validation: 'required, max 120 characters',
    },
    {
      name: 'kind',
      title: 'Event type',
      type: 'reference',
      to: 'eventKind',
      description: 'Drives the filter on the gallery page.',
      validation: 'required',
    },
    {
      name: 'room',
      title: 'Room',
      type: 'reference',
      to: 'room',
      validation: 'required',
    },
    {
      name: 'credit',
      title: 'Photographer',
      type: 'string',
      description:
        'Published under every photograph. Required, because the release we get from photographers is conditional on it.',
      validation: 'required',
    },
    {
      name: 'shotOn',
      title: 'Date of the event',
      type: 'date',
      description: 'Not published. Used to order the grid newest first and to find a set later.',
    },
    {
      name: 'released',
      title: 'Release on file',
      type: 'boolean',
      description:
        'Unticked photographs never publish, whatever else is set. A guest in shot without a release is a real problem, not a styling one.',
      validation: 'required to publish',
    },
    {
      name: 'featured',
      title: 'Show on the home page',
      type: 'boolean',
      description: 'The home page takes the four most recent featured photographs.',
    },
  ],
};

/** Everything the studio would register for this demo. */
export const schemaTypes: CmsDocument[] = [eventKindDocument, roomDocument, galleryItemDocument];
