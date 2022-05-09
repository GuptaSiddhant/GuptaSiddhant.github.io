import { Dialog } from "@reach/dialog"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import { InputWithRef } from "~/ui/Input"

import {
  useCommandPaletteDispatch,
  useCommandPaletteState,
  closePalette,
} from "../store"
import usePerformEntryAction from "../hooks/usePerformEntryAction"
import useCommandKeys from "../hooks/useCommandKeys"
import Button from "~/ui/Button"
import useSafeLayoutEffect from "~/helpers/useSafeLayoutEffect"

export default function CommandPalette() {
  const { entries, open, lastScrollPosition } = useCommandPaletteState()
  const inputRef = useRef<HTMLInputElement>(null)
  const [term, setTerm] = useState("")
  const dispatch = useCommandPaletteDispatch()
  const performEntryAction = usePerformEntryAction()
  useCommandKeys()

  function close() {
    dispatch(closePalette())
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value)
  }

  useEffect(() => {
    if (open) setTerm("")
  }, [open])

  // Scroll restoration for Safari
  useSafeLayoutEffect(() => {
    if (!open && lastScrollPosition)
      window.scrollTo({ top: lastScrollPosition })
  }, [open, lastScrollPosition])

  return (
    <Dialog
      isOpen={open}
      onDismiss={close}
      initialFocusRef={inputRef}
      aria-label="Command Palette"
      className={clsx(
        "animate-appear relative",
        "bg-gray-800 p-4 rounded-lg mt-[10vh] mx-4 md:mx-auto",
        "flex gap-4 flex-col md:w-[50vw]",
      )}
    >
      <InputWithRef
        ref={inputRef}
        className="w-full bg-gray-900"
        onChange={handleChange}
        value={term}
      />
      <Button
        className={clsx("absolute right-4 top-4")}
        title="Close palette"
        onClick={close}
      >
        <CloseIcon />
        <span className="sr-only">Close palette</span>
      </Button>
    </Dialog>
  )
}
