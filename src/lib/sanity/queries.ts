import { defineQuery } from "groq";

const imageProjection = /* groq */ `
  asset->{
    _id,
    url
  },
  alt
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
      seoTitle,
      seoDescription
    },
    "home": *[_type == "homePage"][0]{
      seo,
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
