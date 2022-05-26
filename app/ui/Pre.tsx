import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"

export default function Pre({
  className,
  ...props
}: ComponentPropsWithoutRef<"pre">): JSX.Element {
  // console.log(props)
  return (
    <pre
      {...props}
      className={clsx(
        "-mx-4 overflow-clip rounded-md whitespace-pre-wrap p-4 bg-default text-base",
        className,
      )}
    />
  )
}
