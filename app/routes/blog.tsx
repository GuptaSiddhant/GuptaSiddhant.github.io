import { Outlet } from "@remix-run/react"
import { Crumb, type MatchedCrumbProps } from "ui/Breadcrumbs"

export default function Blog(): JSX.Element {
  return <Outlet />
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps): JSX.Element => (
    <Crumb match={match}>Blog</Crumb>
  ),
}
