import clsx from "clsx"
import { useRef } from "react"

import Section from "~/ui/Section"

import MarkdownComponent from "./MarkdownComponent"
import TableOfContent from "./TableOfContent"

export default function MarkdownSection({
  children,
  id = "maincontent",
}: {
  id?: string
  children: string
}): JSX.Element | null {
  const sectionRef = useRef<HTMLElement>(null)
  if (!children) return null

  const toc = (
    <TableOfContent
      sectionRef={sectionRef}
      className="list-none"
      maxLevel={4}
    />
  )

  return (
    <Section
      id={id}
      className={clsx(
        "relative rounded mx-auto md:w-max",
        "md:!grid lg:grid-cols-[200px_auto] xl:grid-cols-[200px_1fr_200px]",
      )}
    >
      <aside className={clsx("text-sm", "hidden lg:block")}>
        <nav className="sticky top-16 overflow-visible">{toc}</nav>
      </aside>

      <main
        ref={sectionRef}
        className="prose prose-invert prose-blockquote:-ml-4 px-4"
      >
        <details
          id="toc"
          className="lg:hidden border-b-[1px] pb-4 scroll-mt-16"
          open
        >
          <summary className="font-bold text-lg">Table of contents</summary>
          <nav>{toc}</nav>
        </details>
        <MarkdownComponent>{children}</MarkdownComponent>
      </main>

      <aside className="hidden xl:block" />
    </Section>
  )
}
