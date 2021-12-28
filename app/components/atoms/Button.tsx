import clsx from "clsx"

import withRef from "~/helpers/withRef"

export interface ButtonProps extends React.ComponentProps<"button"> {}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx(className)}>
      {children}
    </button>
  )
}

export default withRef(Button)
