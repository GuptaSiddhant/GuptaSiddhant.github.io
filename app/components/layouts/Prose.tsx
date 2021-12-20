import { type HTMLAttributes } from "react"
import clsx from "clsx"

export default function Section({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <section
      {...props}
      className={clsx(
        "prose",
        "sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl",
        "dark:prose-invert mx-auto px-8 sm:px-0",
        className,
      )}
    />
  )
}
