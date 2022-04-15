import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"

export default function Pre(
  props: ComponentPropsWithoutRef<"pre">,
): JSX.Element {
  return <pre className="-mx-4 overflow-clip rounded" {...props} />
}
