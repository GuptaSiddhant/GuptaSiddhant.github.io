import { Link, MetaFunction, useOutletContext } from "remix"
import { getHeadingClassName } from "~/components/atoms/Heading"
import ShowcaseImage from "~/components/molecules/ShowcaseImage"
import { ProjectContext } from "../$id"
import Markdown from "~/components/templates/Markdown"
import Prose from "~/components/templates/Prose"
import Section from "~/components/templates/Section"

export default function ProjectIndex() {
  const { project, code } = useOutletContext<ProjectContext>()
  const { url, alt } = project.gallery?.[0] || {}

  return (
    <>
      <Section id="project-details" className="flex-col">
        <ShowcaseImage src={url} alt={alt} id={project.id} />
        {code ? (
          <Prose>
            <Markdown code={code} />
          </Prose>
        ) : null}
        <Link
          to="edit"
          className="absolute top-0 right-0 px-4 py-2 rounded bg-blue-800"
        >
          <p className={getHeadingClassName(6)}>Edit</p>
        </Link>
      </Section>
    </>
  )
}
