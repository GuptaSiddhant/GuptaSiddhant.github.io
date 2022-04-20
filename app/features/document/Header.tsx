import clsx from "clsx"
import { Link } from "@remix-run/react"

import { fullName } from "~/features/about"
import Navigation from "./Navigation"

export default function Header(): JSX.Element {
  return (
    <header
      id="header"
      className={clsx(
        "flex flex-row items-baseline justify-between",
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
      )}
    >
      {fullName}
    </Link>
  )
}
