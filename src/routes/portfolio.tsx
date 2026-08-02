import { createFileRoute } from "@tanstack/react-router";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { galleryFromLocal } from "@/lib/portfolio";
import { defaultPortfolio, defaultSettings, pick } from "@/lib/sanity/defaults";
import {
  GALLERY_IMAGE_SIZES,
  sanityGalleryLcpHref,
  sanityGalleryThumbSrcSetString,
} from "@/lib/sanity/image";
import { loadPortfolioPage } from "@/lib/sanity/load-portfolio-page";
import { buildSeoHead, galleryFromSanity } from "@/lib/sanity/seo-head";

export const Route = createFileRoute("/portfolio")({
  loader: () => loadPortfolioPage(),
  head: ({ loaderData }) => {
    const seo = buildSeoHead({
      seo: loaderData?.portfolio?.seo,
      settings: loaderData?.settings,
      fallbacks: {
        title: defaultPortfolio.seo?.title || undefined,
        description: defaultPortfolio.seo?.description || undefined,
        twitterCard: defaultPortfolio.seo?.twitterCard || undefined,
      },
    });

    const firstSanityImage = loaderData?.portfolio?.categories?.[0]?.images?.[0];
    const lcpHref = firstSanityImage
      ? sanityGalleryLcpHref(firstSanityImage)
      : (galleryFromLocal()[0]?.images[0]?.src ?? null);
    const lcpSrcSet = firstSanityImage
      ? sanityGalleryThumbSrcSetString(firstSanityImage)
      : null;

    return {
      ...seo,
      links: [
        ...(seo.links ?? []),
        ...(lcpHref && lcpSrcSet
          ? [
              {
                rel: "preload" as const,
                as: "image" as const,
                href: lcpHref,
                imageSrcSet: lcpSrcSet,
                imageSizes: GALLERY_IMAGE_SIZES,
                fetchPriority: "high" as const,
              },
            ]
          : lcpHref
            ? [
                {
                  rel: "preload" as const,
                  as: "image" as const,
                  href: lcpHref,
                  fetchPriority: "high" as const,
                },
              ]
            : []),
      ],
    };
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { settings, portfolio } = Route.useLoaderData();
  const s = settings ?? defaultSettings;
  const p = portfolio ?? defaultPortfolio;

  const categoriesFromSanity = galleryFromSanity(p.categories);
  const categories =
    categoriesFromSanity.length > 0 ? categoriesFromSanity : galleryFromLocal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        brandName={s.brandName}
        brandTagline={s.brandTagline}
        locationLabel={s.locationLabel}
        phoneDisplay={s.phoneDisplay}
        phoneHref={s.phoneHref}
        headerNavLinks={s.headerNavLinks}
      />

      <main className="px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{pick(p.eyebrow, defaultPortfolio.eyebrow!)}</span>
            <h1 className="mt-6 font-display text-4xl md:text-5xl">
              {pick(p.title, defaultPortfolio.title!)}
            </h1>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              {pick(p.body, defaultPortfolio.body!)}
            </p>
          </div>
          <div className="mt-16">
            <PortfolioGallery categories={categories} />
          </div>
          <div className="mt-16 text-center">
            <a
              href={pick(p.ctaHref, defaultPortfolio.ctaHref!)}
              className="eyebrow link-underline inline-block"
            >
              {pick(p.ctaLabel, defaultPortfolio.ctaLabel!)}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter
        brandName={s.brandName}
        brandTagline={s.brandTagline}
        footerTagline={s.footerTagline}
        footerNavLinks={s.footerNavLinks}
      />
    </div>
  );
}
