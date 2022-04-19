import { useEffect, useState, useCallback, type RefObject } from "react"
import { AnchorLink } from "./Link"

export default function TableOfContent({
  className,
  sectionRef,
}: {
  className?: string
  sectionRef: RefObject<HTMLElement>
}): JSX.Element {
  const [tableOfContents, setTableOfContents] = useState<TOC[]>([])

  useEffect(() => {
    const section = sectionRef?.current
    if (section) {
      const allElementsWithIds = [...section.querySelectorAll("[id]")]
      const toc = createTOC(allElementsWithIds)
      setTableOfContents(toc)
    }
  }, [sectionRef])

  const renderTOC = useCallback(
    (toc: TOC[]) => (
      <ol className={className}>
        {toc.map((item) => (
          <li key={item.id} className="my-2">
            <AnchorLink href={`#${item.id}`}>{item.text}</AnchorLink>
            {item.children.length > 0 ? renderTOC(item.children) : null}
          </li>
        ))}
      </ol>
    ),
    [],
  )

  return renderTOC(tableOfContents)
}

interface TOC {
  level: number
  id: string
  text: string
  children: TOC[]
}

function createTOC(allElementsWithIds: Element[]): TOC[] {
  const tocEntries: TOC[] = allElementsWithIds.map((element) => {
    const id = element.id
    let text = element.textContent || ""
    let tagName = element.tagName
    if (tagName.toLowerCase() === "a") {
      tagName = (element.parentNode as any)?.tagName?.toLowerCase()
      text = (element.parentNode?.textContent || "").replace("#", "")
    }
    const level =
      (tagName.startsWith("h") || tagName.startsWith("H")) &&
      tagName.length === 2
        ? parseInt(tagName[1])
        : 0

    return {
      level,
      id,
      text,
      children: [],
    }
  })

  function reorderLevels(
    toc: TOC[],
    currentItem: TOC,
    currentIndex: number,
    originalList: TOC[],
  ): TOC[] {
    const currentLevel = currentItem.level
    const parentIndex = toc.findIndex((i) => currentLevel > i.level) > -1
    if (parentIndex) return toc

    const nextElementIndexWithSameLevel = originalList
      .slice(currentIndex + 1)
      .find((i) => i.level === currentLevel)
    const nextIndex = nextElementIndexWithSameLevel
      ? originalList.indexOf(nextElementIndexWithSameLevel)
      : originalList.length
    const subArray = originalList.slice(currentIndex + 1, nextIndex)
    currentItem.children = [...subArray.reduce(reorderLevels, [])]

    return [...toc, currentItem]
  }

  return tocEntries.reduce(reorderLevels, [])
}
