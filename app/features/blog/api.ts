import { json } from "remix"

import { generateResponseForPages } from "~/service/response"
import {
  getMdxPagesInDirectory,
  getMdxPage,
  getMdxDirList,
} from "~/service/mdx.server"
import { filterPageDraft, sortByDate } from "~/helpers"
import type { LoaderFunctionProps } from "~/types"
import type { BlogPostContent, BlogPostData } from "./types"

const CONTENT_DIR = "blog"

export async function getBlog(): Promise<BlogPostContent[]> {
  const projects = await getMdxPagesInDirectory<BlogPostData>(CONTENT_DIR)

  return projects
    .filter(filterPageDraft)
    .sort((a, b) => sortByDate(a.data.date, b.data.date))
}

export async function getBlogPostById(id: string): Promise<BlogPostContent> {
  const dirList = await getMdxDirList(CONTENT_DIR)
  const path = dirList.find((item) => item.id === id)?.path

  if (!path) throw new Error("Blog post not found for id: " + id)

  return getMdxPage<BlogPostData>(path, id)
}

export async function generateResponseForBlog(
  request: LoaderFunctionProps["request"],
) {
  const blog = await getBlog()
  return json(generateResponseForPages(request, blog))
}
