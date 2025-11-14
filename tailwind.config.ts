import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: ["var(--font-jura-sans)", "sans-serif"],
        manrope: ["var(--font-manrope-sans)", "sans-serif"],
        "work-sans": ["Work Sans", "sans-serif"], // Fallback for link variant
      },
      width: {
        "17": "4.25rem", // 68px
      },
      height: {
        "17": "4.25rem", // 68px
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        // Custom color tokens
        black: "var(--color-black)",
        "light-gray": "var(--color-light-gray)",
        white: "var(--color-white)",
        "green-acid": "var(--color-green-acid)",
        "dark-gray": "var(--color-dark-gray)",
        "non-accent-green": "var(--color-non-accent-green)",
        error: "var(--color-error)",
      },
    },
  },
  plugins: [require("tailwindcss-leading-trim")],
};

export default config;
