export interface RootData {
  name: string
}

export type ProjectContent = PageContent<ProjectData>

export interface PageContent<T extends ContentCommon = ContentCommon> {
  id: string
  path: string
  data: T
  content: string
}

export interface ContentCommon {
  title: string
  dateStart: Date
  dateEnd?: Date
  draft?: boolean
  featured?: boolean
}

export interface ProjectData extends ContentCommon {
  subtitle?: string
  description?: string
  association?: string
  tags?: string[]
  icon?: { url: string; variant?: "light" | "dark" | "mixed" }
  gallery?: { url: string; alt: string }[]
}
