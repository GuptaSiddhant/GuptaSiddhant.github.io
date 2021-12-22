const colors = require("tailwindcss/colors")

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
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
      screens: {
        "2xl": "1700px",
        "3xl": "2200px",
      },
    },
  },

  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}
