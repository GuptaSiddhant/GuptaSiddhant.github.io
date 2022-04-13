import {
  json,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import {
  fullName,
  heroAdjectives,
  techStackList,
  title,
} from "~/features/about"
import {
  getAllProjects,
  ProjectsTeaserSection,
  type ProjectType,
} from "~/features/projects"

import { TestimonialsSection } from "~/features/testimonials"
import { formatList } from "~/helpers/format"
import ChangingText from "~/ui/ChangingText"
import { SectionProse } from "~/ui/layout"
import { ExternalLink, InternalLink } from "~/ui/Link"
import { H1 } from "~/ui/typography"

export const meta: MetaFunction = () => {
  return {
    title: fullName,
    description: "Home of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async () => {
  const projects = await getAllProjects(5)

  return json(projects)
}

export default function Index() {
  const projects = useLoaderData<ProjectType[]>()

  return (
    <>
      <HeroSection />
      <ProjectsTeaserSection projects={projects} />
      <TestimonialsSection />
    </>
  )
}

function HeroSection(): JSX.Element {
  const jobLink =
    "https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"

  return (
    <SectionProse id="hero">
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
    </SectionProse>
  )
}
