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
  const offsetCrossed = useOffsetScroll()

  return (
    <header
      className={clsx(
        "sticky top-0 px-4 py-1",
        "flex items-center z-50",
        "transition-transform bg-black",
        offsetCrossed ? "translate-y-0" : "-translate-y-[100px]",
        className,
      )}
    >
      {children}
    </header>
  )
}
