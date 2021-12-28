import clsx from "clsx"
import withRef from "~/helpers/withRef"

export interface PreProps extends React.ComponentProps<"pre"> {}

export function Pre({ children, className, ...props }: PreProps): JSX.Element {
  return (
    <pre
      className={clsx(
        "bg-gray-900 dark:bg-black",
        "text-secondary",
        "p-4 -mx-4 my-4",
        "rounded-xl",
        "whitespace-pre-wrap",
        "relative",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  )
}

export default withRef(Pre)
