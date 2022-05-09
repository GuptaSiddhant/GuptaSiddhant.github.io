import { DialogOverlay, DialogContent } from "@reach/dialog"
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox"
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

export default function CommandPalette() {
  const { entries, open } = useCommandPaletteState()
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

  useEffect(() => {
    console.log(term)
  }, [term])

  return (
    <DialogOverlay
      isOpen={open}
      onDismiss={close}
      dangerouslyBypassScrollLock
      className={clsx("bg-black/50", "fixed inset-0 overflow-auto")}
      initialFocusRef={inputRef}
    >
      <DialogContent
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

        <Combobox aria-label="Search the website" className="relative">
          <ComboboxInput
            as={InputWithRef}
            className="w-full bg-gray-900"
            onChange={handleChange}
          />
          <Button
            className={clsx("absolute right-0 top-0")}
            title="Close palette"
            onClick={close}
          >
            <CloseIcon />
            <span className="sr-only">Close palette</span>
          </Button>

          <ComboboxList className={clsx("mt-4")} persistSelection>
            {entries.map((entry) => (
              <ComboboxOption
                key={entry.id}
                onClick={() => performEntryAction(entry)}
                onSelect={() => performEntryAction(entry)}
                className={clsx(
                  "py-3 px-4 rounded",
                  "border-b-[1px] border-gray-700",
                  "hover:bg-gray-700",
                )}
                value={entry.label}
              >
                <ComboboxOptionText />
              </ComboboxOption>
            ))}
          </ComboboxList>
        </Combobox>
      </DialogContent>
    </DialogOverlay>
  )
}
