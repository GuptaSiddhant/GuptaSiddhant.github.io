import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

import type { PropsWithChildren } from "./types"

export const proseWidth = clsx("md:min-w-[64ch] max-w-[64ch] mx-auto px-4")

export function Section({
  children,
  className,
  elementRef,
  ...props
}: PropsWithChildren): JSX.Element {
  return (
    <section
      {...props}
      className={clsx("w-full py-24", "flex flex-col gap-12", className)}
      ref={elementRef}
    >
      {children}
    </section>
  )
}

export function SectionProse({
  children,
  className,
  ...props
}: PropsWithChildren): JSX.Element {
  return (
    <Section {...props} className={clsx(proseWidth, className)}>
      {children}
    </Section>
  )
}
