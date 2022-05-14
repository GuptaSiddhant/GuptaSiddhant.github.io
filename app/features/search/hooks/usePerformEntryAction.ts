import { useNavigate } from "@remix-run/react"
import { useCallback } from "react"

import { closeSearchBar, useSearchDispatch } from "../store"
import type { SearchEntry } from "../types"

export default function usePerformEntryAction() {
  const dispatch = useSearchDispatch()
  const navigate = useNavigate()

  return useCallback(
    ({ perform, href }: SearchEntry) => {
      perform?.()
      if (href) {
        if (!href.startsWith("http")) navigate(href)
        else window.open(href, "_blank")
      }
      dispatch(closeSearchBar())
    },
    [navigate, dispatch],
  )
}
