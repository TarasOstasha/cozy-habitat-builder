import { createFileRoute } from "@tanstack/react-router";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import kitchenWalnut from "@/assets/kitchen-walnut.jpg";
import dressingRoom from "@/assets/dressing-room.jpg";
import bathroom from "@/assets/bathroom.jpg";
import kitchenSage from "@/assets/kitchen-sage.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashford & Vale — Bespoke Cabinetry & Luxury Interiors" },
      {
        name: "description",
        content:
          "Ashford & Vale design and craft heirloom kitchens, bathrooms and dressing rooms for the world's most considered homes.",
      },
      { property: "og:title", content: "Ashford & Vale — Bespoke Cabinetry" },
      {
        property: "og:description",
        content: "Heirloom kitchens, bathrooms and dressing rooms, made to last generations.",
      },
    ],
  }),
  component: Index,
});

function Brandmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center leading-none ${className}`}>
      <span className="eyebrow text-[color:var(--color-gold-deep)]">Ashford</span>
      <span className="font-display text-[1.05em] tracking-[0.08em] text-[color:var(--color-gold-deep)] mt-1">
        &amp;
      </span>
      <span className="eyebrow text-[color:var(--color-gold-deep)] mt-1">Vale</span>
    </div>
  );
}

function Index() {
  const nav = [
    "The Kitchen",
    "Bathrooms",
    "Dressing Rooms",
    "The Complete Home",
    "Visit Us",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-14 md:py-9">
          <span className="eyebrow text-white/90 hidden md:inline">Est. 1986 · London</span>
          <Brandmark className="md:absolute md:left-1/2 md:-translate-x-1/2" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="eyebrow text-white/90 link-underline">Portfolio</a>
            <a href="#contact" className="eyebrow text-white/90 link-underline">Connect</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <img
          src={heroKitchen}
          alt="Bespoke white kitchen with marble island and brass hardware"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center text-white">
          <span className="eyebrow text-white/80">Bespoke Cabinetry · Heirloom Interiors</span>
          <h1 className="mt-6 max-w-4xl px-6 font-display text-5xl leading-[1.05] md:text-7xl">
            Rooms made once,<br />
            <em className="not-italic text-[color:var(--color-gold)]">to last a lifetime.</em>
          </h1>
          <a
            href="#portfolio"
            className="mt-12 eyebrow link-underline text-white"
          >
            View Our Work
          </a>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center md:py-44">
        <span className="eyebrow">An Ashford &amp; Vale Home</span>
        <p className="mt-8 font-display text-3xl leading-[1.35] md:text-4xl">
          For four decades we have designed and built cabinetry of singular quality —
          composed in our London studio, joined by hand in our Cotswolds workshop,
          and installed in private residences across three continents.
        </p>
      </section>

      {/* Portfolio — Editorial split */}
      <section id="portfolio" className="border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <figure className="md:col-span-7">
            <img
              src={kitchenSage}
              alt="Sage green bespoke kitchen with central island"
              width={1600}
              height={1100}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="md:col-span-5 flex items-center justify-center px-8 py-20 md:px-16 md:py-24">
            <div className="max-w-md">
              <span className="eyebrow">Project No. 247</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                The Cotswolds Manor Kitchen
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                A working family kitchen for a Grade II listed manor. Hand-painted in our
                signature Vale Sage, with a single thirteen-foot island carved from a
                solid block of veined quartzite.
              </p>
              <a href="#" className="eyebrow link-underline mt-10 inline-block">
                Read the Project
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex items-center justify-center px-8 py-20 md:px-16 md:py-24 md:order-1">
            <div className="max-w-md">
              <span className="eyebrow">Project No. 231</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                A Walnut Library Kitchen, Mayfair
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Rich American walnut framed in polished brass, designed as a continuation
                of the adjoining library. Concealed appliances behind raised-panel doors
                preserve the quiet of the room.
              </p>
              <a href="#" className="eyebrow link-underline mt-10 inline-block">
                Read the Project
              </a>
            </div>
          </div>
          <figure className="md:col-span-7 md:order-2">
            <img
              src={kitchenWalnut}
              alt="Walnut cabinetry with brass detail"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Three pillars */}
      <section className="border-t border-border/60 px-6 py-28 md:px-14 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="eyebrow">The Complete Home</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">
              Every room, composed as one.
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {[
              { img: heroKitchen, title: "The Kitchen", body: "The heart of the home — designed around the way you live, cook and gather." },
              { img: bathroom, title: "Bathrooms", body: "Private sanctuaries in marble, brass and quiet, considered light." },
              { img: dressingRoom, title: "Dressing Rooms", body: "Wardrobes, vanities and dressing suites tailored to a single wearer." },
            ].map((p) => (
              <article key={p.title} className="group">
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-8 font-display text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <a href="#" className="eyebrow link-underline mt-6 inline-block">Explore</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="relative">
        <img
          src={craftsmanship}
          alt="A craftsman fitting a hinge to a hand-built cabinet"
          width={1600}
          height={1100}
          loading="lazy"
          className="h-[70vh] min-h-[520px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
          <div className="max-w-2xl">
            <span className="eyebrow text-white/85">Making the Difference</span>
            <p className="mt-8 font-display text-3xl leading-[1.3] md:text-4xl">
              "We do not finish a piece until the maker would be proud
              to sign their name across the back of it."
            </p>
            <p className="mt-8 eyebrow text-white/70">— James Ashford, Founder</p>
          </div>
        </div>
      </section>

      {/* Showrooms */}
      <section className="px-6 py-28 md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 md:grid-cols-3">
          <div className="md:col-span-1">
            <span className="eyebrow">Visit Us</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">By appointment.</h2>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              { city: "London", lines: ["18 Pimlico Road", "SW1W 8PH", "+44 20 7730 0000"] },
              { city: "New York", lines: ["432 Madison Avenue", "NY 10022", "+1 212 555 0142"] },
              { city: "Los Angeles", lines: ["8480 Melrose Place", "CA 90069", "+1 310 555 0190"] },
            ].map((s) => (
              <div key={s.city}>
                <h3 className="font-display text-2xl">{s.city}</h3>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {s.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <a href="#" className="eyebrow link-underline mt-5 inline-block">Book a Visit</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-14">
          <div className="flex flex-col items-center gap-10">
            <Brandmark />
            <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {nav.map((n) => (
                <a key={n} href="#" className="eyebrow link-underline">{n}</a>
              ))}
            </nav>
            <p className="eyebrow text-muted-foreground">
              © {new Date().getFullYear()} Ashford &amp; Vale · Bespoke Cabinetry
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
