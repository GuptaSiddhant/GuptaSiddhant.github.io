import { Outlet, useLoaderData } from "@remix-run/react"
import { json, type LoaderFunction } from "@remix-run/server-runtime"

import {
  getAllCareer,
  getAllEducation,
  type Career,
  type Education,
} from "~/features/about"

import { Crumb, type MatchedCrumbProps } from "~/ui/Breadcrumbs"
import Section from "~/ui/Section"
import { H1 } from "~/ui/typography"

interface LoaderData {
  careerList: Career[]
  educationList: Education[]
}

export const loader: LoaderFunction = async () => {
  const careerList = await getAllCareer()
  const educationList = await getAllEducation()

  return json<LoaderData>({ careerList, educationList })
}

export default function About(): JSX.Element {
  const { careerList, educationList } = useLoaderData<LoaderData>()
  console.dir({ careerList, educationList })

  return (
    <>
      <Section.Hero>
        <div>
          <H1>About</H1>
          <p className="mt-4 text-default">
            Thoughts on somethings. Sometimes everything.
          </p>
        </div>
      </Section.Hero>

      <Outlet />

      <pre className="whitespace-pre-wrap">
        {JSON.stringify(careerList, null, 2)}
      </pre>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(educationList, null, 2)}
      </pre>
    </>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps): JSX.Element => (
    <Crumb match={match}>About</Crumb>
  ),
}
