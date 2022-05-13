import { Link } from "@remix-run/react"
import clsx from "clsx"
import { useRef } from "react"

import { CSS_VAR_HEADER_HEIGHT } from "~/constants"
import { fullName } from "~/features/about"
import useEventListener from "~/helpers/useEventListener"
import Navigation from "./Navigation"
import RoundedCorner from "./Rounded"

export default function Header(): JSX.Element {
  const headerRef = useRef<HTMLElement>(null)

  useEventListener(
    "resize",
    () => {
      const headerHeight =
        headerRef.current?.getBoundingClientRect().height || 0
      document.documentElement.style.setProperty(
        CSS_VAR_HEADER_HEIGHT,
        `${headerHeight}px`,
      )
    },
    true,
  )

  return (
    <header
      data-header
      ref={headerRef}
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 bg-black",
        "grid grid-rows-2 sm:grid-rows-none sm:grid-cols-[1fr_max-content] items-baseline",
        "py-2 px-8",
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
        "text-ellipsis overflow-hidden whitespace-nowrap",
      )}
    >
      {fullName}
    </Link>
  )
}
