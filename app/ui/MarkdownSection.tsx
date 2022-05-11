import clsx from "clsx"
import { Fragment, memo, useRef } from "react"
import MDX from "markdown-to-jsx"

import Img from "./Img"
import { AnchorLink } from "./Link"
import Pre from "./Pre"
import Section from "./Section"
import TableOfContent from "./TableOfContent"
import { H1, H2, H3, H4, H5, H6, Paragraph } from "./typography"

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
        <MarkdownMain>{children}</MarkdownMain>
      </main>

      <aside className="hidden xl:block" />
    </Section>
  )
}

const MarkdownMain = memo(function MarkdownMain({
  children,
}: {
  children: string
}): JSX.Element {
  return (
    <MDX
      children={children}
      options={{
        wrapper: Fragment,
        overrides: {
          h1: (props) => <H1 {...props} link />,
          h2: (props) => <H2 {...props} link />,
          h3: (props) => <H3 {...props} link />,
          h4: (props) => <H4 {...props} link />,
          h5: (props) => <H5 {...props} link />,
          h6: (props) => <H6 {...props} link />,
          img: (props) => <Img {...props} link />,
          pre: Pre,
          p: Paragraph,
          a: AnchorLink,
        },
      }}
    />
  )
})
