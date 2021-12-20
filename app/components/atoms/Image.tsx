import clsx from "clsx"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ className, title, ...props }: ImageProps) {
  return (
    <figure
      className={clsx("overflow-hidden", "bg-base", "not-prose", className)}
    >
      <img className={clsx("h-full w-full rounded object-cover")} {...props} />
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
