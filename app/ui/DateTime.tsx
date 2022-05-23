import { formatDate } from "~/helpers/format"
import type { CommonProps } from "~/types"

export default function DateTime({
  date,
  ...props
}: {
  date?: Date | string
} & CommonProps): JSX.Element | null {
  if (!date) return null

  return (
    <time {...props} dateTime={date.toString()}>
      ({formatDate(date)})
    </time>
  )
}
