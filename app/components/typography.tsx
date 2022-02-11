import clsx from "clsx"
import type { PropsWithChildren } from "./types"

export function H1({ className, ...props }: PropsWithChildren) {
  return (
    <h1
      {...props}
      className={clsx("text-6xl font-bold leading-tight", className)}
    />
  )
}

export function H2({ className, ...props }: PropsWithChildren) {
  return (
    <h1
      {...props}
      className={clsx("text-5xl font-bold leading-tight", className)}
    />
  )
}
