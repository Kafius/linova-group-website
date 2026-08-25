// Google reviews — Places API (New), Place Details, fetched at BUILD time
// (never per pageview — quota + latency, §10). Ships dark until the
// Business Profile exists: the flag defaults off and the keys are unset.
// Setup checklist lives in the README.

export interface GoogleReview {
  author: string;
  authorPhoto?: string;
  rating: number;
  relativeTime: string;
  /** review text — rendered verbatim; Google's terms prohibit editing it */
  text: string;
}

export interface GoogleReviewsData {
  rating: number;
  count: number;
  reviews: GoogleReview[];
  /** maps URL for the required attribution link */
  url?: string;
}

const API_KEY = import.meta.env.GOOGLE_PLACES_API_KEY as string | undefined;
const PLACE_ID = import.meta.env.GOOGLE_PLACE_ID as string | undefined;
const FLAG = (import.meta.env.PUBLIC_FEATURE_GOOGLE_REVIEWS as string | undefined) === 'true';

export const googleReviewsEnabled = FLAG && Boolean(API_KEY) && Boolean(PLACE_ID);

export async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  if (!googleReviewsEnabled) return null;

  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
    headers: {
      'X-Goog-Api-Key': API_KEY!,
      // Places API (New) returns at most five reviews
      'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
    },
  });

  if (!res.ok) {
    console.warn('[reviews] Places API returned', res.status, '— rendering without reviews');
    return null;
  }

  const data = await res.json();
  return {
    rating: data.rating ?? 0,
    count: data.userRatingCount ?? 0,
    url: data.googleMapsUri,
    reviews: (data.reviews ?? []).map((review: Record<string, any>) => ({
      author: review.authorAttribution?.displayName ?? 'Google user',
      authorPhoto: review.authorAttribution?.photoUri,
      rating: review.rating ?? 0,
      relativeTime: review.relativePublishTimeDescription ?? '',
      text: review.text?.text ?? '',
    })),
  };
}
