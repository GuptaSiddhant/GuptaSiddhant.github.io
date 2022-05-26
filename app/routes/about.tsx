import { Outlet, useLoaderData } from "@remix-run/react"
import {
  json,
  type MetaFunction,
  type LoaderFunction,
} from "@remix-run/server-runtime"

import {
  getAllCareer,
  getAllEducation,
  type Career,
  type Education,
} from "~/features/about"
import { createMetaTitle } from "~/features/document"

import { Crumb, type MatchedCrumbProps } from "~/ui/Breadcrumbs"
import Pre from "~/ui/Pre"
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

export const meta: MetaFunction = () => ({
  title: createMetaTitle("About"),
})

export default function About(): JSX.Element {
  const { careerList, educationList } = useLoaderData<LoaderData>()

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

      <Section.Prose>
        <Pre>{JSON.stringify(careerList, null, 2)}</Pre>
        <Pre>{JSON.stringify(educationList, null, 2)}</Pre>
      </Section.Prose>
    </>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps): JSX.Element => (
    <Crumb match={match}>About</Crumb>
  ),
}
