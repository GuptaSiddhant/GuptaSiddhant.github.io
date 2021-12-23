import { Octokit as createOctokit } from "@octokit/rest"
import { throttling } from "@octokit/plugin-throttling"

import { createDebugger } from "~/helpers"

const githubDebug = createDebugger("GITHUB")

const Octokit = createOctokit.plugin(throttling)

const repo = {
  owner: "GuptaSiddhant",
  repo: "GuptaSiddhant.github.io",
  ref: process.env.BRANCH || "master",
}

type ThrottleOptions = {
  method: string
  url: string
  request: { retryCount: number }
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
      console.warn(
        `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`,
      )
      return true
    },
    onAbuseLimit: (retryAfter: number, options: ThrottleOptions) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`,
      )
    },
  },
})

/**
 * @param path the full path to list
 * @returns a promise that resolves to a file ListItem of the files/directories in the given directory (not recursive)
 */
export async function downloadDirList(path: string) {
  githubDebug("Getting list of files in", path)

  const { data } = await octokit.repos.getContent({ ...repo, path })

  if (!Array.isArray(data)) {
    throw new Error(
      `Tried to download content from ${path}. GitHub did not return an array of files. This should never happen...`,
    )
  }

  return (data as GithubContent[]).map((content) => ({
    name: content.name,
    path: content.type === "file" ? content.path : `${content.path}/index.mdx`,
  }))
}

export async function downloadFile(path: string) {
  githubDebug("Downloading file:", path)

  const { data } = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    { ...repo, path },
  )) as { data: { content?: string; encoding?: string } }

  if (!data.content || !data.encoding) {
    console.error(data)
    throw new Error(
      `Tried to get ${path} but got back something that was unexpected. It doesn't have a content or encoding property`,
    )
  }

  const encoding = data.encoding as Parameters<typeof Buffer.from>["1"]
  return Buffer.from(data.content, encoding).toString()
}

interface GithubContent {
  name: string
  path: string
  type: "dir" | "file"
  size: number
  content?: string | undefined
  sha: string
  url: string
  git_url: string | null
  html_url: string | null
  download_url: string | null
  _links: {
    git: string | null
    html: string | null
    self: string
  }
}
