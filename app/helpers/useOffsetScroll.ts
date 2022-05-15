import { useCallback, useEffect, useReducer } from "react"
import { DEFAULT_SCROLL_OFFSET } from "~/constants"
import useThrottle from "./useThrottle"

interface OffsetScrollState {
  scrollTop: number
  isOffsetScrolled: boolean
  scrollDirection: "up" | "down"
}

const initialState: OffsetScrollState = {
  scrollTop: 0,
  isOffsetScrolled: false,
  scrollDirection: "down",
}

export default function useOffsetScroll(
  offsetY: number = DEFAULT_SCROLL_OFFSET,
): OffsetScrollState {
  const [state, dispatch] = useReducer(
    (state: OffsetScrollState, payload: Partial<OffsetScrollState>) => ({
      ...state,
      ...payload,
    }),
    initialState,
  )

  const handler = useCallback(() => {
    const threshold = 0
    let lastScrollTop = window.pageYOffset
    let ticking = false

    const handleScroll = () => {
      const scrollTop = window.scrollY || 0
      const isOffsetScrolled = scrollTop > offsetY

      if (Math.abs(scrollTop - lastScrollTop) < threshold) {
        ticking = false
        return dispatch({ scrollTop, isOffsetScrolled })
      }

      const scrollDirection = scrollTop >= lastScrollTop ? "down" : "up"
      dispatch({ scrollTop, isOffsetScrolled, scrollDirection })

      lastScrollTop = scrollTop > 0 ? scrollTop : 0
      ticking = false
    }

    if (!ticking) {
      window.requestAnimationFrame(handleScroll)
      ticking = true
    }
  }, [offsetY])

  const [throttledHandler] = useThrottle(handler, 250)

  useEffect(() => {
    throttledHandler()
    window.addEventListener("scroll", throttledHandler)
    return () => window.removeEventListener("scroll", throttledHandler)
  }, [throttledHandler])

  return state
}
