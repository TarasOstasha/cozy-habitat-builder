import { useState } from "react";
import { Menu } from "lucide-react";
import { Brandmark } from "@/components/Brandmark";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { defaultHeaderNavLinks, defaultSettings, pick } from "@/lib/sanity/defaults";
import type { HeaderNavLink } from "@/lib/sanity/types";

type SiteHeaderProps = {
  overHero?: boolean;
  brandName?: string | null;
  brandTagline?: string | null;
  locationLabel?: string | null;
  phoneDisplay?: string | null;
  phoneHref?: string | null;
  headerNavLinks?: HeaderNavLink[] | null;
};

function resolveNavHref(href: string, overHero: boolean) {
  if (href === "/#contact" || href === "#contact") {
    return overHero ? "#contact" : "/#contact";
  }
  return href;
}

export function SiteHeader({
  overHero = false,
  brandName,
  brandTagline,
  locationLabel,
  phoneDisplay,
  phoneHref,
  headerNavLinks,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const navClass = overHero ? "text-white/90" : "text-foreground/90";
  const locationClass = overHero ? "text-white/90" : "text-muted-foreground";
  const triggerClass = overHero ? "text-white" : "text-foreground";
  const location = pick(locationLabel, defaultSettings.locationLabel!);
  const phone = pick(phoneDisplay, defaultSettings.phoneDisplay!);
  const tel = phoneHref?.startsWith("tel:")
    ? phoneHref
    : `tel:${phoneHref || defaultSettings.phoneHref}`;
  const links =
    headerNavLinks && headerNavLinks.length > 0 ? headerNavLinks : defaultHeaderNavLinks;
  const mobileLinks: HeaderNavLink[] = [
    { _key: "home", label: "Home", href: "/" },
    ...links.filter((link) => link.href !== "/"),
  ];

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
          {location}
        </span>
        <Brandmark
          invert={overHero}
          href="/"
          brandName={brandName}
          brandTagline={brandTagline}
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        />

        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {links.map((link) => {
            const href = resolveNavHref(link.href || "/", overHero);
            const label = link.label || "Link";
            return (
              <a
                key={link._key}
                href={href}
                className={`eyebrow link-underline lg:tracking-[0.18em] xl:tracking-brand ${navClass}`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={`inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2 ${
                overHero
                  ? "focus-visible:ring-offset-black/30"
                  : "focus-visible:ring-offset-background"
              } ${triggerClass}`}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-4/5 max-w-xs flex-col gap-0 sm:max-w-sm">
              <div className="mt-4 flex flex-col items-start">
                <Brandmark href="/" brandName={brandName} brandTagline={brandTagline} />
              </div>
              <nav className="mt-12 flex flex-col gap-6" aria-label="Mobile">
                {mobileLinks.map((link) => {
                  const href = resolveNavHref(link.href || "/", overHero);
                  return (
                    <SheetClose asChild key={link._key}>
                      <a
                        href={href}
                        className="eyebrow link-underline text-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {link.label || "Link"}
                      </a>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-auto border-t border-border/60 pt-8">
                <span className="eyebrow text-muted-foreground">{location}</span>
                <a href={tel} className="mt-3 block font-display text-2xl link-underline">
                  {phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
