import clsx from "clsx"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import Header from "./Header"
import Footer from "./Footer"
import CommandPalette from "../commandPalette"

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
      <body className={clsx("m-0 p-0", "bg-black text-gray-100")}>
        <CommandPalette>
          <Header />
          <main
            id="main"
            className={clsx(
              "relative mx-4 rounded-xl",
              "bg-gray-900 text-lg",
              "flex flex-col gap-10",
            )}
          >
            {children}
          </main>
          <Footer />
        </CommandPalette>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
