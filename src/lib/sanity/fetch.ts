import { createServerFn } from "@tanstack/react-start";
import { sanityClient } from "./client";
import {
  defaultDesigners,
  defaultHome,
  defaultPartners,
  defaultPortfolio,
  defaultSettings,
} from "./defaults";
import {
  DESIGNERS_PAGE_QUERY,
  HOME_PAGE_QUERY,
  PORTFOLIO_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type {
  DesignersPagePayload,
  HomePagePayload,
  PortfolioPagePayload,
  SiteSettings,
} from "./types";

export const fetchHomePage = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomePagePayload> => {
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
  },
);

export const fetchPortfolioPage = createServerFn({ method: "GET" }).handler(
  async (): Promise<PortfolioPagePayload> => {
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
  },
);

export const fetchDesignersPage = createServerFn({ method: "GET" }).handler(
  async (): Promise<DesignersPagePayload> => {
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
  },
);

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
