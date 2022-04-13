import { bundleMDX } from "mdx-bundler"

export async function compileMdx<T>(source: string) {
  const formattedSource = JSON.parse(source)

  return bundleMDX<T>({ source: formattedSource })
}
