import { LinkDescriptor } from "remix"

import fontStyles from "./styles/font.css"
import tailwindStyles from "./styles/tailwind.css"
import reachDialogStyles from "@reach/dialog/styles.css"
import reachTooltipStyles from "@reach/tooltip/styles.css"
import reachMenuStyles from "@reach/menu-button/styles.css"

// https://remix.run/api/app#links
export default function (): LinkDescriptor[] {
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
