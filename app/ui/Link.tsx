import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"
import { Link, type LinkProps } from "@remix-run/react"
import LinkIcon from "remixicon-react/ExternalLinkLineIcon"

import type { PropsWithChildren } from "~/types"

export { Link, type LinkProps }

export interface ExternalLinkProps {
  href?: string
  tooltipLabel?: string
  enableIcon?: boolean
}

export function AnchorLink({
  href,
  ...props
}: ComponentPropsWithoutRef<"a">): JSX.Element {
  if (!href) return <></>

  if (href.includes("://")) {
    return <ExternalLink href={href} enableIcon {...props} />
  }

  return <InternalLink to={href} {...props} />
}

export function InternalLink({
  className,
  children,
  ...props
}: LinkProps): JSX.Element {
  return (
    <Link
      {...props}
      className={clsx(
        "text-link no-underline hover:text-link-hover hover:underline active:text-link",
        className,
      )}
    >
      {children}
    </Link>
  )
}

/** ExternalLink component */
export function ExternalLink({
  children = <ExternalLinkIcon />,
  className,
  href,
  tooltipLabel,
  enableIcon,
}: PropsWithChildren<ExternalLinkProps>): JSX.Element | null {
  if (!href) return null

  return (
    <a
      href={href}
      className={clsx("text-link hover:underline", className)}
      target="_blank"
      rel="noreferrer"
      title={tooltipLabel}
    >
      {children}
      {enableIcon && <ExternalLinkIcon />}
    </a>
  )
}

function ExternalLinkIcon(): JSX.Element {
  return (
    <LinkIcon
      aria-label="External link"
      style={{
        display: "inline-block",
        marginLeft: "0.2em",
        verticalAlign: "middle",
      }}
      size="1em"
    />
  )
}
