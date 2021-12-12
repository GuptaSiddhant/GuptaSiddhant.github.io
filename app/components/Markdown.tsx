import MarkdownParser from "~/helpers/markdown-parser"

export default function Markdown({ value }: { value: string }): JSX.Element {
  const { renderMarkdown } = new MarkdownParser(value)

  return renderMarkdown()
}
