import { portfolioCategories } from "@/lib/portfolio";

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
};

const projectMeta: Record<
  string,
  { title: string; description: string }
> = {
  "kitchen-ashton": {
    title: "Ashton Kitchen",
    description:
      "Warm grey cabinetry with integrated storage, designed around daily cooking and family gatherings.",
  },
  "kitchen-anchorage": {
    title: "Anchorage Court Kitchen",
    description:
      "Clean-lined millwork and tailored finishes for a Connecticut residence built for entertaining.",
  },
  bathrooms: {
    title: "Spa-Inspired Bath",
    description:
      "Custom vanities and built-ins that bring calm, functional storage to a primary suite.",
  },
  bar: {
    title: "Residential Bar",
    description:
      "Statement bar cabinetry with refined hardware and lighting, crafted for evening entertaining.",
  },
  mudroom: {
    title: "Mudroom Built-Ins",
    description:
      "Durable storage and seating tailored to how a busy household enters and exits each day.",
  },
};

function featuredFromCategory(categoryId: string): FeaturedProject | null {
  const category = portfolioCategories.find((item) => item.id === categoryId);
  const meta = projectMeta[categoryId];
  if (!category?.images[0] || !meta) return null;

  return {
    id: category.id,
    title: meta.title,
    category: category.label,
    description: meta.description,
    image: category.images[0],
    alt: `SEMTA ${meta.title} — ${category.label}`,
    href: "/portfolio",
  };
}

/** Curated projects for homepage previews and carousel. */
export const featuredProjects: FeaturedProject[] = [
  "kitchen-ashton",
  "kitchen-anchorage",
  "bathrooms",
  "bar",
  "mudroom",
]
  .map(featuredFromCategory)
  .filter((project): project is FeaturedProject => project !== null);

/** Subset shown in the early homepage showcase. */
export const previewProjects = featuredProjects.slice(0, 3);
