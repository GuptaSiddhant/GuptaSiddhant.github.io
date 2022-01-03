import clsx from "clsx"
import QuoteStartIcon from "remixicon-react/DoubleQuotesLIcon"
import QuoteEndIcon from "remixicon-react/DoubleQuotesRIcon"

import Card from "~/components/atoms/Card"
import ExternalLink from "~/components/atoms/ExternalLink"
import Heading from "~/components/atoms/Heading"
import Text, { Strong } from "~/components/atoms/Text"
import Section from "~/components/templates/Section"
import Slider, {
  type SliderRenderComponentProps,
} from "~/components/organisms/Slider"
import { sortByDate } from "~/helpers"
import { testimonies, Testimony } from "~/helpers/about"
import useBreakpoints from "~/helpers/useBreakpoints"

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

function TestimonyCard({
  content,
  title,
  subtitle,
  link,
  className,
}: SliderRenderComponentProps<Testimony>): JSX.Element | null {
  const { isMobile } = useBreakpoints()
  return (
    <Card
      className={clsx(
        "overflow-visible",
        "items-center justify-center",
        "flex-col",
        className,
      )}
    >
      <div className="absolute -left-6 -top-6 opacity-90" aria-hidden>
        <QuoteStartIcon size="80px" />
      </div>
      <div className="absolute -right-6 -bottom-6 opacity-90" aria-hidden>
        <QuoteEndIcon size="80px" />
      </div>

      <Heading
        value={isMobile ? 6 : 5}
        className="indent-8 whitespace-pre-line"
      >
        {content}
      </Heading>

      <div className="w-full text-secondary text-lg">
        <Strong>{title}</Strong>
        {subtitle ? <Text>, {subtitle}</Text> : null}
        {link ? <ExternalLink href={link} tooltipLabel="View source" /> : null}
      </div>
    </Card>
  )
}
