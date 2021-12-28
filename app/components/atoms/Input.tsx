import clsx from "clsx"

import withRef from "~/helpers/withRef"

export interface InputProps extends React.ComponentProps<"input"> {}

/** Input component */
function Input({ className, ...props }: InputProps): JSX.Element | null {
  return (
    <input {...props} className={clsx("rounded", "dark:bg-depth", className)} />
  )
}

export default withRef(Input)
