import { createServerFn } from "@tanstack/react-start";
import { sanityClient } from "./client";
import { defaultHome, defaultPartners, defaultSettings } from "./defaults";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePagePayload, SiteSettings } from "./types";

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

export const fetchSiteSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings> => {
    try {
      const settings = await sanityClient.fetch<SiteSettings | null>(/* groq */ `
        *[_type == "siteSettings"][0]{
          brandName,
          locationLabel,
          footerLogo{
            asset->{ _id, url },
            alt
          },
          footerTagline,
          footerNavLinks[]{ _key, label, href },
          phoneDisplay,
          phoneHref,
          email,
          addressLine1,
          addressLine2,
          seoTitle,
          seoDescription
        }
      `);
      return settings ?? defaultSettings;
    } catch (error) {
      console.error("Failed to fetch Sanity site settings", error);
      return defaultSettings;
    }
  },
);
