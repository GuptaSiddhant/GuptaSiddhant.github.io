import { LinkDescriptor, MetaFunction } from "@remix-run/node";
import { Outlet, useCatch, useNavigate } from "@remix-run/react";

import { fullName } from "./features/about"
import { SectionProse } from "./ui/layout"
import { H1 } from "./ui/typography"
import Document from "./features/document"
import fontStyles from "./styles/font.css"
import tailwindStyles from "./styles/tailwind.css"

// https://remix.run/api/app#links
export function links(): LinkDescriptor[] {
  return [
    {
      rel: "preload",
      as: "font",
      href: "https://fonts.gstatic.com/s/nunito/v20/XRXV3I6Li01BKofINeaBTMnFcQ.woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preconnect",
      href: "https://firebasestorage.googleapis.com",
    },
    { rel: "stylesheet", href: fontStyles },
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
  return {
    title: fullName,
    description: "Webfolio of a developer/designer.",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    "theme-color": "#000000",
    "apple-mobile-web-app-title": fullName,
    "application-name": fullName,
    "msapplication-TileColor": "#000000",
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
    <Document>
      <SectionProse>
        <H1>{"There was an error"}</H1>
        <p>{error.message}</p>
      </SectionProse>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()
  const navigate = useNavigate()

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
        <a href="javascript:history.go(-1)">Go back.</a>
      </SectionProse>
    </Document>
  )
}
