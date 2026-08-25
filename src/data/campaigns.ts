// Paid-social landing pages — a new campaign is a new entry here, not a new
// page file (§11). The headline is required to MESSAGE-MATCH the ad creative:
// whatever promise the ad makes, this line repeats it.

export interface Campaign {
  slug: string;
  /** required message-match: echoes the ad creative's promise */
  headline: string;
  subhead: string;
  metaTitle: string;
  offer: {
    title: string;
    points: string[];
  };
  /** the one CTA, repeated — names the action and keeps the name */
  formCta: string;
  /** confirmation language continues the CTA's name */
  thanksHeadline: string;
  thanksBody: string;
  /** optional vertical accent hex (defaults to gold) */
  accent?: string;
  active: boolean;
}

export const campaigns: Campaign[] = [
  {
    slug: 'web-design-gta',
    headline: 'A website that wins you customers, built in weeks — not months.',
    subhead:
      'Linova builds fast, hand-finished sites for GTA businesses and backs them with a real marketing team. Tell us what you need and get a straight quote — no sales calls until you ask for one.',
    metaTitle: 'Get a website quote — The Linova Group',
    offer: {
      title: 'What you get when you send the form',
      points: [
        'A straight quote with a number on it, within one business day',
        'A teardown of your current site (or a plan if you have none)',
        'Proof: live client sites you can open and test on your phone',
        'No retainer traps — you own the site, the domain, and the content',
      ],
    },
    formCta: 'Get my quote',
    thanksHeadline: 'Quote request sent',
    thanksBody:
      "You'll have a reply within one business day. Want to skip the wait? Grab a call time below and we'll do it live.",
    active: true,
  },
];

export const getCampaign = (slug: string): Campaign | undefined =>
  campaigns.find((c) => c.slug === slug && c.active);
