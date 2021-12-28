import { SSRProvider } from "@react-aria/ssr"
import clsx from "clsx"
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix"

import Footer from "~/features/footer"
import Header from "~/features/header"

export default function Document({
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
