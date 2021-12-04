import clsx from "clsx"

export default function Tag({ children }: { children: string }): JSX.Element {
  return (
    <div
      className={clsx(
        "py-1 px-3 mr-2 mb-2",
        "border-2 border-blue-300 dark:border-blue-800",
        "hover:bg-blue-200 dark:hover:bg-blue-900",
        "rounded-full text-sm",
      )}
    >
      {children}
    </div>
  )
}
