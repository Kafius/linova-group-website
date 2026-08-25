// The build pipeline — the four stages shown in the homepage system act.
// Each stage names the real artifact rendered on the site: concrete beats abstract.

export interface ProcessStage {
  stage: 'intake' | 'data' | 'build' | 'deploy';
  name: string;
  description: string;
  /** the real artifact shown for this stage */
  artifact: string;
}

export const processStages: ProcessStage[] = [
  {
    stage: 'intake',
    name: 'Intake',
    description: 'One structured call. What you sell, who buys it, and what the site has to do — hours, offers, photos, booking flow — captured as fields, not loose notes. By the end of the call the project has a content map, not a vibe.',
    artifact: 'A content map from a real project: every page, section, and field the site needs, drawn from a single intake call'
  },
  {
    stage: 'data',
    name: 'Typed data',
    description: 'Every word, price, and image on the site lives in a typed TypeScript module — one source of truth whose interface enforces its shape. Components read from the data; nothing is hardcoded. Change the data and the whole site follows.',
    artifact: 'A syntax-highlighted fragment of industries.ts — the exported Industry interface and one fully populated entry with real client content'
  },
  {
    stage: 'build',
    name: 'Component build',
    description: 'Fixed component patterns assemble the site from the data. AI accelerates the work inside that discipline — it does not improvise the architecture. The same patterns ship project after project, which is why the output holds up in production instead of just demoing well.',
    artifact: 'The Lighthouse panel from a shipped client site — performance, accessibility, best practices, and SEO scores as measured, not promised'
  },
  {
    stage: 'deploy',
    name: 'Deploy',
    description: 'A push to the repo triggers the build, and the site goes out as static files on a global edge network. A CMS publish triggers the same pipeline, so content changes redeploy the site without anyone touching code. The deploy log is the receipt.',
    artifact: 'A Vercel deploy log: install, build, upload, and the deployment-ready line with the build time'
  }
];
