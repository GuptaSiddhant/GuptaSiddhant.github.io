import clsx from "clsx"

import withRef from "~/helpers/withRef"

export type ImgProps = React.ComponentProps<"img">

function Img({ className, ...props }: ImgProps) {
  return (
    <img
      className={clsx("h-full w-full rounded object-cover", className)}
      {...props}
    />
  )
}

export default withRef(Img)
