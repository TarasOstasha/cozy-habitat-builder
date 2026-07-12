import { cn } from "@/lib/utils";

export function Brandmark({
  className = "",
  invert = false,
  href,
}: {
  className?: string;
  invert?: boolean;
  href?: string;
}) {
  const gold = "text-[color:var(--color-gold-deep)]";
  const sub = invert ? "text-white/70" : "text-muted-foreground";
  const content = (
    <>
      <span className={`font-display text-2xl tracking-[0.35em] ${gold}`}>SEMTA</span>
      <span className={`mt-2 text-[0.4rem] tracking-[0.15em] uppercase sm:text-[0.55rem] sm:tracking-[0.4em] ${sub}`}>
        Custom Cabinetry &amp; Design
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
