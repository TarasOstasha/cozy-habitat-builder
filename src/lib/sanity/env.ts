/** Public Sanity config — safe for client bundles (VITE_ only). */
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string;
export const dataset = (import.meta.env.VITE_SANITY_DATASET as string) || "production";
export const apiVersion = "2026-07-17";

export const isSanityConfigured = Boolean(projectId);
