import { Link, LinkProps } from "remix"
import { ProjectType } from "./index"
import Overdrive from "react-overdrive"
import TagList from "~/components/molecules/TagList"
import clsx from "clsx"
import Img from "~/components/atoms/Img"
import Tape from "~/components/atoms/Tape"

export default function ProjectCard({
  project,
  linkTo = project.id,
}: {
  project: ProjectType
  linkTo?: LinkProps["to"]
}) {
  const { id, title, subtitle, description, gallery, tags, draft, icon } =
    project
  const { url: src, alt } = gallery?.[0] || {}

  const cardClassName = clsx(
    `w-full h-[440px] overflow-hidden rounded-lg`,
    "flex flex-col justify-end relative group",
    "border-solid border-2 border-gray-700",
  )
  const detailsClassName = clsx(
    "bg-gradient-to-t from-gray-900",
    "p-4 group-hover:pb-8 transition-[padding] duration-300",
    "flex flex-col gap-0 group-hover:gap-2 group-focus:gap-2",
  )
  const titleClassName = clsx("font-bold text-2xl text-shadow")
  const appearClassName = clsx(
    "max-h-0 group-focus:max-h-96 group-hover:max-h-96 transition-[max-height] duration-300",
    "opacity-0 group-hover:opacity-100 group-focus:opacity-100",
  )
  const imageClassName = clsx(
    "absolute object-cover -z-10 inset-0",
    "group-focus:blur-sm group-focus:brightness-75 group-hover:blur-sm group-hover:brightness-75 transition-[filter] duration-200",
  )

  return (
    <Link
      key={project.id}
      to={linkTo}
      data-custom-border
      data-custom-color
      className={cardClassName}
    >
      <div className={detailsClassName}>
        {icon ? (
          <div className={clsx("w-8 h-8", appearClassName)}>
            <Img src={icon} alt={`${title}-icon`} />
          </div>
        ) : null}
        <div className={titleClassName}>{title}</div>
        {subtitle || description ? (
          <div className={appearClassName}>{subtitle || description}</div>
        ) : null}
        {tags ? (
          <TagList
            className={appearClassName}
            tags={tags}
            size="sm"
            checkIsTagDisabled={() => true}
          />
        ) : null}
      </div>
      {src ? (
        <Overdrive id={id} duration={300}>
          <Img src={src} alt={alt} className={imageClassName} />
        </Overdrive>
      ) : null}
      {draft ? <Tape variant="yellow">Draft</Tape> : null}
    </Link>
  )
}
