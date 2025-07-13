import { defineType, defineField } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'
import { AdvantagesSimple } from '#/sanity/types'

export const advantagesSimpleSchema = defineType({
  name: 'advantagesSimple',
  title: 'Простые преимущества',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Простые преимущества',
        subtitle: 'Блок простых преимуществ',
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
            imageSrc: '/block-previews/advantages-simple-preview.png',
            altText: 'Пример блока простых преимуществ',
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
      name: 'advantages',
      title: 'Преимущества',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Преимущество',
          fields: [
            defineField({
              name: 'imageOnly',
              title: 'Показывать только изображение?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'title',
              title: 'Заголовок',
              type: 'string',
              hidden: ({ parent }) => parent?.imageOnly,
              validation: (Rule) =>
                Rule.custom((value, ctx) => {
                  const parent = ctx.parent as NonNullable<AdvantagesSimple['advantages']>[number]
                  if (parent.imageOnly) return true
                  if (!value) {
                    return {
                      message: 'Заголовок не может быть пустым',
                    }
                  }
                  return true
                }),
            }),
            defineField({
              name: 'image',
              title: 'Изображение',
              type: 'image',
              hidden: ({ parent }) => !parent?.imageOnly,
              validation: (Rule) =>
                Rule.custom((value, ctx) => {
                  const parent = ctx.parent as NonNullable<AdvantagesSimple['advantages']>[number]
                  if (!parent.imageOnly) return true
                  if (!value) {
                    return {
                      message: 'Изображение не может быть пустым',
                    }
                  }
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
