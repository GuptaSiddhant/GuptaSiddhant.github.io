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

import { capitalize } from "~/helpers/utils"

const TagListContext = createContext<CheckboxGroupState>(
  {} as CheckboxGroupState,
)

export function TagList({
  reset,
  ...props
}: CheckboxGroupProps & {
  children: ReactNode[]
  reset?: boolean
}): JSX.Element {
  const state = useCheckboxGroupState(props)
  const { groupProps, labelProps } = useCheckboxGroup(props, state)
  const resetState = useCallback(() => {
    state.value.forEach(state.removeValue)
  }, [state])
  const { pressProps } = usePress({ onPress: resetState })

  return (
    <div
      {...groupProps}
      className="flex flex-wrap gap-2 mt-4 mb-2 items-center"
    >
      {props.label ? <label {...labelProps}>{props.label}</label> : null}
      <TagListContext.Provider value={state}>
        {props.children}
      </TagListContext.Provider>
      {reset ? <button {...pressProps}>{"Reset"}</button> : null}
    </div>
  )
}

export default function Tag(
  props: { children: string } & AriaCheckboxGroupItemProps,
): JSX.Element {
  const state = useContext(TagListContext)
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps } = useCheckboxGroupItem(props, state, ref)
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
      )}
      tabIndex={isDisabled ? -1 : 0}
    >
      {capitalize(props.children)}
      <input {...inputProps} ref={ref} className="hidden" />
    </label>
  )
}
