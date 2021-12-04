/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare module "@sanity/block-content-to-react" {
  export default function BlockContent(props: { blocks: any[] }): JSX.Element
}
