import clsx from "clsx"
import { Outlet } from "remix"

import AnimatedTitle from "~/components/AnimatedTitle"
import useNestedRoute from "~/helpers/useNestedRoute"

export default function Projects(): JSX.Element {
  const nested = useNestedRoute()

  return (
    <main>
      <AnimatedTitle backAriaLabel="Back to all projects.">
        Projects
      </AnimatedTitle>
      <Outlet />
    </main>
  )
}
