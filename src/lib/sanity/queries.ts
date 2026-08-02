import { defineQuery } from "groq";

const imageProjection = /* groq */ `
  asset->{
    _id,
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  },
  alt
`;

const seoProjection = /* groq */ `
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  image{ ${imageProjection} },
  twitterCard,
  noIndex,
  noFollow
`;

const settingsProjection = /* groq */ `
  brandName,
  brandTagline,
  locationLabel,
  headerNavLinks[]{ _key, label, href },
  footerLogo{ ${imageProjection} },
  footerTagline,
  footerNavLinks[]{ _key, label, href },
  phoneDisplay,
  phoneHref,
  email,
  addressLine1,
  addressLine2,
  siteUrl,
  seoTitle,
  seoDescription,
  seoImage{ ${imageProjection} },
  ogSiteName,
  twitterHandle,
  googleAnalyticsSnippet
`;

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  {
    "settings": *[_type == "siteSettings"][0]{
      ${settingsProjection}
    },
    "home": *[_type == "homePage"][0]{
      seo{ ${seoProjection} },
      hero{
        enabled,
        order,
        eyebrow,
        headline,
        headlineAccent,
        backgroundImage{ ${imageProjection} },
        callLabel,
        bookLabel,
        viewWorkLabel,
        portfolioLinkLabel
      },
      specialization,
      workPreview{
        enabled,
        order,
        eyebrow,
        title,
        body,
        viewPortfolioLabel,
        browseAllLabel,
        projects[]{
          _key,
          category,
          title,
          description,
          image{ ${imageProjection} }
        }
      },
      portfolio{
        enabled,
        order,
        eyebrow,
        title,
        body,
        viewFullLabel,
        selectedWork{
          eyebrow,
          title,
          body,
          image{ ${imageProjection} }
        },
        studio{
          eyebrow,
          title,
          body,
          ctaLabel,
          image{ ${imageProjection} }
        }
      },
      services{
        enabled,
        order,
        eyebrow,
        title,
        items[]{ _key, number, title, body }
      },
      craftsmanship{
        enabled,
        order,
        eyebrow,
        quote,
        attribution,
        image{ ${imageProjection} }
      },
      partners,
      reviews{
        enabled,
        order
      },
      customBlocks[]{
        _key,
        _type,
        enabled,
        placement,
        sectionId,
        navLabel,
        eyebrow,
        title,
        heading,
        body,
        html,
        image{ ${imageProjection} },
        imagePosition,
        ctaLabel,
        ctaHref,
        buttonLabel,
        buttonHref
      },
      contact
    },
    "partnersList": *[_type == "partner" && enabled != false] | order(order asc, name asc){
      _id,
      name,
      url,
      logo{ ${imageProjection} }
    }
  }
`);

export const PORTFOLIO_PAGE_QUERY = defineQuery(/* groq */ `
  {
    "settings": *[_type == "siteSettings"][0]{
      ${settingsProjection}
    },
    "portfolio": *[_type == "portfolioPage"][0]{
      seo{ ${seoProjection} },
      eyebrow,
      title,
      body,
      ctaLabel,
      ctaHref,
      categories[]{
        _key,
        title,
        slug,
        descriptionMode,
        description,
        descriptionHtml,
        images[]{ ${imageProjection} }
      }
    }
  }
`);

export const DESIGNERS_PAGE_QUERY = defineQuery(/* groq */ `
  {
    "settings": *[_type == "siteSettings"][0]{
      ${settingsProjection}
    },
    "designers": *[_type == "designersPage"][0]{
      seo{ ${seoProjection} },
      eyebrow,
      title,
      body,
      highlights[]{ _key, text },
      formEyebrow,
      formTitle,
      messagePlaceholder,
      submitLabel
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    ${settingsProjection}
  }
`);
