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

/** Widths for portfolio grid thumbnails (~240px row height). */
export const GALLERY_THUMB_WIDTHS = [320, 480, 640, 800] as const;

export const GALLERY_THUMB_FALLBACK_WIDTH = 640;
export const GALLERY_LIGHTBOX_WIDTH = 1920;
export const GALLERY_LIGHTBOX_THUMB_WIDTH = 120;

/** Matches RowsPhotoAlbum `sizes` on the portfolio page (mobile-first). */
export const GALLERY_IMAGE_SIZES = "calc(100vw - 48px)";

const GALLERY_THUMB_QUALITY = 70;

export type GalleryImageUrls = {
  src: string;
  srcSet: { src: string; width: number; height: number }[];
  fullSrc: string;
  thumbSrc: string;
};

function galleryThumbHeight(width: number, aspectRatio = 4 / 3) {
  return Math.round(width / aspectRatio);
}

export function getImageAspectRatio(image: SanityImage | null | undefined) {
  const width = image?.asset?.width;
  const height = image?.asset?.height;
  if (width && height && height > 0) return width / height;
  return 4 / 3;
}

/** Responsive thumb URLs for the grid plus full-size / lightbox-strip variants. */
export function sanityGalleryImageUrls(
  image: SanityImage | null | undefined,
): GalleryImageUrls | null {
  if (!image?.asset) return null;
  try {
    const aspectRatio = getImageAspectRatio(image);
    const srcSet = GALLERY_THUMB_WIDTHS.map((width) => ({
      src: urlFor(image).width(width).auto("format").quality(GALLERY_THUMB_QUALITY).url(),
      width,
      height: galleryThumbHeight(width, aspectRatio),
    }));

    const fallback =
      srcSet.find((entry) => entry.width === GALLERY_THUMB_FALLBACK_WIDTH) ??
      srcSet[srcSet.length - 1]!;

    return {
      src: fallback.src,
      srcSet,
      fullSrc: urlFor(image)
        .width(GALLERY_LIGHTBOX_WIDTH)
        .auto("format")
        .quality(80)
        .url(),
      thumbSrc: urlFor(image)
        .width(GALLERY_LIGHTBOX_THUMB_WIDTH)
        .auto("format")
        .quality(65)
        .url(),
    };
  } catch {
    return null;
  }
}

/** Mobile-first fallback URL for `<link rel="preload" as="image">`. */
export function sanityGalleryLcpHref(image: SanityImage | null | undefined): string | null {
  if (!image?.asset) return null;
  try {
    return urlFor(image).width(480).auto("format").quality(GALLERY_THUMB_QUALITY).url();
  } catch {
    return null;
  }
}

/** Srcset string for preloading responsive gallery thumbs. */
export function sanityGalleryThumbSrcSetString(
  image: SanityImage | null | undefined,
  widths: readonly number[] = GALLERY_THUMB_WIDTHS,
): string | null {
  if (!image?.asset) return null;
  try {
    return widths
      .map((width) => {
        const url = urlFor(image).width(width).auto("format").quality(GALLERY_THUMB_QUALITY).url();
        return `${url} ${width}w`;
      })
      .join(", ");
  } catch {
    return null;
  }
}
