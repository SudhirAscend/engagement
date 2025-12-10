import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A2855",
          dark: "#0F1A3A",
          light: "#2C3E50",
        },
        accent: {
          DEFAULT: "#D4AF37",
          dark: "#B8941F",
          light: "#E5C866",
        },
        secondary: {
          DEFAULT: "#A89968",
          dark: "#8B7A4F",
          light: "#C4B896",
        },
        background: "#FFFAF0",
      },
    },
  },
  plugins: [],
};

export default config;

