import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"

export default function Img({
  link,
  ...props
}: ComponentPropsWithoutRef<"img"> & { link?: boolean }): JSX.Element | null {
  const imageElement = (
    <img
      alt=""
      {...props}
      className={clsx(props.className, "!m-0 rounded", "min-h-[200px]")}
      loading="lazy"
    />
  )

  return (
    <figure className="-mx-4 overflow-clip rounded">
      {link ? (
        <a href={props.src} target="_blank" rel="noreferrer">
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      {props.title ? (
        <figcaption className="text-center">{props.title}</figcaption>
      ) : null}
    </figure>
  )
}
