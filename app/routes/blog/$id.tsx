import {
  Link,
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import clsx from "clsx"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"

import { getBlogPostById } from "~/helpers/blog"
import Markdown from "~/components/Markdown"
import Image from "~/components/Image"
import { formatDate } from "~/helpers/utils"
import { InfoBox, InfoList } from "~/components/Info"
import type { BlogPostContent, BlogPostData } from "~/types"
import CopyButton from "~/components/CopyButton"
import { useIsSSR } from "@react-aria/ssr"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Blog post id is required.")

  const blogPost = await getBlogPostById(id)

  if (blogPost.data.draft) {
    return redirect(`..`)
  }

  return blogPost
}

export default function BlogPost(): JSX.Element {
  const { data, content } = useLoaderData<BlogPostContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <section>
      <h1 className="prose">{title}</h1>
      <BlogInfo data={data} className="prose" />
      {showcaseImage ? (
        <Image
          src={showcaseImage}
          alt={title}
          className={clsx(
            "rounded-xl",
            "border-8 border-depth",
            "-mx-4",
            "aspect-w-16 aspect-h-9",
          )}
        />
      ) : null}

      <div className="prose">
        <Markdown value={content} />
      </div>
    </section>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <section>
      <h1>{"Error with the project"}</h1>
      <p>{error.message}</p>
    </section>
  )
}

function BlogInfo({
  className,
  data: { date, author, subtitle },
}: {
  data: BlogPostData
  className?: string
}) {
  const pageUrl = useIsSSR() ? "" : window.location.href
  const linkedInShareUrl =
    "https://www.linkedin.com/sharing/share-offsite/?url=" +
    encodeURIComponent(pageUrl)

  return (
    <InfoList className={className}>
      {subtitle ? (
        <InfoBox field="Description" hideField className="w-full">
          {subtitle}
        </InfoBox>
      ) : null}
      <div>
        <InfoBox field="Author" hideField>
          <small className="text-yellow-500">{author}</small>
        </InfoBox>
        <InfoBox field="Date" hideField>
          <small className="text-tertiary">
            {formatDate(date, { day: "numeric" })}
          </small>
        </InfoBox>
      </div>
      <div className="flex self-center gap-4">
        <Link to={linkedInShareUrl} data-custom-border>
          <LinkedinIcon aria-label={"Share to LinkedIn"} />
        </Link>
        <CopyButton
          className="relative"
          content={pageUrl}
          position="bottom"
          label="Copy link"
        />
      </div>
    </InfoList>
  )
}
