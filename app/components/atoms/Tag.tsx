import { useLabel } from "@react-aria/label"
import { useFocusRing } from "@react-aria/focus"
import clsx from "clsx"
import { forwardRef, type ForwardedRef } from "react"

import { capitalize } from "~/helpers"

export interface TagProps {
  className?: string
  children: string
  isSelected?: boolean
  isDisabled?: boolean
  size?: "sm" | "md" | "lg"
  ref?: React.LegacyRef<HTMLInputElement>
}

function Tag(
  { children, className, isSelected, isDisabled, size = "md" }: TagProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { isFocusVisible, focusProps } = useFocusRing()
  const { labelProps, fieldProps } = useLabel({ "aria-label": children })

  const sizeClassName = clsx(
    size === "md" && "py-1 px-2 rounded-lg text-sm",
    size === "sm" && "py-0 px-1 rounded-md text-sm",
    size === "lg" && "py-2 px-4 rounded-xl text-base",
  )

  return (
    <label
      className={clsx(
        sizeClassName,
        "block",
        "border-2 border-blue-700",
        isSelected && "bg-blue-700",
        !isDisabled && clsx("hover:bg-blue-900", "cursor-pointer select-none"),
        isFocusVisible && "outline-none outline-blue-700",
        className,
      )}
      {...labelProps}
    >
      {isDisabled ? null : (
        <input
          ref={ref}
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

export default forwardRef(Tag)
