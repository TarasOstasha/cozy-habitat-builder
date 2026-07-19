export type SanityImage = {
  asset?: { _ref?: string; _id?: string; url?: string } | null;
  alt?: string | null;
};

/** JSON-safe value for TanStack Start server-fn payloads. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type FooterNavLink = {
  _key: string;
  label?: string | null;
  href?: string | null;
};

export type HeaderNavLink = FooterNavLink;

export type PageSeo = {
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  image?: SanityImage | null;
  twitterCard?: "summary" | "summary_large_image" | string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
};

export type SiteSettings = {
  brandName?: string | null;
  brandTagline?: string | null;
  locationLabel?: string | null;
  headerNavLinks?: HeaderNavLink[] | null;
  footerLogo?: SanityImage | null;
  footerTagline?: string | null;
  footerNavLinks?: FooterNavLink[] | null;
  phoneDisplay?: string | null;
  phoneHref?: string | null;
  email?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  siteUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoImage?: SanityImage | null;
  ogSiteName?: string | null;
  twitterHandle?: string | null;
  googleAnalyticsSnippet?: string | null;
};

export type SectionIntro = {
  enabled?: boolean | null;
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

export type ServiceItem = {
  _key: string;
  number?: string | null;
  title?: string | null;
  body?: string | null;
};

export type WorkPreviewProject = {
  _key: string;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  image?: SanityImage | null;
};

export type HomePage = {
  seo?: PageSeo | null;
  hero?: {
    enabled?: boolean | null;
    eyebrow?: string | null;
    headline?: string | null;
    headlineAccent?: string | null;
    backgroundImage?: SanityImage | null;
    callLabel?: string | null;
    bookLabel?: string | null;
    viewWorkLabel?: string | null;
    portfolioLinkLabel?: string | null;
  } | null;
  specialization?: SectionIntro | null;
  workPreview?:
    | (SectionIntro & {
        viewPortfolioLabel?: string | null;
        browseAllLabel?: string | null;
        projects?: WorkPreviewProject[] | null;
      })
    | null;
  portfolio?:
    | (SectionIntro & {
        viewFullLabel?: string | null;
        selectedWork?: (SectionIntro & { image?: SanityImage | null }) | null;
        studio?:
          | (SectionIntro & {
              ctaLabel?: string | null;
              image?: SanityImage | null;
            })
          | null;
      })
    | null;
  services?: {
    enabled?: boolean | null;
    eyebrow?: string | null;
    title?: string | null;
    items?: ServiceItem[] | null;
  } | null;
  craftsmanship?: {
    enabled?: boolean | null;
    eyebrow?: string | null;
    quote?: string | null;
    attribution?: string | null;
    image?: SanityImage | null;
  } | null;
  partners?: SectionIntro | null;
  contact?:
    | (SectionIntro & {
        studioLabel?: string | null;
        phoneLabel?: string | null;
        emailLabel?: string | null;
        formEyebrow?: string | null;
        formTitle?: string | null;
        messagePlaceholder?: string | null;
        submitLabel?: string | null;
      })
    | null;
};

export type PartnerDoc = {
  _id: string;
  name?: string | null;
  url?: string | null;
  enabled?: boolean | null;
  logo?: SanityImage | null;
};

export type PortfolioCategoryDoc = {
  _key: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  descriptionMode?: "richText" | "html" | string | null;
  /** Portable Text blocks from Sanity (structured JSON). */
  description?: JsonValue[] | null;
  descriptionHtml?: string | null;
  images?: SanityImage[] | null;
};

export type PortfolioPage = {
  seo?: PageSeo | null;
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  categories?: PortfolioCategoryDoc[] | null;
};

export type PortfolioPagePayload = {
  settings: SiteSettings | null;
  portfolio: PortfolioPage | null;
};

export type DesignersHighlight = {
  _key: string;
  text?: string | null;
};

export type DesignersPage = {
  seo?: PageSeo | null;
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  highlights?: DesignersHighlight[] | null;
  formEyebrow?: string | null;
  formTitle?: string | null;
  messagePlaceholder?: string | null;
  submitLabel?: string | null;
};

export type DesignersPagePayload = {
  settings: SiteSettings | null;
  designers: DesignersPage | null;
};

export type HomePagePayload = {
  settings: SiteSettings | null;
  home: HomePage | null;
  partnersList: PartnerDoc[];
};
