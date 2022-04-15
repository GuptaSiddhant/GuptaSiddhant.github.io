import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"

export default function Img(
  props: ComponentPropsWithoutRef<"img">,
): JSX.Element {
  return (
    <figure className="-mx-4 overflow-clip rounded">
      <img {...props} className={clsx(props.className, "!m-0 rounded")} />
      {props.title ? (
        <figcaption className="text-center">{props.title}</figcaption>
      ) : null}
    </figure>
  )
}
