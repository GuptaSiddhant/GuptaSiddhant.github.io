import { Outlet } from "remix"

import AnimatedTitle from "~/components/molecules/AnimatedTitle"

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
