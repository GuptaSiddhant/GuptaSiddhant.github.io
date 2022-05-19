import type { Teaser } from "~/types"

export interface ProjectType extends ProjectTeaser {
  externalLink?: string
  github?: string
  links?: ProjectLink[]
  content?: string
  gallery?: { url: string; alt: string }[]
}

export interface ProjectTeaser extends Teaser {
  association?: string
  dateEnd?: string
  dateStart: string
  description?: string
  featured?: boolean
  icon?: string
  tags?: string[]
  subtitle?: string
  draft?: boolean
}

export interface ProjectLink {
  url: string
  title?: string
  type?: ProjectLinkType
}

export type ProjectLinkType =
  | "github"
  | "demo"
  | "blog"
  | "homepage"
  | "npm"
  | "prototype"
  | "design"
