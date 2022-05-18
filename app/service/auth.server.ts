import { createCookieSessionStorage } from "@remix-run/node"

import { __IS_DEV__ } from "helpers"

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["gs9"],
    secure: !__IS_DEV__,
    //   expires: new Date(Date.now() + 600),
  },
})
