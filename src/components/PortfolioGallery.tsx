import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { portfolioCategories } from "@/lib/portfolio";

export function PortfolioGallery() {
  const [activeId, setActiveId] = useState(portfolioCategories[0]?.id ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeCategory =
    portfolioCategories.find((category) => category.id === activeId) ?? portfolioCategories[0];

  const isOpen = lightboxIndex !== null && activeCategory !== undefined;
  const slideCount = activeCategory?.images.length ?? 0;
  const currentIndex = lightboxIndex ?? 0;
  const currentSrc = activeCategory?.images[currentIndex];
  const currentAlt = activeCategory
    ? `${activeCategory.label} project ${currentIndex + 1}`
    : "";

  const goToSlide = (index: number) => {
    if (!activeCategory) return;
    const nextIndex = (index + activeCategory.images.length) % activeCategory.images.length;
    setLightboxIndex(nextIndex);
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
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {portfolioCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              className={`eyebrow cursor-pointer transition-colors ${
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

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeCategory.images.map((src, index) => {
            const alt = `${activeCategory.label} project ${index + 1}`;

            return (
              <figure
                key={src}
                className={`overflow-hidden bg-secondary/30 ${
                  index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="block h-full w-full cursor-zoom-in text-left"
                  aria-label={`View ${alt} full size`}
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02] ${
                      index % 5 === 0 ? "aspect-4/3 sm:aspect-auto sm:min-h-[520px]" : "aspect-4/3"
                    }`}
                  />
                </button>
              </figure>
            );
          })}
        </div>
      </div>

      {isOpen && currentSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={currentAlt}
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
              key={currentSrc}
              src={currentSrc}
              alt={currentAlt}
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
