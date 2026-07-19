/** Hardcoded Google-style reviews. Swap this source for Places API / CMS later. */

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type ReviewsSummary = {
  rating: number;
  totalCount: number;
  /** Public Google Business / Maps reviews URL. */
  googleMapsUrl: string;
};

/** Opens Google Maps search for the SEMTA listing (swap for exact place URL when you have it). */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=SEMTA+Custom+Cabinetry+%26+Design+257+Ely+Ave+Norwalk+CT";

export const reviewsSummary: ReviewsSummary = {
  rating: 5,
  totalCount: 12,
  googleMapsUrl: GOOGLE_REVIEWS_URL,
};

export const hardcodedReviews: Review[] = [
  {
    id: "1",
    authorName: "Jennifer M.",
    rating: 5,
    text: "SEMTA transformed our kitchen. Every detail — from the drawer layouts to the finish — feels custom to how we actually live. Communication was clear from design through install.",
    relativeTime: "2 months ago",
  },
  {
    id: "2",
    authorName: "David R.",
    rating: 5,
    text: "We hired SEMTA for built-ins in our mudroom and a bathroom vanity. The craftsmanship is outstanding, and the install team was careful and professional. Worth every penny.",
    relativeTime: "4 months ago",
  },
  {
    id: "3",
    authorName: "Sarah K.",
    rating: 5,
    text: "As a designer, I need a shop that can execute complex millwork without drama. SEMTA delivers — drawings, lead times, and final fit are consistently excellent.",
    relativeTime: "5 months ago",
  },
  {
    id: "4",
    authorName: "Michael T.",
    rating: 5,
    text: "Our Norwalk condo kitchen was tight on space. SEMTA designed storage we didn't think was possible. Beautiful work and a smooth process from start to finish.",
    relativeTime: "7 months ago",
  },
];
