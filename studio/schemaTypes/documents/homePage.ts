import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'
import {
  imageWithAlt,
  sectionEnabledField,
  sectionIntroFields,
  serviceItem,
  workPreviewProject,
} from '../objects/sectionFields'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero', default: true},
    {name: 'specialization', title: 'Specialization'},
    {name: 'workPreview', title: 'Our Work'},
    {name: 'portfolio', title: 'Portfolio'},
    {name: 'services', title: 'Services'},
    {name: 'craftsmanship', title: 'Craftsmanship'},
    {name: 'partners', title: 'Partners'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'Page SEO',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        sectionEnabledField,
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'headlineAccent',
          title: 'Headline accent',
          type: 'string',
          description: 'Emphasized second line shown in gold',
        }),
        {...imageWithAlt, name: 'backgroundImage', title: 'Background image'},
        defineField({
          name: 'callLabel',
          title: 'Call button label',
          type: 'string',
        }),
        defineField({
          name: 'bookLabel',
          title: 'Book button label',
          type: 'string',
        }),
        defineField({
          name: 'viewWorkLabel',
          title: 'View work button label',
          type: 'string',
        }),
        defineField({
          name: 'portfolioLinkLabel',
          title: 'Portfolio link label',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'specialization',
      title: 'Specialization',
      type: 'object',
      group: 'specialization',
      fields: [sectionEnabledField, ...sectionIntroFields],
    }),

    defineField({
      name: 'workPreview',
      title: 'Our Work',
      type: 'object',
      group: 'workPreview',
      description: 'Homepage “Our Work / Crafted for real homes” section',
      fields: [
        sectionEnabledField,
        ...sectionIntroFields,
        defineField({
          name: 'projects',
          title: 'Featured projects',
          type: 'array',
          of: [workPreviewProject],
          validation: (rule) => rule.min(1).max(6),
        }),
        defineField({
          name: 'viewPortfolioLabel',
          title: 'View portfolio label',
          type: 'string',
        }),
        defineField({
          name: 'browseAllLabel',
          title: 'Browse all label',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'portfolio',
      title: 'Portfolio',
      type: 'object',
      group: 'portfolio',
      fields: [
        sectionEnabledField,
        ...sectionIntroFields,
        defineField({
          name: 'viewFullLabel',
          title: 'View full portfolio label',
          type: 'string',
        }),
        defineField({
          name: 'selectedWork',
          title: 'Selected work block',
          type: 'object',
          fields: [...sectionIntroFields, {...imageWithAlt, name: 'image', title: 'Image'}],
        }),
        defineField({
          name: 'studio',
          title: 'Studio story block',
          type: 'object',
          fields: [
            ...sectionIntroFields,
            defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
            {...imageWithAlt, name: 'image', title: 'Image'},
          ],
        }),
      ],
    }),

    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      group: 'services',
      fields: [
        sectionEnabledField,
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Service items',
          type: 'array',
          of: [serviceItem],
          validation: (rule) => rule.min(1),
        }),
      ],
    }),

    defineField({
      name: 'craftsmanship',
      title: 'Craftsmanship',
      type: 'object',
      group: 'craftsmanship',
      fields: [
        sectionEnabledField,
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'attribution', title: 'Attribution', type: 'string'}),
        {...imageWithAlt, name: 'image', title: 'Background image'},
      ],
    }),

    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'object',
      group: 'partners',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show entire Partners section',
          type: 'boolean',
          initialValue: true,
          description: 'Uncheck to hide the whole Partners block on the homepage',
        }),
        ...sectionIntroFields,
      ],
    }),

    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [
        sectionEnabledField,
        ...sectionIntroFields,
        defineField({
          name: 'studioLabel',
          title: 'Studio label',
          type: 'string',
        }),
        defineField({
          name: 'phoneLabel',
          title: 'Phone label',
          type: 'string',
        }),
        defineField({
          name: 'emailLabel',
          title: 'Email label',
          type: 'string',
        }),
        defineField({name: 'formEyebrow', title: 'Form eyebrow', type: 'string'}),
        defineField({name: 'formTitle', title: 'Form title', type: 'string'}),
        defineField({
          name: 'messagePlaceholder',
          title: 'Message placeholder',
          type: 'string',
        }),
        defineField({
          name: 'submitLabel',
          title: 'Submit button label',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
