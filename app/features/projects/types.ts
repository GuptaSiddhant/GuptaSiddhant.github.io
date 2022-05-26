import type { Teaser, LinkObject, Gallery } from "~/types"

export interface ProjectType extends ProjectTeaser {
  externalLink?: string
  github?: string
  links?: LinkObject[]
  content?: string
  gallery?: Gallery
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
