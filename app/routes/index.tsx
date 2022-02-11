import clsx from "clsx"
import { type MetaFunction } from "remix"

import { fullName, title, testimonies, type Testimony } from "~/features/about"
import { ExternalLink, InternalLink } from "~/components/Link"
import { H1, H2 } from "~/components/typography"
import { proseWidth, Section, Section64 } from "~/components/layout"
import { formatDate, formatList } from "~/helpers/format"

export let meta: MetaFunction = () => {
  return {
    title: fullName,
    description: "Home of Siddhant Gupta.",
  }
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
  return (
    <Section id="projects">
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        <strong className="text-2xl font-extrabold uppercase tracking-widest text-gray-200">
          Projects
        </strong>
        <H2 className="text-5xl font-bold leading-tight">
          Stuff I've been tinkering with
        </H2>
        <InternalLink to="/projects">View all projects</InternalLink>
      </div>

      <div className="flex w-auto gap-10 overflow-auto px-4 py-4 sm:px-10">
        {Array(10)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="h-[440px] min-w-[360px] rounded-lg bg-gray-800"
            ></div>
          ))}
      </div>
    </Section>
  )
}

function TestimonialsSection(): JSX.Element {
  return (
    <Section id="testimonials">
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        <strong className="text-2xl font-extrabold uppercase tracking-widest text-gray-200">
          Testimonials
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

      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          "grid-flow-row-dense gap-10 px-4 py-4 sm:px-10",
        )}
      >
        {testimonies
          // .filter((t) => !t.draft)
          .map((testimony) => (
            <TestimonyCard key={testimony.id} {...testimony} />
          ))}
      </div>
    </Section>
  )
}

function TestimonyCard({
  content,
  title,
  date,
  subtitle,
}: Testimony): JSX.Element {
  const isMediumContent = content.length > 200
  const isLongContent = content.length > 400

  return (
    <article
      className={clsx(
        "rounded-lg bg-gray-800 p-4",
        "flex flex-col justify-center",
        isMediumContent && "sm:col-span-2",
        isLongContent && "sm:row-span-2",
      )}
    >
      <blockquote className="whitespace-pre-line indent-8 text-base">
        {content}
      </blockquote>
      <footer className="mt-4">
        <address>
          <strong>{title}</strong>
          {subtitle ? `, ${subtitle}` : ""}
        </address>
        <time className="text-base text-gray-300" dateTime={date}>
          {formatDate(date)}
        </time>
      </footer>
    </article>
  )
}
