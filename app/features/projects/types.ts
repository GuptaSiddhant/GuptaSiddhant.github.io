export interface ProjectType extends ProjectTypeMinimal {
  association?: string

  icon?: string
  dateStart: string
  dateEnd?: string
  externalLink?: string
  github?: string
  links?: ProjectLink[]
  content?: string

  draft?: boolean
  featured?: boolean
  tags?: string[]
  subtitle?: string
  description?: string
  gallery?: ProjectImage[]
}

export interface ProjectTypeMinimal {
  id: string
  title: string
  cover?: string
}

export interface ProjectImage {
  url: string
  alt: string
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
