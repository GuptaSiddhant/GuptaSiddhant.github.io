import { type HTMLAttributes } from "react"
import clsx from "clsx"

export default function Section({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <section
      {...props}
      className={clsx("flex items-center gap-10", className)}
    />
  )
}
