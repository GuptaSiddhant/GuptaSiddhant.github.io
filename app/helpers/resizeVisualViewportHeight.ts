import { __IS_SERVER__ } from "helpers"
import { useEffect, type RefObject } from "react"
import { CSS_VAR_VISUAL_VIEWPORT_HEIGHT } from "~/constants"

export function useResizeVVHEffect(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (ref.current) {
      ref.current.onfocus = resizeVisualViewportHeight
      ref.current.onblur = resizeVisualViewportHeight
    }
  }, [ref])
}

export function resizeVisualViewportHeight(): void {
  if (__IS_SERVER__) return
  let interval: NodeJS.Timer
  let previousHeight = 0

  const changer = () => {
    const newHeight = window.visualViewport.height

    if (previousHeight === newHeight) {
      clearInterval(interval)
    } else {
      previousHeight = newHeight
      document.documentElement.style.setProperty(
        CSS_VAR_VISUAL_VIEWPORT_HEIGHT,
        `${newHeight}px`,
      )
    }
  }

  if (window.visualViewport) {
    interval = setInterval(changer, 500)
  }
}
