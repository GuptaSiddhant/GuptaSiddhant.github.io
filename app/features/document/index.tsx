import clsx from "clsx"
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix"

import Header from "./Header"
import Footer from "./Footer"

export default function Document({ children }: { children: React.ReactNode }) {
  const intlListFormatPolyfillScript =
    "https://polyfill.io/v3/polyfill.min.js?features=Intl.ListFormat,Intl.ListFormat.~locale.en"

  return (
    <html
      lang="en"
      dir="ltr"
      className="text-[14px] sm:text-[16px] lg:text-[18px]"
    >
      <head>
        <Meta />
        <Links />
        <script src={intlListFormatPolyfillScript} />
      </head>
      <body
        className={clsx(
          "flex min-h-screen w-screen flex-col",
          "bg-black text-gray-100",
        )}
      >
        <Header />
        <main
          id="main"
          className={clsx(
            "relative flex-1",
            "mx-4 my-4 pt-32 sm:mx-6",
            " bg-gray-900 text-lg",
            "flex flex-col gap-10",
          )}
        >
          {children}
        </main>
        <Footer />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
