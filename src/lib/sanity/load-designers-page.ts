import { sanityClient } from "./client";
import { defaultDesigners, defaultSettings } from "./defaults";
import { DESIGNERS_PAGE_QUERY } from "./queries";
import type { DesignersPagePayload } from "./types";

/** Server-only designers loader (call directly from route loaders — no RPC). */
export async function loadDesignersPage(): Promise<DesignersPagePayload> {
  try {
    const data = await sanityClient.fetch<DesignersPagePayload>(DESIGNERS_PAGE_QUERY);
    return {
      settings: data.settings ?? defaultSettings,
      designers: data.designers ?? defaultDesigners,
    };
  } catch (error) {
    console.error("Failed to fetch Sanity designers page content", error);
    return {
      settings: defaultSettings,
      designers: defaultDesigners,
    };
  }
}
