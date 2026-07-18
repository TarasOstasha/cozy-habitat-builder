import type { PortableTextBlock } from "@portabletext/types";

const modules = import.meta.glob("../assets/**/*.{webp,jpeg,jpg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const portfolioRoot = "../assets/";

function imagesInFolder(folder: string): string[] {
  const prefix = `${portfolioRoot}${folder}/`;
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes("/"))
    .map(([, src]) => src);
}

export type PortfolioCategory = {
  id: string;
  label: string;
  descriptionMode?: "richText" | "html";
  description?: PortableTextBlock[];
  descriptionHtml?: string;
  images: string[];
};

export type GalleryImage = {
  key: string;
  src: string;
  alt: string;
};

export type GalleryCategory = {
  id: string;
  label: string;
  descriptionMode?: "richText" | "html";
  description?: PortableTextBlock[];
  descriptionHtml?: string;
  images: GalleryImage[];
};

/** Local asset folders used as offline / empty-CMS fallback. */
export const localPortfolioCategories: PortfolioCategory[] = [
  {
    id: "kitchen-ashton",
    label: "Kitchen · Ashton",
    images: imagesInFolder("kitchen/Ashton"),
  },
  {
    id: "kitchen-anchorage",
    label: "Kitchen · Anchorage Ct",
    images: imagesInFolder("kitchen/Anchorage_Ct"),
  },
  {
    id: "bathrooms",
    label: "Bathrooms",
    images: imagesInFolder("Bathrooms"),
  },
  {
    id: "bar",
    label: "Bar",
    images: imagesInFolder("Bar"),
  },
  {
    id: "mudroom",
    label: "Mudroom",
    images: imagesInFolder("Mudroom"),
  },
  {
    id: "others",
    label: "Other Projects",
    images: imagesInFolder("Others"),
  },
].filter((category) => category.images.length > 0);

/** @deprecated Prefer localPortfolioCategories */
export const portfolioCategories = localPortfolioCategories;

export const portfolioImages = localPortfolioCategories.flatMap((category) => category.images);

export function galleryFromLocal(categories: PortfolioCategory[] = localPortfolioCategories): GalleryCategory[] {
  return categories.map((category) => ({
    id: category.id,
    label: category.label,
    descriptionMode: category.descriptionMode,
    description: category.description,
    descriptionHtml: category.descriptionHtml,
    images: category.images.map((src, index) => ({
      key: `${category.id}-${index}`,
      src,
      alt: `${category.label} project ${index + 1}`,
    })),
  }));
}
