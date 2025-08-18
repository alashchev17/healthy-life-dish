import { defineType, defineField } from 'sanity'

export const footerSchema = defineType({
  name: 'footer',
  title: 'Подвал сайта',
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
      name: 'emailSubscription',
      title: 'Подписка на новости',
      description: 'Настройте секцию подписки на email-рассылку Healthy Life Dish',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Заголовок секции',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Описание',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          description: 'Укажите, что будет отображаться в поле ввода email. Например: "Введіть ваш email"',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'callToAction',
          title: 'Активное действие',
          description: 'Активное действие, которое будет отображаться в виде кнопки.',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Текст кнопки',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'disclaimerText',
          title: 'Дисклеймер рассылки',
          type: 'text',
          description: 'Дисклеймер рассылки, который будет отображаться внизу секции подписки.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Копирайт',
      description: 'Копирайт, который будет отображён в самом низу веб-сайта, например: "HLD. All rights reserved"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
