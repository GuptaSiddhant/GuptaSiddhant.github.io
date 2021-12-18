import type { ReactNode } from "react"

export interface RootData {
  name: string
}

export type ProjectContent = PageContent<ProjectData>
export type BlogPostContent = PageContent<BlogPostData>

export interface PageContent<T extends ContentCommon = ContentCommon> {
  id: string
  path: string
  data: T
  content: string
}

export interface ContentCommon {
  title: string
  draft?: boolean
  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
}

export interface ProjectData extends ContentCommon {
  association?: string
  dateStart: string
  dateEnd?: string
  icon?: string
  externalLink?: string
}

export interface BlogPostData extends ContentCommon {
  date: string
  author: string
}

export interface BaseComponentProps {
  children?: ReactNode
  className?: string
}
