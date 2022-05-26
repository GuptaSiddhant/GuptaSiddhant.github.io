import { json, type LoaderFunction } from "@remix-run/server-runtime"
import { useLoaderData } from "@remix-run/react"

import {
  type About,
  heroAdjectives,
  techStackList,
  getAbout,
} from "~/features/about"
import { getProjectList, type ProjectTeaser } from "~/features/projects"
import { getBlogPostsList, type BlogPostTeaser } from "~/features/blog"
import {
  getAllTestimonies,
  TestimonialsSection,
  type Testimony,
} from "~/features/about"

import { formatList } from "~/helpers/format"
import ChangingText from "~/ui/ChangingText"
import { Link, ExternalLink, InternalLink } from "~/ui/Link"
import Section from "~/ui/Section"
import TeaserSection from "~/ui/TeaserSection"
import { Caption, H1, H2 } from "~/ui/typography"
import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"

interface LoaderData {
  about: About
  projects: ProjectTeaser[]
  blogPosts: BlogPostTeaser[]
  testimonies: Testimony[]
}

export const loader: LoaderFunction = async () => {
  const about = await getAbout()
  const projects = await getProjectList(6)
  const blogPosts = await getBlogPostsList(6)
  const testimonies = await getAllTestimonies(6)

  return json<LoaderData>({ about, projects, blogPosts, testimonies })
}

export default function Index() {
  const { projects, blogPosts, testimonies } = useLoaderData<LoaderData>()

  return (
    <>
      <HeroSection />

      <TeaserSection items={projects} linkBaseUrl="/projects/" id="projects">
        <Caption>
          <Link to={"#projects"}>Projects</Link>
        </Caption>
        <H2 className="!p-0">Stuff I've been tinkering with</H2>
        <InternalLink to="/projects">View all projects</InternalLink>
      </TeaserSection>

      <TeaserSection items={blogPosts} linkBaseUrl="/blog/" id="blog">
        <Caption>
          <Link to={"#blog"}>Recent posts</Link>
        </Caption>
        <H2 className="!p-0">Recent thoughts and ideas...</H2>
        <InternalLink to="/blog">View all blog posts</InternalLink>
      </TeaserSection>

      <TestimonialsSection testimonies={testimonies} />
    </>
  )
}

function HeroSection(): JSX.Element {
  const { about } = useLoaderData<LoaderData>()
  const { title, npx, currentCompany } = about

  return (
    <Section.Hero>
      <H1>
        Hi, I bring designs to life on your screen,
        <ChangingText texts={heroAdjectives} />.
      </H1>
      <div className="flex flex-col gap-4">
        <p>
          I am a <strong>{title}</strong> with a drive for creating beautiful
          web and mobile apps with {formatList(techStackList)}.
        </p>
        {currentCompany.name ? (
          <p>
            Currently applying my skills at{" "}
            <ExternalLink href={currentCompany.link}>
              <strong>{currentCompany.name}</strong>
            </ExternalLink>
            {currentCompany.hiringLink ? (
              <>
                {" ("}
                <ExternalLink href={currentCompany.hiringLink} enableIcon>
                  we are hiring
                </ExternalLink>
                {")"}
              </>
            ) : null}
            .
          </p>
        ) : null}
        <InternalLink to="/about" prefetch="intent">
          Read more about me.
        </InternalLink>
      </div>

      <TerminalResume code={npx} />
    </Section.Hero>
  )
}

function TerminalResume({ code }: { code?: string }): JSX.Element | null {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 3000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleCopy = useCallback(
    (data: string) =>
      window.navigator.clipboard.writeText(data).then(() => setCopied(true)),
    [setCopied],
  )

  return code ? (
    <pre
      className="-mx-4 whitespace-pre-line rounded-lg bg-default p-4 text-base cursor-pointer"
      title="Click to copy"
      onClick={() => handleCopy(code)}
    >
      {/* <code className="mb-1 block select-none text-sm text-disabled">
        [shell]
      </code> */}
      <code className="block select-none text-sm text-disabled">
        # An interactive resume for your terminal, made with React and ink. Run:
      </code>
      <code
        className={clsx(
          "text-primary",
          "before:content-['$'] before:select-none before:text-disabled before:mr-2",
          "grid grid-cols-[max-content_1fr_max-content]",
        )}
      >
        <span>{code}</span>
        <span
          className={clsx(
            "select-none text-sm text-disabled",
            !copied && "border-[1px] border-gray-500 rounded-sm px-1",
          )}
        >
          {copied ? "Copied ✅" : "Copy"}
        </span>
      </code>
    </pre>
  ) : null
}
