import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Настройки",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      hidden: true,
      readOnly: true,
    }),

    // ============ Global CTAs ============
    defineField({
      name: "globalCtas",
      title: "Глобальные CTA",
      type: "object",
      fields: [
        defineField({
          name: "learnMore",
          title: "Узнать больше",
          type: "string",
          description: "Текст кнопки 'Узнать больше' (используется в каруселях, карточках программ)",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "selectDiet",
          title: "Выбрать диету",
          type: "string",
          description: "Текст кнопки выбора диеты",
        }),
        defineField({
          name: "selectProgram",
          title: "Выбрать программу",
          type: "string",
          description: "Текст кнопки выбора программы",
        }),
        defineField({
          name: "subscribe",
          title: "Подписаться",
          type: "string",
          description: "Текст кнопки подписки",
        }),
      ],
    }),

    // ============ SEO Defaults ============
    defineField({
      name: "seo",
      title: "SEO настройки",
      type: "object",
      fields: [
        defineField({
          name: "siteName",
          title: "Название сайта",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "defaultMetaTitle",
          title: "Meta Title по умолчанию",
          type: "string",
        }),
        defineField({
          name: "defaultMetaDescription",
          title: "Meta Description по умолчанию",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "defaultOgImage",
          title: "OG Image по умолчанию",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "favicon",
          title: "Favicon",
          type: "image",
          options: {
            accept: "image/x-icon,image/png",
          },
        }),
      ],
    }),

    // ============ Contact Info ============
    defineField({
      name: "contact",
      title: "Контактная информация",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: "phone",
          title: "Телефон",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Адрес",
          type: "text",
          rows: 2,
        }),
      ],
    }),

    // ============ Analytics ============
    defineField({
      name: "analytics",
      title: "Аналитика",
      type: "object",
      fields: [
        defineField({
          name: "googleAnalyticsId",
          title: "Google Analytics ID",
          type: "string",
          description: "GA4 Measurement ID (G-XXXXXXXXXX)",
        }),
        defineField({
          name: "googleTagManagerId",
          title: "Google Tag Manager ID",
          type: "string",
          description: "GTM Container ID (GTM-XXXXXX)",
        }),
        defineField({
          name: "facebookPixelId",
          title: "Facebook Pixel ID",
          type: "string",
        }),
      ],
    }),
  ],
});
