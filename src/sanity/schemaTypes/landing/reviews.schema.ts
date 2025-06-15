import { defineType, defineField } from "sanity";

export const reviewsSchema = defineType({
  name: "reviews",
  title: "Отзывы",
  type: "document",
  fields: [
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Отзывы",
      name: "reviews",
      description: "Текущие доступные и созданные отзывы",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "reviewCard" }],
        },
      ],
    }),
  ],
});
