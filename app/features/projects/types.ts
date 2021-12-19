import { ContentCommonData, PageContent } from "~/types"

export type ProjectContent = PageContent<ProjectData>

export interface ProjectData extends ContentCommonData {
  association?: string
  dateStart: string
  dateEnd?: string
  icon?: string
  externalLink?: string
}
