import { getErrorMessage } from "helpers/catch-error"

export function apiTypeCallback(
  request: Request,
  callbacks: Record<string, () => Promise<any> | void>,
) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  if (!type) return errorResponse("Missing type")

  try {
    const updater = callbacks[type]
    if (!updater) return errorResponse(`Unknown action type '${type}'`)

    return updater()
  } catch (e) {
    return errorResponse(getErrorMessage(e), 400)
  }
}

export function errorResponse(message: string, status: number = 404) {
  return new Response(message, { status })
}
