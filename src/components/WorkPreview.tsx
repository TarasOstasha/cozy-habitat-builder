import { Link } from "@tanstack/react-router";
import { previewProjects } from "@/lib/featured-projects";
import { defaultHome, pick } from "@/lib/sanity/defaults";
import { sanityImageUrl } from "@/lib/sanity/image";
import type { WorkPreviewProject } from "@/lib/sanity/types";

type WorkPreviewProps = {
  onViewAll?: () => void;
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  viewPortfolioLabel?: string | null;
  browseAllLabel?: string | null;
  projects?: WorkPreviewProject[] | null;
};

export function WorkPreview({
  onViewAll,
  eyebrow,
  title,
  body,
  viewPortfolioLabel,
  browseAllLabel,
  projects,
}: WorkPreviewProps) {
  const defaults = defaultHome.workPreview!;
  const cmsProjects =
    projects
      ?.map((project) => {
        const imageUrl = sanityImageUrl(project.image, 900);
        if (!project.title || !imageUrl) return null;
        return {
          key: project._key,
          category: project.category || "",
          title: project.title,
          description: project.description || "",
          image: imageUrl,
          alt: project.image?.alt || project.title,
        };
      })
      .filter((project): project is NonNullable<typeof project> => project !== null) ?? [];

  const displayProjects =
    cmsProjects.length > 0
      ? cmsProjects
      : previewProjects.map((project) => ({
          key: project.id,
          category: project.category,
          title: project.title,
          description: project.description,
          image: project.image,
          alt: project.alt,
        }));

  return (
    <section
      id="work-preview"
      className="scroll-mt-24 border-t border-border/60 px-6 py-28 md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{pick(eyebrow, defaults.eyebrow!)}</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">{pick(title, defaults.title!)}</h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            {pick(body, defaults.body!)}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {displayProjects.map((project) => (
            <article key={project.key} className="group">
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
              {pick(viewPortfolioLabel, defaults.viewPortfolioLabel!)}
            </button>
          ) : (
            <a href="#portfolio" className="eyebrow link-underline inline-block">
              {pick(viewPortfolioLabel, defaults.viewPortfolioLabel!)}
            </a>
          )}
          <span className="mx-4 text-muted-foreground/40">·</span>
          <Link to="/portfolio" className="eyebrow link-underline inline-block">
            {pick(browseAllLabel, defaults.browseAllLabel!)}
          </Link>
        </div>
      </div>
    </section>
  );
}
