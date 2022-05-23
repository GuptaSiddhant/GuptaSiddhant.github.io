import clsx from "clsx"
import QuoteStartIcon from "remixicon-react/DoubleQuotesLIcon"
import QuoteEndIcon from "remixicon-react/DoubleQuotesRIcon"

import DateTime from "~/ui/DateTime"

import { type Testimony } from "../types"

export default function TestimonyCard({
  content,
  title,
  date,
  subtitle,
  link,
}: Testimony): JSX.Element {
  return (
    <article
      className={clsx(
        "group relative",
        "h-full rounded-lg bg-secondary p-4 shadow-xl",
        "flex flex-col justify-center",
      )}
    >
      <blockquote className="flex-1 whitespace-pre-line indent-4" cite={link}>
        {content}
      </blockquote>
      <footer className="mt-2 text-sm text-quaternary ">
        <address>
          <strong>{title}</strong>
          {subtitle ? `, ${subtitle}` : ""}
          <DateTime
            date={date}
            className={clsx(
              "ml-1 text-xs",
              "opacity-0 transition-opacity group-hover:opacity-100",
              "absolute group-hover:static",
            )}
          />
        </address>
      </footer>
      <div className="absolute -left-2 -top-2 opacity-70" aria-hidden>
        <QuoteStartIcon size="40px" />
      </div>
      <div className="absolute -right-2 -bottom-2 opacity-70" aria-hidden>
        <QuoteEndIcon size="40px" />
      </div>
    </article>
  )
}
