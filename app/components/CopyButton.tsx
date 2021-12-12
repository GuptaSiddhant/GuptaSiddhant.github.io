import { usePress } from "@react-aria/interactions"
import clsx from "clsx"
import useCopy from "use-copy"
import CopyIcon from "remixicon-react/FileCopyLineIcon"
import CheckIcon from "remixicon-react/CheckLineIcon"

import Tooltip, { useTooltip, type TooltipProps } from "./Tooltip"

export interface CopyButtonProps {
  children: string
  className?: string
  position?: TooltipProps["position"]
}

export default function CopyButton({
  children,
  className,
  position = "right",
}: CopyButtonProps) {
  const { triggerProps, tooltipProps, ref } = useTooltip<HTMLDivElement>({
    delay: 0,
  })
  const [copied, copy, setCopied] = useCopy(children)
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
        <CopyIcon aria-label="Copy" />
      )}

      <Tooltip {...tooltipProps} position={position}>
        {copied ? "Copied!" : "Copy"}
      </Tooltip>
    </div>
  )
}
