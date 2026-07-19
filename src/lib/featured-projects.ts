import ashtonCover from "@/assets/kitchen/Ashton/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnNlbXRhY2NkLnNob3AlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjElMkYwNyUyRklNR18xMTA3LW1pbi03MzZ4MTAyNC5qcGcmY2Fja.webp";
import anchorageCover from "@/assets/kitchen/Anchorage_Ct/1.webp";
import bathroomsCover from "@/assets/Bathrooms/ljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnNlbXRhY2NkLnNob3AlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjElMkYwNyUyRjEzQjM2RDAwLUVBMDMtNDE5Ni05MUM3LTk1NDJCREZDNEIyMi03.webp";
import barCover from "@/assets/Bar/ljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnNlbXRhY2NkLnNob3AlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjElMkYwNyUyRjM3RTM1RTBBLUYzQkItNDdFRC1CNjhBLTVDNDY3N0VENkY1Mi0xMDI0eD.webp";
import mudroomCover from "@/assets/Mudroom/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnNlbXRhY2NkLnNob3AlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMTklMkYwOSUyRklNR18xNDczLTc2OHgxMDI0LmpwZyZjYWNoZU1hcmtlcj0x.webp";

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
};

/** Curated projects for homepage previews and carousel (cover images only). */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "kitchen-ashton",
    title: "Ashton Kitchen",
    category: "Kitchen · Ashton",
    description:
      "Warm grey cabinetry with integrated storage, designed around daily cooking and family gatherings.",
    image: ashtonCover,
    alt: "SEMTA Ashton Kitchen — Kitchen · Ashton",
    href: "/portfolio",
  },
  {
    id: "kitchen-anchorage",
    title: "Anchorage Court Kitchen",
    category: "Kitchen · Anchorage Ct",
    description:
      "Clean-lined millwork and tailored finishes for a Connecticut residence built for entertaining.",
    image: anchorageCover,
    alt: "SEMTA Anchorage Court Kitchen — Kitchen · Anchorage Ct",
    href: "/portfolio",
  },
  {
    id: "bathrooms",
    title: "Spa-Inspired Bath",
    category: "Bathrooms",
    description:
      "Custom vanities and built-ins that bring calm, functional storage to a primary suite.",
    image: bathroomsCover,
    alt: "SEMTA Spa-Inspired Bath — Bathrooms",
    href: "/portfolio",
  },
  {
    id: "bar",
    title: "Residential Bar",
    category: "Bar",
    description:
      "Statement bar cabinetry with refined hardware and lighting, crafted for evening entertaining.",
    image: barCover,
    alt: "SEMTA Residential Bar — Bar",
    href: "/portfolio",
  },
  {
    id: "mudroom",
    title: "Mudroom Built-Ins",
    category: "Mudroom",
    description:
      "Durable storage and seating tailored to how a busy household enters and exits each day.",
    image: mudroomCover,
    alt: "SEMTA Mudroom Built-Ins — Mudroom",
    href: "/portfolio",
  },
];

/** Subset shown in the early homepage showcase. */
export const previewProjects = featuredProjects.slice(0, 3);
