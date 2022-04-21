import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getBlogPostById,
  // BlogPostHero,
  // BlogPostStickyHeader,
  type BlogPostType,
} from "~/features/blog"
import {
  ProjectHero as BlogPostHero,
  ProjectStickyHeader as BlogPostStickyHeader,
} from "~/features/projects"

import { SectionProse } from "~/ui/layout"
import { InternalLink } from "~/ui/Link"

import MarkdownSection from "~/ui/MarkdownSection"
import { H2 } from "~/ui/typography"

interface LoaderData {
  blogPost: BlogPostType
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("BlogPost id is required")

  try {
    const blogPost = await getBlogPostById(id)
    if (!blogPost) throw new Error(`BlogPost (${id}) not found.`)

    return json<LoaderData>({ blogPost })
  } catch (e) {
    throw new Error(`Failed to load blogPost (${id}): ${e}`)
  }
}

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  if (!data?.blogPost) return {}

  return {
    title: data.blogPost.title,
    description: data.blogPost.description || data.blogPost.subtitle,
  }
}

export default function BlogPostPage(): JSX.Element {
  const { blogPost } = useLoaderData<LoaderData>()
  const cover = blogPost?.gallery?.[0]?.url

  return (
    <>
      <BlogPostStickyHeader {...blogPost} />
      <BlogPostHero {...blogPost}>
        <a
          href="#maincontent"
          className="no-underline"
          title="Jump to main content"
        >
          ↓
        </a>
      </BlogPostHero>

      <img
        src={cover}
        alt={blogPost?.title}
        className="max-h-screen-main object-cover aspect-video w-full"
        loading="eager"
      />

      <MarkdownSection>{JSON.parse(blogPost.content || '""')}</MarkdownSection>
    </>
  )
}

export function CatchBoundary() {
  const catchError = useCatch()
  return (
    <SectionProse>
      <H2>Could not find the blog post!</H2>
      <InternalLink to="/blog">{"Back to Blog"}</InternalLink>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(catchError, null, 2)}
      </pre>
    </SectionProse>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <SectionProse>
      <H2>Error occurred!</H2>
      <p>{error.message}</p>
      <InternalLink to="/blog">{"Back to Blog"}</InternalLink>
      <pre>{error.stack}</pre>
    </SectionProse>
  )
}
