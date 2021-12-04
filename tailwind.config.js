const colors = require("tailwindcss/colors")

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
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: colors.coolGray,
        blue: colors.sky,
        red: colors.rose,
      },
    },
  },
  variants: {},
  plugins: [],
}
