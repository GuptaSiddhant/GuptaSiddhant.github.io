export interface BlogPostType {
  id: string
  association?: string
  date: string
  icon?: string
  externalLink?: string
  links?: BlogPostLink[]
  content?: string

  title: string
  draft?: boolean
  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
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
