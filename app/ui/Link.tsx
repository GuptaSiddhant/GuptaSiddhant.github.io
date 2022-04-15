import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"
import { Link, type LinkProps } from "remix"
import LinkIcon from "remixicon-react/ExternalLinkLineIcon"

import type { PropsWithChildren } from "~/ui/types"

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

export function InternalLink({ className, ...props }: LinkProps): JSX.Element {
  return (
    <Link
      {...props}
      className={clsx(
        "text-blue-400 no-underline hover:text-blue-300 hover:underline active:text-blue-400",
        className,
      )}
    />
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
      className={clsx("text-blue-400 hover:underline", className)}
      target="_blank"
      rel="noopener"
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
