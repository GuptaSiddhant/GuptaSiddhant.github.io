import clsx from "clsx"
import { NavLink, Outlet, useLocation } from "remix"
import BackIcon from "remixicon-react/ArrowLeftLineIcon"

export default function Projects(): JSX.Element {
  const { pathname } = useLocation()
  const nested = pathname.split("/").length > 2
  const title = "Projects"

  return (
    <main>
      <div
        className={clsx(
          "relative",
          nested ? "xl:left-1-6" : "left-0",
          nested ? "text-3xl" : "text-6xl",
          "mx-auto my-4",
          "transition-all",
          "duration-500",
          "container-mx",
        )}
      >
        <NavLink
          to="."
          title="Go back to the projects page"
          data-custom-color
          data-custom-border
          className={clsx("font-bold", "flex items-center")}
        >
          {nested ? (
            <BackIcon
              aria-label="Back to all projects."
              size="1em"
              className="mr-4"
            />
          ) : null}
          {title}
        </NavLink>
      </div>
      <Outlet />
    </main>
  )
}
