import clsx from "clsx"

import Img, { ImgProps } from "~/components/atoms/Img"

export interface FigureProps extends ImgProps {
  imageClassName?: string
  _ref?: React.ForwardedRef<HTMLElement>
  _imageRef?: React.ForwardedRef<HTMLImageElement>
}

export default function Figure({
  className,
  imageClassName,
  title,
  _ref,
  _imageRef,
  ...props
}: FigureProps) {
  return (
    <figure
      className={clsx("overflow-hidden", "bg-base", "relative", className)}
      ref={_ref}
    >
      <Img
        className={clsx("h-full w-full rounded object-cover", imageClassName)}
        {...props}
        ref={_imageRef}
      />
      {title ? (
        <figcaption
          className={clsx(
            "text-sm text-center",
            "italic mt-2",
            "text-tertiary",
          )}
        >
          {title}
        </figcaption>
      ) : null}
    </figure>
  )
}
