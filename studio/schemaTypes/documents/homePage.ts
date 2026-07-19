import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'
import {customBlockMembers} from '../objects/customBlocks'
import {
  imageWithAlt,
  sectionEnabledField,
  sectionIntroFields,
  sectionOrderField,
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
    {name: 'reviews', title: 'Reviews'},
    {name: 'customBlocks', title: 'Custom blocks'},
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
        sectionOrderField(10),
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
      fields: [sectionEnabledField, sectionOrderField(20), ...sectionIntroFields],
    }),

    defineField({
      name: 'workPreview',
      title: 'Our Work',
      type: 'object',
      group: 'workPreview',
      description: 'Homepage “Our Work / Crafted for real homes” section',
      fields: [
        sectionEnabledField,
        sectionOrderField(30),
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
        sectionOrderField(40),
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
        sectionOrderField(50),
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
        sectionOrderField(60),
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
        sectionOrderField(70),
        ...sectionIntroFields,
      ],
    }),

    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'object',
      group: 'reviews',
      description: 'Google reviews section (content is still hardcoded until Google is connected)',
      fields: [sectionEnabledField, sectionOrderField(80)],
    }),

    defineField({
      name: 'customBlocks',
      title: 'Custom blocks',
      type: 'array',
      group: 'customBlocks',
      description:
        'Add optional sections anywhere on the homepage — text, image+text, CTA, or HTML embeds. Drag to reorder within the same placement.',
      of: customBlockMembers,
    }),

    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [
        sectionEnabledField,
        sectionOrderField(90),
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
