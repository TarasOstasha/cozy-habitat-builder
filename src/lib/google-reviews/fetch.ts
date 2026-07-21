import { createServerFn } from "@tanstack/react-start";
import { loadGoogleReviews } from "./load-google-reviews";

export { loadGoogleReviews };

export const fetchGoogleReviews = createServerFn({ method: "GET" }).handler(loadGoogleReviews);
