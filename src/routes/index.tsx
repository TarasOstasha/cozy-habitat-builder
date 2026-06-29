import { createFileRoute } from "@tanstack/react-router";
import { Phone, CalendarDays } from "lucide-react";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ContactForm } from "@/components/ContactForm";
import semtaLogo from "@/assets/semta-logo.jpg";
import slide1 from "@/assets/semta-slide1.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEMTA - Custom Cabinetry & Design · Norwalk, CT" },
      {
        name: "description",
        content:
          "SEMTA designs, builds and installs the highest-quality custom cabinetry for residential and commercial spaces. Locally owned and operated in Norwalk, CT.",
      },
      { property: "og:title", content: "SEMTA - Custom Cabinetry & Design" },
      {
        property: "og:description",
        content:
          "Locally owned custom cabinetry studio in Norwalk, CT. Initial Consultation · Custom Design · Build · Delivery & Installation.",
      },
    ],
  }),
  component: Index,
});

function Brandmark({
  className = "",
  invert = false,
  href,
}: {
  className?: string;
  invert?: boolean;
  href?: string;
}) {
  const gold = "text-[color:var(--color-gold-deep)]";
  const sub = invert ? "text-white/70" : "text-muted-foreground";
  const content = (
    <>
      <span className={`font-display text-2xl tracking-[0.35em] ${gold}`}>SEMTA</span>
      <span className={`mt-2 text-[0.55rem] tracking-[0.4em] uppercase ${sub}`}>
        Custom Cabinetry &amp; Design
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex flex-col items-center leading-none transition-opacity hover:opacity-90 ${className}`}
        onClick={(event) => {
          if (window.location.pathname === href) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        {content}
      </a>
    );
  }

  return <div className={`flex flex-col items-center leading-none ${className}`}>{content}</div>;
}

const services = [
  {
    n: "01",
    title: "Initial Consultation",
    body: "A no-charge consultation to discuss your project and provide a price estimate under no obligation. We invite you to take advantage of our years of experience to explore the possibilities for your space.",
  },
  {
    n: "02",
    title: "Custom Design",
    body: "Once we have the necessary information, we prepare a formal proposal with detailed costs and a timetable. When you're ready, we lock a slot in our calendar and begin creating your unique design.",
  },
  {
    n: "03",
    title: "Build",
    body: "We present 3D renderings, photos, and material samples. When you are happy with the final design, we begin construction. Every piece is crafted in our Norwalk studio.",
  },
  {
    n: "04",
    title: "Delivery & Installation",
    body: "The majority of construction takes place in our studio to minimise disruption to your home. Installation is carried out by our own trained craftsmen with the care your project deserves.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-14 md:py-9">
          <span className="eyebrow text-white/90 hidden md:inline">Norwalk · Connecticut</span>
          <Brandmark invert href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="eyebrow text-white/90 link-underline">
              Portfolio
            </a>
            <a href="#designers" className="eyebrow text-white/90 link-underline">
              For Designers
            </a>
            <a href="#contact" className="eyebrow text-white/90 link-underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <img
          src={slide1}
          alt="SEMTA custom kitchen with grey cabinetry and patterned backsplash"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center text-white">
          <span className="eyebrow text-white/80">
            Custom Cabinetry · Residential &amp; Commercial
          </span>
          <h1 className="mt-6 max-w-4xl px-6 font-display text-5xl leading-[1.05] md:text-7xl">
            Cabinetry, designed and built <br />
            <em className="not-italic text-[color:var(--color-gold)]">around the way you live.</em>
          </h1>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <a
              href="tel:+19177050712"
              className="inline-flex items-center gap-2.5 border border-white/40 px-7 py-3.5 text-sm tracking-[0.2em] uppercase text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-[color:var(--color-gold)] px-7 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-black transition-colors hover:bg-[color:var(--color-gold-hover)]"
            >
              <CalendarDays className="h-4 w-4" />
              Book Appointment
            </a>
          </div>
          <a href="#portfolio" className="mt-12 eyebrow link-underline text-white">
            View Our Work
          </a>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
        <span className="eyebrow">Our Specialization</span>
        <h2 className="mt-6 font-display text-4xl md:text-5xl">Residential Design</h2>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
          Relax and enjoy custom cabinets and storage solutions in your house. The cabinetry experts
          at SEMTA can build and install custom cabinets and storage for any room of the home - with
          unique style and design.
        </p>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="border-t border-border/60 px-6 py-28 md:px-14 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Portfolio</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">Selected work by room.</h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              Browse kitchens, baths, bars and more - each project crafted in our Norwalk studio and
              installed by our own team.
            </p>
          </div>
          <div className="mt-16">
            <PortfolioGallery />
          </div>
          <div className="mt-16 text-center">
            <a href="#contact" className="eyebrow link-underline inline-block">
              Begin a Project
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border/60 px-6 py-28 md:px-14 md:py-36">
        <div className="mx-auto max-w-[1300px]">
          <div className="text-center">
            <span className="eyebrow">Our Services</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">
              From first sketch to final install.
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            {services.map((s) => (
              <article key={s.n} className="border-t border-border/60 pt-8">
                <div className="flex items-baseline gap-6">
                  <span className="eyebrow text-[color:var(--color-gold-deep)]">{s.n}</span>
                  <h3 className="font-display text-2xl md:text-3xl">{s.title}</h3>
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="relative">
        <img
          src={craftsmanship}
          alt="A SEMTA craftsman at work"
          loading="lazy"
          className="h-[70vh] min-h-[520px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
          <div className="max-w-2xl">
            <span className="eyebrow text-white/85">Made in Norwalk</span>
            <p className="mt-8 font-display text-3xl leading-[1.3] md:text-4xl">
              "All installation is done by our own craftsmen - trained to ensure that your project
              is installed precisely."
            </p>
            <p className="mt-8 eyebrow text-white/70">- The SEMTA Team</p>
          </div>
        </div>
      </section>

      {/* For Designers */}
      <section id="designers" className="border-t border-border/60 px-6 py-28 md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">For Designers</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">
              A fabrication partner for your vision.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
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
            <h3 className="mt-4 font-display text-2xl">Start a designer inquiry.</h3>
            <div className="mt-8">
              <ContactForm intent="designer" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60 px-6 py-28 md:px-14 md:py-36">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">Book an appointment.</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                We are available to answer any questions you may have. Visit our studio by
                appointment or send us a message to begin your project.
              </p>
              <div className="mt-10 space-y-8">
                <div>
                  <span className="eyebrow">Studio</span>
                  <p className="mt-3 font-display text-2xl">257 Ely Ave</p>
                  <p className="font-display text-2xl">Norwalk, CT 06854</p>
                </div>
                <div>
                  <span className="eyebrow">Telephone</span>
                  <a
                    href="tel:+19177050712"
                    className="mt-3 block font-display text-2xl link-underline"
                  >
                    +1 (917) 705 0712
                  </a>
                </div>
                <div>
                  <span className="eyebrow">Email</span>
                  <a
                    href="mailto:semtaccd@gmail.com"
                    className="mt-3 block font-display text-2xl link-underline"
                  >
                    semtaccd@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div>
              <span className="eyebrow">Send a Message</span>
              <h3 className="mt-4 font-display text-2xl">Tell us about your project.</h3>
              <div className="mt-8">
                <ContactForm intent="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-14">
          <div className="flex flex-col items-center gap-8">
            <img src={semtaLogo} alt="SEMTA" className="h-16 w-16 rounded-full object-cover" />
            <Brandmark />
            <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              <a href="#" className="eyebrow link-underline">
                Home
              </a>
              <a href="#services" className="eyebrow link-underline">
                About
              </a>
              <a href="#portfolio" className="eyebrow link-underline">
                Portfolio
              </a>
              <a href="#designers" className="eyebrow link-underline">
                For Designers
              </a>
              <a href="#contact" className="eyebrow link-underline">
                Contact Us
              </a>
            </nav>
            <p className="eyebrow text-muted-foreground">
              © {new Date().getFullYear()} SEMTA · Custom Cabinetry &amp; Design
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
