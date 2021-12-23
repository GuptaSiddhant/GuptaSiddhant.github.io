import clsx from "clsx"
import ExternalLinkIcon from "remixicon-react/ExternalLinkLineIcon"

import Tooltip from "~/components/atoms/Tooltip"
import type { BaseComponentProps } from "~/types"

export interface ExternalLinkProps extends BaseComponentProps {
  href?: string
  customBorder?: boolean
  customColor?: boolean
  tooltipLabel?: string
}

/** ExternalLink component */
export default function ExternalLink({
  children = <ExternalLinkIcon aria-label="External link" />,
  className,
  href,
  customBorder,
  customColor,
  tooltipLabel,
}: ExternalLinkProps): JSX.Element | null {
  if (!href) return null

  const linkElement = (
    <a
      href={href}
      className={clsx(className)}
      target="_blank"
      rel="noopener"
      data-custom-border={customBorder}
      data-custom-color={customColor}
    >
      {children}
    </a>
  )

  if (tooltipLabel) {
    return <Tooltip label={tooltipLabel}>{linkElement}</Tooltip>
  }

  return linkElement
}
