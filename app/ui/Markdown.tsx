import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"

import { Section } from "./layout"
import { AnchorLink } from "./Link"
import { H1, H2, H3 } from "./typography"

export default function Markdown({ code }: { code: string }): JSX.Element {
  const MdxComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <Section className="prose prose-invert mx-auto !gap-0 px-4 md:px-0">
      <MdxComponent components={{ h1: H1, h2: H2, h3: H3, a: AnchorLink }} />
    </Section>
  )
}
