import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react"
import clsx from "clsx"
import { usePress } from "@react-aria/interactions"
import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox"
import {
  useCheckboxGroupState,
  type CheckboxGroupState,
} from "@react-stately/checkbox"
import type {
  CheckboxGroupProps,
  AriaCheckboxGroupItemProps,
} from "@react-types/checkbox"
import { VisuallyHidden } from "@react-aria/visually-hidden"
import { useFocusRing } from "@react-aria/focus"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import { capitalize } from "~/helpers/utils"

const TagListContext = createContext<CheckboxGroupState>(
  {} as CheckboxGroupState,
)

export default function Tag(
  props: { children: string } & AriaCheckboxGroupItemProps,
): JSX.Element {
  const state = useContext(TagListContext)
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps } = useCheckboxGroupItem(props, state, ref)
  let { isFocusVisible, focusProps } = useFocusRing()
  const isSelected = state.isSelected(props.value)
  const isDisabled = state.isDisabled || props.isDisabled

  return (
    <label
      className={clsx(
        "block",
        "py-1 px-2 rounded-lg",
        "border-2 border-blue-300 dark:border-blue-700",
        "text-sm",
        isDisabled
          ? "cursor-default outline-none"
          : clsx(
              "hover:bg-blue-200 dark:hover:bg-blue-900",
              "cursor-pointer",
              "select-none",
            ),
        isSelected && "bg-blue-300 dark:bg-blue-700",
        isFocusVisible && "outline-none outline-blue-300 dark:outline-blue-700",
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {capitalize(props.children)}
    </label>
  )
}

export function TagList({
  reset,
  className,
  children,
  ...props
}: CheckboxGroupProps & {
  children: ReactNode[]
  className?: string
  reset?: boolean
}): JSX.Element {
  const state = useCheckboxGroupState(props)
  const { groupProps, labelProps } = useCheckboxGroup(props, state)
  const resetState = useCallback(() => state.setValue([]), [state])
  const { pressProps } = usePress({ onPress: resetState })

  return (
    <fieldset
      {...groupProps}
      className={clsx("flex flex-wrap flex-row gap-2 items-center", className)}
    >
      {props.label ? <label {...labelProps}>{props.label}</label> : null}

      <TagListContext.Provider value={state}>
        {children}
      </TagListContext.Provider>

      {reset && state.value.length > 0 ? (
        <button
          {...pressProps}
          className="flex items-center gap-1 text-red-700 dark:text-red-300"
        >
          <CloseIcon className="inline" /> Reset
        </button>
      ) : null}
    </fieldset>
  )
}
