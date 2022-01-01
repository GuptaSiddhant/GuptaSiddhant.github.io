import { Outlet, useLoaderData, type MetaFunction } from "remix"

// import AnimatedTitle from "~/components/molecules/AnimatedTitle"
// import { Paragraph } from "~/components/atoms/Text"
import {
  CareerItem,
  EducationItem,
  getCareer,
  getEducation,
  isCareerItem,
} from "~/features/about"
import { AwaitedReturn } from "~/types"
import { H1 } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"
import Img from "~/components/atoms/Img"
import { sortByDate } from "~/helpers"

export const meta: MetaFunction = ({}) => {
  return {
    title: "About",
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
      <H1>About me</H1>

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
}: EducationItem): JSX.Element | null {
  return (
    <li className="flex gap-4 items-center">
      <div className="w-10 h-10 overflow-hidden rounded-lg">
        <Img src={icon} />
      </div>
      <Paragraph className="!m-0"> {school}</Paragraph>
    </li>
  )
}

/** Career component */
export function CareerCard({ icon, company }: CareerItem): JSX.Element | null {
  return (
    <li className="flex gap-4 items-center">
      <div className="w-10 h-10 overflow-hidden rounded-lg">
        <Img src={icon} />
      </div>
      <Paragraph className="!m-0"> {company}</Paragraph>
    </li>
  )
}
