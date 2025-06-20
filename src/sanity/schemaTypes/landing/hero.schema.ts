import { defineType, defineField } from "sanity";

export const heroSchema = defineType({
  name: "hero",
  title: "Главная секция",
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
      title: "Слоган",
      type: "highlightText",
      description: "Слоган с возможностью выделения текста. Выберите текст и нажмите кнопку подсветки для выделения.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
