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

  return (
    <Section
      id={id}
      className={clsx(
        "relative rounded mx-auto md:w-max",
        "md:!grid lg:grid-cols-[200px_auto] xl:grid-cols-[200px_1fr_200px]",
        "border-b-[1px] border-gray-700",
      )}
    >
      <aside className={clsx("text-sm", "hidden lg:block")}>
        <section className="sticky top-20 overflow-visible">
          <TableOfContent
            sectionRef={sectionRef}
            className="list-none"
            maxLevel={4}
          />
        </section>
      </aside>

      <main
        ref={sectionRef}
        className="prose prose-invert prose-blockquote:-ml-4 px-4 sm:mx-auto"
      >
        <details
          id="toc"
          className="lg:hidden border-b-[1px] border-gray-700 pb-4 pl-8 scroll-mt-16 not-prose"
          open
        >
          <summary className="font-bold text-lg -indent-8">
            Table of contents
          </summary>
          <TableOfContent
            sectionRef={sectionRef}
            className="list-none"
            maxLevel={4}
          />
        </details>
        <MarkdownComponent>{children}</MarkdownComponent>
      </main>

      <aside className="hidden xl:block" />
    </Section>
  )
}
