import { H1 } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"
import { ProjectData } from "."

/** ProjectTitle component */
export function ProjectTitle(data: ProjectData): JSX.Element | null {
  const { title, subtitle, description } = data

  return (
    <div className="mb-8">
      <h1 className="!m-0">{title}</h1>
      <Paragraph className="font-bold">{subtitle || description}</Paragraph>
    </div>
  )
}
