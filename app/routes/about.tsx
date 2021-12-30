import { Outlet, useLoaderData, type MetaFunction } from "remix"

// import AnimatedTitle from "~/components/molecules/AnimatedTitle"
// import { Paragraph } from "~/components/atoms/Text"
import { getAbout, getCareer, getEducation } from "~/features/about/api"
import { AwaitedReturn } from "~/types"
import { H1, H2, H3 } from "~/components/atoms/Heading"
import Img from "~/components/atoms/Img"

export let meta: MetaFunction = ({}) => {
  return {
    title: "About",
    description: "Home of Siddhant Gupta!",
  }
}

export async function loader() {
  const about = await getAbout()
  const career = await getCareer()
  const education = await getEducation()

  return { about, career, education }
}

export default function About(): JSX.Element {
  const { about, career, education } =
    useLoaderData<AwaitedReturn<typeof loader>>()

  return (
    <main className="flex-1 container-mx">
      <H1>About me</H1>

      <H2>Career</H2>
      <ul className="flex gap-8 flex-col">
        {career.map((item: any) => (
          <li key={item.id} className="flex gap-4 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-lg">
              <Img src={item.icon} />
            </div>
            <H3 className="!m-0"> {item.company}</H3>
          </li>
        ))}
      </ul>

      <H2>Education</H2>
      <ul className="flex gap-8 flex-col">
        {education.map((item: any) => (
          <li key={item.id} className="flex gap-4 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-lg">
              <Img src={item.icon} />
            </div>
            <H3 className="!m-0"> {item.school}</H3>
          </li>
        ))}
      </ul>

      <Outlet />
    </main>
  )
}
