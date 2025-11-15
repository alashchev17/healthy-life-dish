import { PortableText } from "@portabletext/react";
import { Typography, TypographyVariant } from "#/design/shared/Typography";
import { HighlightText } from "#/sanity/types";

interface HighlightedTextProps {
  value: HighlightText;
  className?: string;
  variant?: TypographyVariant;
  as?: keyof HTMLElementTagNameMap;
  shouldBeBold?: boolean;
}

export function HighlightedText({
  value,
  as,
  className = "",
  variant = "body",
  shouldBeBold = false,
}: HighlightedTextProps) {
  return (
    <PortableText
      value={value}
      components={{
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
          number: ({ children }) => <ol>{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="pb-2 last:pb-0">
              <Typography variant={variant} as={as} className={className}>
                {children}
              </Typography>
            </li>
          ),
          number: ({ children }) => (
            <li className="pb-2 last:pb-0">
              <Typography variant={variant} as={as} className={className}>
                {children}
              </Typography>
            </li>
          ),
        },
        block: {
          normal: ({ children }) => (
            <Typography variant={variant} as={as} className={className}>
              {children}
            </Typography>
          ),
        },
        marks: {
          highlight: ({ children }) => (
            <Typography
              variant={variant}
              as="span"
              className={`text-green-acid ${className} ${shouldBeBold ? "font-bold" : ""}`}
            >
              {children}
            </Typography>
          ),
        },
      }}
    />
  );
}
