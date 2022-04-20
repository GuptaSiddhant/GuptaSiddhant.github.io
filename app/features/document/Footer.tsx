import clsx from "clsx"
import { useCallback } from "react"
import UpIcon from "remixicon-react/ArrowUpLineIcon"

import useMainContainer from "~/contexts/MainContainer"
import useOffsetScroll from "~/helpers/useOffsetScroll"

export default function Footer(): JSX.Element {
  const scrollButtonVisible = useOffsetScroll()
  const mainContainerRef = useMainContainer()

  const handleScrollToTop = useCallback(() => {
    mainContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [mainContainerRef])

  return (
    <footer
      id="footer"
      className={clsx("flex items-center justify-center bg-black h-4")}
    >
      {scrollButtonVisible ? (
        <button
          className="flex cursor-pointer items-center text-sm text-gray-500 hover:text-gray-300"
          onClick={handleScrollToTop}
        >
          <UpIcon aria-label="Scroll to top" />
        </button>
      ) : null}
    </footer>
  )
}
