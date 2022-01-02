import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

export interface CardProps extends React.ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements
}

/** Card component */
function Card(
  { className, children, as, ...props }: CardProps,
  ref: ForwardedRef<HTMLElement>,
): JSX.Element | null {
  const Component: any = as || "div"

  return (
    <Component
      {...props}
      className={clsx(
        "relative overflow-hidden",
        "border-2 border-solid border-gray-300 dark:border-gray-700",
        "bg-hover hover:shadow-xl",
        "h-full p-8 rounded-2xl",
        "flex",
        "transition-transform duration-300",
        "group",
        className,
      )}
      ref={ref}
    >
      {children}
    </Component>
  )
}

export default forwardRef(Card)
