import { ContentCommonData, PageContent } from "~/types"

export type ProjectContent = PageContent<ProjectData>

export interface ProjectData extends ContentCommonData {
  association?: string
  dateStart: string
  dateEnd?: string
  icon?: string
  externalLink?: string
  github?: string
  links?: ProjectLink[]
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
