export interface EducationItem extends CommonCE {
  degree: string
  school: string
  field?: string
}

export interface CareerItem extends CommonCE {
  position: string
  company: string
  type?: CareerType
}

interface CommonCE {
  id: string
  startDate: string
  endDate?: string
  draft?: boolean
  featured?: boolean
  location?: string
  description?: string
  icon?: string
  tags?: string[]
  gallery: Array<GalleryItem>
  links?: Array<LinkItem>
}
export interface Skills extends Record<SkillCategory, string[]> {
  languages: { name: string; level: string }[]
}

export interface Testimony {
  title: string
  subtitle?: string
  date: string
  association?: string
  link?: string
  content: string
  draft?: boolean
}

export type CareerType =
  | "full-time"
  | "part-time"
  | "internship"
  | "volunteer"
  | "contract"
  | "self-employed"
  | "temporary"
  | "other"

export type LinkItem = {
  url: string
  title?: string
  type?: "homepage" | "github" | "linkedin" | "other"
}

export type SkillCategory =
  | "soft"
  | "frontend"
  | "backend"
  | "core"
  | "tools"
  | "design"
  | "other"

export interface GalleryItem {
  url: string
  alt?: string
}
