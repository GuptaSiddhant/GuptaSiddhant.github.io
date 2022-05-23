import { __IS_SERVER__ } from "~/helpers"
import { useEffect, type RefObject } from "react"
import { CSS_VAR_VISUAL_VIEWPORT_HEIGHT } from "~/helpers/constants"

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

  const changer = () => {
    document.documentElement.style.setProperty(
      CSS_VAR_VISUAL_VIEWPORT_HEIGHT,
      `${window.visualViewport.height}px`,
    )
  }

  if (window.visualViewport) {
    setTimeout(changer, 1000)
  }
}
