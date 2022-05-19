import type { Teaser } from "~/types"

export interface BlogPostType extends BlogPostTeaser {
  externalLink?: string
  links?: BlogPostLink[]
  content?: string
  gallery?: { url: string; alt: string }[]
}

export interface BlogPostTeaser extends Teaser {
  association?: string
  featured?: boolean
  date: string
  draft?: boolean
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
