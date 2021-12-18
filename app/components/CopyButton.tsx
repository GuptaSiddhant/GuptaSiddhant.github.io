import { usePress } from "@react-aria/interactions"
import clsx from "clsx"
import useCopy from "use-copy"
import CopyIcon from "remixicon-react/FileCopyLineIcon"
import CheckIcon from "remixicon-react/CheckLineIcon"

import Tooltip, { useTooltip, type TooltipProps } from "./Tooltip"
import type { BaseComponentProps } from "~/types"

export interface CopyButtonProps extends BaseComponentProps {
  content: string
  position?: TooltipProps["position"]
  label?: string
}

export default function CopyButton({
  content,
  className,
  position = "right",
  label = "Copy",
  children,
}: CopyButtonProps) {
  const { triggerProps, tooltipProps, ref } = useTooltip<HTMLDivElement>({
    delay: 0,
  })
  const [copied, copy, setCopied] = useCopy(content)
  const handleCopy = () => {
    copy()
    setTimeout(() => setCopied(false), 3000)
  }
  const { pressProps } = usePress({ onPress: handleCopy })

  return (
    <div
      className={clsx(
        "cursor-pointer",
        className,
        tooltipProps.state.isOpen ? "opacity-100" : "opacity-50",
      )}
      ref={ref}
      {...triggerProps}
      {...pressProps}
      tabIndex={0}
    >
      {copied ? (
        <CheckIcon aria-label="Copied" />
      ) : (
        children || <CopyIcon aria-label={label} />
      )}

      <Tooltip {...tooltipProps} position={position}>
        {copied ? "Copied!" : label}
      </Tooltip>
    </div>
  )
}
