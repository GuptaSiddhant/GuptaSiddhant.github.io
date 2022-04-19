import clsx from "clsx"
import { type ReactNode } from "react"
import useOffsetScroll from "~/helpers/useOffsetScroll"

export default function StickyHeader({
  children,
  className,
}: {
  className?: string
  children: ReactNode
}): JSX.Element {
  const offsetCrossed = useOffsetScroll(500)

  return (
    <header
      className={clsx(
        "fixed left-0 right-0 bg-black py-2 px-10",
        "overflow-hidden transition-all",
        offsetCrossed ? "visible top-14 z-50 h-auto" : "invisible top-10 h-0",
        "flex items-center",
        className,
      )}
    >
      {children}
    </header>
  )
}
