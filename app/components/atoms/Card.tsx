import clsx from "clsx"

import withRef from "~/helpers/withRef"

export interface CardProps extends React.ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements
}

/** Card component */
function Card({
  className,
  children,
  ref,
  as,
  ...props
}: CardProps): JSX.Element | null {
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
        "hover:scale-[1.025]",
        "group",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default withRef(Card)
