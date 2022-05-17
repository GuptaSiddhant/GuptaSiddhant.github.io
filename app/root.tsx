import {
  json,
  type LinkDescriptor,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node"
import { Outlet, useCatch, useLoaderData } from "@remix-run/react"

import { fullName } from "f-about"
import Document, { linkDescriptors } from "f-document"
import {
  getAllFeatureFlags,
  FeatureFlagsContext,
  type FeatureFlags,
} from "f-featureFlags"
import { Crumb, type MatchedCrumbProps } from "ui/Breadcrumbs"
import Section from "ui/Section"
import { H1 } from "ui/typography"
import "service/appcheck"

export function links(): LinkDescriptor[] {
  return linkDescriptors
}

export const meta: MetaFunction = () => {
  return {
    title: fullName,
    description: "Webfolio of a developer/designer.",
    charset: "utf-8",
    viewport:
      "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0",
    "application-name": fullName,
    "apple-mobile-web-app-title": fullName,
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
  }
}

export interface RootLoaderData {
  featureFlags: FeatureFlags
}

export const loader: LoaderFunction = async () => {
  const featureFlags = await getAllFeatureFlags()

  return json<RootLoaderData>({ featureFlags })
}

export default function App() {
  const { featureFlags } = useLoaderData<RootLoaderData>()

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      <Document>
        <Outlet />
      </Document>
    </FeatureFlagsContext.Provider>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document>
      <Section.Prose>
        <H1>{"There was an error"}</H1>
        <p>{error.message}</p>
      </Section.Prose>
    </Document>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message =
        "Oops! Looks like you tried to visit a page that you do not have access to."
      break
    case 404:
      message =
        "Oops! Looks like you tried to visit a page that does not exist."
      break
    default:
      throw new Error(caught.data || caught.statusText)
  }

  const heading = `${caught.status}: ${caught.statusText}`

  return (
    <Document>
      <Section.Prose>
        <H1>{heading}</H1>
        <p>{message}</p>
        <button
          className="text-left"
          onClick={() => typeof window !== "undefined" && window.history.go(-1)}
        >
          Go back.
        </button>
      </Section.Prose>
    </Document>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps): JSX.Element => (
    <Crumb match={match} className="font-bold">
      GS
    </Crumb>
  ),
}
