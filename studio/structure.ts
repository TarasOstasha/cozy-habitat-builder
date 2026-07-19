import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['siteSettings', 'homePage', 'portfolioPage', 'designersPage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SEMTA Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Portfolio Page')
        .id('portfolioPage')
        .child(S.document().schemaType('portfolioPage').documentId('portfolioPage')),
      S.listItem()
        .title('Designers Page')
        .id('designersPage')
        .child(S.document().schemaType('designersPage').documentId('designersPage')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() ?? '')),
    ])
