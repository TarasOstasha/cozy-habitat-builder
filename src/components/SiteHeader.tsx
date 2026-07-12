import { Link } from "@tanstack/react-router";
import { Brandmark } from "@/components/Brandmark";

export function SiteHeader({ overHero = false }: { overHero?: boolean }) {
  const navClass = overHero ? "text-white/90" : "text-foreground/90";
  const locationClass = overHero ? "text-white/90" : "text-muted-foreground";

  return (
    <header
      className={
        overHero
          ? "absolute top-0 left-0 right-0 z-20"
          : "sticky top-0 z-20 border-b border-border/60 bg-background/95 backdrop-blur-sm"
      }
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-14 md:py-9">
        <span className={`eyebrow hidden md:inline ${locationClass}`}>Norwalk · Connecticut</span>
        <Brandmark
          invert={overHero}
          href="/"
          className="md:absolute md:left-1/2 md:-translate-x-1/2"
        />
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/portfolio" className={`eyebrow link-underline ${navClass}`}>
            Portfolio
          </Link>
          <Link to="/designers" className={`eyebrow link-underline ${navClass}`}>
            For Designers
          </Link>
          <a
            href={overHero ? "#contact" : "/#contact"}
            className={`eyebrow link-underline ${navClass}`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
