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
