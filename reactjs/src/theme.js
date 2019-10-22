export const themes = {
  light: {
    textPrimary: "#000000",
    textSecondary: "#4D4D4D",
    textDisabled: "#8E8E93",
    bgBase: "#F2F2F7",
    bgElevated: "#FFFFFF",
    separator: "#CECED9",
    red: "#FF3B30",
    orange: "#FF9500",
    yellow: "#FFCC00",
    green: "#34C759",
    blue: "#007AFF",
    purple: "#AF52DE"
  },
  dark: {
    textPrimary: "#FFFFFF",
    textSecondary: "#C6C6C8",
    textDisabled: "#8E8E93",
    bgBase: "#000000",
    bgElevated: "#1C1C1E",
    separator: "#4D4D4D",
    red: "#FF453A",
    orange: "#FF9F0A",
    yellow: "#FFD60A",
    green: "#32D74B",
    blue: "#0A84FF",
    purple: "#BF5AF2"
  }
};

export function setRootCSS(theme) {
  const newTheme = themes[theme];
  for (let item in newTheme) {
    document.documentElement.style.setProperty(`--${item}`, newTheme[item]);
  }
}
