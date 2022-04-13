const colors = require("tailwindcss/colors")

/** @type {import("@types/tailwindcss/tailwind-config").TailwindColorGroup} */
const myGrayColors = {
  50: "#EFF1F3",
  100: "#DFE3E7",
  200: "#C1C7D0",
  300: "#A3ACBA",
  400: "#8592A4",
  500: "#69788F",
  600: "#535F71",
  700: "#3E4755",
  800: "#2B313A",
  900: "#181C21",
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
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
        // gray: colors.neutral,
        gray: { ...colors.gray, ...myGrayColors },
      },
      screens: {
        "2xl": "1700px",
        "3xl": "2200px",
      },
      keyframes: {
        appear: {
          "0%": { transform: "translateY(50%)", opacity: "0" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        appear: "appear 0.5s linear",
      },
      maxHeight: {
        "screen-main": "calc(100vh - 100px)",
      },
      width: {
        "full-m4": "calc(100% + 2rem)",
      },
      borderColor: {
        highlight: "highlight",
      },
      fontFamily: {
        inherit: "inherit",
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
