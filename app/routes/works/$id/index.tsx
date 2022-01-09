import { Link, MetaFunction, useOutletContext } from "remix"
import { getHeadingClassName } from "~/components/atoms/Heading"
import Overdrive from "react-overdrive"
import ShowcaseImage from "~/components/molecules/ShowcaseImage"
import { WorkContext } from "../$id"
import Markdown from "~/components/templates/Markdown"
import Prose from "~/components/templates/Prose"
import Section from "~/components/templates/Section"

export default function WorkPageIndex() {
  const { work, code } = useOutletContext<WorkContext>()
  const { url, alt } = work.gallery?.[0] || {}

  return (
    <Section id="work-details" className="flex-col">
      <Link
        to="edit"
        className="absolute top-0 right-0 px-4 py-2 rounded bg-blue-800"
      >
        <p className={getHeadingClassName(6)}>Edit</p>
      </Link>
      <Overdrive id={work.id}>
        <ShowcaseImage src={url} alt={alt} />
      </Overdrive>
      <Prose>{code ? <Markdown code={code} /> : null}</Prose>
    </Section>
  )
}
