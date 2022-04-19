import { RemixBrowser } from "@remix-run/react"

/**
 * @todo Update to `hydrateRoot` for react-18
 */
import { hydrate } from "react-dom"
hydrate(<RemixBrowser />, document)

// import { hydrateRoot } from "react-dom/client"
// hydrateRoot(document, <RemixBrowser/>)
