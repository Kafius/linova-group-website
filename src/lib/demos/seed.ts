/**
 * Deterministic pseudo-randomness for generated demo artwork.
 *
 * Anything drawn from a seed has to come out identical on every build —
 * otherwise the street map on a contact page reshuffles itself each time the
 * site is deployed, and a diff that should be empty is full of moved lines.
 * Math.random cannot do that, so this is a small fixed-point generator seeded
 * from a string, usually the playbook slug.
 */

/** FNV-1a, which is short, has no dependencies and spreads short slugs well. */
export function hashSeed(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 — 32-bit state, good distribution, four lines. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
