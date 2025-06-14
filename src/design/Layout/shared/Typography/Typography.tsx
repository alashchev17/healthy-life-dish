import React, { FC, useMemo } from "react";
import { getTypographyStyles } from "./Typography.styles";

export type TypographyVariant =
  // Desktop variants
  | "title1"
  | "title2"
  | "title3"
  | "menu"
  | "bottoms"
  | "body"
  | "small"
  | "blogTitle"
  | "blogIntro"
  | "link"
  // Mobile variants
  | "mobileTitle1"
  | "mobileTitle2"
  | "mobileTitle3"
  | "mobileMenu"
  | "mobileBottoms"
  | "mobileBody"
  | "mobileSmall"
  | "mobileBlogTitle"
  | "mobileBlogIntro"
  // Legacy variants for backward compatibility
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  children?: React.ReactNode;
  as?: keyof HTMLElementTagNameMap;
}

export const Typography: FC<TypographyProps> = ({
  children,
  variant = "body",
  as,
  className = "",
  ...props
}) => {
  const ElementTag = useMemo(() => {
    if (as) return as;

    // Map variants to appropriate HTML elements
    switch (variant) {
      case "title1":
      case "mobileTitle1":
      case "h1":
        return "h1";
      case "title2":
      case "mobileTitle2":
      case "h2":
        return "h2";
      case "title3":
      case "mobileTitle3":
      case "h3":
        return "h3";
      case "h4":
        return "h4";
      case "h5":
        return "h5";
      case "h6":
        return "h6";
      case "link":
        return "a";
      case "span":
        return "span";
      default:
        return "p";
    }
  }, [variant, as]);

  const styles = getTypographyStyles({ variant });
  const combinedClassName = `${styles} ${className}`.trim();

  return (
    <ElementTag className={combinedClassName} {...props}>
      {children}
    </ElementTag>
  );
};
