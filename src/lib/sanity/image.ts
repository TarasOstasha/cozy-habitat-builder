import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImage } from "./types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function sanityImageUrl(image: SanityImage | null | undefined, width = 1600): string | null {
  if (!image?.asset) return null;
  try {
    return urlFor(image).width(width).auto("format").url();
  } catch {
    return null;
  }
}
