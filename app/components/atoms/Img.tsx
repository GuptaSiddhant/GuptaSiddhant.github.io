import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

export type ImgProps = React.ComponentProps<"img">

function Img(
  { className, ...props }: ImgProps,
  ref: ForwardedRef<HTMLImageElement>,
) {
  return (
    <img
      className={clsx("h-full w-full rounded object-cover", className)}
      {...props}
      ref={ref}
    />
  )
}

export default forwardRef(Img)
