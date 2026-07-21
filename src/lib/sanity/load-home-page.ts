import { sanityClient } from "./client";
import { defaultHome, defaultPartners, defaultSettings } from "./defaults";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePagePayload } from "./types";

/** Server-only homepage loader (call directly from route loaders — no RPC). */
export async function loadHomePage(): Promise<HomePagePayload> {
  try {
    const data = await sanityClient.fetch<HomePagePayload>(HOME_PAGE_QUERY);
    return {
      settings: data.settings ?? defaultSettings,
      home: data.home ?? defaultHome,
      partnersList: data.partnersList?.length > 0 ? data.partnersList : defaultPartners,
    };
  } catch (error) {
    console.error("Failed to fetch Sanity homepage content", error);
    return {
      settings: defaultSettings,
      home: defaultHome,
      partnersList: defaultPartners,
    };
  }
}
