/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/_build",
  ignoredRouteFiles: [".*"],
  serverDependenciesToBundle: [
    "mdx-bundler",
    "@mdx-js/esbuild",
    "remark-frontmatter",
    "micromark-extension-frontmatter",
    "@mdx-js/mdx",
  ],
}
