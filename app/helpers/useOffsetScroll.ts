import { useEffect, useState } from "react"

import { DEFAULT_SCROLL_OFFSET } from "~/constants"
import useMainContainer from "~/contexts/MainContainer"

export default function useOffsetScroll(
  offsetY: number = DEFAULT_SCROLL_OFFSET,
  container?: HTMLElement,
): boolean {
  const [isOffsetScrolled, setIsOffsetScrolled] = useState(false)
  const mainContainerRef = useMainContainer()

  useEffect(() => {
    const element = container || mainContainerRef.current

    const handleScroll = () => {
      const scrollTop = element?.scrollTop || 0
      setIsOffsetScrolled(scrollTop > offsetY)
    }

    handleScroll()

    element?.addEventListener("scroll", handleScroll)

    return () => element?.removeEventListener("scroll", handleScroll)
  }, [offsetY, container, mainContainerRef])

  return isOffsetScrolled
}
