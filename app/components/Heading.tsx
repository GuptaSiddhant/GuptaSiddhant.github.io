import clsx from "clsx"

type HTMLHeadingProps = React.HTMLAttributes<HTMLHeadingElement>

export interface HeadingProps extends HTMLHeadingProps {
  as?: HeadingElement
  value?: HeadingValue
}
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
export type HeadingValue = 1 | 2 | 3 | 4 | 5 | 6

/** Heading component (h1-h6) */
export default function Heading({
  as,
  children,
  className,
  ...props
}: HeadingProps): JSX.Element {
  const Component = as || `div`
  const value =
    props.value || (Number.parseInt(as?.slice(1) || "1", 10) as HeadingValue)
  const headingClassName = clsx(
    getHeadingClassName(value),
    "my-4",
    value !== 1 && "mt-[1em]",
    className,
  )

  return (
    <Component {...props} className={headingClassName}>
      {children}
    </Component>
  )
}

export function getHeadingClassName(value: HeadingValue): string {
  switch (value) {
    case 1:
      return clsx("font-bold text-6xl leading-tight", "text-primary")
    case 2:
      return clsx("font-bold text-5xl leading-tight")
    case 3:
      return clsx("font-bold text-4xl leading-snug")
    case 4:
      return clsx("font-normal text-3xl leading-snug")
    case 5:
      return clsx("font-normal text-2xl leading-normal")
    case 6:
      return clsx("font-normal text-xl leading-normal")
    default:
      return ""
  }
}

export function H1(props: HTMLHeadingProps) {
  return <Heading as="h1" {...props} />
}
export function H2(props: HTMLHeadingProps) {
  return <Heading as="h2" {...props} />
}
export function H3(props: HTMLHeadingProps) {
  return <Heading as="h3" {...props} />
}
export function H4(props: HTMLHeadingProps) {
  return <Heading as="h4" {...props} />
}
export function H5(props: HTMLHeadingProps) {
  return <Heading as="h5" {...props} />
}
export function H6(props: HTMLHeadingProps) {
  return <Heading as="h6" {...props} />
}
