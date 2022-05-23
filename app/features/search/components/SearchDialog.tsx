import { Dialog } from "@reach/dialog"
import clsx from "clsx"
import { useRef } from "react"

import { CSS_VAR_VISUAL_VIEWPORT_HEIGHT } from "~/helpers/constants"
import { useResizeVVHEffect } from "~/helpers/resizeVisualViewportHeight"

import { useSearchDispatch, useSearchState, closeSearchBar } from "../store"
import useKeydown from "../hooks/useKeydown"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResult"

export default function SearchDialog() {
  const { open } = useSearchState()
  const dispatch = useSearchDispatch()

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useKeydown(containerRef, inputRef)
  useResizeVVHEffect(inputRef)

  return (
    <Dialog
      ref={containerRef}
      isOpen={open}
      onDismiss={() => dispatch(closeSearchBar())}
      initialFocusRef={inputRef}
      aria-label="SearchBar"
      className={clsx(
        "animate-appear relative",
        "bg-secondary p-4 rounded-lg mx-4 md:mx-auto",
        "flex gap-4 flex-col md:w-[60vw]",
        "mt-[5vh] md:mt-[10vh] h-[90vh] sm:h-[60vh]",
        "transition-[max-height]",
      )}
      style={{
        maxHeight: `calc(var(${CSS_VAR_VISUAL_VIEWPORT_HEIGHT}) * 0.9)`,
      }}
    >
      <SearchBar inputRef={inputRef} />
      <SearchResult />
    </Dialog>
  )
}
