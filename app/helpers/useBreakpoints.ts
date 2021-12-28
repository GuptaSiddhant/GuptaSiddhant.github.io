import { useWindowSize } from "@reach/window-size"

/** useResponsive hook */
export default function useBreakpoints() {
  const { width, height } = useWindowSize()

  // https://tailwindcss.com/docs/screens
  return {
    isMobile: width < breakpoints.sm,
    isTablet: width >= breakpoints.sm && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    width,
    height,
  }
}

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}
