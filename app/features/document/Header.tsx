import clsx from "clsx"
import { Link } from "@remix-run/react"

import { fullName } from "~/features/about"
import Navigation from "./Navigation"
import RoundedCorner from "./Rounded"

export default function Header(): JSX.Element {
  return (
    <header
      id="header"
      className={clsx(
        "flex flex-row items-baseline justify-between",
        "bg-black py-4 px-10",
        "fixed top-0 left-0 right-0 z-50",
      )}
    >
      <Logo />
      <Navigation />
      <RoundedCorner position="top-left" />
      <RoundedCorner position="top-right" />
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
