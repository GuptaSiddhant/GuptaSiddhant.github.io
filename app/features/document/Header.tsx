import clsx from "clsx"
import { Link } from "@remix-run/react"

import { fullName } from "~/features/about"
import Navigation from "./Navigation"

export default function Header(): JSX.Element {
  return (
    <header
      id="header"
      className={clsx(
        "grid grid-rows-2 xs:grid-rows-none xs:grid-cols-[1fr_max-content] items-baseline",
        "py-2 px-8",
      )}
    >
      <Logo />
      <Navigation />
    </header>
  )
}

function Logo(): JSX.Element {
  return (
    <Link
      to="/"
      title={fullName}
      data-custom-color
      data-custom-border
      className={clsx(
        "select-none",
        "text-xl font-black uppercase leading-normal tracking-widest",
        "text-white",
        "text-ellipsis overflow-hidden whitespace-nowrap",
      )}
    >
      {fullName}
    </Link>
  )
}
