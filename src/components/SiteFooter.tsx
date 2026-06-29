import { Link } from "@tanstack/react-router";
import { Brandmark } from "@/components/Brandmark";
import semtaLogo from "@/assets/semta-logo.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-14">
        <div className="flex flex-col items-center gap-8">
          <img src={semtaLogo} alt="SEMTA" className="h-16 w-16 rounded-full object-cover" />
          <Brandmark href="/" />
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <a
              href="/"
              className="eyebrow link-underline"
              onClick={(event) => {
                if (window.location.pathname === "/") {
                  event.preventDefault();
                  window.history.replaceState(null, "", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Home
            </a>
            <a href="/#services" className="eyebrow link-underline">
              About
            </a>
            <Link to="/portfolio" className="eyebrow link-underline">
              Portfolio
            </Link>
            <a href="/#designers" className="eyebrow link-underline">
              For Designers
            </a>
            <a href="/#contact" className="eyebrow link-underline">
              Contact Us
            </a>
          </nav>
          <p className="eyebrow text-muted-foreground">
            © {new Date().getFullYear()} SEMTA · Custom Cabinetry &amp; Design
          </p>
        </div>
      </div>
    </footer>
  );
}
