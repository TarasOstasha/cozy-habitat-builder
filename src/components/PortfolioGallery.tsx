import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RowsPhotoAlbum } from "react-photo-album";
import { CategoryDescription } from "@/components/CategoryDescription";
import type { PortfolioLightboxSlide } from "@/components/PortfolioLightbox";
import type { GalleryCategory, GalleryImage } from "@/lib/portfolio";

import "react-photo-album/rows.css";

const PortfolioLightbox = lazy(() =>
  import("@/components/PortfolioLightbox").then((module) => ({
    default: module.PortfolioLightbox,
  })),
);

const VISIBLE_CATEGORIES = 6;
const TARGET_ROW_HEIGHT = 240;
const ROW_SPACING = 10;
/** Eager-load enough photos to cover the first visible row on wide screens. */
const EAGER_LOAD_COUNT = 6;
/** High fetch priority for likely LCP candidates in the first row. */
const HIGH_PRIORITY_COUNT = 3;

/** Fallback aspect presets when Sanity has no dimensions. */
const ASPECT_PRESETS = [
  { width: 1600, height: 1200 },
  { width: 1600, height: 1067 },
  { width: 1600, height: 1000 },
  { width: 1600, height: 1200 },
  { width: 1800, height: 1200 },
  { width: 1600, height: 900 },
] as const;

type AlbumPhoto = {
  key: string;
  src: string;
  srcSet?: readonly { src: string; width: number; height: number }[];
  alt: string;
  width: number;
  height: number;
  fullSrc: string;
  thumbSrc?: string;
};

function resolvePhotoDimensions(image: GalleryImage, index: number) {
  if (image.width && image.height) {
    return { width: image.width, height: image.height };
  }
  const preset = ASPECT_PRESETS[index % ASPECT_PRESETS.length]!;
  return { width: preset.width, height: preset.height };
}

function toAlbumPhotos(images: GalleryImage[]): AlbumPhoto[] {
  return images.map((image, index) => {
    const { width, height } = resolvePhotoDimensions(image, index);
    return {
      key: image.key,
      src: image.src,
      srcSet: image.srcSet,
      alt: image.alt,
      width,
      height,
      fullSrc: image.fullSrc,
      thumbSrc: image.thumbSrc,
    };
  });
}

function toLightboxSlides(photos: AlbumPhoto[]): PortfolioLightboxSlide[] {
  return photos.map((photo) => ({
    src: photo.fullSrc,
    alt: photo.alt,
    title: photo.alt,
    width: photo.width,
    height: photo.height,
    thumbnail: photo.thumbSrc,
  }));
}

/** Reserve vertical space before the album layout finishes to limit footer shift. */
function estimateAlbumMinHeight(photoCount: number) {
  if (photoCount === 0) return undefined;
  const photosPerRow = 3;
  const rows = Math.ceil(photoCount / photosPerRow);
  return rows * TARGET_ROW_HEIGHT + Math.max(0, rows - 1) * ROW_SPACING;
}

type PortfolioGalleryProps = {
  categories: GalleryCategory[];
};

export function PortfolioGallery({ categories }: PortfolioGalleryProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const maxStart = Math.max(0, categories.length - VISIBLE_CATEGORIES);
  const showCategoryNav = categories.length > VISIBLE_CATEGORIES;
  const visibleCategories = showCategoryNav
    ? categories.slice(startIndex, startIndex + VISIBLE_CATEGORIES)
    : categories;
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStart;

  useEffect(() => {
    if (!categories.some((category) => category.id === activeId)) {
      setActiveId(categories[0]?.id ?? "");
    }
  }, [categories, activeId]);

  useEffect(() => {
    setStartIndex((current) => Math.min(current, maxStart));
  }, [maxStart]);

  useEffect(() => {
    const activeIndex = categories.findIndex((category) => category.id === activeId);
    if (activeIndex < 0 || categories.length <= VISIBLE_CATEGORIES) return;

    setStartIndex((current) => {
      if (activeIndex < current) return activeIndex;
      if (activeIndex >= current + VISIBLE_CATEGORIES) {
        return activeIndex - VISIBLE_CATEGORIES + 1;
      }
      return current;
    });
  }, [activeId, categories]);

  useEffect(() => {
    setLightboxIndex(-1);
  }, [activeId]);

  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];

  const photos = useMemo(
    () => toAlbumPhotos(activeCategory?.images ?? []),
    [activeCategory],
  );
  const slides = useMemo(() => toLightboxSlides(photos), [photos]);
  const albumMinHeight = useMemo(
    () => estimateAlbumMinHeight(photos.length),
    [photos.length],
  );

  const scrollCategoriesBy = (step: number) => {
    setStartIndex((current) => Math.min(maxStart, Math.max(0, current + step)));
  };

  const openLightbox = (index: number) => {
    setLightboxMounted(true);
    setLightboxIndex(index);
  };

  if (!activeCategory) return null;

  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {showCategoryNav && (
            <button
              type="button"
              onClick={() => scrollCategoriesBy(-1)}
              disabled={!canPrev}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            className="flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-4 overflow-hidden sm:gap-x-6 md:gap-x-8"
            role="tablist"
            aria-label="Portfolio categories"
          >
            {visibleCategories.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(category.id)}
                  className={`eyebrow group relative shrink-0 cursor-pointer whitespace-nowrap pb-2 transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.label}
                  <span className="ml-1.5 text-muted-foreground/70">
                    ({category.images.length})
                  </span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[color:var(--color-gold)] transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {showCategoryNav && (
            <button
              type="button"
              onClick={() => scrollCategoriesBy(1)}
              disabled={!canNext}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <CategoryDescription
          mode={activeCategory.descriptionMode}
          richText={activeCategory.description}
          html={activeCategory.descriptionHtml}
        />

        <div
          className="portfolio-album mt-14"
          style={albumMinHeight ? { minHeight: albumMinHeight } : undefined}
        >
          <RowsPhotoAlbum
            photos={photos}
            targetRowHeight={TARGET_ROW_HEIGHT}
            spacing={ROW_SPACING}
            padding={0}
            sizes={{
              size: "calc(100vw - 48px)",
              sizes: [
                { viewport: "(min-width: 1400px)", size: "1300px" },
                { viewport: "(min-width: 768px)", size: "calc(100vw - 112px)" },
              ],
            }}
            onClick={({ index }) => openLightbox(index)}
            componentsProps={{
              container: {
                className: "portfolio-album__container",
              },
              button: ({ photo }) => ({
                className:
                  "portfolio-album__photo group overflow-hidden rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2",
                "aria-label": `View ${photo.alt} full size`,
              }),
              image: ({ index }) => ({
                className:
                  "portfolio-album__image transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                loading: index < EAGER_LOAD_COUNT ? "eager" : "lazy",
                decoding: "async",
                ...(index < HIGH_PRIORITY_COUNT ? { fetchPriority: "high" as const } : {}),
              }),
            }}
            render={{
              extras: () => (
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              ),
            }}
          />
        </div>
      </div>

      {lightboxMounted && (
        <Suspense fallback={null}>
          <PortfolioLightbox
            open={lightboxIndex >= 0}
            close={() => setLightboxIndex(-1)}
            index={Math.max(lightboxIndex, 0)}
            slides={slides}
          />
        </Suspense>
      )}
    </>
  );
}
