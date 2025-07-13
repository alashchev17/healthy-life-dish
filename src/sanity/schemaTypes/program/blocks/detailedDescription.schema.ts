import { defineType, defineField } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'

export const detailedDescriptionSchema = defineType({
  name: 'detailedDescription',
  title: 'Подробное описание',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Подробное описание',
        subtitle: 'Блок подробного описания',
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
            imageSrc: '/block-previews/detailed-description-preview.png',
            altText: 'Пример блока подробного описания',
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
      name: 'description',
      title: 'Описание',
      type: 'highlightText',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
