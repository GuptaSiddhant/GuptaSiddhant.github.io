import type { Gallery, LinkObject } from "~/types"

export interface Testimony {
  id: string
  title: string
  subtitle?: string
  date: string
  association?: string
  link?: string
  content: string
  draft?: boolean
}

export interface About {
  name: string
  shortName: string
  title: string
  npx: string
  currentCompany: { name: string; hiringLink?: string; link?: string }
}

export interface CommonAboutItem {
  id: string
  location?: string
  description?: string
  startDate: string
  endDate?: string
  icon?: string
  tags: string[]
  links?: Array<LinkObject>
  gallery: Gallery
  featured?: boolean
  draft?: boolean
}

export interface Education extends CommonAboutItem {
  degree: string
  field: string
  school: string
}

export interface Career extends CommonAboutItem {
  position: string
  company: string
  type?: CareerType
}

export type CareerType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "temporary"
  | "volunteer"
  | "self-employed"
  | "other"
