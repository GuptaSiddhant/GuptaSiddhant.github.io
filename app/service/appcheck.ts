import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
import app from "./firebase"

const _siteKey = "6Lf0YPkfAAAAAFOvieVjcpV9BiovDfntvbw--wpf"

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(_siteKey),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
})
