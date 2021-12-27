import clsx from "clsx"
import { forwardRef } from "react"

export type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>

const Img = forwardRef<HTMLImageElement, ImgProps>(
  ({ className, ...props }, ref) => (
    <img
      className={clsx("h-full w-full rounded object-cover", className)}
      {...props}
      ref={ref}
    />
  ),
)

export default Img
