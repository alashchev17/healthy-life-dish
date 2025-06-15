import { defineType, defineField } from "sanity";
import { HIGHLIGHT_FIELD_DESCRIPTION } from "#/sanity/schemaTypes/consts";

export const aboutSchema = defineType({
  name: "about",
  title: "Про нас",
  type: "document",
  fields: [
    // Language field required for document internationalization
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "highlightText",
      description: HIGHLIGHT_FIELD_DESCRIPTION,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "callToAction",
      title: "Активное действие",
      description: "Активное действие, которое будет отображаться на странице.",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Текст кнопки",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "action",
          title: "Действие кнопки",
          type: "string", // TODO: might change to type: "url"
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "cards",
      title: "Карточки",
      type: "array",
      description: "Карточки с описанием, 2 штуки",
      of: [
        defineField({
          name: "aboutCard",
          title: "Карточка",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Заголовок",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Описание",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Фотография",
              description:
                "Фотография должна быть в формате PNG и иметь ширину не более 450 пикселей.",
              type: "image",
              options: {
                accept: "image/png",
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "slogan",
      title: "Слоган",
      type: "highlightText",
      description:
        "Слоган с возможностью выделения текста. Выберите текст и нажмите кнопку подсветки для выделения.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
