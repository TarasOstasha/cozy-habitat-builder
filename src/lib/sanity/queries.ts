import { defineQuery } from "groq";

const imageProjection = /* groq */ `
  asset->{
    _id,
    url
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

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  {
    "settings": *[_type == "siteSettings"][0]{
      brandName,
      locationLabel,
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
      twitterHandle
    },
    "home": *[_type == "homePage"][0]{
      seo{ ${seoProjection} },
      hero{
        enabled,
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
        eyebrow,
        title,
        items[]{ _key, number, title, body }
      },
      craftsmanship{
        enabled,
        eyebrow,
        quote,
        attribution,
        image{ ${imageProjection} }
      },
      partners,
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
      brandName,
      locationLabel,
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
      twitterHandle
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
