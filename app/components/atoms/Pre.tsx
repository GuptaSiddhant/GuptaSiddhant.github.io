import clsx from "clsx"

export interface PreProps extends React.ComponentProps<"pre"> {}

export default function Pre({
  children,
  className,
  ...props
}: PreProps): JSX.Element {
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
