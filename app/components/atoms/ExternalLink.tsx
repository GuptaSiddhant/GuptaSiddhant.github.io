import clsx from "clsx"
import LinkIcon from "remixicon-react/ExternalLinkLineIcon"

import Tooltip from "~/components/atoms/Tooltip"
import type { BaseComponentProps } from "~/types"

export interface ExternalLinkProps extends BaseComponentProps {
  href?: string
  customBorder?: boolean
  customColor?: boolean
  tooltipLabel?: string
  enableIcon?: boolean
}

/** ExternalLink component */
export default function ExternalLink({
  children = <ExternalLinkIcon />,
  className,
  href,
  customBorder,
  customColor,
  tooltipLabel,
  enableIcon,
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
      {enableIcon && <ExternalLinkIcon />}
    </a>
  )

  if (tooltipLabel) {
    return <Tooltip label={tooltipLabel}>{linkElement}</Tooltip>
  }

  return linkElement
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
