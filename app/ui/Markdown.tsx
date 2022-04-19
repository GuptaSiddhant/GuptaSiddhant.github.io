import clsx from "clsx"
import { useRef, useState, useEffect, Fragment, memo } from "react"
import MD, { compiler } from "markdown-to-jsx"

import useOffsetScroll from "~/helpers/useOffsetScroll"

import Img from "./Img"
import { Section } from "./layout"
import { AnchorLink } from "./Link"
import Pre from "./Pre"
import TOC from "./TOC"
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

  return (
    <Section
      id={id}
      className={clsx(
        "relative rounded mx-auto w-max",
        "md:!grid lg:grid-cols-[auto_200px] xl:grid-cols-markdown",
        "sticky top-0",
      )}
    >
      <aside className="hidden xl:block" />
      <main
        ref={sectionRef}
        className="prose prose-invert prose-blockquote:-ml-4 px-4"
      >
        <MarkdownMain>{children}</MarkdownMain>
      </main>
      <aside className={clsx("text-sm", "hidden lg:block")}>
        <nav className="sticky top-32">
          <TOC sectionRef={sectionRef} />
        </nav>
      </aside>
    </Section>
  )
}

const MarkdownMain = memo(function ({
  children,
}: {
  children: string
}): JSX.Element {
  return (
    <MD
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
          a: AnchorLink,
          img: (props) => <Img {...props} link />,
          pre: Pre,
          p: Paragraph,
        },
      }}
    />
  )
})
