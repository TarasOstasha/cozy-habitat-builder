import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CategoryDescription } from "@/components/CategoryDescription";
import type { GalleryCategory } from "@/lib/portfolio";

const VISIBLE_CATEGORIES = 6;

type PortfolioGalleryProps = {
  categories: GalleryCategory[];
};

export function PortfolioGallery({ categories }: PortfolioGalleryProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];

  const isOpen = lightboxIndex !== null && activeCategory !== undefined;
  const slideCount = activeCategory?.images.length ?? 0;
  const currentIndex = lightboxIndex ?? 0;
  const currentImage = activeCategory?.images[currentIndex];

  const goToSlide = (index: number) => {
    if (!activeCategory) return;
    const nextIndex = (index + activeCategory.images.length) % activeCategory.images.length;
    setLightboxIndex(nextIndex);
  };

  const scrollCategoriesBy = (step: number) => {
    setStartIndex((current) => Math.min(maxStart, Math.max(0, current + step)));
  };

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeId]);

  useEffect(() => {
    if (!isOpen || !activeCategory) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((index) => {
          if (index === null) return null;
          return (index - 1 + activeCategory.images.length) % activeCategory.images.length;
        });
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((index) => {
          if (index === null) return null;
          return (index + 1) % activeCategory.images.length;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, activeCategory]);

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

          <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-4 overflow-hidden sm:gap-x-6 md:gap-x-8">
            {visibleCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`eyebrow shrink-0 cursor-pointer whitespace-nowrap transition-colors ${
                  category.id === activeId
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={category.id === activeId}
              >
                {category.label}
                <span className="ml-1.5 text-muted-foreground/70">({category.images.length})</span>
              </button>
            ))}
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

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeCategory.images.map((image, index) => (
            <figure
              key={image.key}
              className={`overflow-hidden bg-secondary/30 ${
                index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="block h-full w-full cursor-zoom-in text-left"
                aria-label={`View ${image.alt} full size`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02] ${
                    index % 5 === 0 ? "aspect-4/3 sm:aspect-auto sm:min-h-[520px]" : "aspect-4/3"
                  }`}
                />
              </button>
            </figure>
          ))}
        </div>
      </div>

      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.alt}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white md:right-8 md:top-8"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          {slideCount > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToSlide(currentIndex - 1);
                }}
                className="absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToSlide(currentIndex + 1);
                }}
                className="absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div
            className="flex w-full max-w-[1600px] flex-col items-center gap-6"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={currentImage.key}
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[82vh] w-full object-contain"
            />

            {slideCount > 1 && (
              <p className="eyebrow text-white/70">
                {currentIndex + 1} / {slideCount}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
