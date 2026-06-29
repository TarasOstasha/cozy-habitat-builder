import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, CalendarDays } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import slide1 from "@/assets/semta-slide1.jpg";
import slide2 from "@/assets/semta-slide2.jpg";
import slide4 from "@/assets/semta-slide4.jpg";
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
      <SiteHeader overHero />

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
          <Link to="/portfolio" className="mt-12 eyebrow link-underline text-white">
            View Our Work
          </Link>
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

      {/* Portfolio - Editorial split */}
      <section id="portfolio" className="border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <figure className="md:col-span-7">
            <img
              src={slide2}
              alt="SEMTA custom kitchen project"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="md:col-span-5 flex items-center justify-center px-8 py-20 md:px-16 md:py-24">
            <div className="max-w-md">
              <span className="eyebrow">Selected Work</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                Kitchens tailored to the family that lives in them.
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Every SEMTA kitchen is drawn from a single conversation about how you cook, gather
                and live. We build the cabinetry, hardware and finishes around that - never the
                other way around.
              </p>
              <Link to="/portfolio" className="eyebrow link-underline mt-10 inline-block">
                View Full Portfolio
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 flex items-center justify-center px-8 py-20 md:px-16 md:py-24 md:order-1">
            <div className="max-w-md">
              <span className="eyebrow">Norwalk Studio</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                Designed, built and installed by one team.
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Locally owned and operated, SEMTA provides the highest-quality custom cabinetry for
                residential and commercial locations. Any drawing or design can be modified to your
                specific needs for new construction or remodel.
              </p>
              <a href="#services" className="eyebrow link-underline mt-10 inline-block">
                Our Process
              </a>
            </div>
          </div>
          <figure className="md:col-span-7 md:order-2">
            <img
              src={slide4}
              alt="SEMTA custom cabinetry project"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
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

      <SiteFooter />
    </div>
  );
}
