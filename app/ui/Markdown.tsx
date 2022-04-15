import clsx from "clsx"
import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"
import Img from "./Img"

import { Section } from "./layout"
import { AnchorLink } from "./Link"
import Pre from "./Pre"
import { H1, H2, H3, H4, H5, H6, Paragraph } from "./typography"

export default function Markdown({ code }: { code: string }): JSX.Element {
  const MdxComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <Section
      className={clsx(
        "prose prose-invert",
        "prose-blockquote:-ml-4",
        "mx-auto !gap-0 px-4",
      )}
    >
      <MdxComponent
        components={{
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
        }}
      />
    </Section>
  )
}
