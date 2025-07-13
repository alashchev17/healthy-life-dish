import { defineType, defineField, useFormValue, PatchEvent, set } from 'sanity'
import { BlockPreview } from '../../../components/BlockPreview'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { PricingPlans } from '#/sanity/types'

export const pricingPlansSchema = defineType({
  name: 'pricingPlans',
  title: 'Тарифы',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Тарифы',
        subtitle: 'Блок тарифных планов с групповыми опциями',
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
        input: function PricingPlansPreviewInput(props) {
          /** 1. Subscribe to the live value of the sibling array */
          const groupPlans = useFormValue([
            ...props.path.slice(0, -1), // path to the parent object
            'groupPlans', // sibling field
          ]) as unknown[] | undefined

          const hasGroupPricing = !!groupPlans?.length
          const imageSrc = hasGroupPricing
            ? '/block-previews/pricing-plans-group-preview.png'
            : '/block-previews/pricing-plans-individual-preview.png'

          /** 2. (Optional) write the derived value back to the doc  */
          useEffect(() => {
            if (props.value !== imageSrc) {
              props.onChange(PatchEvent.from(set(imageSrc)))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [imageSrc, props.value, props.onChange])

          /** 3. Render the preview image                       */
          return (
            <BlockPreview
              imageSrc={imageSrc}
              altText={hasGroupPricing ? 'Пример блока тарифных планов с групповыми ценами' : 'Пример блока индивидуальных тарифных планов'}
            />
          )
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
      name: 'durations',
      title: 'Варианты длительности',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: "Название (например, '1 месяц')",
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'months',
              title: 'Количество месяцев',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: 'isDefault',
              title: 'Выбрано по умолчанию',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              months: 'months',
              isDefault: 'isDefault',
            },
            prepare({ title, months, isDefault }) {
              return {
                title,
                subtitle: `${months} мес.${isDefault ? ' (по умолчанию)' : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'currency',
      title: 'Валюта',
      type: 'string',
      initialValue: '€',
      options: {
        list: [
          { title: '€', value: '€' },
          { title: '$', value: '$' },
          { title: '£', value: '£' },
          { title: '₴', value: '₴' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'planTypes',
      title: 'Тарифные планы',
      type: 'array',
      description: 'Цены указываются в выбранной валюте выше',
      of: [
        {
          type: 'object',
          title: 'Тарифный план',
          fields: [
            defineField({
              name: 'id',
              title: 'ID',
              type: 'string',
              readOnly: true,
              // Hide from regular editing but still work
              hidden: ({ currentUser }) => {
                // Show only to admins
                return !currentUser?.roles.find((role) => role.name === 'administrator')
              },
              description: 'Автоматически сгенерированный идентификатор для использования в системе оплаты',
              initialValue: () => `plan_${nanoid(16)}`,
            }),
            defineField({
              name: 'title',
              title: 'Название тарифа',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isPopular',
              title: 'Популярный',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'basePrice',
              title: 'Базовая цена (для 1 человека за 1 месяц)',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: 'features',
              title: 'Что входит в тариф?',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Текст',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'included',
                      title: 'Включено',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {
                      text: 'text',
                      included: 'included',
                    },
                    prepare({ text, included }) {
                      return {
                        title: text,
                        subtitle: included ? 'Включено ✓' : 'Не включено ✗',
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              basePrice: 'basePrice',
              isPopular: 'isPopular',
              id: 'id',
            },
            prepare({ title, basePrice, isPopular, id }) {
              return {
                title,
                subtitle: `${basePrice} ${isPopular ? '(Популярный)' : ''} | ID: ${id || 'генерируется...'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'groupPlans',
      title: 'Групповые тарифы',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'people',
              title: 'Количество человек',
              type: 'number',
              validation: (Rule) => Rule.required().min(2).integer(),
            }),
            defineField({
              name: 'basePrice',
              title: 'Базовая цена (за 1 человека за 1 месяц)',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: 'isDiscounted',
              title: 'Добавить цену со скидкой',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'discountedPrice',
              title: 'Цена со скидкой (за 1 человека за 1 месяц)',
              type: 'number',
              hidden: ({ parent }) => !parent?.isDiscounted,
              validation: (Rule) =>
                Rule.custom((value, ctx) => {
                  const parent = ctx.parent as NonNullable<PricingPlans['planTypes']>[number]
                  if (!value) {
                    return {
                      message: 'Укажите цену со скидкой',
                    }
                  }
                  if (value && value <= 0) {
                    return {
                      message: 'Цена должна быть больше 0',
                    }
                  }
                  if (value && parent?.basePrice && value >= parent?.basePrice) {
                    return {
                      message: 'Цена со скидкой должна быть меньше базовой цены',
                    }
                  }
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              people: 'people',
              basePrice: 'basePrice',
              isDiscounted: 'isDiscounted',
              discountedPrice: 'discountedPrice',
            },
            prepare({ people, basePrice, isDiscounted, discountedPrice }) {
              const renderSubtitle = () => {
                if (isDiscounted && discountedPrice) return `Стоимость со скидкой: ${discountedPrice}`
                return `Базовая цена: ${basePrice}`
              }
              return {
                title: `${people} человек`,
                subtitle: renderSubtitle(),
              }
            },
          },
        },
      ],
      description: 'Настройте тарифы для групп (2+ человек). Для каждой группы укажите базовую цену и опционально цену со скидкой.',
    }),
  ],
})
