import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
  useCatch,
  type LinksFunction,
  type MetaFunction,
} from "remix"
import { SSRProvider } from "@react-aria/ssr"
import clsx from "clsx"

import Footer from "~/features/Footer"
import Header from "~/features/Header"
import fontStyles from "./styles/font.css"
import reachDialogStyles from "@reach/dialog/styles.css"
import reachTooltipStyles from "@reach/tooltip/styles.css"
import reachMenuStyles from "@reach/menu-button/styles.css"
import tailwindStyles from "./styles/tailwind.css"

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      as: "font",
      href: "https://fonts.gstatic.com/s/nunito/v20/XRXV3I6Li01BKofINeaBTMnFcQ.woff2",
      crossOrigin: "anonymous",
    },
    { rel: "stylesheet", href: fontStyles },
    { rel: "stylesheet", href: reachDialogStyles },
    { rel: "stylesheet", href: reachTooltipStyles },
    { rel: "stylesheet", href: reachMenuStyles },
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

function Document({
  children,
  title = "Siddhant Gupta",
  name = "Siddhant Gupta",
}: {
  children: React.ReactNode
  title?: string
  name?: string
}) {
  return (
    <SSRProvider>
      <html
        lang="en"
        dir="ltr"
        className="text-[14px] sm:text-[16px] lg:text-[18px]"
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content="#F9FAFB" />
          <meta
            name="theme-color"
            content="#111827"
            media="(prefers-color-scheme: dark)"
          />
          <title>{title}</title>
          <Meta />
          <Links />
        </head>
        <body
          className={clsx(
            "min-h-screen w-screen flex flex-col",
            "bg-base text-secondary",
          )}
        >
          <Header />
          {children}
          <Footer name={name} />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    </SSRProvider>
  )
}
