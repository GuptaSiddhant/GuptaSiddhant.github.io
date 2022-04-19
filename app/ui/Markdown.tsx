import clsx from "clsx"
import { useRef, useState, useEffect, Fragment } from "react"
import MD from "markdown-to-jsx"

import useOffsetScroll from "~/helpers/useOffsetScroll"

import Img from "./Img"
import { Section } from "./layout"
import { AnchorLink } from "./Link"
import Pre from "./Pre"
import TOC from "./TOC"
import { H1, H2, H3, H4, H5, H6, Paragraph } from "./typography"

export default function Markdown({
  children,
  id = "maincontent",
}: {
  id?: string
  children: string
}): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const [sectionOffsetY, setSectionOffsetY] = useState(1000)
  const isOffsetReached = useOffsetScroll(sectionOffsetY)

  useEffect(() => {
    if (sectionRef.current) {
      const offset =
        document.body.clientHeight - sectionRef.current.clientHeight
      setSectionOffsetY(offset)
    }
  }, [sectionRef])

  return (
    <Section
      id={id}
      elementRef={sectionRef}
      className={clsx(
        "relative rounded",
        "prose prose-invert",
        "prose-blockquote:-ml-4",
        "mx-auto !gap-0 px-4",
      )}
    >
      <aside
        className={clsx(
          "top-28 left-8 xl:fixed",
          " xl:w-52",
          isOffsetReached ? "xl:block" : "xl:hidden",
        )}
      >
        <TOC sectionRef={contentRef} />
      </aside>
      <main ref={contentRef}>
        <MD
          children={children}
          options={{
            wrapper: Fragment,
            overrides: {
              h1: H1,
              h2: H2,
              h3: H3,
              h4: H4,
              h5: H5,
              h6: H6,
              a: AnchorLink,
              img: Img,
              pre: Pre,
              p: Paragraph,
            },
          }}
        />
      </main>
    </Section>
  )
}
