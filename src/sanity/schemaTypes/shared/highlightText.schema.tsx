import { defineType } from "sanity";
import { HighlightIcon } from "@sanity/icons";

export const highlightTextSchema = defineType({
  name: "highlightText",
  title: "Highlighted Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [],
      lists: [],
      marks: {
        decorators: [
          {
            title: "Выделить",
            value: "highlight",
            icon: <HighlightIcon />,
            component: (props) => (
              <span className="text-green-acid">{props.children}</span>
            ),
          },
        ],
        annotations: [],
      },
    },
  ],
});
