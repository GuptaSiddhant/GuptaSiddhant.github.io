import { Link } from "@remix-run/react";

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
        className="text-xl font-bold text-gray-200 hover:text-white"
      >
        {title}
      </Link>
      <ProjectActions />
    </StickyHeader>
  )
}
