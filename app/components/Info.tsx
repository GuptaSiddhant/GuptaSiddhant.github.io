import { type ReactNode } from "react"
import { VisuallyHidden } from "@react-aria/visually-hidden"

export function InfoList({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <dl className={className}>{children}</dl>
}

export function InfoBox({
  field,
  children,
  className,
  hideField,
}: {
  className?: string
  field: string
  children: ReactNode
  hideField?: boolean
}) {
  return (
    <div className={className}>
      <dt>{hideField ? <VisuallyHidden>{field}</VisuallyHidden> : field}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export default { Info: InfoList, Box: InfoBox }
