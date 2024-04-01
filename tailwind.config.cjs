/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        smp: {
          "primary": "#df00ff",
          "secondary": "#02ab00",
          "accent": "#007fff",
          "neutral": "#17101e",
          "base-100": "#182729",
          "info": "#004aff",
          "success": "#00af59",
          "warning": "#b16e00",
          "error": "#ff8a9a",
        },
      },
    ],
  },
};
