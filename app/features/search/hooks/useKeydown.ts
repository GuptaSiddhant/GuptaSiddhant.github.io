import { type RefObject } from "react"
import useEventListener from "helpers/useEventListener"
import useStableCallback from "helpers/useStableCallback"

import {
  closeSearchBar,
  toggleSearchBarOpen,
  useSearchDispatch,
  useSearchState,
} from "../store"
import usePerformEntryAction from "./usePerformEntryAction"

export default function useKeydown(
  containerRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
) {
  const { results, open } = useSearchState()
  const dispatch = useSearchDispatch()
  const performEntryAction = usePerformEntryAction()

  const handleOpenClose = useStableCallback((e: KeyboardEvent) => {
    if (e.metaKey && e.key === "k") dispatch(toggleSearchBarOpen())
    if (open && e.key === "Escape") {
      e.preventDefault()
      dispatch(closeSearchBar())
    }
  })

  const handleEntriesActions = useStableCallback((e: KeyboardEvent) => {
    const inputs = [...document.querySelectorAll("input")]
    if (inputs.some((input) => document.activeElement === input)) return

    Object.entries(results)
      .flatMap(([_, c]) => c.entries)
      .forEach((entry) => {
        if (!entry.shortcut) return

        const shiftKey = entry.shortcut.includes("Shift")
        const metaKey =
          entry.shortcut.includes("Cmd") || entry.shortcut.includes("Win")
        const ctrlKey = entry.shortcut.includes("Ctrl")
        const actionKey = entry.shortcut.find((k) => k.length === 1)

        if (
          e.key.toLowerCase() === actionKey &&
          e.shiftKey === shiftKey &&
          e.metaKey === metaKey &&
          e.ctrlKey === ctrlKey
        ) {
          e.preventDefault()
          performEntryAction(entry)
        }
      })
  })

  const handleKeyboardNavigation = useStableCallback((e: KeyboardEvent) => {
    const container = containerRef.current
    if (!open || !container) return

    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault()

      const elements: Element[] = [
        ...container.querySelectorAll("[data-result]"),
      ]
      const activeElement = document.activeElement
      const activeIndex = activeElement ? elements.indexOf(activeElement) : -1

      if (e.key === "ArrowDown") {
        const nextElement = (
          activeIndex < elements.length - 1
            ? elements[activeIndex + 1]
            : elements[0]
        ) as HTMLElement

        nextElement?.focus()
      }
      if (e.key === "ArrowUp") {
        const prevElement = (
          activeIndex === 0
            ? elements[elements.length - 1]
            : elements[activeIndex - 1]
        ) as HTMLElement

        prevElement?.focus()
      }

      return
    }

    const searchInputElement = inputRef.current
    if (searchInputElement && e.key.length === 1) {
      searchInputElement.focus()
      if (document.activeElement !== searchInputElement) {
        searchInputElement.value = searchInputElement.value + e.key
      }
    }
  })

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (!e) return

    handleOpenClose(e)
    handleEntriesActions(e)
    handleKeyboardNavigation(e)
  })
}
