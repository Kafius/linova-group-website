// Case studies — one view shape for /work regardless of source.
// With PUBLIC_LINOVA_SANITY_PROJECT_ID set, content comes from Sanity at
// build time via GROQ (publishing triggers a rebuild through the Vercel
// deploy hook — see README). Without it, the seeded local module serves,
// so /work is never empty (brief §9).
import type { ImageMetadata } from 'astro';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { caseStudySeeds } from '../data/caseStudies';

export interface CaseStudyView {
  slug: string;
  title: string;
  client: string;
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
  /** local seed image (Astro-optimized) … */
  image?: ImageMetadata;
  /** … or a Sanity CDN URL */
  imageUrl?: string;
}

const projectId = import.meta.env.PUBLIC_LINOVA_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_LINOVA_SANITY_DATASET as string | undefined) ?? 'production';

const CASE_STUDIES_QUERY = `*[_type == "caseStudy"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  client,
  "industrySlug": industry->slug.current,
  summary,
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

export async function fetchCaseStudies(): Promise<CaseStudyView[]> {
  if (!projectId) {
    return caseStudySeeds.map((seed) => ({ ...seed }));
  }

  const client = createClient({ projectId, dataset, apiVersion: '2026-01-01', useCdn: false });
  const builder = imageUrlBuilder(client);
  const docs = await client.fetch<SanityCaseStudy[]>(CASE_STUDIES_QUERY);

  if (docs.length === 0) {
    // Project exists but nothing published yet — the seeds still carry /work.
    return caseStudySeeds.map((seed) => ({ ...seed }));
  }

  return docs.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    industrySlug: doc.industrySlug,
    summary: doc.summary ?? '',
    challenge: doc.challenge ?? '',
    approach: blocksToParagraphs(doc.approach),
    shipped: (doc.results ?? []).map((r) => ({
      what: [r.metric, r.value].filter(Boolean).join(' '),
      detail: r.context ?? '',
    })),
    stack: doc.stack ?? [],
    liveUrl: doc.liveUrl,
    featured: doc.featured ?? false,
    publishedAt: doc.publishedAt ?? '',
    seoDescription: doc.summary ?? '',
    imageUrl: doc.heroImage
      ? builder.image(doc.heroImage).width(1440).auto('format').url()
      : undefined,
  }));
}
