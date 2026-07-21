import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const designersPage = defineType({
  name: 'designersPage',
  title: 'Designers Page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'content', title: 'Content', default: true},
    {name: 'form', title: 'Inquiry form'},
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'Page SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Intro',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'text'},
          },
        }),
      ],
    }),
    defineField({
      name: 'formEyebrow',
      title: 'Form eyebrow',
      type: 'string',
      group: 'form',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form title',
      type: 'string',
      group: 'form',
    }),
    defineField({
      name: 'messagePlaceholder',
      title: 'Message placeholder',
      type: 'string',
      group: 'form',
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit button label',
      type: 'string',
      group: 'form',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Designers Page'}
    },
  },
})
