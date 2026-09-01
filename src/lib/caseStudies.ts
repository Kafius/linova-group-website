// Case studies — one view shape for /work regardless of source.
// With PUBLIC_LINOVA_SANITY_PROJECT_ID set, content comes from Sanity at
// build time via GROQ (publishing triggers a rebuild through the Vercel
// deploy hook — see README). Without it, the seeded local module serves,
// so /work is never empty (brief §9).
import type { ImageMetadata } from 'astro';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { caseStudySeeds } from '../data/caseStudies';
import { industries } from '../data/industries';

export interface CaseStudyView {
  slug: string;
  title: string;
  client: string;
  /** the section it files under on /work — a slug from src/data/industries.ts */
  industrySlug?: string;
  summary: string;
  challenge: string;
  approach: string[];
  shipped: { what: string; detail: string }[];
  stack: string[];
  liveUrl?: string;
  featured: boolean;
  publishedAt: string;
  seoDescription: string;
  /** minutes at 200wpm — the dateline on /work carries it */
  readMinutes: number;
  /** local seed image (Astro-optimized) … */
  image?: ImageMetadata;
  /** … or a Sanity CDN URL: full bleed for the lead story */
  imageUrl?: string;
  /** … and a smaller one for the story cards */
  thumbUrl?: string;
}

const projectId = import.meta.env.PUBLIC_LINOVA_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_LINOVA_SANITY_DATASET as string | undefined) ?? 'production';
// The production dataset is public, so build-time reads need no credentials.
// Set SANITY_READ_TOKEN (server-only — never PUBLIC_) if it is ever flipped to
// private; a private dataset answers an anonymous query with an empty result,
// not an error, and /work would quietly drop back to the seeds.
const readToken = import.meta.env.SANITY_READ_TOKEN as string | undefined;

const CASE_STUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  client,
  industrySlug,
  summary,
  seoDescription,
  challenge,
  approach,
  results,
  heroImage,
  stack,
  liveUrl,
  featured,
  publishedAt
}`;

interface SanityBlock {
  _type: string;
  children?: { text?: string }[];
}

interface SanityCaseStudy {
  title: string;
  slug: string;
  client: string;
  industrySlug?: string;
  summary?: string;
  seoDescription?: string;
  challenge?: string;
  approach?: SanityBlock[];
  results?: { metric?: string; value?: string; context?: string }[];
  heroImage?: unknown;
  stack?: string[];
  liveUrl?: string;
  featured?: boolean;
  publishedAt?: string;
}

const blocksToParagraphs = (blocks: SanityBlock[] = []): string[] =>
  blocks
    .filter((b) => b._type === 'block')
    .map((b) => (b.children ?? []).map((c) => c.text ?? '').join(''))
    .filter(Boolean);

/**
 * The meta description for a case study.
 *
 * Prefers the field written for the job. Falls back to the summary, which is
 * the dek on /work and is written to be read rather than to fit a search
 * result — three of them ran 181-225 characters, well past the ~160 Google
 * shows. Rather than publish a sentence that gets cut off mid-word, the
 * fallback trims to the last sentence that fits, and only word-trims with an
 * ellipsis when even the first sentence is too long.
 */
const LIMIT = 160;
const metaDescription = (written?: string, summary?: string): string => {
  const preferred = (written ?? '').trim();
  if (preferred) return preferred;

  const text = (summary ?? '').trim();
  if (text.length <= LIMIT) return text;

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let built = '';
  for (const s of sentences) {
    if ((built + s).trim().length > LIMIT) break;
    built += s;
  }
  built = built.trim();
  if (built.length >= 70) return built;

  const cut = text.slice(0, LIMIT - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—-]$/, '') + '…';
};

/** Dateline furniture — honest enough at 200wpm, never below a minute. */
const readMinutes = (...parts: string[]): number => {
  const words = parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export async function fetchCaseStudies(): Promise<CaseStudyView[]> {
  if (!projectId) {
    return caseStudySeeds.map((seed) => ({
      ...seed,
      readMinutes: readMinutes(seed.challenge, ...seed.approach),
    }));
  }

  const client = createClient({ projectId, dataset, apiVersion: '2026-01-01', useCdn: false, token: readToken });
  const builder = imageUrlBuilder(client);
  const docs = await client.fetch<SanityCaseStudy[]>(CASE_STUDIES_QUERY);

  if (docs.length === 0) {
    // Project exists but nothing published yet — the seeds still carry /work.
    return caseStudySeeds.map((seed) => ({
      ...seed,
      readMinutes: readMinutes(seed.challenge, ...seed.approach),
    }));
  }

  return docs.map((doc) => {
    const approach = blocksToParagraphs(doc.approach);
    return {
      slug: doc.slug,
      title: doc.title,
      client: doc.client,
      industrySlug: doc.industrySlug,
      summary: doc.summary ?? '',
      challenge: doc.challenge ?? '',
      approach,
      shipped: (doc.results ?? []).map((r) => ({
        what: [r.metric, r.value].filter(Boolean).join(' '),
        detail: r.context ?? '',
      })),
      stack: doc.stack ?? [],
      liveUrl: doc.liveUrl,
      featured: doc.featured ?? false,
      publishedAt: doc.publishedAt ?? '',
      seoDescription: metaDescription(doc.seoDescription, doc.summary),
      readMinutes: readMinutes(doc.challenge ?? '', ...approach),
      imageUrl: doc.heroImage
        ? builder.image(doc.heroImage).width(1600).auto('format').url()
        : undefined,
      thumbUrl: doc.heroImage
        ? builder.image(doc.heroImage).width(800).auto('format').url()
        : undefined,
    };
  });
}

/** One entry in the /work section menu. */
export interface WorkSection {
  slug: string;
  name: string;
  accent: string;
  href: string;
  count: number;
}

/**
 * The section menu, in the industries.ts order (the same order the homepage
 * cycles) — a newspaper's sections don't reshuffle by volume. Sections with
 * nothing filed under them are dropped, so the rail never offers an empty room.
 */
export function workSections(studies: CaseStudyView[]): WorkSection[] {
  return industries
    .map((industry) => ({
      slug: industry.slug,
      name: industry.name,
      accent: industry.accent,
      href: `/work/section/${industry.slug}`,
      count: studies.filter((study) => study.industrySlug === industry.slug).length,
    }))
    .filter((section) => section.count > 0);
}
