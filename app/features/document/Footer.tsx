import clsx from "clsx"
import UpIcon from "remixicon-react/ArrowUpLineIcon"

import useOffsetScroll from "~/helpers/useOffsetScroll"
import RoundedCorner from "./Rounded"

export default function Footer(): JSX.Element {
  const scrollButtonVisible = useOffsetScroll(300)

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="footer"
      className={clsx(
        "flex items-center justify-center",
        "fixed bottom-0 left-0 right-0 z-50",
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
