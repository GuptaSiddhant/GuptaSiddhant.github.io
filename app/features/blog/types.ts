import { ContentCommonData, PageContent } from "~/types"

export type BlogPostContent = PageContent<BlogPostData>

export interface BlogPostData extends ContentCommonData {
  date: string
  author: string
}
