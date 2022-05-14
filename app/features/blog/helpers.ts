import { isQueryMatch, isTagsAndMatch } from "helpers/filter"
import type { BlogPostType } from "./types"

export function filterBlogPostsWithQueryAndTags(
  blog: BlogPostType[],
  query: string,
  selectedTags: string[],
): BlogPostType[] {
  if (!query && !selectedTags.length) return blog

  return blog
    .filter((post) => isTagsAndMatch(selectedTags, post.tags))
    .filter((post) => isQueryMatch(query, post.title, post.subtitle))
}
