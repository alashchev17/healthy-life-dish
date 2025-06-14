// Design Tokens for Healthy Life Dish

export const colors = {
  // Primary Colors
  black: "#1A1A1A",
  lightGray: "#545454",
  white: "#F8F8F8",
  greenAcid: "#C3F02F",
  darkGray: "#272727",
  nonAccentGreen: "#78941B",
  error: "#FF0101",

  // System Colors
  background: "#ffffff",
  foreground: "#171717",
  backgroundDark: "#0a0a0a",
  foregroundDark: "#ededed",
} as const;

export const typography = {
  // Font Families
  fontFamilies: {
    jura: "var(--font-jura-sans)",
    manrope: "var(--font-manrope-sans)",
  },

  // Font Weights
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Desktop Typography
  desktop: {
    title1: {
      fontSize: "4rem",
      lineHeight: "120%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    title2: {
      fontSize: "2.5rem",
      lineHeight: "120%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    title3: {
      fontSize: "1.75rem",
      lineHeight: "120%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    menu: {
      fontSize: "1rem",
      lineHeight: "100%",
      fontFamily: "jura",
      fontWeight: "medium",
    },
    bottoms: {
      fontSize: "1rem",
      lineHeight: "100%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    body: {
      fontSize: "1rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "medium",
    },
    small: {
      fontSize: "0.875rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "regular",
    },
    blogTitle: {
      fontSize: "1rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "semibold",
    },
    blogIntro: {
      fontSize: "1rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "medium",
    },
    link: {
      fontSize: "0.75rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "medium",
    },
  },

  // Mobile Typography
  mobile: {
    title1: {
      fontSize: "2.5rem",
      lineHeight: "120%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    title2: {
      fontSize: "2rem",
      lineHeight: "120%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    title3: {
      fontSize: "1.5rem",
      lineHeight: "120%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    menu: {
      fontSize: "1rem",
      lineHeight: "100%",
      fontFamily: "jura",
      fontWeight: "medium",
    },
    bottoms: {
      fontSize: "1rem",
      lineHeight: "100%",
      fontFamily: "jura",
      fontWeight: "bold",
    },
    body: {
      fontSize: "1rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "medium",
    },
    small: {
      fontSize: "0.875rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "regular",
    },
    blogTitle: {
      fontSize: "1rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "semibold",
    },
    blogIntro: {
      fontSize: "1rem",
      lineHeight: "125%",
      fontFamily: "manrope",
      fontWeight: "medium",
    },
  },
} as const;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof colors;
export type TypographyVariant =
  | keyof typeof typography.desktop
  | keyof typeof typography.mobile;
export type SpacingToken = keyof typeof spacing;
export type BreakpointToken = keyof typeof breakpoints;
