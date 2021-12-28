import React, { createElement, forwardRef } from "react"

export default function withRef<
  T extends HTMLElement,
  PropsType extends {
    ref?: React.LegacyRef<T>
  } = React.ComponentProps<any>,
>(Component: React.ComponentType<PropsType>) {
  return forwardRef((props: PropsType, ref: React.ForwardedRef<T>) =>
    createElement(Component, { ...props, ref }),
  )
}
