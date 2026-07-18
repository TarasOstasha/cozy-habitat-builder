import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

export const sanityClient = createClient({
  projectId: projectId || "sgbbdc2e",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
