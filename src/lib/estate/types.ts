// Shared types for the Estate Sites single-property generator.
// Kept framework-agnostic so they can be imported server-side (preview route,
// API endpoints) and client-side (builder live preview).

/** Whether the property is being sold or leased. Absent is treated as 'sale'. */
export type ListingType = 'sale' | 'lease';

export interface Poi {
  /** icon key — one of POI_TYPES below */
  type: PoiType;
  /** display name of the place, e.g. "Whole Foods" */
  name: string;
  /** display distance/time string, e.g. "4 min walk" or "8 min drive" */
  dist: string;
}

export type PoiType =
  | 'grocery'
  | 'school'
  | 'transit'
  | 'park'
  | 'restaurant'
  | 'medical'
  | 'highway'
  | 'shopping';

export const POI_TYPES: { value: PoiType; label: string }[] = [
  { value: 'grocery', label: 'Grocery' },
  { value: 'school', label: 'School' },
  { value: 'transit', label: 'Transit' },
  { value: 'park', label: 'Park' },
  { value: 'restaurant', label: 'Dining' },
  { value: 'medical', label: 'Medical' },
  { value: 'highway', label: 'Highway' },
  { value: 'shopping', label: 'Shopping' },
];

/** One photograph of a room, from a particular angle. */
export interface RoomShot {
  url: string;
  angle?: string; // "From the entrance", "Toward the window"…
}

/**
 * One stop on the scroll-driven house tour. A room now holds many angles
 * (`shots`) so the tour can pan through the space. `photo` is kept as a
 * convenience for the hero/first image and for backward compatibility.
 */
export interface Room {
  name?: string; // "The Great Room"
  category?: RoomCategory; // drives the shot checklist + guidance
  guidance?: string; // how to best shoot this room
  caption?: string; // one evocative line
  photo?: string; // primary/hero image (defaults to shots[0])
  shots?: RoomShot[]; // every angle captured for this room
}

export type RoomCategory =
  | 'exterior'
  | 'foyer'
  | 'living'
  | 'kitchen'
  | 'dining'
  | 'primary'
  | 'bedroom'
  | 'bathroom'
  | 'office'
  | 'basement'
  | 'outdoor'
  | 'view'
  | 'detail';

/**
 * GTA-specific access/commute times. Each value is a display string like
 * "6 min drive". Rendered in the location section alongside nearby amenities.
 */
export interface Commute {
  downtown?: string; // to downtown Toronto
  airport?: string; // to Toronto Pearson (YYZ)
  hwy401?: string;
  hwy407?: string;
  hwy404?: string;
  hwy400?: string;
  hospital?: string; // nearest hospital
}

/** Shape of a row in the Supabase `listings` table. */
export interface Listing {
  id?: string;
  slug: string;
  agent_id?: string | null;

  // hero / identity
  listing_type?: ListingType; // 'sale' | 'lease' — drives copy, pricing, terms
  name: string; // hero title (street name)
  address: string; // full address, used for geocoding
  neighbourhood?: string; // eyebrow
  price?: string; // display string — sale price ("$4,250,000") or monthly rent ("$4,250") when leasing

  // stats
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  year_built?: number | null;
  lot_text?: string; // display string, e.g. "0.42 acres"

  // lease terms (shown when listing_type = 'lease')
  lease_term?: string; // "12 months", "Flexible"
  available_date?: string; // "Available Aug 1", "Immediate"
  furnished?: string; // "Furnished", "Unfurnished", "Partially furnished"
  pets?: string; // "Cats & small dogs OK", "No pets"
  utilities?: string; // "Heat & water included"
  deposit?: string; // "First & last", "$4,250"

  // story
  headline?: string;
  description?: string;

  // media
  photos?: string[]; // [0] = hero
  rooms?: Room[]; // scroll-tour scenes; falls back to photos when empty
  pois?: Poi[]; // nearby amenities (schools, grocery, subway, park…)
  commute?: Commute; // downtown, airport, 400-series highways, hospital

  // agent
  agent_name?: string;
  brokerage?: string;
  phone?: string;
  email?: string;

  // state
  locked?: boolean; // default true
  requested_domain?: string | null; // what the client asked for at checkout
  custom_domain?: string | null; // the domain actually wired up; drives host routing
  created_at?: string;
}

/** The subset the builder form collects and posts to /api/generate. */
export type ListingInput = Omit<
  Listing,
  'id' | 'slug' | 'locked' | 'custom_domain' | 'created_at' | 'agent_id'
>;
