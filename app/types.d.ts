import type { ReactNode } from "react"

export interface RootData {
  name: string
}

export type CommonContent = PageContent<ContentCommonData>
export type ProjectContent = PageContent<ProjectData>
export type BlogPostContent = PageContent<BlogPostData>

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

export interface ProjectData extends ContentCommonData {
  association?: string
  dateStart: string
  dateEnd?: string
  icon?: string
  externalLink?: string
}

export interface BlogPostData extends ContentCommonData {
  date: string
  author: string
}

export interface BaseComponentProps {
  children?: ReactNode
  className?: string
}
