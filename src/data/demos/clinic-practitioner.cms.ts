// CMS content model for Lakeshore. FAQ, practitioner records and the service
// list.
//
// The CMS flag is TRUE on this playbook. The reason is not the service menu —
// clinic fees move about once a year — it is the FAQ and the practitioner
// records. Reception rewrites answers constantly as insurers change their
// rules, and a practitioner joining or leaving has to come off the site the
// same day.
//
// There is a compliance edge a developer-edited site handles badly: a
// regulated health profession in Ontario is advertising when it publishes this
// copy, and the College can require a change. That has to be doable in an
// afternoon by the person who got the letter.
//
// Schema stub only — no Sanity project is stood up for a demo.

export interface CmsField {
  name: string;
  title: string;
  type: 'string' | 'text' | 'number' | 'boolean' | 'slug' | 'image' | 'array' | 'reference';
  of?: string;
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

export const serviceGroupDocument: CmsDocument = {
  name: 'serviceGroup',
  title: 'Service group',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'blurb', title: 'Group line', type: 'text',
      description: 'Who provides it and under what registration. Not what it is for.',
    },
    { name: 'order', title: 'Order', type: 'number' },
  ],
};

export const serviceDocument: CmsDocument = {
  name: 'clinicService',
  title: 'Appointment type',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Slug', type: 'slug', validation: 'required, unique' },
    {
      name: 'description', title: 'Description', type: 'text', validation: 'required',
      description:
        'Say what physically happens in the appointment. Never what it is for, and never what it may help — the same rule as the FAQ, and the one the College actually enforces.',
    },
    { name: 'group', title: 'Group', type: 'reference', to: 'serviceGroup', validation: 'required' },
    {
      name: 'minutes', title: 'Minutes', type: 'number',
      description: 'Leave empty for a product rather than an appointment, such as the orthotics themselves.',
    },
    { name: 'price', title: 'Fee (CAD)', type: 'number', validation: 'required, positive' },
    {
      name: 'from', title: 'Starting price', type: 'boolean',
      description: 'Renders as "from $x" where the device prescribed changes the figure.',
    },
    {
      name: 'requires', title: 'Prerequisite note', type: 'string',
      description: 'e.g. "Initial assessment required first". Shown on the service and in the booking flow.',
    },
  ],
};

export const practitionerDocument: CmsDocument = {
  name: 'practitioner',
  title: 'Practitioner',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: 'required' },
    { name: 'designation', title: 'Designation', type: 'string', description: 'DC, RMT and so on. Shown after the name.' },
    { name: 'role', title: 'Role', type: 'string', validation: 'required' },
    {
      name: 'credentials', title: 'Qualifications', type: 'array', of: 'string',
      description:
        'Degrees and college registrations only, worded as they appear on the public register. No specialisms that are not a protected title.',
      validation: 'at least one',
    },
    {
      name: 'bio', title: 'Bio', type: 'text',
      description: 'What they do at the clinic. No claims about results, and no conditions named as things they treat.',
      validation: 'max 240 characters',
    },
    { name: 'groups', title: 'Books for', type: 'array', of: 'reference', validation: 'at least one' },
    { name: 'image', title: 'Portrait', type: 'image' },
    {
      name: 'takingPatients', title: 'Taking new patients', type: 'boolean',
      description:
        'Unticking removes them from the booking flow the moment it saves, which is what you want on the day somebody leaves.',
    },
  ],
};

export const faqDocument: CmsDocument = {
  name: 'faqItem',
  title: 'Question',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: 'required' },
    { name: 'slug', title: 'Anchor', type: 'slug', validation: 'required, unique' },
    {
      name: 'answer', title: 'Answer', type: 'text', validation: 'required',
      description:
        'Answer what reception would answer. Do NOT describe what a treatment is for or what it may improve — that is an outcome claim and it is regulated. Describe process, fees, policy and logistics.',
    },
    { name: 'order', title: 'Order', type: 'number' },
    {
      name: 'published', title: 'Published', type: 'boolean',
      description: 'Untick to pull an answer immediately without deleting it.',
    },
  ],
};

export const schemaTypes: CmsDocument[] = [
  serviceGroupDocument,
  serviceDocument,
  practitionerDocument,
  faqDocument,
];
