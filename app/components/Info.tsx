import clsx from "clsx"
import { type ReactNode } from "react"
import { capitalize } from "~/helpers/utils"
import type { ProjectData } from "~/types"

export default function InfoBanner({
  className,
  data: { association, description, dateStart, dateEnd },
}: {
  data: ProjectData
  className?: string
}) {
  return (
    <dl className={clsx(className)}>
      {association ? (
        <InfoBox field="Associated with">
          {capitalize(association.replace("-", " "))}
        </InfoBox>
      ) : null}
      <InfoBox field="Status">{getStatus(dateStart, dateEnd)}</InfoBox>
      {description ? (
        <InfoBox field="Description">{description}</InfoBox>
      ) : null}
    </dl>
  )
}

export function InfoBox({
  field,
  children,
}: {
  field: string
  children: ReactNode
}) {
  return (
    <div>
      <dt>{field}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function getStatus(start?: Date | string, end?: Date | string) {
  const now = new Date()
  if (end) {
    const endDate = new Date(end)
    if (now > endDate) return `Completed (${formatDate(endDate)})`
  }
  if (start) {
    const startDate = new Date(start)
    if (now > startDate) return `Ongoing since ${formatDate(startDate)}`
  }
  return "Upcoming"
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  })
}
