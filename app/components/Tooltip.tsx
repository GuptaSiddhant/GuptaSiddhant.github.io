import { useRef, type ReactNode } from "react"
import {
  useTooltipTrigger,
  useTooltip as useAriaTooltip,
} from "@react-aria/tooltip"
import {
  useTooltipTriggerState,
  type TooltipTriggerState,
} from "@react-stately/tooltip"
import {
  type AriaTooltipProps,
  type TooltipTriggerProps,
} from "@react-types/tooltip"
import { mergeProps } from "@react-aria/utils"
import clsx from "clsx"

export function useTooltip<T extends HTMLElement>(
  props: TooltipTriggerProps = {},
) {
  const state = useTooltipTriggerState(props)
  const ref = useRef<T>(null)
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref)

  return { triggerProps, tooltipProps: { ...tooltipProps, state }, ref }
}

export interface TooltipProps extends AriaTooltipProps {
  children: ReactNode
  state: TooltipTriggerState
  position?: "top" | "bottom" | "left" | "right"
}

export default function Tooltip({
  state,
  position = "right",
  ...props
}: TooltipProps): JSX.Element | null {
  const { tooltipProps } = useAriaTooltip(props, state)

  const positionClassName = clsx(
    position === "right" && "top-0 left-full",
    position === "left" && "top-0 right-full",
    position === "top" && "bottom-full left-0",
    position === "bottom" && "top-full left-0",
  )

  return state.isOpen ? (
    <div
      {...mergeProps(props, tooltipProps)}
      className={clsx(
        "bg-hover",
        "text-secondary",
        "py-1 px-2 rounded-md ml-2",
        "absolute",
        "min-w-max",
        positionClassName,
      )}
      style={{ textIndent: 0 }}
    >
      {props.children}
    </div>
  ) : null
}
