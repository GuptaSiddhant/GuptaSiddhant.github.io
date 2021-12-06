import { createElement, type ReactNode, type ReactElement } from "react"
import Code from "../Code"

export default class ReactRenderer {
  elementId = 0
  options = {
    baseURL: undefined,
    openLinksInNewTab: true,
    langPrefix: "language-",
  }

  h(el: any, children?: ReactNode, props?: any) {
    const elProps = {
      key: `marked-react-${this.elementId}`,
    }

    this.elementId += 1
    return createElement(el, { ...props, ...elProps }, children)
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
    return this.h("a", text, { href: url, target })
  }

  image(href: string, text?: string, title?: string) {
    const url = joinBase(href, this.options.baseURL)
    return this.h("img", null, { src: url, alt: text, title })
  }

  codespan(code: string, lang?: string) {
    const className = lang ? `${this.options.langPrefix}${lang}` : null
    return this.h(Code.Line, code, { className })
  }

  code(code: string, lang?: string) {
    return this.h(Code, this.codespan(code, lang))
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
    return this.h("table", children)
  }

  tableHeader(children: ReactNode) {
    return this.h("thead", children)
  }

  tableBody(children: ReactNode) {
    return this.h("tbody", children)
  }

  tableRow(children: ReactNode) {
    return this.h("tr", children)
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
