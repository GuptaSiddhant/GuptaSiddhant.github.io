import UpIcon from "remixicon-react/ArrowUpLineIcon"
import Button from "~/components/atoms/Button"
import { name } from "../about"

export default function Footer(): JSX.Element {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="footer"
      className="container-mx flex justify-between items-center border-t border-opacity-20 mt-10 "
    >
      <div className="text-center my-4 text-gray-500">
        <small className="text-sm">&copy; {name}</small>
      </div>
      <Button
        className="flex text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer items-center"
        onClick={handleScrollToTop}
      >
        <UpIcon aria-label="Up" className="scale-90" /> {"Scroll to top"}
      </Button>
    </footer>
  )
}
