import { Outlet, useLoaderData, type MetaFunction } from "remix"

import {
  CareerItem,
  EducationItem,
  getCareer,
  getEducation,
  isCareerItem,
} from "~/features/timeline"
import { AwaitedReturn } from "~/types"
import { H1 } from "~/components/atoms/Heading"
import { Strong } from "~/components/atoms/Text"
import Img from "~/components/atoms/Img"
import { sortByDate } from "~/helpers"

export const meta: MetaFunction = ({}) => {
  return {
    title: "Timeline",
    description: "Timeline of Siddhant Gupta!",
  }
}

export async function loader() {
  const career = await getCareer()
  const education = await getEducation()

  const timeline = [...career, ...education].sort((a, b) =>
    sortByDate(a.endDate, b.endDate),
  )

  return { timeline }
}

export default function About(): JSX.Element {
  const { timeline } = useLoaderData<AwaitedReturn<typeof loader>>()

  return (
    <main className="flex-1 container-mx">
      <H1>Timeline</H1>

      <ul className="flex gap-8 flex-col">
        {timeline.map((item) =>
          isCareerItem(item) ? (
            <CareerCard key={item.id} {...item} />
          ) : (
            <EducationCard key={item.id} {...item} />
          ),
        )}
      </ul>

      <Outlet />
    </main>
  )
}

/** Education component */
export function EducationCard({
  icon,
  school,
  startDate,
  endDate,
}: EducationItem): JSX.Element | null {
  return (
    <li className="flex gap-4 items-center">
      <div className="w-10 h-10 overflow-hidden rounded-lg">
        <Img src={icon} />
      </div>
      <Strong className="!m-0"> {school}</Strong>
      <div>
        ({startDate} - {endDate})
      </div>
    </li>
  )
}

/** Career component */
export function CareerCard({
  icon,
  company,
  startDate,
  endDate,
}: CareerItem): JSX.Element | null {
  return (
    <li className="flex gap-4 items-center">
      <div className="w-10 h-10 overflow-hidden rounded-lg">
        <Img src={icon} />
      </div>
      <Strong className="!m-0"> {company}</Strong>
      <div>
        ({startDate} - {endDate})
      </div>
    </li>
  )
}
