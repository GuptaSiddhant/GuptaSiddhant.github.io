import clsx from "clsx"
import { useRef, type ForwardedRef, type InputHTMLAttributes } from "react"
import { useSearchField } from "@react-aria/searchfield"
import { useSearchFieldState } from "@react-stately/searchfield"
import type { AriaSearchFieldProps } from "@react-types/searchfield"

/** Input component */
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  ref?: ForwardedRef<HTMLInputElement>
}): JSX.Element | null {
  return (
    <input {...props} className={clsx("rounded", "dark:bg-depth", className)} />
  )
}

export function SearchField(props: AriaSearchFieldProps): JSX.Element | null {
  const ref = useRef<HTMLInputElement>(null)
  const state = useSearchFieldState(props)
  const { labelProps, inputProps } = useSearchField(props, state, ref)
  const { label } = props

  const inputElement = <Input {...inputProps} ref={ref} />

  if (!label) return inputElement

  return (
    <label {...labelProps} className="flex flex-col gap-1">
      {label}
      {inputElement}
    </label>
  )
}
