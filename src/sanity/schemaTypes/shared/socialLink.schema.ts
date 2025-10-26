import { defineField, defineType } from "sanity";

export const socialLinkSchema = defineType({
  name: "socialLink",
  title: "Ссылка на соц.сеть",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Ссылка",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: [
          { value: "facebook", title: "Facebook" },
          { value: "instagram", title: "Instagram" },
          { value: "x", title: "X" },
          { value: "linkedin", title: "LinkedIn" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
