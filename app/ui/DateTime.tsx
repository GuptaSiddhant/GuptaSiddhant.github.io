import { formatDate } from "~/helpers/format"
import type { CommentProps } from "./types"

export default function DateTime({
  date,
  ...props
}: {
  date?: Date | string
} & CommentProps): JSX.Element | null {
  if (!date) return null

  return (
    <time {...props} dateTime={date.toString()}>
      ({formatDate(date)})
    </time>
  )
}
