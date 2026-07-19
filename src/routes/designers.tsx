import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { defaultDesigners, defaultSettings, pick } from "@/lib/sanity/defaults";
import { fetchDesignersPage } from "@/lib/sanity/fetch";
import { buildSeoHead } from "@/lib/sanity/seo-head";

export const Route = createFileRoute("/designers")({
  loader: () => fetchDesignersPage(),
  head: ({ loaderData }) =>
    buildSeoHead({
      seo: loaderData?.designers?.seo,
      settings: loaderData?.settings,
      fallbacks: {
        title: defaultDesigners.seo?.title || undefined,
        description: defaultDesigners.seo?.description || undefined,
        twitterCard: defaultDesigners.seo?.twitterCard || undefined,
      },
    }),
  component: DesignersPage,
});

function DesignersPage() {
  const { settings, designers } = Route.useLoaderData();
  const s = settings ?? defaultSettings;
  const d = designers ?? defaultDesigners;
  const highlights =
    d.highlights && d.highlights.length > 0 ? d.highlights : defaultDesigners.highlights!;

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
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">{pick(d.eyebrow, defaultDesigners.eyebrow!)}</span>
            <h1 className="mt-6 font-display text-4xl md:text-5xl">
              {pick(d.title, defaultDesigners.title!)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {pick(d.body, defaultDesigners.body!)}
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {highlights.map((item) => (
                <li key={item._key}>· {item.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">{pick(d.formEyebrow, defaultDesigners.formEyebrow!)}</span>
            <h2 className="mt-4 font-display text-2xl">
              {pick(d.formTitle, defaultDesigners.formTitle!)}
            </h2>
            <div className="mt-8">
              <ContactForm
                intent="designer"
                email={s.email}
                messagePlaceholder={d.messagePlaceholder}
                submitLabel={d.submitLabel}
              />
            </div>
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
