import { createServerFn } from "@tanstack/react-start";
import { sanityClient } from "./client";
import { defaultSettings } from "./defaults";
import { loadDesignersPage } from "./load-designers-page";
import { loadHomePage } from "./load-home-page";
import { loadPortfolioPage } from "./load-portfolio-page";
import { SITE_SETTINGS_QUERY } from "./queries";
import type { SiteSettings } from "./types";

export { loadDesignersPage, loadHomePage, loadPortfolioPage };

export const fetchHomePage = createServerFn({ method: "GET" }).handler(loadHomePage);

export const fetchPortfolioPage = createServerFn({ method: "GET" }).handler(loadPortfolioPage);

export const fetchDesignersPage = createServerFn({ method: "GET" }).handler(loadDesignersPage);

export const fetchSiteSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings> => {
    try {
      const settings = await sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
      return settings ?? defaultSettings;
    } catch (error) {
      console.error("Failed to fetch Sanity site settings", error);
      return defaultSettings;
    }
  },
);
