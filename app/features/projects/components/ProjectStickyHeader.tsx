import { Link } from "@remix-run/react"
import clsx from "clsx"

import StickyHeader from "~/ui/StickyHeader"

import { type ProjectType } from ".."
import ProjectActions from "./ProjectActions"

export default function ProjectStickyHeader({
  title,
}: ProjectType): JSX.Element {
  return (
    <StickyHeader className={"justify-between"}>
      <Link
        to="#main"
        className={clsx(
          "text-xl font-bold text-gray-200 hover:text-white",
          "text-ellipsis overflow-hidden whitespace-nowrap",
        )}
      >
        {title}
      </Link>
      <ProjectActions />
    </StickyHeader>
  )
}
