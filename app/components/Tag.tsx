import clsx from "clsx"

export default function Tag({ children }: { children: string }): JSX.Element {
  return (
    <div
      className={clsx(
        "py-1 px-2 rounded-lg",
        "border-2 border-blue-300 dark:border-blue-700",
        "hover:bg-blue-200 dark:hover:bg-blue-900",
        "text-sm",
      )}
    >
      {children}
    </div>
  )
}
