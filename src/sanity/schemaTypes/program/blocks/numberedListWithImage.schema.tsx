import { PatchEvent, defineType, defineField, useFormValue, set } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'
import { useEffect } from 'react'

export const numberedListWithImageSchema = defineType({
  name: 'numberedListWithImage',
  title: 'Нумерованный список с изображением',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      style: 'style',
    },
    prepare({ title, style }) {
      return {
        title: title || 'Нумерованный список с изображением',
        subtitle: `Стиль: ${style === 'active' ? 'Активный' : 'Вторичный'}`,
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
        input: function NumberedListPreviewInput(props) {
          /** 1. Subscribe to the live value of the sibling array */
          const listStyle = useFormValue([
            ...props.path.slice(0, -1), // path to the parent object
            'style', // sibling field
          ]) as 'active' | 'secondary' | undefined

          const isActive = listStyle === 'active'
          const imageSrc = isActive
            ? '/block-previews/numbered-list-with-image-preview-active.png'
            : '/block-previews/numbered-list-with-image-preview.png'

          useEffect(() => {
            if (props.value !== imageSrc) {
              props.onChange(PatchEvent.from(set(imageSrc)))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [imageSrc, props.value, props.onChange])

          /** 3. Render the preview image */
          return <BlockPreview imageSrc={imageSrc} altText="Пример блока нумерованного списка" />
        },
      },
    }),
    defineField({
      name: 'title',
      title: 'Заголовок секции',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Стиль',
      type: 'string',
      options: {
        list: [
          { title: 'Активный', value: 'active' },
          { title: 'Вторичный', value: 'secondary' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Элементы списка',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Элемент списка',
          fields: [
            defineField({
              name: 'image',
              title: 'Изображение',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Заголовок',
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
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
