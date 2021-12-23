import { useLocation } from "remix"

/** useNestedRoute hook */
export default function useNestedRoute(): boolean {
  const { pathname } = useLocation()
  const pathNameArray = pathname.split("/")
  const nested = pathNameArray.length > 2 && pathNameArray[2] !== ""

  return nested
}
