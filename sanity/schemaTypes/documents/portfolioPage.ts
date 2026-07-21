import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const portfolioPage = defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'content', title: 'Content', default: true},
    {name: 'gallery', title: 'Gallery'},
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
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
      description: 'e.g. /#contact',
      group: 'content',
    }),
    defineField({
      name: 'categories',
      title: 'Gallery categories',
      type: 'array',
      group: 'gallery',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'portfolioCategory',
          fields: [
            defineField({
              name: 'title',
              title: 'Category title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {source: 'title', maxLength: 64},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'descriptionMode',
              title: 'Description format',
              type: 'string',
              options: {
                list: [
                  {title: 'Rich text', value: 'richText'},
                  {title: 'HTML', value: 'html'},
                ],
                layout: 'radio',
              },
              initialValue: 'richText',
              description:
                'Per-category copy only — does not change the page intro above the gallery',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'portableText',
              hidden: ({parent}) => parent?.descriptionMode === 'html',
            }),
            defineField({
              name: 'descriptionHtml',
              title: 'Description (HTML)',
              type: 'text',
              rows: 10,
              hidden: ({parent}) => parent?.descriptionMode !== 'html',
              description: 'Paste or write HTML for this category only',
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alternative text',
                      type: 'string',
                      validation: (rule) =>
                        rule.warning('Add alt text for accessibility and SEO'),
                    }),
                  ],
                }),
              ],
              validation: (rule) => rule.min(1).warning('Add at least one image'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'images.0',
              count: 'images',
            },
            prepare({title, media, count}) {
              const imageCount = Array.isArray(count) ? count.length : 0
              return {
                title: title || 'Untitled category',
                subtitle: `${imageCount} image${imageCount === 1 ? '' : 's'}`,
                media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).warning('Add at least one gallery category'),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Portfolio Page'}
    },
  },
})
