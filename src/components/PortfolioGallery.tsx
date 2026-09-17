import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RowsPhotoAlbum } from "react-photo-album";
import { CategoryDescription } from "@/components/CategoryDescription";
import type { PortfolioLightboxSlide } from "@/components/PortfolioLightbox";
import { GALLERY_IMAGE_SIZES } from "@/lib/sanity/image";
import type { GalleryCategory, GalleryImage } from "@/lib/portfolio";

import "react-photo-album/rows.css";

const PortfolioLightbox = lazy(() =>
  import("@/components/PortfolioLightbox").then((module) => ({
    default: module.PortfolioLightbox,
  })),
);

const TARGET_ROW_HEIGHT = 240;
const ROW_SPACING = 10;
const MOBILE_BREAKPOINT = 768;
const TAB_SCROLL_STEP = 160;

const GALLERY_LOAD_STRATEGY = {
  mobile: { eagerCount: 2, highPriorityCount: 1 },
  desktop: { eagerCount: 6, highPriorityCount: 3 },
} as const;

function useGalleryLoadStrategy() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile ? GALLERY_LOAD_STRATEGY.mobile : GALLERY_LOAD_STRATEGY.desktop;
}

function useCategoryTabScroll() {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 1);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      observer.disconnect();
    };
  }, [updateScrollButtons]);

  const scrollTabsBy = useCallback((direction: -1 | 1) => {
    tabListRef.current?.scrollBy({
      left: direction * TAB_SCROLL_STEP,
      behavior: "smooth",
    });
  }, []);

  const scrollActiveTabIntoView = useCallback(() => {
    const el = tabListRef.current;
    const activeTab = el?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    activeTab?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, []);

  return {
    tabListRef,
    canScrollPrev,
    canScrollNext,
    scrollTabsBy,
    scrollActiveTabIntoView,
    updateScrollButtons,
  };
}

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

type PortfolioGalleryProps = {
  categories: GalleryCategory[];
};

export function PortfolioGallery({ categories }: PortfolioGalleryProps) {
  const { eagerCount, highPriorityCount } = useGalleryLoadStrategy();
  const {
    tabListRef,
    canScrollPrev,
    canScrollNext,
    scrollTabsBy,
    scrollActiveTabIntoView,
    updateScrollButtons,
  } = useCategoryTabScroll();
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const showCategoryNav = canScrollPrev || canScrollNext;

  useEffect(() => {
    if (!categories.some((category) => category.id === activeId)) {
      setActiveId(categories[0]?.id ?? "");
    }
  }, [categories, activeId]);

  useEffect(() => {
    updateScrollButtons();
  }, [categories, updateScrollButtons]);

  useEffect(() => {
    scrollActiveTabIntoView();
  }, [activeId, scrollActiveTabIntoView]);

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
    scrollTabsBy(step < 0 ? -1 : 1);
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
              disabled={!canScrollPrev}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="flex min-w-0 flex-1 justify-center">
            <div
              ref={tabListRef}
              className="flex max-w-full flex-nowrap items-center gap-x-4 overflow-x-auto scroll-smooth sm:gap-x-6 md:gap-x-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Portfolio categories"
            >
              {categories.map((category) => {
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
          </div>

          {showCategoryNav && (
            <button
              type="button"
              onClick={() => scrollCategoriesBy(1)}
              disabled={!canScrollNext}
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
            targetRowHeight={TARGET_ROW_HEIGHT}
            spacing={ROW_SPACING}
            padding={0}
            sizes={{
              size: GALLERY_IMAGE_SIZES,
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
                loading: index < eagerCount ? "eager" : "lazy",
                decoding: "async",
                ...(index < highPriorityCount ? { fetchPriority: "high" as const } : {}),
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
