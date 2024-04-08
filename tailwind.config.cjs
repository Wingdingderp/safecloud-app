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
          "primary": "#00c8e7",
          "secondary": "#4f46e5",
          "accent": "#60a5fa",
          "neutral": "#0a2531",
          "base-100": "#fff8e9",
          "info": "#009eff",
          "success": "#00b680",
          "warning": "#fe6a00",
          "error": "#ee5c74",
        },
      },
    ],
  },
};
