import { bundleMDX } from "mdx-bundler"

export async function compileMdx<T>(source: string) {
  return bundleMDX<T>({ source })
}
