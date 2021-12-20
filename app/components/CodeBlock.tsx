import clsx from "clsx"
import Highlight, { defaultProps, type Language } from "prism-react-renderer"
import dracula from "prism-react-renderer/themes/dracula"

import CopyButton from "~/components/CopyButton"
import type { BaseComponentProps } from "~/types"

export interface CodeProps {
  className?: string
  children: string
  hideLineNumbers?: boolean
  lang?: string
  disableCopy?: boolean
}

export default function CodeBlock({
  children,
  lang = "tsx",
  className: externalClassName,
  hideLineNumbers,
  disableCopy,
}: CodeProps) {
  const language = lang.split(" ")[0] as Language
  const filename = lang.split(" ").slice(1).join(" ")

  const showLineNumbers = !hideLineNumbers && language !== "bash"
  const copyContent =
    language !== "bash"
      ? children
      : children
          .split("\n")
          .filter((line) => !line.trim().startsWith("#")) // Remove comments
          .join("\n")

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={dracula}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <Pre className={clsx("pt-8", className, externalClassName)}>
          {tokens.map((line, i) => (
            // Line
            <div {...getLineProps({ line, key: i })} className="table-row">
              {showLineNumbers ? (
                <span
                  className={clsx(
                    "table-cell text-right text-sm pr-4 select-none",
                    "text-disabled",
                  )}
                >
                  {(i + 1).toString()}
                </span>
              ) : null}
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
          {language ? (
            <div
              className={clsx(
                "absolute top-2 left-4",
                "text-sm",
                "text-disabled",
              )}
            >
              [{language}] {filename ? <span>{filename}</span> : null}
            </div>
          ) : null}
          {!disableCopy ? (
            <CopyButton
              className="absolute right-2 top-2"
              content={copyContent}
            />
          ) : null}
        </Pre>
      )}
    </Highlight>
  )
}

export function Pre({ children, className }: BaseComponentProps): JSX.Element {
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
    >
      {children}
    </pre>
  )
}
