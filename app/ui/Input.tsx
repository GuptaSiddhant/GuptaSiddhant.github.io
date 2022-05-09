import clsx from "clsx"
import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from "react"

export default function Input({
  className,
  inputRef,
  ...props
}: ComponentPropsWithoutRef<"input"> & {
  inputRef?: ForwardedRef<HTMLInputElement> | null
}): JSX.Element {
  return (
    <input
      {...props}
      ref={inputRef}
      className={clsx(
        "rounded px-4 py-2",
        "bg-gray-800",
        "font-base",
        className,
      )}
    />
  )
}

export const InputWithRef = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function InputWithRef(props, ref) {
  return <Input {...props} inputRef={ref} />
})
