import { type CSSProperties } from "react"

export type PropsWithChildren<PropsType = {}> = React.PropsWithChildren<
  PropsType & CommonProps
>

export type CommonProps<TRef extends HTMLElement = HTMLElement> = {
  id?: string
  className?: string
  style?: CSSProperties
  elementRef?: React.Ref<TRef>
}
