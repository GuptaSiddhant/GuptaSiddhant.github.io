import { type CSSProperties } from "react"

export type PropsWithChildren<PropsType = {}> = React.PropsWithChildren<
  PropsType & CommonProps
>

export type CommonProps = {
  id?: string
  className?: string
  style?: CSSProperties
}
