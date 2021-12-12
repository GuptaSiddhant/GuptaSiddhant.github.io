/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare module "highlight.js/es/languages/*" {
  export default function (hljs: any): any
}
