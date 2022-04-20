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
    <footer id="footer" className={clsx("relative h-4 z-40")}>
      {scrollButtonVisible ? (
        <button
          className={clsx(
            "absolute right-4 bottom-4",
            "flex items-center p-2 m-0.5",
            "cursor-pointer text-sm rounded rounded-br-xl",
            "bg-black text-gray-500 hover:text-gray-300",
          )}
          onClick={handleScrollToTop}
          title="Scroll to top"
        >
          <UpIcon aria-label="Scroll to top" />
        </button>
      ) : null}
    </footer>
  )
}
