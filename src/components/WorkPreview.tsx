import { Link } from "@tanstack/react-router";
import { previewProjects } from "@/lib/featured-projects";

type WorkPreviewProps = {
  onViewAll?: () => void;
};

export function WorkPreview({ onViewAll }: WorkPreviewProps) {
  return (
    <section
      id="work-preview"
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Work</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">Crafted for real homes.</h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            A selection of recent kitchens, baths and built-ins from our Norwalk studio — each
            project drawn from how our clients live.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {previewProjects.map((project) => (
            <article key={project.id} className="group">
              <figure className="overflow-hidden bg-secondary/30">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </figure>
              <div className="mt-5">
                <span className="eyebrow">{project.category}</span>
                <h3 className="mt-3 font-display text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          {onViewAll ? (
            <button
              type="button"
              onClick={onViewAll}
              className="eyebrow link-underline inline-block cursor-pointer"
            >
              View Full Portfolio
            </button>
          ) : (
            <a href="#portfolio" className="eyebrow link-underline inline-block">
              View Full Portfolio
            </a>
          )}
          <span className="mx-4 text-muted-foreground/40">·</span>
          <Link to="/portfolio" className="eyebrow link-underline inline-block">
            Browse All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
