import type { BlogPostContent } from "./types"

/** Type guard for blogPost */
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

export function checkIfFeaturedBlogPost(post: BlogPostContent) {
  return !!post.data.featured
}
