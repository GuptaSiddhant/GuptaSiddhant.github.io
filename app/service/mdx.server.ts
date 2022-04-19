import { marked } from "marked"

export async function compileMdx<T>(source: string) {
  const out = marked(source)

  return out
}
