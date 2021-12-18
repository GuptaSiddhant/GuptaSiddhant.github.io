import clsx from "clsx"
import { NavLink, useLocation } from "remix"
import BackIcon from "remixicon-react/ArrowLeftLineIcon"

import useReducedMotion from "~/helpers/useReducedMotion"

export interface TitleProps {
  className?: string
  children: string
  backAriaLabel?: string
}

export default function AnimatedTitle({
  children,
  className,
  backAriaLabel = "Go back",
}: TitleProps): JSX.Element {
  const preferReducedMotion = useReducedMotion()
  const { pathname } = useLocation()
  const pathNameArray = pathname.split("/")
  const nested = pathNameArray.length > 2 && pathNameArray[2] !== ""

  return (
    <div
      className={clsx(
        "relative",
        "mx-auto my-4",
        "duration-500",
        "container-mx",
        "font-bold",
        nested ? "xl:left-1-6" : "left-0",
        nested ? "text-3xl" : "text-6xl",
        !preferReducedMotion && "transition-all",
        className,
      )}
    >
      {nested ? (
        <NavLink
          to="."
          title={backAriaLabel}
          data-custom-color
          data-custom-border
          className={clsx("flex items-center")}
        >
          <BackIcon aria-label={backAriaLabel} size="1em" className="mr-4" />
          {children}
        </NavLink>
      ) : (
        children
      )}
    </div>
  )
}
