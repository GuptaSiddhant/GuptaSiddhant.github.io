export type PropsWithChildren<PropsType = {}> = React.PropsWithChildren<
  PropsType & CommentProps
>

export type CommentProps = { id?: string; className?: string }
