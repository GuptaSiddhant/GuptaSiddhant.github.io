import clsx from "clsx"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import Search from "~/features/search"
import Header from "./Header"
import Footer from "./Footer"
import Progress from "./Progress"

const intlListFormatPolyfillScript =
  "https://polyfill.io/v3/polyfill.min.js?features=Intl.ListFormat,Intl.ListFormat.~locale.en"

export default function Document({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="text-[14px] sm:text-[16px] lg:text-[18px] m-0 p-0"
    >
      <head>
        <Meta />
        <Links />
        <script src={intlListFormatPolyfillScript} />
      </head>
      <body className={clsx("m-0 p-0", "bg-default text-default")}>
        <Search>
          <Progress />
          <Header />
          <main
            id="main"
            className={clsx(
              "relative mx-4 rounded-xl",
              "bg-primary text-lg",
              "flex flex-col gap-10",
              "min-h-[90vh]",
            )}
          >
            {children}
          </main>
          <Footer />
        </Search>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
