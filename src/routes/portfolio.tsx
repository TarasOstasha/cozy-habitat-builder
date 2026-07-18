import { createFileRoute } from "@tanstack/react-router";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchSiteSettings } from "@/lib/sanity/fetch";

export const Route = createFileRoute("/portfolio")({
  loader: () => fetchSiteSettings(),
  head: () => ({
    meta: [
      { title: "Portfolio · SEMTA Custom Cabinetry & Design" },
      {
        name: "description",
        content:
          "Browse SEMTA custom cabinetry projects — kitchens, bathrooms, bars, mudrooms and more. Built in Norwalk, CT.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const settings = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locationLabel={settings.locationLabel} />

      <main className="px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Portfolio</span>
            <h1 className="mt-6 font-display text-4xl md:text-5xl">Selected work by room.</h1>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              Browse kitchens, baths, bars and more — each project crafted in our Norwalk studio and
              installed by our own team.
            </p>
          </div>
          <div className="mt-16">
            <PortfolioGallery />
          </div>
          <div className="mt-16 text-center">
            <a href="/#contact" className="eyebrow link-underline inline-block">
              Begin a Project
            </a>
          </div>
        </div>
      </main>

      <SiteFooter
        footerLogo={settings.footerLogo}
        footerTagline={settings.footerTagline}
        footerNavLinks={settings.footerNavLinks}
      />
    </div>
  );
}
