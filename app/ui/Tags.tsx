import clsx from "clsx"
import { type ComponentPropsWithoutRef } from "react"
import { capitalize } from "~/helpers"
import { type PropsWithChildren } from "~/types"

export default {
  List: TagList,
  Tag: Tag,
  Button: TagButton,
  Checkbox: TagCheckbox,
}

function TagList({
  tags,
  className,
  TagComponent = ({ tag }) => <Tag>{tag}</Tag>,
  prefixElement,
  suffixElement,
  limitBy,
}: {
  tags: string[]
  className?: string
  tagElement?: JSX.Element
  TagComponent?: (props: { tag: string }) => JSX.Element
  prefixElement?: JSX.Element
  suffixElement?: JSX.Element
  limitBy?: number
}): JSX.Element {
  const limit = limitBy ?? tags.length
  return (
    <ul
      className={clsx(
        "relative my-2 flex flex-wrap items-center gap-2",
        className,
      )}
    >
      {prefixElement ? <li key="suffix">{prefixElement}</li> : null}
      {tags.slice(0, limit).map((tag) => (
        <li key={tag.toString()}>
          <TagComponent tag={capitalize(tag)} />
        </li>
      ))}
      {suffixElement ? <li key="suffix">{suffixElement}</li> : null}
    </ul>
  )
}

const tagCommonStyle = clsx("text-base")

function Tag({ className, ...props }: PropsWithChildren) {
  return (
    <div
      {...props}
      className={clsx(
        tagCommonStyle,
        "rounded",
        "border-2 border-gray-700 py-0 px-1",
        className,
      )}
    />
  )
}

function TagButton({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={clsx(
        tagCommonStyle,
        "rounded px-2 py-1",
        "bg-gray-600 hover:bg-gray-500 active:bg-gray-700",
        className,
      )}
    />
  )
}

function TagCheckbox({
  id,
  className,
  value,
  label,
  ...props
}: ComponentPropsWithoutRef<"input"> & { label?: string }) {
  const htmlId = id || `tag-${value}`
  return (
    <>
      <input
        id={htmlId}
        {...props}
        type={"checkbox"}
        className={"peer absolute scale-0"}
        value={value}
      />
      <label
        htmlFor={htmlId}
        className={clsx(
          tagCommonStyle,
          "rounded-sm px-2 py-1 cursor-pointer",
          "bg-gray-800 peer-checked:bg-gray-600",
          "hover:bg-gray-700 peer-checked:hover:bg-gray-500",
          "peer-focus:ring-4",
          "flex items-center gap-2",
          "after:content-none peer-checked:after:content-['×'] after:text-sm after:text-red-300",
          "peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-800",
          className,
        )}
      >
        {label || value}
      </label>
    </>
  )
}
