import { useMemo } from "react"
import { getMDXComponent, type MDXContentProps } from "mdx-bundler/client"

import Pre from "~/components/atoms/Pre"
import { H1, H2, H3, H4, H5, H6 } from "~/components/Heading"
import Image from "~/components/atoms/Image"
import { Paragraph, Emphasis, Code, Strong } from "~/components/Text"

/** Markdown component */
export default function Markdown({
  code,
  ...props
}: MDXContentProps & { code: string }): JSX.Element | null {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <Component
      {...props}
      components={{
        code: Code,
        em: Emphasis,
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        img: Image,
        p: ParagraphMd,
        pre: Pre,
        strong: Strong,
        // blockquote: Emphasis,
        // ol: List,
        // ul: List,
        // a
        // hr
        table: Table,
        ...props.components,
      }}
    />
  )
}

function Table(
  props: React.TableHTMLAttributes<HTMLTableElement>,
): JSX.Element {
  console.log(props)
  return <table {...props} />
}

function ParagraphMd(props: React.HTMLAttributes<HTMLParagraphElement>) {
  if (["string", "number", "bigint", "boolean"].includes(typeof props.children))
    return <Paragraph {...props} />

  return <>{props.children}</>
}

// function Code({
//   children: {
//     props: { children, className },
//   },
// }: any): JSX.Element {
//   return (
//     <CodeBlock lang={className.replace("language-", "")}>
//       {children?.toString() || ""}
//     </CodeBlock>
//   )
// }
