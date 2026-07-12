import { useEffect, useState } from "react";
import { landingSections } from "@/lib/landing-sections";
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

function scrollToSection(id: string, smooth: boolean) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

export function SectionNav() {
  const [activeId, setActiveId] = useState(landingSections[0]?.id ?? "");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sections = landingSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    scrollToSection(id, !prefersReducedMotion);
  };

  return (
    <>
      {/* Desktop side navigation */}
      <nav
        aria-label="Page sections"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      >
        <ol className="flex flex-col gap-3">
          {landingSections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => handleClick(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center justify-end gap-3 rounded-sm px-1 py-1 text-right transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span
                    className={cn(
                      "eyebrow pointer-events-none max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {section.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block shrink-0 rounded-full transition-all duration-300",
                      isActive
                        ? "h-2 w-2 bg-[color:var(--color-gold-deep)]"
                        : "h-1.5 w-1.5 bg-border group-hover:bg-muted-foreground",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile / tablet dot navigation */}
      <nav
        aria-label="Page sections"
        className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 lg:hidden"
      >
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm">
          {landingSections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleClick(section.id)}
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "h-2.5 w-2.5 bg-[color:var(--color-gold-deep)]"
                    : "h-2 w-2 bg-border hover:bg-muted-foreground",
                )}
              />
            );
          })}
        </div>
      </nav>
    </>
  );
}
