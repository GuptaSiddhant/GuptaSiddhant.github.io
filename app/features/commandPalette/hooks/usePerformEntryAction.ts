import { useNavigate } from "@remix-run/react"
import { useCallback } from "react"

import { closePalette, useCommandPaletteDispatch } from "../store"
import type { CommandPaletteEntry } from "../types"

export default function usePerformEntryAction() {
  const dispatch = useCommandPaletteDispatch()
  const navigate = useNavigate()

  return useCallback(
    ({ perform, href }: CommandPaletteEntry) => {
      perform?.()
      if (href) {
        if (!href.startsWith("http")) navigate(href)
        else window.open(href, "_blank")
      }
      dispatch(closePalette())
    },
    [navigate, dispatch],
  )
}
