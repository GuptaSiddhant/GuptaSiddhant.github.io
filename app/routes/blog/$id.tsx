import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Heading from "~/components/Heading"
import Markdown from "~/components/Markdown"
import ShowcaseImage from "~/components/ShowcaseImage"
import {
  getBlogPostById,
  BlogInfo,
  type BlogPostContent,
} from "~/features/blog"
import Prose from "~/components/layouts/Prose"
import { filterPageDraft } from "~/helpers"
import { Paragraph } from "~/components/atoms/Text"

export const meta: MetaFunction = (props) => {
  const {
    data: { title, description = "" },
  }: BlogPostContent = props.data
  return {
    title,
    description,
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Blog post id is required.")

  const blogPost = await getBlogPostById(id)

  if (!filterPageDraft(blogPost)) return redirect(`..`)

  return blogPost
}

export default function BlogPost(): JSX.Element {
  const { data, code } = useLoaderData<BlogPostContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <Prose>
      <Heading as="h1">{title}</Heading>
      <BlogInfo data={data} />
      {showcaseImage ? <ShowcaseImage src={showcaseImage} alt={title} /> : null}
      <Markdown code={code} />
    </Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <Heading as="h1">{"Error with the blog post"}</Heading>
      <Paragraph>{error.message}</Paragraph>
    </Prose>
  )
}
