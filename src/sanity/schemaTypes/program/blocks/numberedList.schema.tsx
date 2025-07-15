import { defineType, defineField, useFormValue, PatchEvent, set } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'
import { useEffect } from 'react'

export const numberedListSchema = defineType({
  name: 'numberedList',
  title: 'Нумерованный список',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items = [] }) {
      return {
        title: title || 'Нумерованный список',
        subtitle: `${items.length} элемент(ов)`,
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
          const listItems = useFormValue([
            ...props.path.slice(0, -1), // path to the parent object
            'items', // sibling field
          ]) as unknown[] | undefined

          const imageSrc =
            listItems?.length && listItems.length > 4
              ? '/block-previews/numbered-list-preview-extended.png'
              : '/block-previews/numbered-list-preview.png'

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
      name: 'items',
      title: 'Элементы списка',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
