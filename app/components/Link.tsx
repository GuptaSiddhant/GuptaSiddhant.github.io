import clsx from "clsx"
import { Link, type LinkProps } from "remix"
import LinkIcon from "remixicon-react/ExternalLinkLineIcon"

import type { PropsWithChildren } from "~/components/types"

export { Link, type LinkProps }

export interface ExternalLinkProps {
  href?: string
  tooltipLabel?: string
  enableIcon?: boolean
}

export function InternalLink({ className, ...props }: LinkProps): JSX.Element {
  return (
    <Link
      {...props}
      className={clsx("text-blue-400 hover:underline", className)}
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
