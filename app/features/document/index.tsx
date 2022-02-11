import clsx from "clsx"
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix"

import Header from "./Header"

export default function Document({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="text-[14px] sm:text-[16px] lg:text-[18px]"
    >
      <head>
        <Meta />
        <Links />
        {/* <!-- Polyfill Intl.ListFormat, its dependencies & `en` locale data --> */}
        <script src="https://polyfill.io/v3/polyfill.min.js?features=Intl.ListFormat,Intl.ListFormat.~locale.en"></script>
      </head>
      <body
        className={clsx(
          "flex min-h-screen w-screen flex-col overflow-hidden p-4 sm:p-6",
          "bg-black text-gray-100",
        )}
      >
        <Header />
        <main
          className={clsx(
            "max-h-screen-main flex-1 overflow-auto",
            "rounded-2xl bg-gray-900 py-32 text-lg",
            "flex flex-col gap-10",
          )}
        >
          {children}
          <ScrollRestoration />
        </main>
        {/* <Footer /> */}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
