import clsx from "clsx"

import Logo from "./Logo"
import Navigation from "./Navigation"

export default function Header(): JSX.Element {
  return (
    <header
      id="header"
      className={clsx(
        "!bg-opacity-75 bg-base backdrop-blur-md",
        "flex flex-row justify-between items:center sm:items-baseline",
        "container-mx top-0 z-30 sticky",
      )}
    >
      <Logo />
      <Navigation />
    </header>
  )
}
