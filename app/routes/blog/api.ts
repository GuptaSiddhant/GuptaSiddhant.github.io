import type { LoaderFunction } from "@remix-run/server-runtime"
import {
  getBlogPostsList,
  filterBlogPostsWithQueryAndTags,
  getBlogPostById,
  type BlogPostType,
} from "~/features/blog"
import { getUniqueTagsFromObjects } from "~/helpers"
import { errorResponse } from "~/helpers/api"
import type { FilterDataType } from "~/ui/Filter"

/**
 * General purpose API endpoint for all GS data.
 */
export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get("id")
  const query = searchParams.get("q") || ""
  const selectedTags =
    searchParams.get("tags")?.split(",") || searchParams.getAll("tag") || []

  if (id) {
    return getBlogPostById(id).catch(() =>
      errorResponse(`Blog post with id '${id}' not found.`),
    )
  }

  const blogPosts = await getBlogPostsList()
  const allTags = getUniqueTagsFromObjects(blogPosts)
  const filteredBlogPosts = filterBlogPostsWithQueryAndTags(
    blogPosts,
    query,
    selectedTags,
  )
  const availableTags = getUniqueTagsFromObjects(filteredBlogPosts)

  return {
    blogPosts: filteredBlogPosts,
    allTags,
    availableTags,
    query,
    selectedTags,
  }
}

export function CatchBoundary() {}

export interface BlogPostsAPIResponse extends FilterDataType {
  blogPosts: BlogPostType[]
  allTags: string[]
}
