import { Fragment, memo } from "react"
import MDX from "markdown-to-jsx"

import Img from "ui/Img"
import { AnchorLink } from "ui/Link"
import Pre from "ui/Pre"
import { H1, H2, H3, H4, H5, H6, Paragraph } from "ui/typography"

const MarkdownComponent = memo(function MarkdownMain({
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
          img: (props) => <Img {...props} link loading="lazy" />,
          pre: Pre,
          p: Paragraph,
          a: AnchorLink,
        },
      }}
    />
  )
})

export default MarkdownComponent
