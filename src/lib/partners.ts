export type Partner = {
  id: string;
  name: string;
  /** Replace with logo import path when assets are available. */
  logo?: string;
};

/**
 * Placeholder partner data — swap `name` values and add `logo` imports
 * when real client / partner assets are ready.
 */
export const partners: Partner[] = [
  { id: "partner-1", name: "Coastal Interiors" },
  { id: "partner-2", name: "Fairfield Builders" },
  { id: "partner-3", name: "Greenwich Design Co." },
  { id: "partner-4", name: "Harbor Architects" },
  { id: "partner-5", name: "New Canaan Homes" },
  { id: "partner-6", name: "Sound View Studio" },
];
