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
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Public site origin used for canonical and Open Graph URLs (e.g. https://www.example.com)',
      group: 'seo',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Use a full URL starting with https://'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Default SEO title',
      type: 'string',
      group: 'seo',
      validation: (rule) =>
        rule.max(60).warning('Keep under 60 characters for best display in search results'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) =>
        rule.max(160).warning('Keep under 160 characters for best display in search results'),
    }),
    defineField({
      name: 'seoImage',
      title: 'Default social share image',
      type: 'image',
      description: 'Fallback Open Graph / Twitter image (1200×630 recommended)',
      group: 'seo',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.warning('Add alt text for accessibility and SEO'),
        }),
      ],
    }),
    defineField({
      name: 'ogSiteName',
      title: 'Open Graph site name',
      type: 'string',
      description: 'Shown as the site name in social previews',
      group: 'seo',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter / X handle',
      type: 'string',
      description: 'Without @, e.g. semta',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
