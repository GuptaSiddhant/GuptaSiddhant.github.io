import clsx from "clsx"

import { InfoBox, InfoList } from "~/components/Info"
import { capitalize, formatDate } from "~/helpers/utils"
import type { ProjectData } from "~/types"

export default function ProjectInfo({
  className,
  data: { association, description, dateStart, dateEnd },
}: {
  data: ProjectData
  className?: string
}) {
  return (
    <InfoList className={className}>
      {association ? (
        <InfoBox field="Client">
          {capitalize(association.replace("-", " "))}
        </InfoBox>
      ) : null}
      <InfoBox field="Status">{getStatus(dateStart, dateEnd)}</InfoBox>
      {description ? (
        <InfoBox field="Description">{description}</InfoBox>
      ) : null}
    </InfoList>
  )
}

function getStatus(start?: Date | string, end?: Date | string) {
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
