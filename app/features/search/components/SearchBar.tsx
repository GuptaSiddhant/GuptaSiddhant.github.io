import clsx from "clsx"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"
import SearchIcon from "remixicon-react/Search2LineIcon"
import LoadingIcon from "remixicon-react/Loader4LineIcon"

import { CSS_VAR_VISUAL_VIEWPORT_HEIGHT } from "~/constants"
import Button from "ui/Button"
import { InputWithRef } from "ui/Input"
import type { FetcherWithComponents } from "types"

import { useSearchDispatch, closeSearchBar, updateSearchTerm } from "../store"
import type { SearchFetcherData } from "../types"
import { __IS_SERVER__ } from "helpers"

export default function SearchBar({
  fetcher,
  inputRef,
}: {
  fetcher: FetcherWithComponents<SearchFetcherData>
  inputRef: React.RefObject<HTMLInputElement>
}) {
  const dispatch = useSearchDispatch()
  const { Form, submit, state } = fetcher
  const isLoading = state !== "idle"

  return (
    <Form method="get" action="/search" className="relative">
      <input type="hidden" name="field" value="id" />
      <input type="hidden" name="field" value="title" />
      <input type="hidden" name="field" value="cover" />
      <input type="hidden" name="field" value="icon" />
      <input type="hidden" name="limit" value="10" />
      <InputWithRef
        ref={inputRef}
        name="q"
        key={String(open)}
        defaultValue={""}
        className="w-full bg-gray-900 px-10"
        onChange={(e) => {
          dispatch(updateSearchTerm(e.target.value))
          submit(e.target.form)
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputFocus}
      />
      <div
        aria-hidden="true"
        className={clsx("absolute top-0 left-0 p-2 text-gray-500")}
        onClick={() => inputRef.current?.focus()}
      >
        {isLoading ? (
          <LoadingIcon aria-label="Loading" className="animate-spin" />
        ) : (
          <SearchIcon aria-label="Search" />
        )}
      </div>
      <Button
        className={clsx("absolute right-0 top-0")}
        title="Close palette"
        onClick={() => dispatch(closeSearchBar())}
      >
        <CloseIcon />
        <span className="sr-only">Close palette</span>
      </Button>
    </Form>
  )
}

function handleInputFocus(): void {
  if (__IS_SERVER__) return
  let interval: NodeJS.Timer
  let previousHeight = 0

  const changer = () => {
    const newHeight = window.visualViewport.height

    if (previousHeight === newHeight) {
      clearInterval(interval)
    } else {
      previousHeight = newHeight
      document.documentElement.style.setProperty(
        CSS_VAR_VISUAL_VIEWPORT_HEIGHT,
        `${newHeight}px`,
      )
    }
  }

  if (window.visualViewport) {
    interval = setInterval(changer, 500)
  }
}
