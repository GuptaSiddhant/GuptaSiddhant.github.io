export interface ProjectType extends ProjectTeaserType {
  association?: string
  icon?: string
  dateEnd?: string
  externalLink?: string
  github?: string
  links?: ProjectLink[]
  content?: string

  featured?: boolean
  tags?: string[]
  subtitle?: string
  description?: string
  gallery?: { url: string; alt: string }[]
}

export interface ProjectTeaserType {
  id: string
  title: string
  cover?: string
  dateStart: string
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
