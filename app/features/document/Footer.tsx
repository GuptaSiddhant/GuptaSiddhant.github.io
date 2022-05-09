import clsx from "clsx"
import { useCallback } from "react"
import UpIcon from "remixicon-react/ArrowUpLineIcon"

import { useMainContainer } from "~/features/document"
import useOffsetScroll from "~/helpers/useOffsetScroll"
import Button from "~/ui/Button"

export default function Footer(): JSX.Element {
  const scrollButtonVisible = useOffsetScroll()
  const mainContainerRef = useMainContainer()

  const handleScrollToTop = useCallback(() => {
    mainContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [mainContainerRef])

  return (
    <footer id="footer" className={clsx("relative h-4 z-40")}>
      {scrollButtonVisible ? (
        <Button
          className={clsx("absolute right-4 bottom-4 m-0.5", "rounded-br-xl")}
          onClick={handleScrollToTop}
          title="Scroll to top"
        >
          <UpIcon aria-label="Scroll to top" />
        </Button>
      ) : null}
    </footer>
  )
}
