import clsx from "clsx"
import type { HTMLAttributes } from "react"

import type { BaseComponentProps } from "~/types"

export type CardProps = BaseComponentProps &
  HTMLAttributes<HTMLImageElement> & {
    as?: keyof JSX.IntrinsicElements
  }

/** Card component */
export default function Card({
  className,
  children,
  as = "div",
  ...props
}: CardProps): JSX.Element | null {
  const Component: any = as

  return (
    <Component
      {...props}
      className={clsx(
        "relative overflow-hidden",
        "bg-hover hover:shadow-xl",
        "h-full p-8 rounded-2xl",
        "flex gap-4",
        "transition-transform duration-300",
        "hover:scale-102",
        "group",
        className,
      )}
    >
      {children}
    </Component>
  )
}
