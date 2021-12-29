import { Outlet, useCatch, type MetaFunction, type LinkDescriptor } from "remix"

import Document from "./features/document"

import fontStyles from "./styles/font.css"
import tailwindStyles from "./styles/tailwind.css"
import reachDialogStyles from "@reach/dialog/styles.css"
import reachTooltipStyles from "@reach/tooltip/styles.css"
import reachMenuStyles from "@reach/menu-button/styles.css"

// https://remix.run/api/app#links
export function links(): LinkDescriptor[] {
  return [
    {
      rel: "preload",
      as: "font",
      href: "https://fonts.gstatic.com/s/nunito/v20/XRXV3I6Li01BKofINeaBTMnFcQ.woff2",
      crossOrigin: "anonymous",
    },
    { rel: "stylesheet", href: fontStyles },
    // reach-ui
    { rel: "stylesheet", href: reachDialogStyles },
    { rel: "stylesheet", href: reachTooltipStyles },
    { rel: "stylesheet", href: reachMenuStyles },
    // Tailwind
    { rel: "stylesheet", href: tailwindStyles },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ]
}

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
