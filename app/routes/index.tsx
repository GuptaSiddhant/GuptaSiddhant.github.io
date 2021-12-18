import {
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import TextTransition from "react-text-transition"
import { useIsSSR } from "@react-aria/ssr"
import { Fragment } from "react"

import CodeBlock from "~/components/CodeBlock"
import Grid from "~/components/Grid"
import Section from "~/layouts/Section"
import { getBlog, isBlogPost } from "~/helpers/blog"
import { getAllProjects, isProject } from "~/helpers/projects"
import useTextTransition from "~/helpers/useTextTransition"
import { ProjectCard } from "~/routes/projects/index"
import { BlogPostCard } from "~/routes/blog/index"
import type {
  BlogPostContent,
  ContentCommonData,
  ProjectContent,
  CommonContent,
} from "~/types"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async () => {
  const projects = (await getAllProjects()).filter(
    (project) => project.data.featured,
  )
  const blog = (await getBlog()).filter((project) => project.data.featured)

  const adjectives = [
    "Accessibly",
    "Beautifully",
    "Responsibly",
    "Sensibly",
    "Efficiently",
  ]

  return { projects, blog, adjectives }
}

const code = `# An interactive resume for your terminal, made with React and ink. Run:
npx guptasiddhant`

interface LoaderData {
  projects: ProjectContent[]
  blog: BlogPostContent[]
  adjectives: string[]
}

export default function Index() {
  const { projects, blog, adjectives } = useLoaderData<LoaderData>()
  const textTransitionProps = useTextTransition(...adjectives)
  const isSSR = useIsSSR()

  return (
    <main>
      <Section className="items-center py-16">
        <div className="w-full md:w-2/3">
          <h1 className="mb-12">
            I bring designs to life on your screen...{" "}
            {isSSR ? (
              adjectives[0]
            ) : (
              <TextTransition {...textTransitionProps} />
            )}
            .
          </h1>
          <p>
            I am a <em>front-end developer</em> with a drive for creating
            beautiful web and mobile applications.
          </p>
          <Stack />
          <p>
            Currently applying my skills at <strong>Accenture Finland</strong> (
            <a
              href="https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"
              target="_blank"
            >
              we are hiring
            </a>
            ).
          </p>
          <div className="flex-auto my-12">
            <CodeBlock lang="bash">{code}</CodeBlock>
          </div>
        </div>
      </Section>
      <Section className="flex-col bg-depth p-16">
        <div className="flex justify-between items-baseline">
          <h2>Featured work</h2>
          <div className="flex gap-12 ">
            <Link to="projects">View all projects</Link>
            <Link to="blog">View blog</Link>
          </div>
        </div>
        <div>
          <FeaturedGrid projects={projects} blog={blog} />
        </div>
      </Section>
    </main>
  )
}

function Stack() {
  const stack = [
    "React",
    "React Native",
    "TypeScript",
    "GraphQL",
    "Node.js",
    "Figma",
  ]
  return (
    <p>
      Stack:{" "}
      {stack.map((text, i, a) => (
        <Fragment key={text}>
          <code key={text}>{text}</code>
          {i === a.length - 1 ? "" : i === a.length - 2 ? " and " : ", "}
        </Fragment>
      ))}
    </p>
  )
}

/** Grid component */
export function FeaturedGrid({
  projects,
  blog,
}: Pick<LoaderData, "blog" | "projects">): JSX.Element | null {
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
    <Grid<ContentCommonData>
      items={[...projects, ...blog]}
      renderItem={renderItem}
      generateLink={generateLink}
      fallback={null}
    />
  )
}
