import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImage } from "./types";

const builder = imageUrlBuilder(sanityClient);

/** Widths used for responsive hero / full-bleed images (mobile → desktop). */
export const HERO_SRCSET_WIDTHS = [640, 828, 1080, 1280, 1600, 1920] as const;

export const HERO_IMAGE_SIZES = "100vw";

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
    let b = urlFor(image).width(width).auto("format").quality(75);
    if (height) {
      b = b.height(height).fit("crop");
    }
    return b.url();
  } catch {
    return null;
  }
}

/** Build a srcset string for full-bleed / hero images. */
export function sanityImageSrcSet(
  image: SanityImage | null | undefined,
  widths: readonly number[] = HERO_SRCSET_WIDTHS,
): string | null {
  if (!image?.asset) return null;
  try {
    return widths
      .map((width) => {
        const url = urlFor(image).width(width).auto("format").quality(75).url();
        return `${url} ${width}w`;
      })
      .join(", ");
  } catch {
    return null;
  }
}

/** Default hero src for preload / fallback (mobile-first width). */
export function sanityHeroImageUrl(image: SanityImage | null | undefined): string | null {
  return sanityImageUrl(image, 1080);
}
