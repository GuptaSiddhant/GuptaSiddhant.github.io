import {
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import clsx from "clsx"

import Section from "~/layouts/Section"
import { getBlog } from "~/helpers/blog"
import { BlogPostContent, BlogPostData } from "~/types"
import Image from "~/components/Image"
import Tag, { TagList } from "~/components/Tag"
import { formatDate } from "~/helpers/utils"

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
    <Section className="flex-col pt-8">
      <ul
        className={clsx(
          "h-full",
          "grid gap-8 grid-flow-row-dense",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          // className,
        )}
      >
        {blog.map((blogPost) => {
          return (
            <li key={blogPost.id} style={{ height: "500px" }}>
              <Link
                data-custom-color
                prefetch="intent"
                to={`/blog/${blogPost.id}`}
              >
                <BlogPostCard {...blogPost.data} />
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

function BlogPostCard(blogPost: BlogPostData) {
  const { title, author, tags, date, featured, subtitle } = blogPost
  return (
    <article
      tabIndex={0}
      className={clsx(
        "relative",
        "bg-hover hover:shadow-xl",
        "rounded-2xl",
        "overflow-hidden",
        "h-full p-8 pb-0",
        "flex flex-col justify-between gap-4",
        "transition-transform duration-300",
        "hover:scale-102",
        "group",
      )}
    >
      <div>
        <div className="text-3xl font-bold">{title}</div>
        <div className="text-yellow-500 font-black uppercase">
          {formatDate(date)}
        </div>
        {/* <Tags tags={tags} /> */}
        <p className="text-sm">{subtitle}</p>
      </div>
      <ShowcaseImage {...blogPost} />
    </article>
  )
}

function ShowcaseImage({
  gallery = [],
  title,
}: BlogPostData): JSX.Element | null {
  const imageSrc = gallery[0]?.url
  const imageAlt = gallery[0]?.alt || title
  const className = clsx(
    "flex-1",
    "rounded",
    "w-full",
    "translate-y-1",
    "shadow-sm",
    "dark:shadow-md",
    "max-h-80",
    "bg-depth",
  )

  return imageSrc ? (
    <Image src={imageSrc} alt={imageAlt} className={className} />
  ) : null
}

function Tags({ tags = [] }: { tags?: string[] }): JSX.Element | null {
  return tags.length ? (
    <TagList aria-label="Tags">
      {tags.sort().map((tag) => (
        <Tag key={tag} value={tag} isDisabled>
          {tag}
        </Tag>
      ))}
    </TagList>
  ) : null
}
