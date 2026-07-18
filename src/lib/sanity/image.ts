import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImage } from "./types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function sanityImageUrl(
  image: SanityImage | null | undefined,
  width = 1600,
  height?: number,
): string | null {
  if (!image?.asset) return null;
  try {
    const builder = urlFor(image).width(width).auto("format");
    if (height) {
      return builder.height(height).fit("crop").url();
    }
    return builder.url();
  } catch {
    return null;
  }
}

