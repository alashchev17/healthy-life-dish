import { defineField, defineType } from "sanity";

export const promoSchema = defineType({
  name: "promo",
  title: "Промо-секция",
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
      name: "slogan",
      title: "Promotion-слоган",
      type: "highlightText",
      description:
        "Слоган с возможностью выделения текста. Выберите текст и нажмите кнопку подсветки для выделения.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Активна ли промоакция?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),
  ],
});
