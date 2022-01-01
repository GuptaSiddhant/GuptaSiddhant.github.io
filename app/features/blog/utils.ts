import type { LoaderFunctionProps } from "~/types"
import type { BlogPostContent } from "./types"

/** Type guard for blogPost */
export function isBlogPost(item: any): item is BlogPostContent {
  return (item as BlogPostContent).data.author !== undefined
}

export function checkIfFeaturedBlogPost(post: BlogPostContent) {
  return !!post.data.featured
}

export function filterBlogByRequest(
  blog: BlogPostContent[],
  request: LoaderFunctionProps["request"],
) {
  const { searchParams } = new URL(request.url)
  const querySearchParam = searchParams.get("q")
  const tagsSearchParam = searchParams.get("tags")

  const selectedTags = tagsSearchParam
    ? decodeURIComponent(tagsSearchParam)?.split(",")
    : []

  const filteredBlogBySelectedTags = filterBlogByTags(blog, selectedTags)

  const filteredBlogByQuery = filterBlogByQuery(
    filteredBlogBySelectedTags,
    querySearchParam,
  )

  return {
    selectedTags,
    searchQuery: querySearchParam ?? undefined,
    filteredBlog: filteredBlogByQuery,
  }
}

function filterBlogByTags(blog: BlogPostContent[], tags: string[]) {
  if (tags.length === 0) return blog

  return blog.filter((post) =>
    (post.data.tags || []).some((tag) => tags.includes(tag)),
  )
}

function filterBlogByQuery(blog: BlogPostContent[], query: string | null) {
  if (!query) return blog

  return blog.filter(({ id, data }) =>
    [id, data.title, data.subtitle].some((field) => field?.includes(query)),
  )
}
