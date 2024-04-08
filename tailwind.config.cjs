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
  darkMode: "dark",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        smp: {
          "primary": "#0284c7",
          
          "secondary": "#4ade80",
                   
          "accent": "#9ca3af",
                   
          "neutral": "#1f2937",
                   
          "base-100": "#374151",
                   
          "info": "#008ff3",
                   
          "success": "#00c900",
                   
          "warning": "#ff9400",
                   
          "error": "#f1002f",
          },
      },
    ],
  },
};
