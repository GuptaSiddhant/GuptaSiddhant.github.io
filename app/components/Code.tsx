import { Children, type ReactNode } from "react"
import clsx from "clsx"

export interface CodeProps {
  className?: string
  children: ReactNode
  hideLineNumbers?: boolean
}

export default function Code({
  className,
  children,
  hideLineNumbers,
}: CodeProps) {
  const childrenArray = Children.toArray(children)
  const noSpace =
    hideLineNumbers && !childrenArray.some((child) => typeof child !== "string")

  return (
    <pre
      className={clsx(
        className,
        "bg-gray-200 dark:bg-black",
        "text-gray-800 dark:text-gray-200",

        "p-4",
        "-m-4",
        "rounded-xl",
        "whitespace-pre-wrap",
        ".w-full-plus-2rem",
      )}
      style={{ counterReset: "line" }}
    >
      {childrenArray.map((child) =>
        typeof child === "string"
          ? child
              .split("\n")
              .map((line, i) => (
                <Line
                  noSpace={noSpace}
                  hideLineNumber={!hideLineNumbers}
                  key={i}
                  children={line}
                />
              ))
          : child,
      )}
    </pre>
  )
}

Code.Comment = Comment
Code.Command = Command
Code.Line = Line

function Comment({ children }: { children: string }) {
  return (
    <div
      data-content="#"
      className={clsx(
        "select-none",
        "whitespace-normal",
        "text-gray-500",
        "before:content-[attr(data-content)]",
        "before:select-none",
        "before:mr-2",
        "ml-5",
      )}
      style={{ textIndent: "-1.25rem" }}
    >
      {children}
    </div>
  )
}

function Command({ children }: { children: string }) {
  return (
    <code
      data-content="$"
      className={clsx(
        "block",
        "ml-5",
        "break-all",
        "before:content-[attr(data-content)]",
        "before:text-gray-500",
        "before:select-none",
        "before:mr-2",
      )}
      style={{ textIndent: "-1.25rem" }}
    >
      {children}
    </code>
  )
}

function Line({
  children,
  hideLineNumber,
  noSpace,
}: {
  children: string
  hideLineNumber?: boolean
  noSpace?: boolean
}) {
  return (
    <span
      className={clsx(
        "block",
        noSpace ? "" : "ml-5",
        hideLineNumber && "before:content-[counter(line)]",
        hideLineNumber && "before:text-gray-500",
        hideLineNumber && "before:mr-2",
        hideLineNumber && "before:select-none",
      )}
      style={{
        textIndent: hideLineNumber ? "-1.25rem" : "",
        counterIncrement: "line",
      }}
    >
      {children}
    </span>
  )
}
