// Slug helpers shared by the generate route.

export function slugify(input: string): string {
  return (input || 'residence')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'residence';
}

/** short random-ish suffix without relying on Math.random being seeded */
export function shortId(seed: number): string {
  return Math.abs((seed * 2654435761) % 0xfffff).toString(36).padStart(4, '0');
}
