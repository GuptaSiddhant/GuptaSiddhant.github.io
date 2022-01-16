import { bundleMDX } from "mdx-bundler"

export async function compileMdx<T>(source: string) {
  return await bundleMDX<T>({ source })
}
