import { type ReactNode } from "react"

import { InternalLink } from "ui/Link"
import Section from "ui/Section"
import Tags from "ui/Tags"
import { H1 } from "ui/typography"

import type { BlogPostType } from "../types"

export default function BlogPostHero({
  title,
  subtitle,
  description,
  tags = [],
  children,
}: BlogPostType & { children?: ReactNode }): JSX.Element {
  return (
    <Section.Hero>
      <InternalLink to="/blog">{"← Blog"}</InternalLink>

      <div>
        <H1>{title}</H1>
        <strong className="text-2xl font-normal">{subtitle}</strong>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-gray-100">{description}</p>
        <div className="flex items-center justify-between gap-4">
          <Tags.List tags={tags} className="justify-start" />
          {/* <BlogPostActions /> */}
        </div>
      </div>

      {children}
    </Section.Hero>
  )
}
