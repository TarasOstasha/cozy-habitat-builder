import type { PageSeo, JsonValue, SanityImage, SiteSettings } from "./types";
import { sanityGalleryImageUrls, sanityImageUrl } from "./image";
import type { GalleryCategory } from "@/lib/portfolio";

type SeoHeadInput = {
  seo?: PageSeo | null;
  settings?: SiteSettings | null;
  fallbacks?: {
    title?: string;
    description?: string;
    twitterCard?: string;
  };
};

/** Accepts a bare Measurement ID or a pasted gtag.js snippet. */
export function parseGoogleAnalyticsId(snippet?: string | null): string | null {
  if (!snippet?.trim()) return null;
  const trimmed = snippet.trim();
  if (/^(G|GT|AW)-[A-Z0-9]+$/i.test(trimmed) || /^UA-\d+-\d+$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  const match = trimmed.match(/\b(G-[A-Z0-9]+|GT-[A-Z0-9]+|AW-\d+|UA-\d+-\d+)\b/i);
  return match?.[1]?.toUpperCase() ?? null;
}

function googleAnalyticsScripts(snippet?: string | null) {
  const id = parseGoogleAnalyticsId(snippet);
  if (!id) return undefined;

  return [
    {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${id}`,
    },
    {
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`,
    },
  ];
}

export function buildSeoHead({ seo, settings, fallbacks }: SeoHeadInput) {
  const title = seo?.title || settings?.seoTitle || fallbacks?.title || "";
  const description =
    seo?.description || settings?.seoDescription || fallbacks?.description || "";
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const siteName = settings?.ogSiteName || settings?.brandName || "";
  const twitterCard = seo?.twitterCard || fallbacks?.twitterCard || "summary_large_image";
  const ogImage =
    sanityImageUrl(seo?.image, 1200, 630) ||
    sanityImageUrl(settings?.seoImage, 1200, 630) ||
    undefined;
  const ogImageAlt = seo?.image?.alt || settings?.seoImage?.alt || siteName;
  const canonicalUrl = seo?.canonicalUrl || undefined;
  const robotsParts = [seo?.noIndex ? "noindex" : "index", seo?.noFollow ? "nofollow" : "follow"];
  const twitterHandle = settings?.twitterHandle
    ? `@${settings.twitterHandle.replace(/^@/, "")}`
    : undefined;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(seo?.keywords?.length ? [{ name: "keywords", content: seo.keywords.join(", ") }] : []),
      { name: "robots", content: robotsParts.join(", ") },
      { property: "og:type", content: "website" },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      ...(siteName ? [{ property: "og:site_name", content: siteName }] : []),
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:alt", content: ogImageAlt },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      ...(twitterHandle ? [{ name: "twitter:site", content: twitterHandle }] : []),
      ...(ogImage
        ? [
            { name: "twitter:image", content: ogImage },
            { name: "twitter:image:alt", content: ogImageAlt },
          ]
        : []),
    ],
    links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : undefined,
    scripts: googleAnalyticsScripts(settings?.googleAnalyticsSnippet),
  };
}

export function galleryFromSanity(
  categories:
    | Array<{
        _key?: string;
        title?: string | null;
        slug?: { current?: string | null } | null;
        descriptionMode?: "richText" | "html" | string | null;
        description?: JsonValue[] | null;
        descriptionHtml?: string | null;
        images?: SanityImage[] | null;
      }>
    | null
    | undefined,
): GalleryCategory[] {
  if (!categories?.length) return [];

  return categories
    .map((category, categoryIndex) => {
      const id = category.slug?.current || category._key || `category-${categoryIndex}`;
      const label = category.title || "Untitled";
      const images = (category.images ?? [])
        .map((image, imageIndex) => {
          const urls = sanityGalleryImageUrls(image);
          if (!urls) return null;
          const assetWidth = image.asset?.width;
          const assetHeight = image.asset?.height;
          return {
            key: `${id}-${imageIndex}`,
            alt: image.alt || `${label} project ${imageIndex + 1}`,
            src: urls.src,
            srcSet: urls.srcSet,
            fullSrc: urls.fullSrc,
            thumbSrc: urls.thumbSrc,
            ...(assetWidth && assetHeight
              ? { width: assetWidth, height: assetHeight }
              : {}),
          };
        })
        .filter(
          (
            image,
          ): image is {
            key: string;
            alt: string;
            src: string;
            srcSet: { src: string; width: number; height: number }[];
            fullSrc: string;
            thumbSrc: string;
            width?: number;
            height?: number;
          } => image !== null,
        );

      const mode: "richText" | "html" =
        category.descriptionMode === "html" ? "html" : "richText";

      return {
        id,
        label,
        descriptionMode: mode,
        description: Array.isArray(category.description)
          ? (category.description as unknown as GalleryCategory["description"])
          : undefined,
        descriptionHtml: category.descriptionHtml || undefined,
        images,
      };
    })
    .filter((category) => category.images.length > 0);
}
