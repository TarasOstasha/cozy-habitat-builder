import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {DocumentIcon} from '@sanity/icons/Document'
import {ImageIcon} from '@sanity/icons/Image'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageWithAlt, sectionEnabledField} from './sectionFields'

const placementField = defineField({
  name: 'placement',
  title: 'Place on page',
  type: 'string',
  description: 'Where this block appears among the fixed homepage sections',
  options: {
    list: [
      {title: 'After hero', value: 'afterHero'},
      {title: 'After about / specialization', value: 'afterSpecialization'},
      {title: 'After our work', value: 'afterWorkPreview'},
      {title: 'After portfolio', value: 'afterPortfolio'},
      {title: 'After services', value: 'afterServices'},
      {title: 'After craftsmanship', value: 'afterCraftsmanship'},
      {title: 'After partners', value: 'afterPartners'},
      {title: 'After reviews', value: 'afterReviews'},
      {title: 'Before contact (default)', value: 'beforeContact'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'beforeContact',
})

const navFields = [
  defineField({
    name: 'sectionId',
    title: 'Section ID',
    type: 'slug',
    description: 'Optional anchor id (e.g. “warranty”). Used for page navigation links.',
    options: {source: 'title', maxLength: 48},
  }),
  defineField({
    name: 'navLabel',
    title: 'Nav label',
    type: 'string',
    description: 'If set, this block appears in the homepage side / mobile nav',
  }),
]

/** Centered text section editors can add anywhere on the homepage. */
export const customTextBlock = defineType({
  name: 'customTextBlock',
  title: 'Text section',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    sectionEnabledField,
    placementField,
    ...navFields,
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
  ],
  preview: {
    select: {title: 'title', enabled: 'enabled', placement: 'placement'},
    prepare({title, enabled, placement}) {
      return {
        title: title || 'Text section',
        subtitle: `${enabled === false ? 'Hidden · ' : ''}${placement || 'beforeContact'}`,
      }
    },
  },
})

/** Image + copy in an editorial split layout. */
export const customImageTextBlock = defineType({
  name: 'customImageTextBlock',
  title: 'Image + text',
  type: 'object',
  icon: ImageIcon,
  fields: [
    sectionEnabledField,
    placementField,
    ...navFields,
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    {...imageWithAlt, validation: (rule) => rule.required()},
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          {title: 'Image left', value: 'left'},
          {title: 'Image right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
      description: 'e.g. /portfolio, /#contact, or https://…',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image', enabled: 'enabled', placement: 'placement'},
    prepare({title, media, enabled, placement}) {
      return {
        title: title || 'Image + text',
        subtitle: `${enabled === false ? 'Hidden · ' : ''}${placement || 'beforeContact'}`,
        media,
      }
    },
  },
})

/** Simple call-to-action band. */
export const customCtaBlock = defineType({
  name: 'customCtaBlock',
  title: 'Call to action',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    sectionEnabledField,
    placementField,
    ...navFields,
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonHref',
      title: 'Button link',
      type: 'string',
      description: 'e.g. /#contact, tel:+19177050712, or https://…',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', enabled: 'enabled', placement: 'placement'},
    prepare({title, enabled, placement}) {
      return {
        title: title || 'Call to action',
        subtitle: `${enabled === false ? 'Hidden · ' : ''}${placement || 'beforeContact'}`,
      }
    },
  },
})

/** Raw HTML for embeds / widgets editors may need later (use carefully). */
export const customHtmlBlock = defineType({
  name: 'customHtmlBlock',
  title: 'HTML / embed',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    sectionEnabledField,
    placementField,
    ...navFields,
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Studio-only label; not shown on the site unless you add a heading below',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading (optional)', type: 'string'}),
    defineField({
      name: 'html',
      title: 'HTML',
      type: 'text',
      rows: 10,
      description: 'Paste embed/widget HTML. Only use trusted snippets.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', enabled: 'enabled', placement: 'placement'},
    prepare({title, enabled, placement}) {
      return {
        title: title || 'HTML / embed',
        subtitle: `${enabled === false ? 'Hidden · ' : ''}${placement || 'beforeContact'}`,
      }
    },
  },
})

export const customBlockMembers = [
  defineArrayMember({type: 'customTextBlock'}),
  defineArrayMember({type: 'customImageTextBlock'}),
  defineArrayMember({type: 'customCtaBlock'}),
  defineArrayMember({type: 'customHtmlBlock'}),
]
