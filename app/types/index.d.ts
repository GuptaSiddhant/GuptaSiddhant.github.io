import type { ReactNode } from "react"

export * from "./remix"

export interface RootData {
  name: string
}

export type CommonContent = PageContent<ContentCommonData>

export interface PageContent<T extends ContentCommonData = ContentCommonData> {
  id: string
  path: string
  data: T
  content: string
}

export interface ContentCommonData {
  title: string
  draft?: boolean
  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
}

export interface BaseComponentProps {
  children?: ReactNode
  className?: string
}
