import {
  json,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/server-runtime"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getBlogPostById,
  getCrossSellBlogPosts,
  BlogPostHero,
  type BlogPostType,
  type BlogPostTeaser,
} from "~/features/blog"
import MarkdownSection from "~/features/mdx"

import { __IS_DEV__ } from "~/helpers"
import Breadcrumbs, { Crumb, type MatchedCrumbProps } from "~/ui/Breadcrumbs"
import { InternalLink } from "~/ui/Link"
import Section from "~/ui/Section"
import StickyHeader from "~/ui/StickyHeader"
import TeaserSection from "~/ui/TeaserSection"
import { H2 } from "~/ui/typography"

interface LoaderData {
  blogPost: BlogPostType
  crossSellBlogPosts: BlogPostTeaser[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("BlogPost id is required")

  try {
    const blogPost = await getBlogPostById(id)
    if (!blogPost) throw new Error(`BlogPost (${id}) not found.`)

    const crossSellBlogPosts = (await getCrossSellBlogPosts(blogPost)) || []

    return json<LoaderData>({ blogPost, crossSellBlogPosts })
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
  const { blogPost, crossSellBlogPosts } = useLoaderData<LoaderData>()
  const cover = blogPost?.gallery?.[0]?.url

  return (
    <>
      <StickyHeader>
        <Breadcrumbs />
      </StickyHeader>

      <BlogPostHero {...blogPost} />

      <img
        src={cover}
        alt={blogPost?.title}
        className="max-h-screen-main object-cover aspect-video w-full"
        loading="eager"
      />

      <MarkdownSection>{JSON.parse(blogPost.content || '""')}</MarkdownSection>

      <TeaserSection items={crossSellBlogPosts} linkBaseUrl="/blog/">
        <H2 className="!p-0">There are some others...</H2>
        <InternalLink to="/blog">View all blog posts</InternalLink>
      </TeaserSection>
    </>
  )
}

export function CatchBoundary() {
  const catchError = useCatch()

  return (
    <Section.Prose>
      <H2>Could not find the blog post!</H2>
      <InternalLink to="/blog">{"Back to Blog"}</InternalLink>
      {__IS_DEV__ ? (
        <pre className="whitespace-pre-wrap break-all text-sm text-red-400">
          {JSON.stringify(catchError, null, 2)}
        </pre>
      ) : null}
    </Section.Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Section.Prose>
      <H2>Error occurred!</H2>
      <p>{error.message}</p>
      <InternalLink to="/blog">{"Back to Blog"}</InternalLink>
      {__IS_DEV__ ? (
        <pre className="whitespace-pre-wrap break-all text-sm text-red-400">
          {error.stack}
        </pre>
      ) : null}
    </Section.Prose>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps<LoaderData>): JSX.Element => (
    <Crumb match={match}>{match.data.blogPost.title}</Crumb>
  ),
}
