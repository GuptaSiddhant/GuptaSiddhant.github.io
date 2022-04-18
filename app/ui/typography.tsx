import clsx from "clsx"
import { Children, type ComponentPropsWithoutRef } from "react"
import { Link } from "@remix-run/react";
import { toKebabCase } from "~/helpers"
import type { PropsWithChildren } from "./types"

const commonHeadingClassName = clsx("font-bold leading-tight")

export function H1(props: PropsWithChildren<{ link?: boolean }>) {
  return <HeadingWrapper {...props} headingClassName="text-6xl" as="h1" />
}

export function H2({ ...props }: PropsWithChildren<{ link?: boolean }>) {
  return <HeadingWrapper {...props} headingClassName="text-5xl" as="h2" />
}

export function H3(props: PropsWithChildren<{ link?: boolean }>) {
  return <HeadingWrapper {...props} headingClassName="text-4xl" as="h3" />
}

export function H4(props: PropsWithChildren<{ link?: boolean }>) {
  return <HeadingWrapper {...props} headingClassName="text-3xl" as="h4" />
}

export function H5(props: PropsWithChildren<{ link?: boolean }>) {
  return <HeadingWrapper {...props} headingClassName="text-2xl" as="h5" />
}

export function H6(props: PropsWithChildren<{ link?: boolean }>) {
  return <HeadingWrapper {...props} headingClassName="text-xl" as="h6" />
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
  const exceptionTypeNames = ["Img"]

  if (Children.count(children) === 1) {
    const onlyChild: any = Children.toArray(children)[0]
    const typeName = onlyChild?.type?.name
    if (exceptionTypeNames.includes(typeName)) {
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
  link = true,
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
      className={clsx(headingClassName, commonHeadingClassName, className)}
    >
      {children}
    </Component>
  )

  if (!link) return element

  return (
    <Link
      id={uid}
      to={"#" + uid}
      className={clsx("group relative no-underline")}
    >
      {element}
    </Link>
  )
}
