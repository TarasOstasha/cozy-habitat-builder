import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Brandmark } from "@/components/Brandmark";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Home", to: "/" as const },
  { label: "Portfolio", to: "/portfolio" as const },
  { label: "For Designers", to: "/designers" as const },
];

export function SiteHeader({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const navClass = overHero ? "text-white/90" : "text-foreground/90";
  const locationClass = overHero ? "text-white/90" : "text-muted-foreground";
  const triggerClass = overHero ? "text-white" : "text-foreground";
  const contactHref = overHero ? "#contact" : "/#contact";

  return (
    <header
      className={
        overHero
          ? "absolute top-0 left-0 right-0 z-20"
          : "sticky top-0 z-20 border-b border-border/60 bg-background/95 backdrop-blur-sm"
      }
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-14 md:py-9">
        <span
          className={`eyebrow hidden lg:inline lg:tracking-[0.18em] xl:tracking-brand ${locationClass}`}
        >
          Norwalk · Connecticut
        </span>
        <Brandmark
          invert={overHero}
          href="/"
          className="items-start lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:items-center"
        />

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          <Link
            to="/portfolio"
            className={`eyebrow link-underline lg:tracking-[0.18em] xl:tracking-brand ${navClass}`}
          >
            Portfolio
          </Link>
          <Link
            to="/designers"
            className={`eyebrow link-underline lg:tracking-[0.18em] xl:tracking-brand ${navClass}`}
          >
            For Designers
          </Link>
          <a
            href={contactHref}
            className={`eyebrow link-underline lg:tracking-[0.18em] xl:tracking-brand ${navClass}`}
          >
            Contact
          </a>
        </nav>

        {/* Mobile & tablet hamburger menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={`inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2 ${
                overHero ? "focus-visible:ring-offset-black/30" : "focus-visible:ring-offset-background"
              } ${triggerClass}`}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-4/5 max-w-xs flex-col gap-0 sm:max-w-sm"
            >
              <div className="mt-4 flex flex-col items-start">
                <Brandmark href="/" />
              </div>
              <nav className="mt-12 flex flex-col gap-6" aria-label="Mobile">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className="eyebrow link-underline text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href={contactHref}
                    className="eyebrow link-underline text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </a>
                </SheetClose>
              </nav>
              <div className="mt-auto border-t border-border/60 pt-8">
                <span className="eyebrow text-muted-foreground">Norwalk · Connecticut</span>
                <a
                  href="tel:+19177050712"
                  className="mt-3 block font-display text-2xl link-underline"
                >
                  +1 (917) 705 0712
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
