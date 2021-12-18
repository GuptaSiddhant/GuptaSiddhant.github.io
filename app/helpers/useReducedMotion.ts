import { useState, useRef, useEffect } from "react"
import { useIsSSR } from "@react-aria/ssr"

export default function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const isSSR = useIsSSR()

  const { current: mediaQuery } = useRef(
    isSSR ? null : window.matchMedia("(prefers-reduced-motion: reduce)"),
  )

  useEffect(() => {
    if (mediaQuery) {
      const listener = () => setPrefersReducedMotion(!!mediaQuery.matches)
      mediaQuery.addEventListener("change", listener)

      return () => {
        mediaQuery.removeEventListener("change", listener)
      }
    }
  }, [mediaQuery])

  return prefersReducedMotion
}
