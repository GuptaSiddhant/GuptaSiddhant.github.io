import { getFileURLWithPath } from "./storage"

export async function toImageUrl(path: string) {
  if (path.startsWith("/") || path.startsWith("http")) return path

  return getFileURLWithPath(path)
}

export async function convertImageLinksInText(content: string) {
  const imageLinks =
    content
      .match(
        /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g,
      )
      ?.map((i) => i.split("](")[1].split(" ")[0]) || []

  const imageUrls = await Promise.all(
    imageLinks.map(async (link) => ({
      url: await toImageUrl(link),
      link,
    })),
  )

  imageUrls.forEach(({ url, link }) => {
    content = content.replace(link, url)
  })

  return content
}
