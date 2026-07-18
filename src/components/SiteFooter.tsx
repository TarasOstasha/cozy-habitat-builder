import { Brandmark } from "@/components/Brandmark";
import semtaLogo from "@/assets/semta-logo.jpg";
import { defaultFooterNavLinks, defaultSettings, pick } from "@/lib/sanity/defaults";
import { sanityImageUrl } from "@/lib/sanity/image";
import type { FooterNavLink, SanityImage } from "@/lib/sanity/types";

type SiteFooterProps = {
  footerLogo?: SanityImage | null;
  footerTagline?: string | null;
  footerNavLinks?: FooterNavLink[] | null;
};

export function SiteFooter({ footerLogo, footerTagline, footerNavLinks }: SiteFooterProps) {
  const tagline = pick(footerTagline, defaultSettings.footerTagline!);
  const logoUrl = sanityImageUrl(footerLogo, 256) || semtaLogo;
  const logoAlt = footerLogo?.alt || "SEMTA";
  const links =
    footerNavLinks && footerNavLinks.length > 0 ? footerNavLinks : defaultFooterNavLinks;

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-14">
        <div className="flex flex-col items-center gap-8">
          <img src={logoUrl} alt={logoAlt} className="h-16 w-16 rounded-full object-cover" />
          <Brandmark href="/" />
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {links.map((link) => {
              const href = link.href || "/";
              const label = link.label || "Link";
              const isHome = href === "/";

              return (
                <a
                  key={link._key}
                  href={href}
                  className="eyebrow link-underline"
                  onClick={
                    isHome
                      ? (event) => {
                          if (window.location.pathname === "/") {
                            event.preventDefault();
                            window.history.replaceState(null, "", "/");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }
                      : undefined
                  }
                >
                  {label}
                </a>
              );
            })}
          </nav>
          <p className="eyebrow text-muted-foreground">
            © {new Date().getFullYear()} {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
