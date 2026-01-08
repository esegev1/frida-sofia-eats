import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, inviting color palette for Frida Sofia Eats
        cream: {
          50: "#FFFDF9",
          100: "#FFF9F0",
          200: "#FFF3E0",
          300: "#FFE8C8",
          400: "#FFDAA8",
        },
        terracotta: {
          50: "#FEF3F0",
          100: "#FCE4DD",
          200: "#F9C9BB",
          300: "#F5A489",
          400: "#EF7B5C",
          500: "#E85D3B",
          600: "#D44425",
          700: "#B0361D",
          800: "#8F2F1C",
          900: "#752B1C",
        },
        sage: {
          50: "#F6F7F4",
          100: "#E9ECE4",
          200: "#D4DACC",
          300: "#B7C2A9",
          400: "#98A884",
          500: "#7B8E69",
          600: "#617152",
          700: "#4D5A42",
          800: "#414B38",
          900: "#383F31",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
