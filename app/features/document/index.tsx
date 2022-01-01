import { SSRProvider } from "@react-aria/ssr"
import clsx from "clsx"
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix"

import Header from "./Header"
import Footer from "./Footer"

export default function Document({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
      <html
        lang="en"
        dir="ltr"
        className="text-[14px] sm:text-[16px] lg:text-[18px]"
      >
        <head>
          <meta
            name="theme-color"
            content="#111827"
            media="(prefers-color-scheme: dark)"
          />
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
          <Footer />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    </SSRProvider>
  )
}
