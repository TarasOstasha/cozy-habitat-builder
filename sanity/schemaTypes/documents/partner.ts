import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'
import {IMAGE_FIELD_ACCEPT} from '../objects/sectionFields'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show on homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this partner from the Partners carousel',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true, accept: IMAGE_FIELD_ACCEPT},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'Website',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', media: 'logo', order: 'order', enabled: 'enabled'},
    prepare({title, media, order, enabled}) {
      const hidden = enabled === false
      return {
        title: title || 'Untitled partner',
        subtitle: [
          typeof order === 'number' ? `Order ${order}` : null,
          hidden ? 'Hidden' : null,
        ]
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
})
