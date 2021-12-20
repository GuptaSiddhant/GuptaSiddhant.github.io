import clsx from "clsx"

/** Input component */
export default function Input({
  className,
  _ref,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  _ref?: React.ForwardedRef<HTMLInputElement>
}): JSX.Element | null {
  return (
    <input
      {...props}
      className={clsx("rounded", "dark:bg-depth", className)}
      ref={_ref}
    />
  )
}
