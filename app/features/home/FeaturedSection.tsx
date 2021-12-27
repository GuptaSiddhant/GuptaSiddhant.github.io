import { Link } from "remix"

import Grid from "~/components/layouts/Grid"
import Heading from "~/components/Heading"
import { isBlogPost, BlogPostCard, type BlogPostContent } from "~/features/blog"
import {
  isProject,
  ProjectCard,
  type ProjectContent,
} from "~/features/projects"
import { sortByDate } from "~/helpers"
import Section from "~/components/layouts/Section"
import type { CommonContent } from "~/types"

export interface FeaturedGridProps {
  projects: ProjectContent[]
  blog: BlogPostContent[]
}

/** FeaturedSection component */
export function FeaturedSection(props: FeaturedGridProps): JSX.Element | null {
  return (
    <Section id="featured" className="flex-col bg-depth sm:p-16">
      <div className="flex justify-between items-baseline flex-wrap">
        <Heading value={2}>Featured work</Heading>
        <div className="flex gap-12 ">
          <Link to="projects">View projects</Link>
          <Link to="blog">View blog</Link>
        </div>
      </div>

      <FeaturedGrid {...props} />
    </Section>
  )
}

/** Grid component */
function FeaturedGrid({
  projects,
  blog,
}: FeaturedGridProps): JSX.Element | null {
  const items: CommonContent[] = [...projects, ...blog].sort((a, b) => {
    const dataA = isProject(a) ? a.data.dateStart : a.data.date
    const dataB = isProject(b) ? b.data.dateStart : b.data.date

    return sortByDate(dataA, dataB)
  })

  const generateLink = (item: CommonContent) =>
    (isBlogPost(item) ? `/blog/` : `/projects/`) + item.id

  const renderItem = (item: CommonContent) =>
    isBlogPost(item) ? (
      <BlogPostCard
        post={{ ...item.data, tags: ["blog", ...(item.data.tags || [])] }}
      />
    ) : isProject(item) ? (
      <ProjectCard
        project={{ ...item.data, tags: ["project", ...(item.data.tags || [])] }}
      />
    ) : null

  return (
    <Grid
      items={items}
      renderItem={renderItem}
      generateLink={generateLink}
      fallback={null}
    />
  )
}
