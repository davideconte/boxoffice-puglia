import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#013DFF",
          "blue-dark": "#0030CC",
          "blue-light": "#E8F0FE",
          red: "#FF425E",
          lime: "#D2FF5A",
          cyan: "#5CFFEB",
          green: "#27AE60",
          yellow: "#F1C40F",
          dark: "#1B1B1B",
          gray: "#6B7280",
          "light-gray": "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-circular)", "Arial", "sans-serif"],
        mars: ["var(--font-mars)", "Anton", "Oswald", "sans-serif"],
      },
      borderRadius: {
        brand: "12px",
      },
      aspectRatio: {
        "16/9": "16 / 9",
        "3/2": "3 / 2",
      },
    },
  },
  plugins: [typography],
};

export default config;
