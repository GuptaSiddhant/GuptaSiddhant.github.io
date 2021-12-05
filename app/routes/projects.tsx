import clsx from "clsx"
import { NavLink, Outlet, useLocation } from "remix"

export default function Projects(): JSX.Element {
  const { pathname } = useLocation()
  const nested = pathname.split("/").length > 2
  const title = "Projects"

  return (
    <main>
      <NavLink
        to="."
        className={clsx(
          nested ? "text-4xl" : "text-7xl",
          "transition-all",
          "duration-500",
          "font-bold",
        )}
        data-custom-color
        data-custom-border
      >
        {title}
      </NavLink>
      <Outlet />
    </main>
  )
}
