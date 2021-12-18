import { Outlet } from "remix"

import AnimatedTitle from "~/components/AnimatedTitle"

export default function Blog(): JSX.Element {
  return (
    <main>
      <AnimatedTitle backAriaLabel="Back to blog.">Blog</AnimatedTitle>
      <Outlet />
    </main>
  )
}
