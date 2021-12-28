import { H1 } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"
import { ProjectData } from "."

/** ProjectTitle component */
export function ProjectTitle(data: ProjectData): JSX.Element | null {
  const { title, subtitle, description } = data

  return (
    <div className="mb-8">
      <H1 className="!m-0">{title}</H1>
      <Paragraph className="font-bold">{subtitle || description}</Paragraph>
    </div>
  )
}
