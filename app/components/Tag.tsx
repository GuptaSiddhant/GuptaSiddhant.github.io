import { useLabel } from "@react-aria/label"
import { useFocusRing } from "@react-aria/focus"
import clsx from "clsx"
import { type ForwardedRef } from "react"

import { capitalize } from "~/helpers"

export function Tag({
  children,
  isSelected,
  isDisabled,
  _ref,
}: {
  children: string
  isSelected?: boolean
  isDisabled?: boolean
  _ref?: ForwardedRef<HTMLInputElement>
}) {
  const { isFocusVisible, focusProps } = useFocusRing()
  const { labelProps, fieldProps } = useLabel({ "aria-label": children })

  return (
    <label
      className={clsx(
        "block",
        "py-1 px-2 rounded-lg",
        "border-2 border-blue-300 dark:border-blue-700",
        "text-sm",
        isSelected && "bg-blue-300 dark:bg-blue-700",
        isDisabled
          ? "cursor-auto outline-none"
          : clsx(
              "hover:bg-blue-200 dark:hover:bg-blue-900",
              "cursor-pointer",
              "select-none",
            ),
        isFocusVisible && "outline-none outline-blue-300 dark:outline-blue-700",
      )}
      {...labelProps}
    >
      {isDisabled ? null : (
        <input
          ref={_ref}
          name={"tags"}
          type="checkbox"
          value={children}
          className="sr-only"
          {...focusProps}
          {...fieldProps}
        />
      )}
      {capitalize(children)}
    </label>
  )
}

export function TagList({
  className,
  tags,
  label = "Filter by tags",
  checkIsTagSelected,
  checkIsTagDisabled,
}: {
  className?: string
  label?: string
  tags: string[]
  checkIsTagSelected?: (tag: string) => boolean
  checkIsTagDisabled?: (tag: string) => boolean
}): JSX.Element | null {
  if (tags.length < 1) return null

  return (
    <fieldset
      className={clsx("flex flex-wrap flex-row gap-2 items-center", className)}
      aria-label={label}
    >
      {tags.map((tag) => (
        <Tag
          key={tag}
          isSelected={checkIsTagSelected?.(tag)}
          isDisabled={checkIsTagDisabled?.(tag)}
        >
          {tag}
        </Tag>
      ))}
    </fieldset>
  )
}
