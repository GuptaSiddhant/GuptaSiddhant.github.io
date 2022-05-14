import clsx from "clsx"
import { Link } from "@remix-run/react"

import { InternalLink } from "ui/Link"
import Section, { proseWidth } from "ui/Section"
import TeaserCard from "ui/TeaserCard"
import { Caption, H2 } from "ui/typography"

import type { BlogPostTeaser } from "../types"

export default function BlogTeaserSection({
  id = "blog",
  blogPosts,
  children,
}: {
  id?: string
  blogPosts: BlogPostTeaser[]
  children?: React.ReactNode
}): JSX.Element | null {
  if (blogPosts.length === 0) return null

  return (
    <Section id={id}>
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
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

      <ul
        className={clsx(
          "flex gap-4 sm:gap-10 ",
          "w-full overflow-auto py-4 px-4 sm:px-10",
          "snap-x snap-mandatory",
          blogPosts.length <= 3 && proseWidth,
        )}
      >
        {blogPosts.map((post) => (
          <TeaserCard key={post.id} {...post} linkBaseUrl="/blog/" />
        ))}
      </ul>
    </Section>
  )
}
