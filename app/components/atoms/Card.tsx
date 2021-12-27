import clsx from "clsx"
import { forwardRef } from "react"

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
}

/** Card component */
const Card = forwardRef<HTMLElement, CardProps>(
  ({ className, children, as = "div", ...props }, ref): JSX.Element | null => {
    const Component: any = as

    return (
      <Component
        {...props}
        className={clsx(
          "relative overflow-hidden",
          "border-2 border-solid border-gray-300 dark:border-gray-700",
          "bg-hover hover:shadow-xl",
          "h-full p-8 rounded-2xl",
          "flex gap-4",
          "transition-transform duration-300",
          "hover:scale-[1.025]",
          "group",
          className,
        )}
        ref={ref}
      >
        {children}
      </Component>
    )
  },
)

export default Card
