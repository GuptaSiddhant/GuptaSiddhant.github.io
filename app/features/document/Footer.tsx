import clsx from "clsx"
import { useCallback } from "react"
import UpIcon from "remixicon-react/ArrowUpLineIcon"

import useOffsetScroll from "~/helpers/useOffsetScroll"
import Button from "~/ui/Button"
import RoundedCorner from "~/ui/RoundedCorner"

export default function Footer(): JSX.Element {
  const { isOffsetScrolled: scrollButtonVisible } = useOffsetScroll()

  const handleScrollToTop = useCallback(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <footer
      data-footer
      className={clsx("fixed bottom-0 right-0 left-0", "h-4 z-40 bg-black")}
    >
      {scrollButtonVisible ? (
        <Button
          className={clsx(
            "absolute right-4 bottom-full m-0.5",
            "rounded-br-xl",
          )}
          onClick={handleScrollToTop}
          title="Scroll to top"
        >
          <UpIcon aria-label="Scroll to top" />
        </Button>
      ) : null}
      <RoundedCorner bottom />
      <RoundedCorner bottom right />
    </footer>
  )
}
