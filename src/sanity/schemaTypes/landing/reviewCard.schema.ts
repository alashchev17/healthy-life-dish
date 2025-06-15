import { defineType, defineField } from "sanity";

export const reviewCardSchema = defineType({
  name: "reviewCard",
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
      title: "Профиль персоны",
      name: "person",
      description: "Профиль человека, оставившего отзыв",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Имя",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "surname",
          title: "Фамилия",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "occupation",
          title: "Должность или сфера деятельности",
          type: "string",
        }),
        defineField({
          name: "avatar",
          title: "Аватар",
          description: "Фотография человека, оставившего отзыв",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: "rating",
      title: "Оценка",
      type: "number",
      description: "Оценка от 1 до 5",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "text",
      title: "Текст отзыва",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      person: "person",
    },
    prepare({ person }) {
      // Handle cases where person object is undefined, null, or incomplete
      if (!person || typeof person !== "object") {
        return {
          title: "Untitled",
        };
      }

      const name = person.name || "";
      const surname = person.surname || "";
      const avatar = person.avatar ?? null;
      const title =
        name === "" && surname === ""
          ? "Untitled"
          : `${name} ${surname}`.trim();

      return {
        title,
        media: avatar,
      };
    },
  },
});
