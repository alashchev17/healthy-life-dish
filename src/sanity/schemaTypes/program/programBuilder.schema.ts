import { defineType, defineField } from 'sanity'

export const programBuilderSchema = defineType({
  name: 'programBuilder',
  title: 'Конструктор программ',
  type: 'document',
  fields: [
    // Language field required for document internationalization
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Название программы',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Тип программы',
      type: 'string',
      options: {
        list: [
          { title: 'Диета', value: 'diet' },
          { title: 'Тренировка', value: 'training' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Содержание программы',
      description: 'Создайте свою программу, добавляя различные блоки контента',
      hidden: ({ parent }) => !parent.type,
      type: 'array',
      of: [
        { type: 'advantagesDetailed' },
        { type: 'advantagesSimple' },
        { type: 'detailedDescription' },
        { type: 'numberedList' },
        { type: 'numberedListWithImage' },
        { type: 'sloganBlock' },
        { type: 'pricingPlans' },
        { type: 'freeProgram' },
        { type: 'audienceBlock' },
      ],
      validation: (Rule) => Rule.required().error('Страница не может быть пустой'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO настройки',
      hidden: ({ parent }) => !parent.type,
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Мета-заголовок',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Мета-описание',
          type: 'text',
        },
        {
          name: 'ogImage',
          title: 'OpenGraph изображение',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL-адрес',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      const renderSlug = () => {
        if (!slug) return
        return `/${slug}`
      }
      return {
        title,
        subtitle: renderSlug(),
      }
    },
  },
})
