import { Form, useSubmit } from "@remix-run/react"
import { useCallback } from "react"

import Input from "./Input"
import Tags from "./Tags"

export interface FilterProps {
  allTags: string[]
  selectedTags: string[]
  availableTags: string[]
  query: string
  placeholder?: string
}

export default function Filter({
  allTags,
  availableTags,
  selectedTags,
  query,
  placeholder = "Filter...",
}: FilterProps): JSX.Element {
  const submit = useSubmit()

  const TagComponent = useCallback(
    ({ tag }: { tag: string }) => (
      <Tags.Checkbox
        label={tag}
        value={tag.toLowerCase()}
        name="tag"
        disabled={!availableTags.includes(tag.toLowerCase())}
        defaultChecked={selectedTags.includes(tag.toLowerCase())}
      />
    ),
    [availableTags, selectedTags],
  )

  return (
    <Form
      id="filter-form"
      className="relative"
      onChange={(e) => submit(e.currentTarget)}
      onReset={() => submit(null)}
    >
      <Input
        type="search"
        name="q"
        className="w-full md:-mx-4 md:w-full-m4"
        placeholder={placeholder}
        defaultValue={query}
      />
      <Tags.List
        tags={allTags}
        className="justify-center"
        TagComponent={TagComponent}
      />
      {selectedTags.length > 0 || query.length > 0 ? (
        <Tags.Button
          type="reset"
          className="absolute top-1 right-1 md:-right-3"
        >
          Clear
        </Tags.Button>
      ) : undefined}
    </Form>
  )
}
