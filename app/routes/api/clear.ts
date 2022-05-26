import { redirect, type LoaderFunction } from "@remix-run/server-runtime"
import cache from "~/service/cache"

/**
 * General purpose API endpoint for all GS data.
 */
export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const key = url.searchParams.get("key")

  if (key) {
    cache.delete(key)
    console.log(
      "[Cache]",
      'Deleted key "' + key + '" at',
      new Date().toISOString(),
    )
  } else {
    cache.clear()
    console.log("[Cache]", "Cleared at", new Date().toISOString())
  }

  return redirect("/")
}
