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
  images: string[];
};

export const portfolioCategories: PortfolioCategory[] = [
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

export const portfolioImages = portfolioCategories.flatMap((category) => category.images);
