import {designersPage} from './documents/designersPage'
import {homePage} from './documents/homePage'
import {partner} from './documents/partner'
import {portfolioPage} from './documents/portfolioPage'
import {siteSettings} from './documents/siteSettings'
import {
  customCtaBlock,
  customHtmlBlock,
  customImageTextBlock,
  customTextBlock,
} from './objects/customBlocks'
import {portableText} from './objects/portableText'
import {seo} from './objects/seo'

export const schemaTypes = [
  seo,
  portableText,
  customTextBlock,
  customImageTextBlock,
  customCtaBlock,
  customHtmlBlock,
  siteSettings,
  homePage,
  portfolioPage,
  designersPage,
  partner,
]
