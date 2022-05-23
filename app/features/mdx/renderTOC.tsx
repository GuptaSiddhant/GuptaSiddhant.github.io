import { Link } from "@remix-run/react"
import clsx from "clsx"

import type { TOC } from "./types"

export default function renderTOC(
  toc: TOC[],
  options: {
    highestLevel: number
    maxLevel: number
    activeId: string
  },
  className?: string,
) {
  const { highestLevel, maxLevel, activeId } = options
  return (
    <nav className={className}>
      {toc.map((item) => {
        const isActive = activeId === item.id
        const itemContent = (
          <Link
            replace
            to={"#" + item.id}
            className={clsx(
              isActive ? "font-bold text-primary" : "text-tertiary",
              "hover:text-default",
            )}
          >
            {item.text}
          </Link>
        )

        return (
          <li
            key={item.id}
            className={clsx(
              "relative my-2",
              item.level > highestLevel && "ml-4",
            )}
          >
            {item.level <= maxLevel ? (
              item.children.length === 0 ? (
                <span
                  className={clsx(
                    "before:absolute before:content-['•'] before:-indent-4 text-tertiary",
                  )}
                >
                  {itemContent}
                </span>
              ) : (
                <details key={item.id} open>
                  <summary className="-indent-4">{itemContent}</summary>
                  {renderTOC(item.children, options)}
                </details>
              )
            ) : null}
          </li>
        )
      })}
    </nav>
  )
}
