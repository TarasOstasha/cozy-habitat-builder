import { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { partners } from "@/lib/partners";
import { cn } from "@/lib/utils";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function PartnersSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!api || prefersReducedMotion || isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, isHovered, prefersReducedMotion]);

  return (
    <section
      id="partners"
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Partners</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">
            Trusted by designers and builders.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            We collaborate with interior designers, architects and builders across Connecticut to
            bring precision cabinetry to every project.
          </p>
        </div>

        <div
          className="mt-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={() => setIsHovered(false)}
        >
          <Carousel
            opts={{ align: "start", loop: true, dragFree: true }}
            setApi={setApi}
            className="w-full"
            aria-label="Partner logos"
          >
            <CarouselContent className="-ml-4">
              {partners.map((partner) => (
                <CarouselItem
                  key={partner.id}
                  className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div
                    className={cn(
                      "flex h-24 items-center justify-center rounded-sm border border-border/60 bg-background px-4",
                      "transition-colors hover:border-border",
                    )}
                  >
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        className="max-h-10 max-w-[8rem] object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                      />
                    ) : (
                      <span
                        className="eyebrow text-center text-[0.62rem] leading-snug text-muted-foreground"
                        aria-label={`${partner.name} — placeholder logo`}
                      >
                        {partner.name}
                      </span>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
