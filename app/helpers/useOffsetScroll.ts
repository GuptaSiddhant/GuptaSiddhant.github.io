import { useEffect, useState } from "react"

export default function useOffsetScroll(offsetY: number): boolean {
  const [isOffsetScrolled, setIsOffsetScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setIsOffsetScrolled(scrollTop > offsetY)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [offsetY])

  return isOffsetScrolled
}
