import { Link } from "remix"
import EditIcon from "remixicon-react/Edit2FillIcon"
import { Paragraph } from "~/components/atoms/Text"
import { ProjectData } from "."

/** ProjectTitle component */
export function ProjectTitle({
  edit,
  id,
  ...data
}: ProjectData & { id: string; edit?: boolean }): JSX.Element | null {
  const { title, subtitle, description } = data

  return (
    <div className="mb-8">
      <h1 className="!m-0 flex justify-between">
        {title}{" "}
        {edit ? (
          <Link to={`/projects/edit/${id}`} className="text-lg">
            <EditIcon className="inline-block" />
            Edit
          </Link>
        ) : null}
      </h1>
      <Paragraph className="font-bold">{subtitle || description}</Paragraph>
    </div>
  )
}
