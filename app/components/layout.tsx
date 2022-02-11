import clsx from "clsx"

import type { PropsWithChildren } from "./types"

export const proseWidth = clsx("md:min-w-[64ch] max-w-[64ch] mx-auto px-4")

export function Section64({
  children,
  className,
  id,
}: PropsWithChildren): JSX.Element {
  return (
    <Section id={id} className={clsx(proseWidth, className)}>
      {children}
    </Section>
  )
}

export function Section({
  children,
  className,
  id,
}: PropsWithChildren): JSX.Element {
  return (
    <section
      id={id}
      className={clsx("w-full py-24", "flex flex-col gap-12", className)}
    >
      {children}
    </section>
  )
}
