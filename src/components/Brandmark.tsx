import { cn } from "@/lib/utils";
import { defaultSettings, pick } from "@/lib/sanity/defaults";

export function Brandmark({
  className = "",
  invert = false,
  href,
  brandName,
  brandTagline,
}: {
  className?: string;
  invert?: boolean;
  href?: string;
  brandName?: string | null;
  brandTagline?: string | null;
}) {
  const name = pick(brandName, defaultSettings.brandName!);
  const tagline = pick(brandTagline, defaultSettings.brandTagline!);
  const gold = "text-[color:var(--color-gold-deep)]";
  const sub = invert ? "text-white/70" : "text-muted-foreground";
  const content = (
    <>
      <span className={`font-display text-2xl tracking-[0.35em] -mr-[0.35em] ${gold}`}>{name}</span>
      <span
        className={`mt-2 text-[0.4rem] tracking-[0.15em] -mr-[0.15em] uppercase sm:text-[0.55rem] sm:tracking-[0.4em] sm:-mr-[0.4em] ${sub}`}
      >
        {tagline}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "flex flex-col items-center leading-none transition-opacity hover:opacity-90",
          className,
        )}
        onClick={(event) => {
          if (window.location.pathname === href) {
            event.preventDefault();
            window.history.replaceState(null, "", href);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={cn("flex flex-col items-center leading-none", className)}>{content}</div>
  );
}
