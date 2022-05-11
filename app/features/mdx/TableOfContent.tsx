import { useEffect, useState, useMemo } from "react"

import createTOC from "./createTOC"
import renderTOC from "./renderTOC"
import type { TableOfContentProps, TOC } from "./types"

export default function TableOfContent({
  className,
  sectionRef,
  maxLevel = 3,
}: TableOfContentProps): JSX.Element {
  const [tableOfContents, setTableOfContents] = useState<TOC[]>([])

  useEffect(() => {
    const section = sectionRef?.current
    if (section) {
      const allElementsWithIds = [...section.querySelectorAll("[id]")]
      const toc = createTOC(allElementsWithIds)
      setTableOfContents(toc)
    }
  }, [sectionRef])

  const highestLevel = useMemo(
    () =>
      tableOfContents.reduce(
        // Inverse due to the fact that the H1 is the highest level
        (acc, curr) => Math.min(acc, curr.level),
        6,
      ),
    [tableOfContents],
  )

  return renderTOC(tableOfContents, { highestLevel, maxLevel }, className)
}
