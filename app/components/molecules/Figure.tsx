import clsx from "clsx"

import Img, { ImgProps } from "~/components/atoms/Img"
import { useModal, Modal } from "~/components/templates/Modal"

export interface FigureProps extends ImgProps {
  imageClassName?: string
  _ref?: React.ForwardedRef<HTMLElement>
  _imageRef?: React.ForwardedRef<HTMLImageElement>
}

export default function Figure({
  className,
  imageClassName,
  title,
  _ref,
  _imageRef,
  ...props
}: FigureProps) {
  const { modalProps, openModal } = useModal()

  return (
    <figure
      onClick={openModal}
      className={clsx("overflow-hidden", "bg-base", "relative", className)}
      ref={_ref}
    >
      <Img className={imageClassName} {...props} ref={_imageRef} />
      {title ? (
        <figcaption
          className={clsx("text-sm text-center", "italic", "text-tertiary")}
        >
          {title}
        </figcaption>
      ) : null}

      <Modal {...modalProps} aria-label="Showcase">
        <Img {...props} ref={null} />
        {title ? (
          <figcaption className={clsx("text-center", "mt-1", "text-primary")}>
            {title}
          </figcaption>
        ) : null}
      </Modal>
    </figure>
  )
}
