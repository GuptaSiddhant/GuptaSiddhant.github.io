import { useLocation } from "@remix-run/react"
import { useEffect, useState, useMemo } from "react"
import useEventListener from "helpers/useEventListener"

import createTOC from "./createTOC"
import renderTOC from "./renderTOC"
import type { TableOfContentProps } from "./types"
import useOffsetScroll from "~/helpers/useOffsetScroll"

export default function TableOfContent({
  className,
  sectionRef,
  maxLevel = 3,
}: TableOfContentProps): JSX.Element {
  const [headings, setHeadings] = useState<Element[]>([])
  const [activeId, setActiveId] = useState("")
  const { pathname, hash } = useLocation()
  const { scrollTop: offsetY } = useOffsetScroll(0)

  useEffect(() => {
    const section = sectionRef?.current
    if (section && pathname !== undefined) {
      setHeadings([...section.querySelectorAll("[id]")])
    }
  }, [sectionRef, pathname])

  const tableOfContents = useMemo(() => createTOC(headings), [headings])

  useEffect(() => {
    setActiveId((hash || "").replace(/^#/, ""))
  }, [hash])

  useEffect(() => {
    headings.forEach((heading) => {
      const { top } = heading.getBoundingClientRect()
      if (offsetY && top < 100) setActiveId(heading.id)
    })
  }, [headings, offsetY])

  const highestLevel = useMemo(
    () =>
      tableOfContents.reduce(
        // Inverse due to the fact that the H1 is the highest level
        (acc, curr) => Math.min(acc, curr.level),
        6,
      ),
    [tableOfContents],
  )

  return renderTOC(
    tableOfContents,
    { highestLevel, maxLevel, activeId },
    className,
  )
}
