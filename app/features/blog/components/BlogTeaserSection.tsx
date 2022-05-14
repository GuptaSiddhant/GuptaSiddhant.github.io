import clsx from "clsx"
import { Link } from "@remix-run/react"

import { InternalLink } from "ui/Link"
import Section from "ui/Section"
import { Caption, H2 } from "ui/typography"

import type { BlogPostType } from "../types"
import BlogPostCard from "./BlogPostCard"

export default function BlogTeaserSection({
  id = "blog",
  blogPosts,
  children,
}: {
  id?: string
  blogPosts: BlogPostType[]
  children?: React.ReactNode
}): JSX.Element | null {
  if (blogPosts.length === 0) return null

  return (
    <Section.Prose id={id}>
      <div className={clsx("flex flex-col gap-4")}>
        {children ?? (
          <>
            <Caption>
              <Link to={"#" + id}>Blog</Link>
            </Caption>
            <H2 className="!p-0">Recent thoughts and ideas..</H2>
            <InternalLink to="/blog">View all blog posts</InternalLink>
          </>
        )}
      </div>

      <ul className={clsx("flex flex-col gap-4 sm:gap-10", "w-full")}>
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} blogPost={post} teaser />
        ))}
      </ul>
    </Section.Prose>
  )
}
