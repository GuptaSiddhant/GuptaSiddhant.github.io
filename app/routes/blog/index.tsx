import { useLoaderData, useSubmit, type MetaFunction } from "remix"

import Article from "~/components/Article"
import Grid from "~/components/Grid"
import { SearchField } from "~/components/Input"
import Tag, { TagList } from "~/components/Tag"
import {
  getBlog,
  filterBlogByQuery,
  filterBlogByTags,
  generateUniqueTags,
} from "~/helpers/blog"
import { formatDate } from "~/helpers/utils"
import Section from "~/layouts/Section"
import { BlogPostContent, BlogPostData, LoaderFunctionProps } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

interface LoaderData {
  blog: BlogPostContent[]
  tags: string[]
  searchQuery: string | null
  selectedTags: string[]
}

export async function loader({
  request,
}: LoaderFunctionProps): Promise<LoaderData> {
  const { searchParams } = new URL(request.url)
  const querySearchParam = searchParams.get("q")
  const tagsSearchParam = searchParams.get("tags")

  const blog = await getBlog()
  const tags = generateUniqueTags(blog)
  const selectedTags = tagsSearchParam
    ? decodeURIComponent(tagsSearchParam)?.split(",")
    : []

  const filteredBlogBySelectedTags = filterBlogByTags(blog, selectedTags)

  const filteredBlogByQuery = filterBlogByQuery(
    filteredBlogBySelectedTags,
    querySearchParam,
  )

  return {
    tags,
    selectedTags,
    searchQuery: querySearchParam,
    blog: filteredBlogByQuery,
  }
}

export default function Projects(): JSX.Element {
  const { blog } = useLoaderData<LoaderData>()

  return (
    <Section className="flex-col">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <Search />
        <TagFilter />
      </div>

      <BlogGrid posts={blog} />
    </Section>
  )
}

function Search(): JSX.Element {
  const submit = useSubmit()
  const { selectedTags, searchQuery } = useLoaderData<LoaderData>()

  function handleChange(query: string) {
    submit({ q: query, tags: selectedTags.join(",") }, { replace: true })
  }

  return (
    <SearchField
      placeholder="Search in blog..."
      value={searchQuery || ""}
      onChange={handleChange}
      aria-label="Search"
    />
  )
}

function TagFilter(): JSX.Element | null {
  const submit = useSubmit()
  const { tags, selectedTags, searchQuery } = useLoaderData<LoaderData>()

  function handleTagsChange(tags: string[]) {
    submit({ tags: tags.join(","), q: searchQuery || "" }, { replace: true })
  }

  return tags.length > 1 ? (
    <TagList
      onChange={handleTagsChange}
      value={selectedTags}
      aria-label="Filter by tags"
      reset
    >
      {tags.map((tag) => (
        <Tag key={tag} value={tag}>
          {tag}
        </Tag>
      ))}
    </TagList>
  ) : null
}

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
      renderItem={renderItem}
      checkIfFeatured={checkIfFeatured}
      generateLink={(project) => `/blog/${project.id}`}
      fallback={
        <div className="opacity-50">
          <h2>No blog posts found.</h2>
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
