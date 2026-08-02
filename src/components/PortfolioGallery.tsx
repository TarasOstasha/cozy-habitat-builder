import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { CategoryDescription } from "@/components/CategoryDescription";
import type { GalleryCategory, GalleryImage } from "@/lib/portfolio";

import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

const VISIBLE_CATEGORIES = 6;

/** Aspect presets so the rows layout can pack tightly without real EXIF sizes. */
const ASPECT_PRESETS = [
  { width: 1600, height: 1200 }, // 4:3
  { width: 1600, height: 1067 }, // 3:2
  { width: 1600, height: 1000 }, // 8:5
  { width: 1600, height: 1200 }, // 4:3
  { width: 1800, height: 1200 }, // 3:2
  { width: 1600, height: 900 }, // 16:9
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

function toAlbumPhotos(images: GalleryImage[]): AlbumPhoto[] {
  return images.map((image, index) => {
    const preset = ASPECT_PRESETS[index % ASPECT_PRESETS.length]!;
    return {
      key: image.key,
      src: image.src,
      srcSet: image.srcSet,
      alt: image.alt,
      width: preset.width,
      height: preset.height,
      fullSrc: image.fullSrc,
      thumbSrc: image.thumbSrc,
    };
  });
}

type LightboxSlide = SlideImage & { thumbnail?: string };

function toLightboxSlides(photos: AlbumPhoto[]): LightboxSlide[] {
  return photos.map((photo) => ({
    src: photo.fullSrc,
    alt: photo.alt,
    title: photo.alt,
    width: photo.width,
    height: photo.height,
    thumbnail: photo.thumbSrc,
  }));
}

type PortfolioGalleryProps = {
  categories: GalleryCategory[];
};

export function PortfolioGallery({ categories }: PortfolioGalleryProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

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

  const scrollCategoriesBy = (step: number) => {
    setStartIndex((current) => Math.min(maxStart, Math.max(0, current + step)));
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

        <div className="portfolio-album mt-14">
          <RowsPhotoAlbum
            photos={photos}
            targetRowHeight={240}
            spacing={10}
            padding={0}
            sizes={{
              size: "calc(100vw - 48px)",
              sizes: [
                { viewport: "(min-width: 1400px)", size: "1300px" },
                { viewport: "(min-width: 768px)", size: "calc(100vw - 112px)" },
              ],
            }}
            onClick={({ index }) => setLightboxIndex(index)}
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
                loading: index < 2 ? "eager" : "lazy",
                decoding: "async",
                ...(index === 0 ? { fetchPriority: "high" as const } : {}),
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

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Captions, Counter, Thumbnails, Zoom]}
        carousel={{ finite: slides.length <= 1, padding: 0 }}
        animation={{ fade: 320 }}
        controller={{ closeOnBackdropClick: true }}
        captions={{ descriptionTextAlign: "center", descriptionMaxLines: 2 }}
        counter={{ container: { style: { top: 16, bottom: "unset" } } }}
        thumbnails={{
          position: "bottom",
          border: 0,
          borderRadius: 2,
          padding: 0,
          gap: 8,
          imageFit: "cover",
        }}
        zoom={{ maxZoomPixelRatio: 2.5, scrollToZoom: true }}
        styles={{
          container: { backgroundColor: "rgba(10, 10, 10, 0.94)" },
          captionsTitle: {
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          },
        }}
      />
    </>
  );
}
