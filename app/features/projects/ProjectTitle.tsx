import Heading from "~/components/Heading"
import { Paragraph } from "~/components/atoms/Text"
import { ProjectData } from "."

/** ProjectTitle component */
export function ProjectTitle(data: ProjectData): JSX.Element | null {
  const { title, subtitle, description } = data

  return (
    <div className="mb-8">
      <Heading as="h1" className="!m-0">
        {title}
      </Heading>
      <Paragraph className="font-bold">{subtitle || description}</Paragraph>
    </div>
  )
}
