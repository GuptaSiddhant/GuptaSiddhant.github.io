const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Nunito", "serif"],
      monospace: ["Fira Code", "Menlo", "monospace"],
    },
    screens: {
      none: "0px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: { transparent: "transparent", current: "currentColor" },
    },
  },
  variants: {},
  plugins: [],
}
