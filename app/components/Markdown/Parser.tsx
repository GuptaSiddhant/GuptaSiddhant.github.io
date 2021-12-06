import { marked } from "marked"
import { ReactNode } from "react"
import ReactRenderer from "./Renderer"

type TokenList = marked.TokensList

export default class ReactParser {
  renderer: ReactRenderer

  constructor(renderer: ReactRenderer) {
    this.renderer = renderer
  }

  parse(tokens: TokenList): ReactNode {
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
          return this.renderer.paragraph(this.parseInline(token.tokens))
        }

        case "text": {
          return token.text
        }

        case "blockquote": {
          const quote = this.parse(token.tokens as TokenList)
          return this.renderer.blockquote(quote)
        }

        case "list": {
          const children = token.items.map((item) => {
            const listItemChildren = []

            if (item.task) {
              listItemChildren.push(this.renderer.checkbox(item.checked))
            }

            listItemChildren.push(this.parse(item.tokens as TokenList))

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
          console.warn(`Token with "${token.type}" type was not found`) // eslint-disable-line no-console
          return null
        }
      }
    })
  }

  parseInline(tokens: marked.Token[]): ReactNode {
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
          console.warn(`Token with "${token.type}" type was not found`) // eslint-disable-line no-console
          return null
      }
    })
  }
}

// Helpers

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
