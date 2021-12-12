import clsx from "clsx"
import React from "react"

export default function Image({
  className,
  title,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  const imageClassName = clsx("h-full w-full rounded object-cover")

  return (
    <figure className={clsx("overflow-hidden bg-base", className)}>
      <img className={imageClassName} {...props} />
      {title ? (
        <figcaption className="text-sm text-tertiary italic mt-2 text-center">
          {title}
        </figcaption>
      ) : null}
    </figure>
  )
}
