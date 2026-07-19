import type { CustomBlockPlacement } from "./types";

/** Default homepage section order (gaps of 10 leave room to insert). */
export const DEFAULT_SECTION_ORDER = {
  hero: 10,
  specialization: 20,
  workPreview: 30,
  portfolio: 40,
  services: 50,
  craftsmanship: 60,
  partners: 70,
  reviews: 80,
  contact: 90,
} as const;

export type HomeSectionKey = keyof typeof DEFAULT_SECTION_ORDER;

export const AFTER_SECTION_PLACEMENT: Partial<Record<HomeSectionKey, CustomBlockPlacement>> = {
  hero: "afterHero",
  specialization: "afterSpecialization",
  workPreview: "afterWorkPreview",
  portfolio: "afterPortfolio",
  services: "afterServices",
  craftsmanship: "afterCraftsmanship",
  partners: "afterPartners",
  reviews: "afterReviews",
};

export function resolveSectionOrder(
  value: number | null | undefined,
  key: HomeSectionKey,
): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : DEFAULT_SECTION_ORDER[key];
}

export function sortBySectionOrder<T extends { order: number; key: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));
}
