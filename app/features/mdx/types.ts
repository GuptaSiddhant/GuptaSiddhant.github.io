import type { RefObject } from "react"

export interface TOC {
  level: number
  id: string
  text: string
  children: TOC[]
}

export interface TableOfContentProps {
  className?: string
  sectionRef: RefObject<HTMLElement>
  maxLevel?: number
}
