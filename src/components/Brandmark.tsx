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
      <span className={`mt-2 text-[0.55rem] tracking-[0.4em] uppercase ${sub}`}>
        Custom Cabinetry &amp; Design
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex flex-col items-center leading-none transition-opacity hover:opacity-90 ${className}`}
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

  return <div className={`flex flex-col items-center leading-none ${className}`}>{content}</div>;
}
