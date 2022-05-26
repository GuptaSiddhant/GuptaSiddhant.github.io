import type { Teaser, LinkObject, Gallery } from "~/types"

export interface BlogPostType extends BlogPostTeaser {
  externalLink?: string
  links?: LinkObject[]
  content?: string
  gallery?: Gallery
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
