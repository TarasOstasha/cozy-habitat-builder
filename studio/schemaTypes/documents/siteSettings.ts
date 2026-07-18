import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'brand', title: 'Brand', default: true},
    {name: 'footer', title: 'Footer'},
    {name: 'contact', title: 'Contact'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand name',
      type: 'string',
      group: 'brand',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location label',
      type: 'string',
      description: 'Shown in the header, e.g. Norwalk · Connecticut',
      group: 'brand',
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer logo',
      type: 'image',
      group: 'footer',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'string',
      description: 'Shown after the copyright year',
      group: 'footer',
    }),
    defineField({
      name: 'footerNavLinks',
      title: 'Footer navigation',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerNavLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'e.g. /, /portfolio, /#contact',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        }),
      ],
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Phone (display)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone (tel link)',
      type: 'string',
      description: 'e.g. +19177050712',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address line 1',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address line 2',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Default SEO title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
