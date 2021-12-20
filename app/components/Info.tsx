import clsx from "clsx"
import { BaseComponentProps } from "~/types"

export function InfoList({ children, className }: BaseComponentProps) {
  return (
    <dl
      className={clsx(
        "flex flex-wrap justify-between",
        "gap-x-8 gap-y-4",
        className,
      )}
    >
      {children}
    </dl>
  )
}

export function InfoBox({
  field,
  children,
  className,
  hideField,
}: BaseComponentProps & {
  field: string
  hideField?: boolean
}) {
  return (
    <div className={className}>
      <dt className={clsx("font-bold text-sm block", hideField && "sr-only")}>
        {field}
      </dt>
      <dd className={"text-xl block"}>{children}</dd>
    </div>
  )
}

export default { Info: InfoList, Box: InfoBox }
