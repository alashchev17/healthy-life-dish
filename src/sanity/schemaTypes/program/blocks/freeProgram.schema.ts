import { defineType, defineField } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'

export const freeProgramSchema = defineType({
  name: 'freeProgram',
  title: 'Бесплатная программа',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Бесплатная программа',
        subtitle: 'Блок бесплатной программы',
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
            imageSrc: '/block-previews/free-program-preview.png',
            altText: 'Пример блока бесплатной программы',
          }),
      },
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'highlightText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'button',
      title: 'Кнопка',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Текст кнопки',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Ссылка на программу',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
