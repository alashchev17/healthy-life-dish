import { defineType, defineField } from "sanity";
import { BlockPreview } from "../../../components/BlockPreview";

export const sloganBlockSchema = defineType({
  name: "sloganBlock",
  title: "Слоган",
  type: "object",
  preview: {
    prepare() {
      return {
        title: "Слоган",
        subtitle: "Блок слогана с выделенным текстом",
        media: null,
      };
    },
  },
  fields: [
    // Preview field
    defineField({
      name: "preview",
      title: "Предпросмотр",
      type: "string",
      readOnly: true,
      components: {
        input: () =>
          BlockPreview({
            imageSrc: "/block-previews/slogan-block-preview.png",
            altText: "Пример блока слогана"
          })
      }
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
