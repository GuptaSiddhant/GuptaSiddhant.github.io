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
        "bg-depth",
        "text-secondary",
        "p-4",
        "-mx-4",
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
                  hideLineNumber={hideLineNumbers}
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
        "code-line",
        "select-none",
        "whitespace-normal",
        "text-disabled",
      )}
    >
      {children}
    </div>
  )
}

function Command({ children }: { children: string }) {
  return (
    <code className={clsx("code-line", "break-all")} data-content="$">
      {children}
    </code>
  )
}

function Line({
  children,
  hideLineNumber,
  noSpace,
  className,
}: {
  children: string
  hideLineNumber?: boolean
  noSpace?: boolean
  className?: string
}) {
  return (
    <span
      className={clsx(
        !hideLineNumber && "code-line",
        !hideLineNumber && "before:content-[counter(line)]",
        noSpace && "ml-0",
        className,
      )}
      style={{
        counterIncrement: "line",
      }}
    >
      {children}
    </span>
  )
}
