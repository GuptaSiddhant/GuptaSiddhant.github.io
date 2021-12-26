import { Outlet } from "remix"

import AnimatedTitle from "~/components/AnimatedTitle"

export default function Projects(): JSX.Element {
  return (
    <main>
      <AnimatedTitle backAriaLabel="Back to all projects.">
        Projects
      </AnimatedTitle>
      <Outlet />
    </main>
  )
}
