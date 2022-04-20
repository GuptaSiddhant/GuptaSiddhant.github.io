import { getFileURLWithPath } from "./storage"

const MarkdownImageRegex =
  /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g

export async function convertImageLinksInText(content: string) {
  const imageLinks =
    content.match(MarkdownImageRegex)?.map(extractImageLinkFromMarkdown) || []

  const imageUrls = await Promise.all(
    imageLinks.map(async (link) => ({
      url: await toImageUrl(link),
      link,
    })),
  )

  return imageUrls.reduce(
    (acc, { link, url }) => acc.replace(link, url),
    content,
  )
}

export async function toImageUrl(path: string) {
  if (path.startsWith("/") || path.startsWith("http")) return path
  try {
    return getFileURLWithPath(path)
  } catch {
    return path
  }
}

// Helpers

function extractImageLinkFromMarkdown(markdown: string) {
  return markdown.split("](")[1].split(")")[0].split(" ")[0]
}
