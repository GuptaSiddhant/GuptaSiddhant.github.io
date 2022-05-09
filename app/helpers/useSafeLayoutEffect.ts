import { useEffect, useLayoutEffect } from "react"
import { __IS_SERVER__ } from "./index"

const useSafeLayoutEffect = __IS_SERVER__ ? useEffect : useLayoutEffect

export default useSafeLayoutEffect
