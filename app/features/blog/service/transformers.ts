import { cleanupText } from "helpers"
import { type QueryDocumentSnapshot } from "service/database"
import { convertImageLinksInText, toImageUrl } from "service/image"

import type { BlogPostType, BlogPostTeaser } from "../types"

export async function transformDocToBlogPost(docSnap: QueryDocumentSnapshot) {
  const blogPost = docSnapToBlogPost(docSnap)
  const gallery = await convertBlogPostGalleryUrls(blogPost)

  return {
    ...blogPost,
    gallery,
    cover: gallery?.[0]?.url,
    content: undefined,
  }
}

export async function transformDocToBlogPostWithContent(
  docSnap: QueryDocumentSnapshot,
): Promise<BlogPostType> {
  const blogPost = docSnapToBlogPost(docSnap)

  const [gallery, content] = await Promise.all([
    convertBlogPostGalleryUrls(blogPost),
    convertBlogPostContentUrls(blogPost),
  ])

  return {
    ...blogPost,
    gallery,
    cover: gallery?.[0]?.url,
    content: cleanupText(content),
  }
}

export function transformBlogPostToBlogPostTeaser(
  blogPost: BlogPostType,
): BlogPostTeaser {
  return {
    id: blogPost.id,
    title: blogPost.title,
    date: blogPost.date,
    cover: blogPost.cover ?? "",
    draft: blogPost.draft ?? false,
    association: blogPost.association ?? "",
    description: blogPost.description ?? "",
    featured: blogPost.featured ?? false,
    subtitle: blogPost.subtitle ?? "",
    tags: blogPost.tags ?? [],
  }
}

function docSnapToBlogPost(docSnap: QueryDocumentSnapshot): BlogPostType {
  const data = docSnap.data()

  return {
    ...data,
    id: docSnap.id,
    date: data.date.toDate(),
  } as unknown as BlogPostType
}

async function convertBlogPostGalleryUrls(
  BlogPost: BlogPostType,
): Promise<BlogPostType["gallery"]> {
  return Promise.all(
    (BlogPost.gallery || []).map(async (i) => ({
      ...i,
      url: await toImageUrl(i.url),
    })),
  )
}

async function convertBlogPostContentUrls(
  blogPost: BlogPostType,
): Promise<string | undefined> {
  return blogPost.content
    ? convertImageLinksInText(blogPost.content)
    : undefined
}
