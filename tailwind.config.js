const colors = require("tailwindcss/colors")

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["monospace", "serif"],
      monospace: ["Fira Code", "Menlo", "monospace"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: colors.sky,
        red: colors.rose,
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
}
