import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, CalendarDays, ArrowDown } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PartnersSection } from "@/components/PartnersSection";
import { SectionNav } from "@/components/SectionNav";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkCarousel } from "@/components/WorkCarousel";
import { WorkPreview } from "@/components/WorkPreview";
import slide1 from "@/assets/semta-slide1.jpg";
import slide2 from "@/assets/semta-slide2.jpg";
import slide4 from "@/assets/semta-slide4.jpg";
import craftsmanshipFallback from "@/assets/craftsmanship.jpg";
import { defaultHome, defaultSettings, isSectionEnabled, pick } from "@/lib/sanity/defaults";
import { fetchHomePage } from "@/lib/sanity/fetch";
import { sanityImageUrl } from "@/lib/sanity/image";
import { buildSeoHead } from "@/lib/sanity/seo-head";
import { landingSections } from "@/lib/landing-sections";

export const Route = createFileRoute("/")({
  loader: () => fetchHomePage(),
  head: ({ loaderData }) =>
    buildSeoHead({
      seo: loaderData?.home?.seo,
      settings: loaderData?.settings,
      fallbacks: {
        title: defaultHome.seo?.title || undefined,
        description: defaultHome.seo?.description || undefined,
        twitterCard: defaultHome.seo?.twitterCard || undefined,
      },
    }),
  component: Index,
});

