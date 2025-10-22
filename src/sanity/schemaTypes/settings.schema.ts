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
    }),
  ],
});
