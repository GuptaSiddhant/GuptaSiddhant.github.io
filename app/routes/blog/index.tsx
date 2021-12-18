import { useLoaderData, type LoaderFunction, type MetaFunction } from "remix"

import Article from "~/components/Article"
import Grid from "~/components/Grid"
import { getBlog } from "~/helpers/blog"
import { formatDate } from "~/helpers/utils"
import Section from "~/layouts/Section"
import { BlogPostContent, BlogPostData } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({}) => {
  const blog = await getBlog()

  return { blog }
}

export default function Projects(): JSX.Element {
  const { blog } = useLoaderData<{ blog: BlogPostContent[] }>()

  return (
    <Section className="flex-col">
      <BlogGrid posts={blog} />
    </Section>
  )
}

/** index component */
function BlogGrid({ posts }: { posts: BlogPostContent[] }): JSX.Element | null {
  const checkIfFeatured = (post: BlogPostContent) => !!post.data.featured

  const renderItem = (post: BlogPostContent) => (
    <BlogPostCard
      post={post.data}
      imagePosition={checkIfFeatured(post) ? "right" : "bottom"}
    />
  )

  return (
    <Grid
      items={posts}
      className="mt-12"
      renderItem={renderItem}
      checkIfFeatured={checkIfFeatured}
      generateLink={(project) => `/blog/${project.id}`}
      fallback={
        <div className="opacity-50">
          <h1>No blog posts found.</h1>
        </div>
      }
    />
  )
}

export function BlogPostCard({
  post,
  className,
  imagePosition = "bottom",
}: {
  post: BlogPostData
  className?: string
  imagePosition?: "bottom" | "right"
}): JSX.Element {
  const { title, subtitle, date, tags } = post
  const imageSrc = post.gallery?.[0]?.url
  const imageAlt = post.gallery?.[0]?.alt || title

  return (
    <Article
      imageProps={{ src: imageSrc, alt: imageAlt }}
      imagePosition={imagePosition}
      className={className}
    >
      <div className="text-3xl font-bold">{title}</div>
      <div className="text-yellow-500 font-black uppercase">
        {formatDate(date)}
      </div>
      <Article.Tags tags={tags} />
      <p>{subtitle}</p>
    </Article>
  )
}
