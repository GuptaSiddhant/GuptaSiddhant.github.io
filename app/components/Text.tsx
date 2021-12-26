import clsx from "clsx"

/** Paragraph component */
export function Paragraph({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element {
  return (
    <p
      className={clsx(
        className,
        "text-lg leading-normal my-4",
        "text-tertiary",
      )}
      {...props}
    >
      {children}
    </p>
  )
}

/** Emphasis component */
export function Emphasis({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <em
      className={clsx("not-italic font-serif text-base", className)}
      {...props}
    >
      {children}
    </em>
  )
}

/** Strong component */
export function Strong({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <strong className={clsx("font-bold", className)} {...props}>
      {children}
    </strong>
  )
}

/** Emphasis component */
export function Code({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <code
      className={clsx(
        "font-monospace text-base bg-depth px-1 py-0 align-baseline rounded",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  )
}

/** Text component */
export function Text({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): JSX.Element {
  return (
    <span className={clsx(className)} {...props}>
      {children}
    </span>
  )
}
