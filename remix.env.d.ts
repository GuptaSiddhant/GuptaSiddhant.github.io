/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import { type ReactNode } from "react"
import * as ReactDOM from "react-dom"

declare module "react-overdrive" {
  export interface OverdriveProps {
    id: string
    children: React.ReactElement
    duration?: number
    easing?: string
    element?: keyof JSX.IntrinsicElements
    animationDelay?: number
    onAnimationEnd?: () => void
    style?: React.CSSProperties
    // rest
    className?: string
    ref?: React.Ref<any>
    onClick?: () => void
  }
  export default function Overdrive(props: OverdriveProps): JSX.Element
}

declare namespace Intl {
  class ListFormat {
    constructor(locales?: string | string[], options?: Intl.ListFormatOptions)
    public format: (items: string[]) => string
    public formatToParts: (items: string[]) => Array<{
      type: "literal" | "element"
      value: string
    }>
  }

  interface ListFormatOptions {
    type?: "conjunction" | "disjunction" | "unit"
    style?: "long" | "short" | "narrow"
  }
}

declare module "react-dom" {
  export function hydrateRoot(container: Node, children: ReactNode): any
}
