import { Outlet, useCatch, type MetaFunction } from "remix"

import linksFunction from "./links"
import Document from "./Document"

export const links = linksFunction

export const meta: MetaFunction = () => {
  const title = "Siddhant Gupta"
  return {
    title,
    description: "Webfolio of a developer/designer.",
    "apple-mobile-web-app-title": title,
    "application-name": title,
    "msapplication-TileColor": "#603cba",
  }
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title="Error!">
      <main className="container-mx">
        <h1>{"There was an error"}</h1>
        <p>{error.message}</p>
      </main>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch()

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
    <Document title={heading}>
      <main className="container-mx">
        <h1>{heading}</h1>
        <p>{message}</p>
      </main>
    </Document>
  )
}
