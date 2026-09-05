// The pin shape ListingMap.astro draws and its callers build.
//
// It lives in a plain module rather than in the component's frontmatter so
// both sides import the same declaration: a type exported from an .astro file
// is awkward to consume, and a second hand-written copy of this interface in
// the caller is how a pin ends up with an `x` the map reads as a `cx`.

export interface MapPin {
  /** the card's id, without the '#': the anchor target and the JS key */
  id: string;
  /** what the pin says — the position in the list below */
  n: number;
  /** accessible name, e.g. "2 — 2140 Pine Street, Downtown Burlington" */
  label: string;
  /** which accent the pin takes; the two listing pages never mix them */
  deal: 'sale' | 'lease';
  /** 0–1 from the top left of the drawing */
  x: number;
  y: number;
}
