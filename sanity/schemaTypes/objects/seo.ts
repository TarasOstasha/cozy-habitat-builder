import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'
import {IMAGE_FIELD_ACCEPT} from './sectionFields'

/**
 * Reusable page SEO object — smart defaults with optional overrides.
 * @see https://www.sanity.io/docs (SEO best practices)
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Overrides the page title in search results and browser tabs',
      validation: (rule) =>
        rule.max(60).warning('Keep under 60 characters for best display in search results'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown in search engine results',
      validation: (rule) =>
        rule.max(160).warning('Keep under 160 characters for best display in search results'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Optional keywords for internal use or legacy meta tags',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional absolute URL if this page should point to a different canonical',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Use a full URL starting with https://'),
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph title',
      type: 'string',
      description: 'Overrides meta title when shared on social networks',
      validation: (rule) => rule.max(70).warning('Keep under 70 characters for social previews'),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph description',
      type: 'text',
      rows: 3,
      description: 'Overrides meta description when shared on social networks',
      validation: (rule) => rule.max(200).warning('Keep under 200 characters for social previews'),
    }),
    defineField({
      name: 'image',
      title: 'Social share image',
      type: 'image',
      description: 'Open Graph / Twitter image (1200×630 recommended)',
      options: {hotspot: true, accept: IMAGE_FIELD_ACCEPT},
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
      name: 'twitterCard',
      title: 'Twitter card type',
      type: 'string',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary with large image', value: 'summary_large_image'},
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'Adds noindex so this page is not listed in search results',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'Do not follow links',
      type: 'boolean',
      description: 'Adds nofollow so search engines ignore links on this page',
      initialValue: false,
    }),
  ],
})
