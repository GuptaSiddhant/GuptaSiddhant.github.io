// https://github.com/sibiraj-s/marked-react

import { createElement, Fragment } from "react"
import { Lexer } from "marked"
import ReactParser from "./Parser"
import ReactRenderer from "./Renderer"

export default function Markdown({ value }: { value: string }): JSX.Element {
  const lexer = new Lexer({
    breaks: false,
    gfm: true,
  })

  const tokens = lexer.lex(value ?? "")

  const children = new ReactParser(new ReactRenderer()).parse(tokens)

  return createElement(Fragment, null, children)
}
