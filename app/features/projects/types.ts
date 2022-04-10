export interface ProjectType {
  id: string
  association?: string
  dateStart: string
  dateEnd?: string
  icon?: string
  externalLink?: string
  github?: string
  links?: ProjectLink[]
  content?: string

  title: string
  draft?: boolean
  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
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
