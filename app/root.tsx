import type { LinkDescriptor, MetaFunction } from "@remix-run/node"
import { Outlet, useCatch } from "@remix-run/react"

import { fullName } from "./features/about"
import { SectionProse } from "./ui/layout"
import { H1 } from "./ui/typography"
import Document, { linkDescriptors } from "./features/document"

export function links(): LinkDescriptor[] {
  return linkDescriptors
}

export const meta: MetaFunction = () => {
  return {
    title: fullName,
    description: "Webfolio of a developer/designer.",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    "application-name": fullName,
    "apple-mobile-web-app-title": fullName,
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
  }
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document>
      <SectionProse>
        <H1>{"There was an error"}</H1>
        <p>{error.message}</p>
      </SectionProse>
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
      <SectionProse>
        <H1>{heading}</H1>
        <p>{message}</p>

        <a
          href="#"
          onClick={() => typeof window !== "undefined" && window.history.go(-1)}
        >
          Go back.
        </a>
      </SectionProse>
    </Document>
  )
}
