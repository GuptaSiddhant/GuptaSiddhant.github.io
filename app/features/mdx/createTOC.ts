import type { TOC } from "./types"

export default function createTOC(allElementsWithIds: Element[]): TOC[] {
  return convertElementsToTOCList(allElementsWithIds).reduce(reorderLevels, [])
}

function convertElementsToTOCList(allElementsWithIds: Element[]): TOC[] {
  return allElementsWithIds
    .map((element) => {
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
    .filter((e) => e.id !== "toc")
}

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
