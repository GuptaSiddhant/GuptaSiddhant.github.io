// https://github.com/sibiraj-s/marked-react

import { Fragment, Children, type ReactNode, createElement } from "react"
import { marked, Lexer } from "marked"
import clsx from "clsx"

import { Link } from "remix"
import CodeBlock from "~/components/CodeBlock"
import Image from "~/components/Image"

import { createDebugger } from "~/helpers/utils"

const parserDebugger = createDebugger("MD Parser")

class Renderer {
  elementId = 0
  options = {
    baseURL: undefined,
    openLinksInNewTab: true,
    langPrefix: "language-",
  }

  h(type: any, children?: ReactNode, props?: any) {
    this.elementId += 1

    return createElement(
      type,
      { ...props, key: `md-${this.elementId}` },
      children,
    )
  }

  heading(children: ReactNode, level: number) {
    return this.h(`h${level}`, children)
  }

  paragraph(children: ReactNode) {
    return this.h("p", children)
  }

  link(href: string, text?: string | null) {
    const url = joinBase(href, this.options.baseURL)
    const target = this.options.openLinksInNewTab ? "_blank" : null
    return this.h(Link, text, { href: url, target })
  }

  image(href: string, text?: string, title?: string) {
    const url = joinBase(href, this.options.baseURL)
    return this.h(Image, null, {
      src: url,
      alt: text,
      title,
      className: clsx("rounded my-4"),
    })
  }

  codespan(code: string, lang?: string) {
    const className = lang ? `${this.options.langPrefix}${lang}` : null
    return this.h("code", code, { className })
  }

  code(code: string, lang?: string) {
    return this.h(CodeBlock, code, { lang }) //this.codespan(code, lang), { lang })
  }

  blockquote(children: ReactNode) {
    return this.h("blockquote", children)
  }

  list(children: ReactNode, ordered?: boolean) {
    return this.h(ordered ? "ol" : "ul", children)
  }

  listItem(children: ReactNode) {
    return this.h("li", children)
  }

  checkbox(checked?: boolean) {
    return this.h("input", null, { type: "checkbox", disabled: true, checked })
  }

  table(children: ReactNode) {
    return this.h("table", children, { className: "my-4" })
  }

  tableHeader(children: ReactNode) {
    return this.h("thead", children)
  }

  tableBody(children: ReactNode) {
    return this.h("tbody", children)
  }

  tableRow(children: ReactNode) {
    return this.h("tr", children, { className: "flex" })
  }

  tableCell(children: ReactNode, flags: any) {
    const tag = flags.header ? "th" : "td"
    return this.h(tag, children, { align: flags.align })
  }

  strong(children: ReactNode) {
    return this.h("strong", children)
  }

  em(children: ReactNode) {
    return this.h("em", children)
  }

  del(children: ReactNode) {
    return this.h("del", children)
  }

  text(text: string) {
    return text
  }

  html(html: string) {
    return html
  }

  hr() {
    return this.h("hr")
  }

  br() {
    return this.h("br")
  }

  fragment(children: ReactNode) {
    return this.h(Fragment, children)
  }
}

export default class MarkdownParser {
  private renderer: Renderer
  private children: ReactNode = null

  constructor(content: string) {
    this.renderer = new Renderer()
    const lexer = new Lexer({ breaks: true, gfm: true })
    const tokens = lexer.lex(content ?? "")
    this.children = this.parse(tokens)
  }

  renderMarkdown = () => {
    return createElement(Fragment, null, this.children)
  }

  private parse(tokens: marked.TokensList): ReactNode {
    return tokens.map((token) => {
      switch (token.type) {
        case "space": {
          return null
        }

        case "heading": {
          return this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
          )
        }

        case "paragraph": {
          const children = this.parseInline(token.tokens)
          const firstChild = Children.toArray(children)[0]

          if (typeof firstChild !== "string")
            return this.renderer.fragment(firstChild)

          return this.renderer.paragraph(firstChild)
        }

        case "text": {
          return token.text
        }

        case "blockquote": {
          const quote = this.parse(token.tokens as marked.TokensList)
          return this.renderer.blockquote(quote)
        }

        case "list": {
          const children = token.items.map((item) => {
            const listItemChildren = []

            if (item.task) {
              listItemChildren.push(this.renderer.checkbox(item.checked))
            }

            listItemChildren.push(this.parse(item.tokens as marked.TokensList))

            return this.renderer.listItem(listItemChildren)
          })

          return this.renderer.list(children, token.ordered)
        }

        case "code": {
          return this.renderer.code(token.text, token.lang)
        }

        case "html": {
          return this.renderer.html(token.text)
        }

        case "table": {
          const headerCells = token.header.map((cell, index) => {
            return this.renderer.tableCell(this.parseInline(cell.tokens), {
              header: true,
              align: token.align[index],
            })
          })

          const headerRow = this.renderer.tableRow(headerCells)
          const header = this.renderer.tableHeader(headerRow)

          const bodyChilren = token.rows.map((row, index) => {
            const rowChildren = row.map((cell) => {
              return this.renderer.tableCell(this.parseInline(cell.tokens), {
                header: false,
                align: token.align[index],
              })
            })

            return this.renderer.tableRow(rowChildren)
          })

          const body = this.renderer.tableBody(bodyChilren)

          return this.renderer.table([header, body])
        }

        case "hr": {
          return this.renderer.hr()
        }

        default: {
          parserDebugger.warn(`Token with "${token.type}" type was not found`) // eslint-disable-line no-console
          return null
        }
      }
    })
  }

  private parseInline(tokens: marked.Token[]): ReactNode {
    return tokens.map((token) => {
      switch (token.type) {
        case "text": {
          return this.renderer.text(unescape(token.text))
        }

        case "strong": {
          return this.renderer.strong(this.parseInline(token.tokens))
        }

        case "em": {
          return this.renderer.em(this.parseInline(token.tokens))
        }

        case "del": {
          return this.renderer.del(this.parseInline(token.tokens))
        }

        case "codespan": {
          return this.renderer.codespan(unescape(token.text))
        }

        case "link": {
          return this.renderer.link(
            token.href,
            this.parseInline(token.tokens) as string,
          )
        }

        case "image": {
          return this.renderer.image(token.href, token.text, token.title)
        }

        case "html": {
          return this.renderer.html(token.text)
        }

        case "br": {
          return this.renderer.br()
        }

        case "escape": {
          return this.renderer.text(token.text)
        }

        default:
          parserDebugger.warn(`Token with "${token.type}" type was not found`) // eslint-disable-line no-console
          return null
      }
    })
  }
}

// Helpers

export function joinBase(path: string, base?: string) {
  if (!base) return path

  try {
    return new URL(path, base).href
  } catch {
    return path
  }
}

const htmlUnescapes: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(?:0+)?39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

export function unescape(string = "") {
  return reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || "'")
    : string
}
