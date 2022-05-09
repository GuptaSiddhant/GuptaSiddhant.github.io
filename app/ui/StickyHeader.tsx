import clsx from "clsx"
import { type ReactNode } from "react"
import { CSS_VAR_HEADER_HEIGHT } from "~/constants"
import useOffsetScroll from "~/helpers/useOffsetScroll"

export default function StickyHeader({
  children,
  className,
}: {
  className?: string
  children: ReactNode
}): JSX.Element {
  const { isOffsetScrolled, scrollDirection } = useOffsetScroll()

  return (
    <header
      className={clsx(
        className,
        "sticky top-0 px-4 py-2 z-50 bg-black",
        "grid grid-cols-[1fr_max-content] items-center",
        "transition-transform duration-500",
        isOffsetScrolled && scrollDirection === "down"
          ? "translate-y-0"
          : "-translate-y-[100px]",
      )}
      style={{ minHeight: `var(${CSS_VAR_HEADER_HEIGHT}, auto)` }}
    >
      {children}
    </header>
  )
}
