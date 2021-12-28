import Grid from "~/components/templates/Grid"
import { BlogPostCard } from "./BlogCard"
import { checkIfFeaturedBlogPost } from "./helpers"
import { BlogPostContent } from "./types"

export function BlogGrid({
  posts,
}: {
  posts: BlogPostContent[]
}): JSX.Element | null {
  const renderItem = (post: BlogPostContent) => (
    <BlogPostCard post={post.data} featured={checkIfFeaturedBlogPost(post)} />
  )

  return (
    <Grid
      items={posts}
      renderItem={renderItem}
      checkIfFeatured={checkIfFeaturedBlogPost}
      generateLink={(project) => `/blog/${project.id}`}
      fallback={
        <div className="opacity-50">
          <h2>No blog posts found.</h2>
        </div>
      }
    />
  )
}
