import clsx from "clsx"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageClassName?: string
}

export default function Image({
  className,
  imageClassName,
  title,
  ...props
}: ImageProps) {
  return (
    <figure className={clsx("overflow-hidden", "bg-base", className)}>
      <img
        className={clsx("h-full w-full rounded object-cover", imageClassName)}
        {...props}
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
