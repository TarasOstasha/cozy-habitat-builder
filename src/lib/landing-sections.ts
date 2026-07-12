export type LandingSection = {
  id: string;
  label: string;
};

/** Major homepage sections linked by the side / mobile navigation. */
export const landingSections: LandingSection[] = [
  { id: "specialization", label: "About" },
  { id: "work-preview", label: "Work" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "craftsmanship", label: "Craft" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];
