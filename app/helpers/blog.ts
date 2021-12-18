import { getMdxPagesInDirectory, getMdxPage, getMdxDirList } from "./mdx"
import { filterPageDrafts, sortByDate } from "./utils"
import type { BlogPostContent, BlogPostData } from "~/types"

const CONTENT_DIR = "blog"

export async function getBlog(): Promise<BlogPostContent[]> {
  const projects = await getMdxPagesInDirectory<BlogPostData>(CONTENT_DIR)

  return projects
    .filter(filterPageDrafts)
    .sort((a, b) => sortByDate(a.data.date, b.data.date))
}

export async function getBlogPostById(id: string): Promise<BlogPostContent> {
  const dirList = await getMdxDirList(CONTENT_DIR)
  const path = dirList.find((item) => item.id === id)?.path

  if (!path) throw new Error("Blog post not found for id: " + id)

  return getMdxPage<BlogPostData>(path, id)
}

export function isBlogPost(item: any): item is BlogPostContent {
  return (item as BlogPostContent).data.author !== undefined
}

export function filterBlogByTags(blog: BlogPostContent[], tags: string[]) {
  if (tags.length === 0) return blog

  return blog.filter((project) =>
    (project.data.tags || []).some((tag) => tags.includes(tag)),
  )
}

export function filterBlogByQuery(
  blog: BlogPostContent[],
  query: string | null,
) {
  if (!query) return blog

  return blog.filter(({ id, data }) =>
    [id, data.title, data.subtitle].some((field) => field?.includes(query)),
  )
}

export function generateUniqueTags(items: { data: { tags?: string[] } }[]) {
  return [...new Set(items.map((item) => item.data.tags || []).flat())]
}
