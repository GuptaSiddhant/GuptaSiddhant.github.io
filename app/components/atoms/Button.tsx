import clsx from "clsx"
import { forwardRef } from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={clsx(className)}>
        {children}
      </button>
    )
  },
)

export default Button
