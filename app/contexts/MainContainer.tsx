import { createContext, useContext, type RefObject } from "react"

const MainContainerContext = createContext<RefObject<HTMLElement> | undefined>(
  undefined,
)

export default function useMainContainer() {
  const mainContainer = useContext(MainContainerContext)
  if (!mainContainer) {
    throw new Error("useMainContainer must be used within the #main container")
  }
  return mainContainer
}

export function MainContainerProvider({
  children,
  containerRef,
}: {
  children: React.ReactNode
  containerRef?: RefObject<HTMLElement>
}) {
  return (
    <MainContainerContext.Provider value={containerRef}>
      {children}
    </MainContainerContext.Provider>
  )
}
