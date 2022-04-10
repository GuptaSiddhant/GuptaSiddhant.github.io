import clsx from "clsx"
import { Link } from "remix"

import { proseWidth, Section } from "~/ui/layout"
import { ExternalLink } from "~/ui/Link"
import { Caption, H2 } from "~/ui/typography"

import testimonies from "../testimonies"
import TestimonyCard from "./TestimonyCard"

export default function TestimonialsSection(): JSX.Element {
  return (
    <Section id="testimonials">
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        <Caption>
          <Link to="#testimonials">Testimonials</Link>
        </Caption>
        <H2 className="text-5xl font-bold leading-tight">
          Good words by great people
        </H2>
        <ExternalLink
          href="https://linkedin.com/in/guptasiddhant9/details/recommendations/"
          enableIcon
        >
          View on LinkedIn
        </ExternalLink>
      </div>

      <ul
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          "grid-flow-row-dense gap-10 px-4 py-4 sm:px-10",
        )}
      >
        {testimonies
          .filter((t) => !t.draft)
          .map((testimony) => {
            const isMediumContent = testimony.content.length > 200
            const isLongContent = testimony.content.length > 400

            return (
              <li
                key={testimony.id}
                className={clsx(
                  isMediumContent && "sm:col-span-2",
                  isLongContent && "sm:row-span-2",
                )}
              >
                <TestimonyCard {...testimony} />
              </li>
            )
          })}
      </ul>
    </Section>
  )
}
