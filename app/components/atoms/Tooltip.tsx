import ReachTooltip, {
  type TooltipProps as ReachTooltipProps,
} from "@reach/tooltip"
import clsx from "clsx"

export type TooltipProps = ReachTooltipProps & { className?: string }

/** Tooltip component */
export default function Tooltip({
  children,
  className,
  ...props
}: TooltipProps): JSX.Element | null {
  return (
    <ReachTooltip
      className={clsx(
        "bg-white dark:bg-gray-700",
        "text-tertiary text-sm",
        "border-gray-400 dark:border-gray-600 rounded",
        "shadow-md",
        "cursor-none",
        "absolute whitespace-nowrap",
        "px-2 py-1 z-50",
        className,
      )}
      {...props}
    >
      {children}
    </ReachTooltip>
  )
}
