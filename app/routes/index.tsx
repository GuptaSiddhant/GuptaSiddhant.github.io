import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { fullName, heroAdjectives, techStackList, title } from "f-about"
import {
  getProjectList,
  ProjectsTeaserSection,
  type ProjectTeaser,
} from "f-projects"
import { getAllBlogPosts, BlogTeaserSection, type BlogPostType } from "f-blog"
import {
  getAllTestimonies,
  TestimonialsSection,
  type Testimony,
} from "f-testimonials"

import { formatList } from "helpers/format"
import ChangingText from "ui/ChangingText"
import Section from "ui/Section"
import { ExternalLink, InternalLink } from "ui/Link"
import { H1 } from "ui/typography"

export const meta: MetaFunction = () => {
  return {
    title: fullName,
    description: "Home of Siddhant Gupta.",
  }
}

interface LoaderData {
  projects: ProjectTeaser[]
  blogPosts: BlogPostType[]
  testimonies: Testimony[]
}

export const loader: LoaderFunction = async () => {
  const projects = await getProjectList(5)
  const blogPosts = await getAllBlogPosts(3)
  const testimonies = await getAllTestimonies(5)

  return json<LoaderData>({ projects, blogPosts, testimonies })
}

export default function Index() {
  const { projects, blogPosts, testimonies } = useLoaderData<LoaderData>()

  return (
    <>
      <HeroSection />
      <ProjectsTeaserSection projects={projects} />
      <BlogTeaserSection blogPosts={blogPosts} />
      <TestimonialsSection testimonies={testimonies} />
    </>
  )
}

function HeroSection(): JSX.Element {
  const jobLink =
    "https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"

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
        <p>
          Currently applying my skills at <strong>Accenture Interactive</strong>{" "}
          <span title="Finland">🇫🇮</span> (
          <ExternalLink href={jobLink} enableIcon>
            we are hiring
          </ExternalLink>
          ).
        </p>
        <InternalLink to="/about">Read more about me.</InternalLink>
      </div>

      {/* Terminal resume */}
      <pre className="-mx-4 whitespace-pre-line rounded-lg bg-black p-4 text-base">
        <code className="mb-1 block select-none text-sm text-gray-500">
          [shell]
        </code>
        <code className="block select-none text-sm text-gray-300">
          # An interactive resume for your terminal, made with React and ink.
          Run:
        </code>
        <code className="block text-white">npx guptasiddhant</code>
      </pre>
    </Section.Hero>
  )
}
