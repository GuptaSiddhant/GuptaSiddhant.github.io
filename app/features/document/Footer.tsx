import clsx from "clsx"
import { useEffect, useState } from "react"
import UpIcon from "remixicon-react/ArrowUpLineIcon"

import RoundedCorner from "./Rounded"

export default function Footer(): JSX.Element {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setScrollButtonVisible(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="footer"
      className={clsx(
        "flex items-center justify-center",
        "fixed bottom-0 left-0 right-0 z-10",
        "h-6 bg-black",
      )}
    >
      {scrollButtonVisible ? (
        <button
          className="flex cursor-pointer items-center text-sm text-gray-500 hover:text-gray-300"
          onClick={handleScrollToTop}
        >
          <UpIcon aria-label="Scroll to top" />
        </button>
      ) : null}

      <RoundedCorner position="bottom-left" />
      <RoundedCorner position="bottom-right" />
    </footer>
  )
}
