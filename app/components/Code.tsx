import { Children, type ReactNode } from "react"
import { usePress } from "@react-aria/interactions"
import clsx from "clsx"
import useCopy from "use-copy"
import CopyIcon from "remixicon-react/FileCopyLineIcon"
import CheckIcon from "remixicon-react/CheckLineIcon"

import Tooltip, { useTooltip } from "./Tooltip"

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
  const [copied, copy, setCopied] = useCopy(children)
  const { triggerProps, tooltipProps, ref } = useTooltip<HTMLDivElement>({
    delay: 0,
  })

  const handleCopy = () => {
    copy()
    setTimeout(() => setCopied(false), 3000)
  }
  const { pressProps } = usePress({ onPress: handleCopy })

  return (
    <code
      className={clsx("code-line", "break-all", "relative")}
      data-content="$"
    >
      {children}

      <div
        className={clsx(
          "absolute right-0 bottom-0",
          "cursor-pointer",
          tooltipProps.state.isOpen ? "opacity-100" : "opacity-50",
        )}
        ref={ref}
        {...triggerProps}
        {...pressProps}
        tabIndex={0}
      >
        {copied ? (
          <CheckIcon aria-label="Copied" />
        ) : (
          <CopyIcon aria-label="Copy" />
        )}

        <Tooltip {...tooltipProps}>{copied ? "Copied!" : "Copy"}</Tooltip>
      </div>
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
