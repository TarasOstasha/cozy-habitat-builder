import { createClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const sanityClient = createClient({
  projectId: projectId || "43r4kll9",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export { isSanityConfigured };
