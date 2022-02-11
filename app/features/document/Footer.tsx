import UpIcon from "remixicon-react/ArrowUpLineIcon"

import { fullName } from "~/features/about"

export default function Footer(): JSX.Element {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="footer"
      className="container-mx mt-10 flex items-center justify-between border-t border-opacity-20 "
    >
      <div className="my-4 text-center text-gray-500">
        <small className="text-sm">&copy; {fullName}</small>
      </div>
      <button
        className="flex cursor-pointer items-center text-sm text-gray-500 hover:text-gray-300"
        onClick={handleScrollToTop}
      >
        {"Scroll to top"} <UpIcon aria-label="Up" className="scale-90" />
      </button>
    </footer>
  )
}
