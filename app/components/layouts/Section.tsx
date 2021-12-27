import { type HTMLAttributes } from "react"
import clsx from "clsx"

export default function Section({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { id: string }): JSX.Element {
  return (
    <section
      {...props}
      className={clsx("flex gap-10 relative container-mx", className)}
    />
  )
}
