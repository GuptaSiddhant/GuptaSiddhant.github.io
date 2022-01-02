import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

export interface PreProps extends React.ComponentProps<"pre"> {}

export function Pre(
  { children, className, ...props }: PreProps,
  ref: ForwardedRef<HTMLPreElement>,
): JSX.Element {
  return (
    <pre
      className={clsx(
        "bg-gray-900 dark:bg-black",
        "text-secondary",
        "p-4 -mx-4 my-4",
        "rounded-xl",
        "whitespace-pre-wrap",
        "relative",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </pre>
  )
}

export default forwardRef(Pre)
