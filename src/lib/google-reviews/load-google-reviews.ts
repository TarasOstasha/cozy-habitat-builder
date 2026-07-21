import {
  GOOGLE_REVIEWS_URL,
  hardcodedReviews,
  reviewsSummary,
  type Review,
  type ReviewsPayload,
} from "@/lib/reviews";

const CACHE_TTL_MS = 60 * 60 * 1000;
const DEFAULT_PLACE_QUERY = "SEMTA Custom Cabinetry & Design 257 Ely Ave Norwalk CT";

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlaceDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

type TextSearchResponse = {
  places?: Array<{ id?: string }>;
};

let reviewCache: { data: ReviewsPayload; expiresAt: number } | null = null;

function fallbackReviews(reason: string): ReviewsPayload {
  console.warn(`Using fallback Google reviews (${reason})`);
  return {
    reviews: hardcodedReviews,
    rating: reviewsSummary.rating,
    totalCount: reviewsSummary.totalCount,
    googleMapsUrl: reviewsSummary.googleMapsUrl,
    source: "fallback",
  };
}

function normalizePlaceId(id: string): string {
  return id.startsWith("places/") ? id.slice("places/".length) : id;
}

function mapReview(review: PlacesReview, index: number): Review | null {
  const text = review.text?.text?.trim() || review.originalText?.text?.trim();
  if (!text) return null;

  const authorName = review.authorAttribution?.displayName?.trim() || "Google user";
  const rating = typeof review.rating === "number" ? review.rating : 5;

  return {
    id: review.name || `google-review-${index}`,
    authorName,
    rating,
    text,
    relativeTime: review.relativePublishTimeDescription?.trim() || "",
  };
}

async function resolvePlaceId(
  apiKey: string,
  placeId: string | undefined,
  placeQuery: string,
): Promise<string | null> {
  if (placeId) return normalizePlaceId(placeId);

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: placeQuery }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Places text search failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = (await response.json()) as TextSearchResponse;
  const firstPlaceId = data.places?.[0]?.id;
  return firstPlaceId ? normalizePlaceId(firstPlaceId) : null;
}

async function fetchPlaceDetails(apiKey: string, placeId: string): Promise<ReviewsPayload> {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Places details failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = (await response.json()) as PlaceDetailsResponse;
  const reviews =
    data.reviews
      ?.map((review, index) => mapReview(review, index))
      .filter((review): review is Review => review !== null) ?? [];

  if (!reviews.length) {
    return fallbackReviews("no_reviews_in_response");
  }

  return {
    reviews,
    rating: data.rating ?? reviewsSummary.rating,
    totalCount: data.userRatingCount ?? reviews.length,
    googleMapsUrl: data.googleMapsUri ?? GOOGLE_REVIEWS_URL,
    source: "google",
  };
}

/** Server-only Google reviews loader (call directly from route loaders — no RPC). */
export async function loadGoogleReviews(): Promise<ReviewsPayload> {
  if (reviewCache && reviewCache.expiresAt > Date.now()) {
    return reviewCache.data;
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    return fallbackReviews("missing_api_key");
  }

  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  const placeQuery = process.env.GOOGLE_PLACE_QUERY?.trim() || DEFAULT_PLACE_QUERY;

  try {
    const resolvedPlaceId = await resolvePlaceId(apiKey, placeId, placeQuery);
    if (!resolvedPlaceId) {
      return fallbackReviews("place_not_found");
    }

    const data = await fetchPlaceDetails(apiKey, resolvedPlaceId);
    reviewCache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return data;
  } catch (error) {
    console.error("Failed to fetch Google reviews", error);
    return fallbackReviews("api_error");
  }
}
