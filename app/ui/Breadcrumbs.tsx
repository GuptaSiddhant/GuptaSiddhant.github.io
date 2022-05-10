import { Link, useLocation, useMatches } from "@remix-run/react"
import clsx from "clsx"
import type { ReactNode } from "react"
import type { Params, To } from "react-router"

export default function Breadcrumbs(): JSX.Element | null {
  const matches = useMatches()
  const crumbs: JSX.Element[] = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match, index) => {
      return (
        <li key={match.id}>
          {match.handle.breadcrumb(match)}
          {index < matches.length - 1 ? <span className="px-2">/</span> : null}
        </li>
      )
    })

  return <nav className={clsx("list-none", "flex flex-wrap")}>{crumbs}</nav>
}

export function Crumb({
  children,
  className,
  to,
  match,
}: {
  match: MatchedCrumbProps
  children: ReactNode
  to?: To
  className?: string
}): JSX.Element {
  const { pathname } = useLocation()
  const active = pathname === match.pathname
  const commonClassNames = clsx(
    className,
    "text-ellipsis overflow-hidden whitespace-nowrap",
  )

  if (active)
    return (
      <span className={clsx(commonClassNames, "font-bold text-white")}>
        {children}
      </span>
    )

  return (
    <Link
      to={to ?? match.pathname}
      className={clsx(
        commonClassNames,
        "text-gray-200 hover:text-white",
        "text-base xs:text-lg",
      )}
    >
      {children}
    </Link>
  )
}

export interface MatchedCrumbProps<T = any> {
  id: string
  pathname: string
  params: Params<string>
  data: T
  handle: any
}
