import {defineArrayMember, defineField} from 'sanity'

/** Toggle at the top of each homepage section. */
export const sectionEnabledField = defineField({
  name: 'enabled',
  title: 'Show on homepage',
  type: 'boolean',
  initialValue: true,
  description: 'Uncheck to hide this section on the homepage',
})

/**
 * Numeric sort key for homepage sections.
 * Lower numbers render first. Defaults use gaps of 10 so new sections can be inserted.
 */
export function sectionOrderField(initialValue: number) {
  return defineField({
    name: 'order',
    title: 'Order index',
    type: 'number',
    initialValue,
    description:
      'Controls homepage position. Lower numbers appear first (e.g. 10, 20, 30…). Change these to reorder sections.',
    validation: (rule) => rule.integer().min(0).warning('Use whole numbers (0, 10, 20…)'),
  })
}

/** Shared eyebrow + title + body pattern used across homepage sections. */
export const sectionIntroFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
  }),
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
    rows: 4,
  }),
]

export const imageWithAlt = defineField({
  name: 'image',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.warning('Add alt text for accessibility and SEO'),
    }),
  ],
})

export const ctaFields = [
  defineField({
    name: 'label',
    title: 'Label',
    type: 'string',
  }),
  defineField({
    name: 'href',
    title: 'Link',
    type: 'string',
    description: 'Internal path (#contact), tel:, mailto:, or external URL',
  }),
]

export const serviceItem = defineArrayMember({
  type: 'object',
  name: 'serviceItem',
  title: 'Service',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Display number such as 01',
      validation: (rule) => rule.required(),
    }),
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
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'number'},
  },
})

export const workPreviewProject = defineArrayMember({
  type: 'object',
  name: 'workPreviewProject',
  title: 'Featured project',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Kitchen · Ashton',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.warning('Add alt text for accessibility and SEO'),
        }),
      ],
      validation: (rule) => rule.warning('Add a project image'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
