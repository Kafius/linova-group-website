// Keyword emphasis for scanning. Body copy stays a plain string in the data
// modules — the terms worth lifting are declared beside it, and this wraps
// them at render time. Emphasis is carried by contrast and weight (see
// `.keyword` in linova.css), never by colour alone: the vertical accents are
// quarantined, and colour-only signals fail for anyone who can't see it.
const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ESCAPES[c]);
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Returns HTML with every occurrence of `terms` wrapped in `<b class="keyword">`.
 * Everything else is escaped, so the result is safe to pass to `set:html`.
 *
 * Longest term first, so "typed content architecture" wins over "architecture"
 * rather than the two fighting over the same words.
 */
export function emphasize(text: string, terms: string[] = []): string {
  if (terms.length === 0) return escapeHtml(text);

  const pattern = [...terms]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|');
  // \b either side: a term never lights up inside a longer word.
  const matcher = new RegExp(`\\b(${pattern})\\b`, 'gi');

  return text
    .split(matcher)
    .map((part, i) =>
      // split() with one capture group interleaves matches at odd indices
      i % 2 === 1 ? `<b class="keyword">${escapeHtml(part)}</b>` : escapeHtml(part),
    )
    .join('');
}
