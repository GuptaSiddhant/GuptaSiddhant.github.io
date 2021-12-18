import type { DataFunctionArgs } from "@remix-run/server-runtime"

export type LoaderFunctionProps = DataFunctionArgs
export type LoaderFunctionReturn = Promise<Response>
