/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: [".*"],
  serverBuildTarget: "vercel",
  serverDependenciesToBundle: [/^rehype.*/, /^remark.*/, /^unified.*/],
}
