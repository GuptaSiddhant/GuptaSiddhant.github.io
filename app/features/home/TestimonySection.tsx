import clsx from "clsx"
import { Link } from "remix"
import Card from "~/components/atoms/Card"

import Heading from "~/components/atoms/Heading"
import { Strong } from "~/components/atoms/Text"
import Section from "~/components/templates/Section"
import { sortByDate } from "~/helpers"
import { testimonies, Testimony } from "~/helpers/about"

/** TestimonySection component */
export function TestimonySection(): JSX.Element | null {
  const filteredTestimonies = testimonies
    .filter((t) => !t.draft)
    .sort((a, b) => sortByDate(a.date, b.date))

  return (
    <Section id="testimony" className="flex-col sm:p-16">
      <div>
        <Strong>{"Testimonials".toUpperCase()}</Strong>
        <Heading value={2} className="!mt-4">
          Good words by great people
        </Heading>
      </div>

      <Slider items={filteredTestimonies} RenderComponent={TestimonyCard} />
    </Section>
  )
}

type SliderRenderComponentProps<T> = T & {
  className?: string
}

function Slider<T extends { id: string }>({
  items,
  RenderComponent,
}: {
  items: T[]
  RenderComponent: (props: SliderRenderComponentProps<T>) => JSX.Element | null
}): JSX.Element {
  return (
    <div
      className={clsx(
        "flex overflow-x-auto w-auto gap-12",
        "snap-mandatory snap-x",
        "relative",
      )}
    >
      {items.map((item) => (
        <RenderComponent
          key={item.id}
          className="snap-center"
          as="li"
          {...item}
        />
      ))}
    </div>
  )
}

function TestimonyCard({
  content,
  className,
}: SliderRenderComponentProps<Testimony>): JSX.Element | null {
  return (
    <Card
      className={clsx(
        "h-auto min-w-fit  mb-10",
        "flex items-center justify-center",
        className,
      )}
    >
      <Heading value={5} className="indent-8">
        {content}
      </Heading>
    </Card>
  )
}
