import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

export interface ButtonProps extends React.ComponentProps<"button"> {}

function Button(
  { children, className, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button {...props} className={clsx(className)} ref={ref}>
      {children}
    </button>
  )
}

export default forwardRef(Button)
