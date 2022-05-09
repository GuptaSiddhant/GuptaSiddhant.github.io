import clsx from "clsx"
import { Children, type ComponentPropsWithoutRef } from "react"
import { Link } from "@remix-run/react"
import { toKebabCase } from "~/helpers"
import type { PropsWithChildren } from "./types"

const commonHeadingClassName = clsx("font-bold leading-tight !m-0")

interface HeadingProps extends PropsWithChildren {
  link?: boolean
}

export function H1(props: HeadingProps) {
  return (
    <HeadingWrapper {...props} headingClassName={clsx("text-6xl")} as="h1" />
  )
}

export function H2({ ...props }: HeadingProps) {
  return (
    <HeadingWrapper
      {...props}
      headingClassName={clsx("text-5xl pt-16 pb-12")}
      as="h2"
    />
  )
}

export function H3(props: HeadingProps) {
  return (
    <HeadingWrapper
      {...props}
      headingClassName={clsx("text-4xl pt-12 pb-8")}
      as="h3"
    />
  )
}

export function H4(props: HeadingProps) {
  return (
    <HeadingWrapper
      {...props}
      headingClassName={clsx("text-3xl pt-8 pb-4")}
      as="h4"
    />
  )
}

export function H5(props: HeadingProps) {
  return (
    <HeadingWrapper
      {...props}
      headingClassName={clsx("text-2xl py-2")}
      as="h5"
    />
  )
}

export function H6(props: HeadingProps) {
  return (
    <HeadingWrapper
      {...props}
      headingClassName={clsx("text-xl py-1")}
      as="h6"
    />
  )
}

export function Caption({
  className,
  ...props
}: PropsWithChildren): JSX.Element {
  return (
    <strong
      {...props}
      className={clsx(
        "text-2xl font-black uppercase tracking-widest text-gray-200",
        className,
      )}
    />
  )
}

export function Paragraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">): JSX.Element {
  const exceptionTypeNames = ["img"]

  if (Children.count(children) === 1) {
    const onlyChild: any = Children.toArray(children)[0]
    const typeName = onlyChild?.type?.name

    if (exceptionTypeNames.includes(String(typeName).toLowerCase())) {
      return <>{children}</>
    }
  }

  return <p {...props}>{children}</p>
}

function HeadingWrapper({
  id,
  children,
  className,
  as: Component = "h1",
  link = false,
  headingClassName,
  ...props
}: ComponentPropsWithoutRef<"h1"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  link?: boolean
  headingClassName?: string
}): JSX.Element | null {
  const uid = id || toKebabCase(children?.toString() || "")

  const element = (
    <Component
      {...props}
      id={uid}
      className={clsx(
        headingClassName,
        commonHeadingClassName,
        className,
        link && "scroll-mt-16",
      )}
    >
      {children}
      {link ? <Link to={"#" + uid} className="invisible" children="" /> : null}
    </Component>
  )

  return element
}