function scrollToPortfolio() {
  const target = document.getElementById("portfolio") || document.getElementById("work-preview");
  if (!target) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

function Index() {
  const { home, settings, partnersList } = Route.useLoaderData();
  const h = home ?? defaultHome;
  const s = settings ?? defaultSettings;

  const hero = h.hero ?? defaultHome.hero!;
  const specialization = h.specialization ?? defaultHome.specialization!;
  const workPreview = h.workPreview ?? defaultHome.workPreview!;
  const portfolio = h.portfolio ?? defaultHome.portfolio!;
  const services = h.services ?? defaultHome.services!;
  const craftsmanship = h.craftsmanship ?? defaultHome.craftsmanship!;
  const partners = h.partners ?? defaultHome.partners!;
  const contact = h.contact ?? defaultHome.contact!;

  const showHero = isSectionEnabled(hero.enabled);
  const showSpecialization = isSectionEnabled(specialization.enabled);
  const showWorkPreview = isSectionEnabled(workPreview.enabled);
  const showPortfolio = isSectionEnabled(portfolio.enabled);
  const showServices = isSectionEnabled(services.enabled);
  const showCraftsmanship = isSectionEnabled(craftsmanship.enabled);
  const showPartners = isSectionEnabled(partners.enabled);
  const showContact = isSectionEnabled(contact.enabled);

  const navSections = landingSections.filter((section) => {
    switch (section.id) {
      case "specialization":
        return showSpecialization;
      case "work-preview":
        return showWorkPreview;
      case "portfolio":
        return showPortfolio;
      case "services":
        return showServices;
      case "craftsmanship":
        return showCraftsmanship;
      case "partners":
        return showPartners;
      case "contact":
        return showContact;
      default:
        return true;
    }
  });

  const heroImage = sanityImageUrl(hero.backgroundImage, 2400) || slide1;
  const selectedWorkImage = sanityImageUrl(portfolio.selectedWork?.image, 1600) || slide2;
  const studioImage = sanityImageUrl(portfolio.studio?.image, 1600) || slide4;
  const craftImage = sanityImageUrl(craftsmanship.image, 2000) || craftsmanshipFallback;

  const phoneHrefDigits = pick(s.phoneHref, defaultSettings.phoneHref!);
  const phoneHref = `tel:${phoneHrefDigits}`;
  const phoneDisplay = pick(s.phoneDisplay, defaultSettings.phoneDisplay!);
  const email = pick(s.email, defaultSettings.email!);
  const addressLine1 = pick(s.addressLine1, defaultSettings.addressLine1!);
  const addressLine2 = pick(s.addressLine2, defaultSettings.addressLine2!);
  const serviceItems =
    services.items && services.items.length > 0 ? services.items : defaultHome.services!.items!;

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
      <SiteHeader
        overHero={showHero}
        locationLabel={s.locationLabel}
        phoneDisplay={phoneDisplay}
        phoneHref={phoneHref}
      />
      <SectionNav sections={navSections} />

      {showHero ? (
        <section
          id="hero"
          className="relative h-screen min-h-[680px] w-full overflow-hidden"
          aria-label="Introduction"
        >
          <img
            src={heroImage}
            alt={hero.backgroundImage?.alt || "SEMTA custom kitchen cabinetry"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="overlay-dark absolute inset-0" />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[6vh] text-center text-white">
            <span className="eyebrow-on-dark max-w-full">
              {pick(hero.eyebrow, defaultHome.hero!.eyebrow!)}
            </span>
            <h1 className="text-on-dark mt-6 max-w-4xl font-display text-4xl leading-[1.08] sm:text-5xl sm:leading-[1.05] md:text-7xl">
              {pick(hero.headline, defaultHome.hero!.headline!)} <br className="hidden sm:block" />
              <em className="not-italic text-[color:var(--color-gold)]">
                {pick(hero.headlineAccent, defaultHome.hero!.headlineAccent!)}
              </em>
            </h1>
            <div className="mt-9 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-5">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2.5 border border-white/60 px-7 py-3.5 text-sm tracking-[0.2em] uppercase text-white shadow-sm transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {pick(hero.callLabel, defaultHome.hero!.callLabel!)}
              </a>
              <a
                href={showContact ? "#contact" : phoneHref}
                className="inline-flex items-center justify-center gap-2.5 bg-[color:var(--color-gold)] px-7 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-black transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {pick(hero.bookLabel, defaultHome.hero!.bookLabel!)}
              </a>
              {(showPortfolio || showWorkPreview) && (
                <button
                  type="button"
                  onClick={scrollToPortfolio}
                  className="inline-flex items-center justify-center gap-2.5 border border-white/25 bg-white/10 px-7 py-3.5 text-sm tracking-[0.15em] uppercase text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  {pick(hero.viewWorkLabel, defaultHome.hero!.viewWorkLabel!)}
                </button>
              )}
            </div>
            <Link
              to="/portfolio"
              className="eyebrow-on-dark link-underline mt-8 inline-block opacity-90 hover:opacity-100"
            >
              {pick(hero.portfolioLinkLabel, defaultHome.hero!.portfolioLinkLabel!)}
            </Link>
          </div>
        </section>
      ) : null}

      {showSpecialization ? (
        <section
          id="specialization"
          className="scroll-mt-24 mx-auto max-w-3xl px-6 py-28 text-center md:py-40"
        >
          <span className="eyebrow">
            {pick(specialization.eyebrow, defaultHome.specialization!.eyebrow!)}
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">
            {pick(specialization.title, defaultHome.specialization!.title!)}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {pick(specialization.body, defaultHome.specialization!.body!)}
          </p>
        </section>
      ) : null}

      {showWorkPreview ? (
        <WorkPreview
          onViewAll={showPortfolio ? scrollToPortfolio : undefined}
          eyebrow={workPreview.eyebrow}
          title={workPreview.title}
          body={workPreview.body}
          viewPortfolioLabel={workPreview.viewPortfolioLabel}
          browseAllLabel={workPreview.browseAllLabel}
          projects={workPreview.projects}
        />
      ) : null}

      {showPortfolio ? (
        <section id="portfolio" className="scroll-mt-24 border-t border-border/60">
          <div className="px-6 py-20 md:px-14 md:py-28">
            <div className="mx-auto max-w-[1300px]">
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow">
                  {pick(portfolio.eyebrow, defaultHome.portfolio!.eyebrow!)}
                </span>
                <h2 className="mt-6 font-display text-4xl md:text-5xl">
                  {pick(portfolio.title, defaultHome.portfolio!.title!)}
                </h2>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {pick(portfolio.body, defaultHome.portfolio!.body!)}
                </p>
              </div>
              <div className="mt-16">
                <WorkCarousel />
              </div>
              <div className="mt-12 text-center">
                <Link to="/portfolio" className="eyebrow link-underline inline-block">
                  {pick(portfolio.viewFullLabel, defaultHome.portfolio!.viewFullLabel!)}
                </Link>
              </div>
            </div>
          </div>

          {/* Editorial split — studio story */}
          <div className="grid grid-cols-1 border-t border-border/60 md:grid-cols-12">
            <figure className="md:col-span-7">
              <img
                src={selectedWorkImage}
                alt={
                  portfolio.selectedWork?.image?.alt ||
                  "SEMTA custom kitchen project with tailored cabinetry"
                }
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="flex items-center justify-center px-8 py-20 md:col-span-5 md:px-16 md:py-24">
              <div className="max-w-md">
                <span className="eyebrow">
                  {pick(
                    portfolio.selectedWork?.eyebrow,
                    defaultHome.portfolio!.selectedWork!.eyebrow!,
                  )}
                </span>
                <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                  {pick(portfolio.selectedWork?.title, defaultHome.portfolio!.selectedWork!.title!)}
                </h2>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                  {pick(portfolio.selectedWork?.body, defaultHome.portfolio!.selectedWork!.body!)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center px-8 py-20 md:order-1 md:col-span-5 md:px-16 md:py-24">
              <div className="max-w-md">
                <span className="eyebrow">
                  {pick(portfolio.studio?.eyebrow, defaultHome.portfolio!.studio!.eyebrow!)}
                </span>
                <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                  {pick(portfolio.studio?.title, defaultHome.portfolio!.studio!.title!)}
                </h2>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                  {pick(portfolio.studio?.body, defaultHome.portfolio!.studio!.body!)}
                </p>
                <a href="#services" className="eyebrow link-underline mt-10 inline-block">
                  {pick(portfolio.studio?.ctaLabel, defaultHome.portfolio!.studio!.ctaLabel!)}
                </a>
              </div>
            </div>
            <figure className="md:order-2 md:col-span-7">
              <img
                src={studioImage}
                alt={
                  portfolio.studio?.image?.alt ||
                  "SEMTA custom cabinetry installation in a Connecticut home"
                }
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </section>
      ) : null}

      {showServices ? (
        <section
          id="services"
          className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
        >
          <div className="mx-auto max-w-[1300px]">
            <div className="text-center">
              <span className="eyebrow">
                {pick(services.eyebrow, defaultHome.services!.eyebrow!)}
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">
                {pick(services.title, defaultHome.services!.title!)}
              </h2>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
              {serviceItems.map((item) => (
                <article key={item._key} className="border-t border-border/60 pt-8">
                  <div className="flex items-baseline gap-6">
                    <span className="eyebrow text-[color:var(--color-gold-deep)]">
                      {item.number}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showCraftsmanship ? (
        <section id="craftsmanship" className="scroll-mt-24 relative" aria-label="Craftsmanship">
          <img
            src={craftImage}
            alt={craftsmanship.image?.alt || "A SEMTA craftsman at work in the Norwalk studio"}
            loading="lazy"
            className="h-[70vh] min-h-[520px] w-full object-cover"
          />
          <div className="overlay-dark-center absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
            <div className="max-w-2xl">
              <span className="eyebrow-on-dark">
                {pick(craftsmanship.eyebrow, defaultHome.craftsmanship!.eyebrow!)}
              </span>
              <p className="text-on-dark mt-8 font-display text-3xl leading-[1.3] md:text-4xl">
                &ldquo;{pick(craftsmanship.quote, defaultHome.craftsmanship!.quote!)}&rdquo;
              </p>
              <p className="eyebrow-on-dark mt-8 opacity-90">
                {pick(craftsmanship.attribution, defaultHome.craftsmanship!.attribution!)}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {showPartners ? (
        <PartnersSection
          eyebrow={partners.eyebrow}
          title={partners.title}
          body={partners.body}
          partners={partnersList}
        />
      ) : null}

      {showContact ? (
        <section
          id="contact"
          className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
        >
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="eyebrow">
                  {pick(contact.eyebrow, defaultHome.contact!.eyebrow!)}
                </span>
                <h2 className="mt-6 font-display text-4xl md:text-5xl">
                  {pick(contact.title, defaultHome.contact!.title!)}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {pick(contact.body, defaultHome.contact!.body!)}
                </p>
                <div className="mt-10 space-y-8">
                  <div>
                    <span className="eyebrow">
                      {pick(contact.studioLabel, defaultHome.contact!.studioLabel!)}
                    </span>
                    <p className="mt-3 font-display text-2xl">{addressLine1}</p>
                    <p className="font-display text-2xl">{addressLine2}</p>
                  </div>
                  <div>
                    <span className="eyebrow">
                      {pick(contact.phoneLabel, defaultHome.contact!.phoneLabel!)}
                    </span>
                    <a href={phoneHref} className="mt-3 block font-display text-2xl link-underline">
                      {phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <span className="eyebrow">
                      {pick(contact.emailLabel, defaultHome.contact!.emailLabel!)}
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="mt-3 block font-display text-2xl link-underline"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <span className="eyebrow">
                  {pick(contact.formEyebrow, defaultHome.contact!.formEyebrow!)}
                </span>
                <h3 className="mt-4 font-display text-2xl">
                  {pick(contact.formTitle, defaultHome.contact!.formTitle!)}
                </h3>
                <div className="mt-8">
                  <ContactForm intent="contact" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter
        footerLogo={s.footerLogo}
        footerTagline={s.footerTagline}
        footerNavLinks={s.footerNavLinks}
      />
    </div>
  );
}
