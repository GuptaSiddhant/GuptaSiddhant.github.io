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
import { useRef } from "react"
import { MainContainerProvider } from "~/features/document/context"

const intlListFormatPolyfillScript =
  "https://polyfill.io/v3/polyfill.min.js?features=Intl.ListFormat,Intl.ListFormat.~locale.en"

export default function Document({ children }: { children: React.ReactNode }) {
  const mainContainerRef = useRef<HTMLElement>(null)

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
      <body
        className={clsx(
          "grid grid-rows-[max-content_1fr_max-content]",
          "h-screen w-screen overflow-hidden m-0 p-0",
          "bg-black text-gray-100",
        )}
      >
        <MainContainerProvider containerRef={mainContainerRef}>
          <CommandPalette>
            <Header />

            <main
              id="main"
              ref={mainContainerRef}
              className={clsx(
                "relative mx-4",
                "bg-gray-900 text-lg",
                "overflow-auto rounded-xl",
                "flex flex-col gap-10",
              )}
            >
              {children}
            </main>

            <Footer />
          </CommandPalette>
        </MainContainerProvider>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
