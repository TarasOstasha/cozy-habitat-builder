import { sanityClient } from "./client";
import { defaultPortfolio, defaultSettings } from "./defaults";
import { PORTFOLIO_PAGE_QUERY } from "./queries";
import type { PortfolioPagePayload } from "./types";

/** Server-only portfolio loader (call directly from route loaders — no RPC). */
export async function loadPortfolioPage(): Promise<PortfolioPagePayload> {
  try {
    const data = await sanityClient.fetch<PortfolioPagePayload>(PORTFOLIO_PAGE_QUERY);
    return {
      settings: data.settings ?? defaultSettings,
      portfolio: data.portfolio ?? defaultPortfolio,
    };
  } catch (error) {
    console.error("Failed to fetch Sanity portfolio page content", error);
    return {
      settings: defaultSettings,
      portfolio: defaultPortfolio,
    };
  }
}
