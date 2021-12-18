import {
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import TextTransition from "react-text-transition"

import Section from "~/layouts/Section"
import CodeBlock from "~/components/CodeBlock"
import { getAllProjects } from "~/helpers/projects"
import ProjectGrid from "~/components/project/ProjectGrid"
import useTextTransition from "~/helpers/useTextTransition"
import type { ProjectContent } from "~/types"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async () => {
  const projects = (await getAllProjects()).filter(
    (project) => project.data.featured,
  )

  return { projects }
}

const code = `# An interactive resume for your terminal, made with React and ink. Run:
npx guptasiddhant`

export default function Index() {
  const { projects } = useLoaderData<{ projects: ProjectContent[] }>()
  const textTransitionProps = useTextTransition(
    "Accessibly",
    "Beautifully",
    "Responsibly",
    "Sensibly",
    "Efficiently",
  )

  return (
    <main>
      <Section className="items-center py-16">
        <div className="w-full md:w-2/3">
          <h1 className="mb-12">
            I bring designs to life on your screen...{" "}
            <TextTransition {...textTransitionProps} />.
          </h1>
          <p>
            I am a <em>front-end developer</em> with a drive for creating
            beautiful web and mobile applications.
          </p>
          <Stack />
          <p>
            Currently applying my skills at <strong>Accenture Finland</strong> (
            <a
              href="https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"
              target="_blank"
            >
              we are hiring
            </a>
            ).
          </p>
          <div className="flex-auto my-12">
            <CodeBlock lang="bash">{code}</CodeBlock>
          </div>
        </div>
      </Section>
      <Section className="flex-col bg-depth p-16">
        <div className="flex gap-12 items-baseline">
          <h2>Featured projects</h2>
          <Link to="projects">View all projects</Link>
        </div>
        <div>
          <ProjectGrid projects={projects} disabledFeatured />
        </div>
      </Section>
    </main>
  )
}

function Stack() {
  const stack = [
    "React",
    "React Native",
    "TypeScript",
    "GraphQL",
    "Node.js",
    "Figma",
  ]
  return (
    <p>
      Stack:{" "}
      {stack.map((text, i, a) => (
        <>
          <code key={text}>{text}</code>
          {i === a.length - 1 ? "" : i === a.length - 2 ? " and " : ", "}
        </>
      ))}
    </p>
  )
}
