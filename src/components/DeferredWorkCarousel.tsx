import { useEffect, useState, type ComponentType } from "react";

/**
 * Lazily mounts WorkCarousel after the browser is idle so the full carousel
 * chunk stays off the critical mobile path.
 */
export function DeferredWorkCarousel() {
  const [Carousel, setCarousel] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      void import("@/components/WorkCarousel").then((mod) => {
        if (!cancelled) setCarousel(() => mod.WorkCarousel);
      });
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(load, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(load, 1);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!Carousel) {
    return (
      <div
        className="mx-auto aspect-[4/3] w-full max-w-[1300px] bg-secondary/20 md:aspect-[21/9]"
        aria-hidden="true"
      />
    );
  }

  return <Carousel />;
}
