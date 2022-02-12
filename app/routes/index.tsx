import clsx from "clsx"
import {
  json,
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import QuoteStartIcon from "remixicon-react/DoubleQuotesLIcon"
import QuoteEndIcon from "remixicon-react/DoubleQuotesRIcon"

import { fullName, title, testimonies, type Testimony } from "~/features/about"
import { ExternalLink, InternalLink } from "~/components/Link"
import { H1, H2 } from "~/components/typography"
import { proseWidth, Section, Section64 } from "~/components/layout"
import { formatDate, formatList } from "~/helpers/format"
import { getAllProjects, type ProjectType } from "~/features/projects"

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
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <TestimonialsSection />
    </>
  )
}

function HeroSection(): JSX.Element {
  const techStackList = [
    "React",
    "React Native",
    "TypeScript",
    "GraphQL",
    "Node.js",
    "Figma",
  ]

  const jobLink =
    "https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"

  return (
    <Section64 id="hero">
      <H1 className="text-5xl font-bold leading-tight">
        I bring designs to life on your screen. Responsibly
      </H1>
      <div className="flex flex-col gap-4">
        <p>
          I am a <strong>{title}</strong> with a drive for creating beautiful
          web and mobile apps with {formatList(techStackList)}.
        </p>
        <p>
          Currently applying my skills at Accenture Finland (
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
        <code className="block select-none text-gray-300">
          # An interactive resume for your terminal, made with React and ink.
          Run:
        </code>
        <code className="block text-white">npx guptasiddhant</code>
      </pre>
    </Section64>
  )
}

function ProjectsSection(): JSX.Element {
  const projects = useLoaderData<ProjectType[]>()

  return (
    <Section id="projects">
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        <strong className="text-2xl font-extrabold uppercase tracking-widest text-gray-200">
          <Link to="#projects">Projects</Link>
        </strong>
        <H2 className="text-5xl font-bold leading-tight">
          Stuff I've been tinkering with
        </H2>
        <InternalLink to="/projects">View all projects</InternalLink>
      </div>

      <ul className="flex w-full gap-4 overflow-auto px-4 py-4 sm:gap-10 sm:px-10">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ProjectCard({ title, gallery }: ProjectType): JSX.Element {
  const cover = gallery?.[0].url

  return (
    <article
      className={clsx(
        "group relative",
        "h-72 min-w-[12rem] overflow-hidden rounded-lg shadow-xl sm:h-[25rem] sm:min-w-[20rem]",
        "bg-gray-800 bg-cover bg-center bg-no-repeat",
      )}
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0",
          "bg-gradient-to-t from-gray-900 ",
          "p-4 transition-[padding] duration-300 group-hover:pb-8",
          "flex flex-col gap-0 group-hover:gap-2 group-focus:gap-2",
        )}
      >
        <span className={"text-shadow text-2xl font-bold"}>{title}</span>
      </div>
    </article>
  )
}

function TestimonialsSection(): JSX.Element {
  return (
    <Section id="testimonials">
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        <strong className="text-2xl font-extrabold uppercase tracking-widest text-gray-200">
          <Link to="#testimonials">Testimonials</Link>
        </strong>
        <H2 className="text-5xl font-bold leading-tight">
          Good words by great people
        </H2>
        <ExternalLink
          href="https://linkedin.com/in/guptasiddhant9/details/recommendations/"
          enableIcon
        >
          View on LinkedIn
        </ExternalLink>
      </div>

      <ul
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          "grid-flow-row-dense gap-10 px-4 py-4 sm:px-10",
        )}
      >
        {testimonies
          .filter((t) => !t.draft)
          .map((testimony) => {
            const isMediumContent = testimony.content.length > 200
            const isLongContent = testimony.content.length > 400

            return (
              <li
                key={testimony.id}
                className={clsx(
                  isMediumContent && "sm:col-span-2",
                  isLongContent && "sm:row-span-2",
                )}
              >
                <TestimonyCard {...testimony} />
              </li>
            )
          })}
      </ul>
    </Section>
  )
}

function TestimonyCard({
  content,
  title,
  date,
  subtitle,
  link,
}: Testimony): JSX.Element {
  return (
    <article
      className={clsx(
        "relative h-full rounded-lg bg-gray-800 p-4 shadow-xl",
        "flex flex-col justify-center text-sm",
      )}
    >
      <blockquote className="flex-1 whitespace-pre-line indent-4" cite={link}>
        {content}
      </blockquote>
      <footer className="mt-2 text-gray-200">
        <address>
          <strong>{title}</strong>
          {subtitle ? `, ${subtitle}` : ""}
        </address>
        <time className="text-xs text-gray-300" dateTime={date}>
          {formatDate(date)}
        </time>
      </footer>
      <div className="absolute -left-2 -top-2 opacity-70" aria-hidden>
        <QuoteStartIcon size="40px" />
      </div>
      <div className="absolute -right-2 -bottom-2 opacity-70" aria-hidden>
        <QuoteEndIcon size="40px" />
      </div>
    </article>
  )
}
