import Breadcrumbs from "ui/Breadcrumbs"
import StickyHeader from "ui/StickyHeader"

import { type ProjectType } from ".."
import ProjectActions from "./ProjectActions"

export default function ProjectStickyHeader(_: ProjectType): JSX.Element {
  return (
    <StickyHeader className={"justify-between"}>
      <Breadcrumbs />
      <ProjectActions />
    </StickyHeader>
  )
}
