import type { DataFunctionArgs } from "@remix-run/server-runtime"

export type LoaderFunctionProps = DataFunctionArgs
export type LoaderFunctionReturn = Promise<Response>

export interface RootData {
  name: string
}

export type CommonContent = PageContent<ContentCommonData>

export interface PageContent<T extends ContentCommonData = ContentCommonData> {
  id: string
  path: string
  data: T
  code: string
}

export interface ContentCommonData {
  title: string
  draft?: boolean
  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
}

export interface BaseComponentProps {
  children?: React.ReactNode
  className?: string
}