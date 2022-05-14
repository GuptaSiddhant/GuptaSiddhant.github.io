export interface BlogPostType extends BlogPostTeaserType {
  association?: string
  icon?: string
  externalLink?: string
  links?: BlogPostLink[]
  content?: string

  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
}

export interface BlogPostTeaserType {
  id: string
  title: string
  cover?: string
  date: string
  draft?: boolean
}

export interface BlogPostLink {
  url: string
  title?: string
  type?: BlogPostLinkType
}

export type BlogPostLinkType =
  | "github"
  | "demo"
  | "blog"
  | "homepage"
  | "npm"
  | "prototype"
  | "design"
