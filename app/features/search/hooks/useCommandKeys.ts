import { useCallback } from "react"
import useEventListener from "helpers/useEventListener"

import {
  closeSearchBar,
  toggleSearchBarOpen,
  useSearchDispatch,
  useSearchState,
} from "../store"
import usePerformEntryAction from "./usePerformEntryAction"

export default function useCommandKeys() {
  const { entries, open } = useSearchState()
  const dispatch = useSearchDispatch()
  const performEntryAction = usePerformEntryAction()

  const handleOpenClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") dispatch(toggleSearchBarOpen())
      if (open && e.key === "Escape") {
        e.preventDefault()
        dispatch(closeSearchBar())
      }
    },
    [open, dispatch],
  )

  const handleEntriesActions = useCallback(
    (e: KeyboardEvent) => {
      const inputs = [...document.querySelectorAll("input")]
      if (inputs.some((input) => document.activeElement === input)) return

      entries.forEach((entry) => {
        if (entry.shortcut?.[0] === e.key) performEntryAction(entry)
      })
    },
    [entries, performEntryAction],
  )

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (!e) return

    handleOpenClose(e)
    handleEntriesActions(e)
  })
}
