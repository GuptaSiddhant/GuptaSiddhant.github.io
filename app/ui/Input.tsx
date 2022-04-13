import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"

export default function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">): JSX.Element {
  return (
    <input
      {...props}
      className={clsx(
        "rounded px-4 py-2",
        "bg-gray-800",
        "font-base",
        className,
      )}
    />
  )
}
