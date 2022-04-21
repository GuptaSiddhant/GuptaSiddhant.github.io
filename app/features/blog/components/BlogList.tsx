import { useSubmit } from "@remix-run/react"
import clsx from "clsx"
import { Section, SectionProse } from "~/ui/layout"

import type { BlogPostType } from "../types"
import BlogPostCard from "./BlogPostCard"

export default function BlogList({
  blogPosts,
}: {
  blogPosts: BlogPostType[]
}): JSX.Element {
  const submit = useSubmit()

  if (blogPosts.length === 0) {
    return (
      <Section>
        <div className="text-center text-gray-500 text-2xl italic">
          No blog posts found with the given filters.
          <br />
          Try changing or clearing them.
          <br />
          <button
            onClick={() => submit({})}
            className="text-sm m-4 px-2 py-1 text-gray-300 hover:text-gray-200 active:text-gray-400 border-[1px] border-current rounded"
          >
            Clear all the filters
          </button>
        </div>
      </Section>
    )
  }

  return (
    <SectionProse className="!pt-10">
      <ul className={clsx("flex gap-8 flex-col")}>
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} blogPost={post} />
        ))}
      </ul>
    </SectionProse>
  )
}
