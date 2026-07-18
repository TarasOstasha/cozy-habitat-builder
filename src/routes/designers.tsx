import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchSiteSettings } from "@/lib/sanity/fetch";

export const Route = createFileRoute("/designers")({
  loader: () => fetchSiteSettings(),
  head: () => ({
    meta: [
      { title: "For Designers · SEMTA Custom Cabinetry & Design" },
      {
        name: "description",
        content:
          "SEMTA partners with interior designers, architects and builders across Connecticut. Trade consultations, shop drawings, custom millwork and installation.",
      },
    ],
  }),
  component: DesignersPage,
});

function DesignersPage() {
  const settings = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locationLabel={settings.locationLabel} />

      <main className="px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">For Designers</span>
            <h1 className="mt-6 font-display text-4xl md:text-5xl">
              A fabrication partner for your vision.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              SEMTA works closely with interior designers, architects, and builders across
              Connecticut. We translate detailed drawings into precision-built cabinetry - with
              reliable timelines, open communication, and installation by our own team.
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>· Trade consultations and shop drawings</li>
              <li>· Custom millwork for residential and commercial</li>
              <li>· Material samples and finish coordination</li>
            </ul>
          </div>
          <div>
            <span className="eyebrow">Get in Touch</span>
            <h2 className="mt-4 font-display text-2xl">Start a designer inquiry.</h2>
            <div className="mt-8">
              <ContactForm intent="designer" />
            </div>
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
