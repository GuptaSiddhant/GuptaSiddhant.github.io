import { useCallback } from "react"
import useEventListener from "~/helpers/useEventListener"

import {
  closePalette,
  togglePaletteOpen,
  useCommandPaletteDispatch,
  useCommandPaletteState,
} from "../store"
import usePerformEntryAction from "./usePerformEntryAction"

export default function useCommandKeys() {
  const { entries, open } = useCommandPaletteState()
  const dispatch = useCommandPaletteDispatch()
  const performEntryAction = usePerformEntryAction()

  const handleOpenClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") dispatch(togglePaletteOpen())
      if (open && e.key === "Escape") {
        e.preventDefault()
        dispatch(closePalette())
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

  useEventListener("keydown", handleOpenClose)
  useEventListener("keydown", handleEntriesActions)
}
