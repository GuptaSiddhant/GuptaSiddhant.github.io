import FilterError from "~/ui/FilterError"
import Section from "~/ui/Section"

import type { BlogPostType } from "../types"
import BlogPostCard from "./BlogPostCard"

export default function BlogList({
  blogPosts,
}: {
  blogPosts: BlogPostType[]
}): JSX.Element {
  if (blogPosts.length === 0)
    return (
      <FilterError>No blog posts found with the given filters.</FilterError>
    )

  return (
    <Section.Prose className="!pt-10">
      <ul className={"flex gap-8 flex-col"}>
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} blogPost={post} />
        ))}
      </ul>
    </Section.Prose>
  )
}
