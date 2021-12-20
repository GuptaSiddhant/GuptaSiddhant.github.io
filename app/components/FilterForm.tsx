import { type FormEvent } from "react"
import { Form, useSubmit } from "remix"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import Button from "~/components/atoms/Button"
import Input from "~/components/atoms/Input"
import { TagList } from "~/components/Tag"

export default function FilterForm({
  tags,
  selectedTags,
  searchQuery,
  searchPlaceholder,
}: {
  tags: string[]
  selectedTags: string[]
  searchQuery?: string
  searchPlaceholder?: string
}) {
  const submit = useSubmit()

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    submit(formData, { replace: true })
  }

  const isResetDisabled =
    selectedTags.length === 0 && (!searchQuery || searchQuery?.length === 0)

  return (
    <Form
      className="flex flex-row flex-wrap items-center gap-4"
      onChange={handleChange}
    >
      <Input
        type="search"
        name="q"
        defaultValue={searchQuery}
        placeholder={searchPlaceholder}
        aria-label="Search"
        className="flex-grow sm:flex-grow-0"
      />
      <TagList
        tags={tags}
        checkIsTagSelected={(tag) => selectedTags.includes(tag)}
      />
      <ResetFormButton isDisabled={isResetDisabled} />
    </Form>
  )
}

function ResetFormButton({
  isDisabled,
}: {
  isDisabled?: boolean
}): JSX.Element | null {
  const submit = useSubmit()

  const handleClick = () => submit({}, { replace: true })

  if (isDisabled) return null

  return (
    <Button
      onClick={handleClick}
      type="reset"
      className="flex items-center gap-1 text-red-700 dark:text-red-300"
    >
      <CloseIcon className="inline" /> Reset filters
    </Button>
  )
}
