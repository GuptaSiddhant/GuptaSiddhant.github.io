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

interface TooltipProps extends AriaTooltipProps {
  children: ReactNode
  state: TooltipTriggerState
}

export default function Tooltip({
  state,
  ...props
}: TooltipProps): JSX.Element | null {
  const { tooltipProps } = useAriaTooltip(props, state)

  return state.isOpen ? (
    <div
      {...mergeProps(props, tooltipProps)}
      className={clsx(
        "bg-hover",
        "text-secondary",
        "py-1 px-2 rounded-md ml-2",
        "absolute top-0 left-full",
        "min-w-max",
      )}
      style={{ textIndent: 0 }}
    >
      {props.children}
    </div>
  ) : null
}
