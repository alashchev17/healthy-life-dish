import { defineType, defineField } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'

export const audienceBlockSchema = defineType({
  name: 'audienceBlock',
  title: 'Аудитория',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Аудитория',
        subtitle: 'Для кого эта программа?',
        media: null,
      }
    },
  },
  fields: [
    // Preview field
    defineField({
      name: 'preview',
      title: 'Предпросмотр',
      type: 'string',
      readOnly: true,
      components: {
        input: () =>
          BlockPreview({
            imageSrc: '/block-previews/audience-block-preview.png',
            altText: 'Пример блока аудитории',
          }),
      },
    }),
    defineField({
      name: 'title',
      title: 'Заголовок секции',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audiences',
      title: 'Группы аудитории',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Группа аудитории',
          fields: [
            defineField({
              name: 'description',
              title: 'Описание',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Изображение',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
