import clsx from "clsx"

import { AnchorLink } from "~/ui/Link"

import type { TOC } from "./types"

export default function renderTOC(
  toc: TOC[],
  options: { highestLevel: number; maxLevel: number },
  className?: string,
) {
  const { highestLevel, maxLevel } = options
  return (
    <nav className={className}>
      {toc.map((item) => {
        const itemContent = (
          <AnchorLink href={"#" + item.id}>{item.text}</AnchorLink>
        )

        return (
          <li
            key={item.id}
            className={clsx(
              "my-2",
              item.level > highestLevel && "ml-4",
              item.level === highestLevel ? "font-bold" : "font-normal",
            )}
          >
            {item.level <= maxLevel ? (
              item.children.length === 0 ? (
                itemContent
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
