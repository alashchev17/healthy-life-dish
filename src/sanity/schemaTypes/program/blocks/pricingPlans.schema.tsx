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
      name: 'supportedCurrencies',
      title: 'Поддерживаемые валюты',
      type: 'array',
      description: 'Выберите валюты, в которых можно отображать цены',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'EUR (€)', value: 'EUR' },
              { title: 'USD ($)', value: 'USD' },
              { title: 'GBP (£)', value: 'GBP' },
              { title: 'UAH (₴)', value: 'UAH' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).unique(),
      initialValue: ['EUR'],
    }),
    defineField({
      name: 'defaultCurrency',
      title: 'Валюта по умолчанию',
      type: 'string',
      options: {
        list: [
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'USD ($)', value: 'USD' },
          { title: 'GBP (£)', value: 'GBP' },
          { title: 'UAH (₴)', value: 'UAH' },
        ],
      },
      validation: (Rule) =>
        Rule.required().custom((value, ctx) => {
          const parent = ctx.parent as { supportedCurrencies?: string[] }
          if (!value) return 'Выберите валюту по умолчанию'
          if (!parent.supportedCurrencies?.includes(value)) {
            return 'Валюта по умолчанию должна быть в списке поддерживаемых валют'
          }
          return true
        }),
      initialValue: 'EUR',
    }),
    defineField({
      name: 'planTypes',
      title: 'Тарифные планы',
      type: 'array',
      description: 'Укажите цены для каждой валюты (за 1 человека за 1 месяц)',
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
              name: 'stripeProductId',
              title: 'Stripe Product ID',
              type: 'string',
              description: 'ID продукта в Stripe (заполняется при интеграции с платежной системой)',
              hidden: ({ currentUser }) => {
                return !currentUser?.roles.find((role) => role.name === 'administrator')
              },
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
              name: 'pricing',
              title: 'Цены по валютам',
              type: 'object',
              description: 'Укажите цену за 1 человека за 1 месяц для каждой валюты',
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  name: 'EUR',
                  title: 'EUR (€)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'price',
                      title: 'Цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'stripePriceId',
                      title: 'Stripe Price ID',
                      type: 'string',
                      description: 'ID цены в Stripe (опционально)',
                      hidden: ({ currentUser }) => {
                        return !currentUser?.roles.find((role) => role.name === 'administrator')
                      },
                    }),
                  ],
                }),
                defineField({
                  name: 'USD',
                  title: 'USD ($)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'price',
                      title: 'Цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'stripePriceId',
                      title: 'Stripe Price ID',
                      type: 'string',
                      description: 'ID цены в Stripe (опционально)',
                      hidden: ({ currentUser }) => {
                        return !currentUser?.roles.find((role) => role.name === 'administrator')
                      },
                    }),
                  ],
                }),
                defineField({
                  name: 'GBP',
                  title: 'GBP (£)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'price',
                      title: 'Цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'stripePriceId',
                      title: 'Stripe Price ID',
                      type: 'string',
                      description: 'ID цены в Stripe (опционально)',
                      hidden: ({ currentUser }) => {
                        return !currentUser?.roles.find((role) => role.name === 'administrator')
                      },
                    }),
                  ],
                }),
                defineField({
                  name: 'UAH',
                  title: 'UAH (₴)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'price',
                      title: 'Цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'stripePriceId',
                      title: 'Stripe Price ID',
                      type: 'string',
                      description: 'ID цены в Stripe (опционально)',
                      hidden: ({ currentUser }) => {
                        return !currentUser?.roles.find((role) => role.name === 'administrator')
                      },
                    }),
                  ],
                }),
              ],
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
              pricing: 'pricing',
              isPopular: 'isPopular',
              id: 'id',
            },
            prepare({ title, pricing, isPopular, id }) {
              const firstPrice = pricing?.EUR?.price || pricing?.USD?.price || pricing?.GBP?.price || pricing?.UAH?.price
              const currency = pricing?.EUR?.price ? 'EUR' : pricing?.USD?.price ? 'USD' : pricing?.GBP?.price ? 'GBP' : 'UAH'
              return {
                title,
                subtitle: `${firstPrice || '—'} ${currency} ${isPopular ? '(Популярный)' : ''} | ID: ${id || 'генерируется...'}`,
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
              name: 'pricing',
              title: 'Цены по валютам',
              type: 'object',
              description: 'Укажите базовую цену и опциональную цену со скидкой для каждой валюты',
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  name: 'EUR',
                  title: 'EUR (€)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'basePrice',
                      title: 'Базовая цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'discountedPrice',
                      title: 'Цена со скидкой',
                      type: 'number',
                      description: 'Оставьте пустым, если нет скидки',
                      validation: (Rule) =>
                        Rule.custom((value, ctx) => {
                          if (!value) return true
                          if (value <= 0) return 'Цена должна быть больше 0'
                          const parent = ctx.parent as { basePrice?: number }
                          if (parent?.basePrice && value >= parent.basePrice) {
                            return 'Цена со скидкой должна быть меньше базовой цены'
                          }
                          return true
                        }),
                    }),
                  ],
                }),
                defineField({
                  name: 'USD',
                  title: 'USD ($)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'basePrice',
                      title: 'Базовая цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'discountedPrice',
                      title: 'Цена со скидкой',
                      type: 'number',
                      description: 'Оставьте пустым, если нет скидки',
                      validation: (Rule) =>
                        Rule.custom((value, ctx) => {
                          if (!value) return true
                          if (value <= 0) return 'Цена должна быть больше 0'
                          const parent = ctx.parent as { basePrice?: number }
                          if (parent?.basePrice && value >= parent.basePrice) {
                            return 'Цена со скидкой должна быть меньше базовой цены'
                          }
                          return true
                        }),
                    }),
                  ],
                }),
                defineField({
                  name: 'GBP',
                  title: 'GBP (£)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'basePrice',
                      title: 'Базовая цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'discountedPrice',
                      title: 'Цена со скидкой',
                      type: 'number',
                      description: 'Оставьте пустым, если нет скидки',
                      validation: (Rule) =>
                        Rule.custom((value, ctx) => {
                          if (!value) return true
                          if (value <= 0) return 'Цена должна быть больше 0'
                          const parent = ctx.parent as { basePrice?: number }
                          if (parent?.basePrice && value >= parent.basePrice) {
                            return 'Цена со скидкой должна быть меньше базовой цены'
                          }
                          return true
                        }),
                    }),
                  ],
                }),
                defineField({
                  name: 'UAH',
                  title: 'UAH (₴)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'basePrice',
                      title: 'Базовая цена',
                      type: 'number',
                      validation: (Rule) => Rule.positive(),
                    }),
                    defineField({
                      name: 'discountedPrice',
                      title: 'Цена со скидкой',
                      type: 'number',
                      description: 'Оставьте пустым, если нет скидки',
                      validation: (Rule) =>
                        Rule.custom((value, ctx) => {
                          if (!value) return true
                          if (value <= 0) return 'Цена должна быть больше 0'
                          const parent = ctx.parent as { basePrice?: number }
                          if (parent?.basePrice && value >= parent.basePrice) {
                            return 'Цена со скидкой должна быть меньше базовой цены'
                          }
                          return true
                        }),
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              people: 'people',
              pricing: 'pricing',
            },
            prepare({ people, pricing }) {
              const firstCurrency = pricing?.EUR || pricing?.USD || pricing?.GBP || pricing?.UAH
              const currencyCode = pricing?.EUR ? 'EUR' : pricing?.USD ? 'USD' : pricing?.GBP ? 'GBP' : 'UAH'
              const hasDiscount = !!firstCurrency?.discountedPrice
              const priceText = hasDiscount
                ? `${firstCurrency.discountedPrice} ${currencyCode} (скидка)`
                : `${firstCurrency?.basePrice || '—'} ${currencyCode}`
              return {
                title: `${people} человек`,
                subtitle: priceText,
              }
            },
          },
        },
      ],
      description: 'Настройте тарифы для групп (2+ человек). Для каждой группы укажите цены по валютам.',
    }),
  ],
})
