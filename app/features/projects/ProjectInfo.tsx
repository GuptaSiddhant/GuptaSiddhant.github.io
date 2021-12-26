import { useIsSSR } from "@react-aria/ssr"

import { InfoBox, InfoList } from "~/components/Info"
import { capitalize, formatDate } from "~/helpers"
import ProjectLinks from "./ProjectLinks"
import type { ProjectData } from "./types"

export function ProjectInfo({
  className,
  data: { association, dateStart, dateEnd, links = [] },
}: {
  data: ProjectData
  className?: string
}) {
  const pageUrl = useIsSSR() ? "" : window.location.href

  return (
    <InfoList className={className}>
      {association ? (
        <InfoBox field="Client">
          {capitalize(association.replace("-", " "))}
        </InfoBox>
      ) : null}
      <InfoBox field="Status">{getProjectStatus(dateStart, dateEnd)}</InfoBox>
      <ProjectLinks links={links} />
    </InfoList>
  )
}

function getProjectStatus(start?: Date | string, end?: Date | string) {
  const now = new Date()
  if (end) {
    const endDate = new Date(end)
    if (now > endDate)
      return `Completed (${formatDate(endDate, { day: undefined })})`
  }
  if (start) {
    const startDate = new Date(start)
    if (now > startDate)
      return `Ongoing since ${formatDate(startDate, { day: undefined })}`
  }
  return "Upcoming"
}
