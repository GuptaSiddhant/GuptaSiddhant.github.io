import type { BlogPostContent } from "./types"

/** Type guard for blogPost */
export function isBlogPost(item: any): item is BlogPostContent {
  return (item as BlogPostContent).data.author !== undefined
}

export function checkIfFeaturedBlogPost(post: BlogPostContent) {
  return !!post.data.featured
}
