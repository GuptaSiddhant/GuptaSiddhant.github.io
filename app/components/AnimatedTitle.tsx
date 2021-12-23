import clsx from "clsx"
import { NavLink } from "remix"
import BackIcon from "remixicon-react/ArrowLeftLineIcon"

import { getHeadingClassName } from "~/components/Heading"
import useNestedRoute from "~/helpers/useNestedRoute"

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
  const nested = useNestedRoute()
  const headingClassName = getHeadingClassName(nested ? 6 : 1)

  return (
    <div
      className={clsx(
        "relative container-mx my-4",
        "motion-safe:transition-all motion-safe:duration-500",
        headingClassName,
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
