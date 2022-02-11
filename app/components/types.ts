export type PropsWithChildren<PropsType = {}> = React.PropsWithChildren<
  PropsType & { id?: string; className?: string }
>
