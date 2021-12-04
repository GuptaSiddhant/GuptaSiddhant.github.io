export interface RootData {
  name: string
}

export interface ProjectType extends Common, DateTime {
  title: string
  association: string
  logoUrl?: string
  description?: any[]
  gallery?: { url: string; caption: string }[]
}

export interface Common {
  slug: { current: string }
  tags: string[]
  link?: string
}

export interface DateTime {
  startDate: string
  endDate?: string
  isCurrent: boolean
}

export interface Location {
  city: string
  country: string
}
