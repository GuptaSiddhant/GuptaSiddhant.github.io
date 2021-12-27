import clsx from "clsx"
import { Link } from "remix"
import BackIcon from "remixicon-react/ArrowLeftLineIcon"
import ForwardIcon from "remixicon-react/ArrowRightLineIcon"
import Figure from "~/components/Figure"

import type { ProjectContent } from "./types"

export function ProjectFooter({
  className,
  project,
}: {
  project?: ProjectContent | null
  className?: string
}): JSX.Element | null {
  if (!project) return null

  const id = project.id
  const { title, icon } = project.data

  return (
    <div
      className={clsx(
        "flex justify-between items-end",
        "border-solid border-t-2 border-opacity-50",
        "mt-12 pt-8",
        className,
      )}
    >
      <Link
        to={".."}
        className="flex items-center gap-2 text-base"
        data-custom-border
      >
        <BackIcon /> {"Back to all projects"}
      </Link>

      <div className="flex flex-col items-end">
        <Link
          to={`../${id}`}
          className="flex items-center gap-2 text-base"
          data-custom-border
        >
          {icon ? <Figure src={icon} className="w-8 h-8 !m-0" /> : null}
          {title}
          <ForwardIcon />
        </Link>
      </div>
    </div>
  )
}
