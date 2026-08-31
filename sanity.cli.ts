// Sanity CLI config — used only by the `sanity` command (build, deploy,
// dataset, cors). The Studio embedded in the site doesn't read this file: it
// mounts from sanity.config.ts through Astro's Vite pipeline.
//
// The ids are hardcoded rather than read from .env because the CLI runs
// outside Astro's Vite: it only auto-loads SANITY_STUDIO_* variables, so
// PUBLIC_LINOVA_SANITY_PROJECT_ID resolves to nothing here. Both values are
// public anyway — they ship in the browser bundle on every page.
//
// Note: `sanity build` writes to ./dist by default, which is where Astro puts
// the site. Pass an output path — `npx sanity build .studio` — if you ever
// need a local Studio build. `npx sanity deploy` builds to its own temp
// directory and is unaffected.
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '99tmdxsd',
    dataset: 'production',
  },
  // The hosted Studio at thelinovagroup.sanity.studio, first deployed
  // 2026-08-31. Pinning the id keeps `sanity deploy` from asking which
  // application to push to.
  deployment: {
    appId: 'v9n187xoptmn3ekaiws8z1tf',
  },
});
