import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

export interface InputProps extends React.ComponentProps<"input"> {}

/** Input component */
function Input(
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element | null {
  return (
    <input
      {...props}
      className={clsx("rounded", "bg-depth", className)}
      ref={ref}
    />
  )
}

export default forwardRef(Input)
