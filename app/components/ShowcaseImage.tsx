import clsx from "clsx"
import { useEffect, useRef } from "react"

import Img, { type ImgProps } from "~/components/atoms/Img"
import { useModal, Modal } from "~/components/layouts/Modal"

export interface ShowcaseImageProps extends ImgProps {}

/** ShowcaseImage component */
export default function ShowcaseImage({
  className,
  src,
  alt,
  ...props
}: ShowcaseImageProps): JSX.Element | null {
  const { ref, imageRef } = useMouse()
  const { modalProps, openModal } = useModal()

  if (!src) return null
  return (
    <div
      className={clsx(
        "rounded-xl -mx-8 my-8 bg-hover",
        "border-8 border-depth overflow-hidden",
        "aspect-w-16 aspect-h-16 sm:aspect-h-12 md:sm:aspect-h-9",
        "bg-center bg-cover bg-no-repeat",
        "cursor-pointer",
        className,
      )}
      ref={ref}
      onClick={openModal}
    >
      <Img {...props} ref={imageRef} src={src} alt={alt} className="!m-0" />
      <Modal {...modalProps} aria-label="Showcase">
        <Img {...props} src={src} alt={alt} className="!m-0" />
      </Modal>
    </div>
  )
}

function useMouse() {
  const ref = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = ref.current
    const image = imageRef.current
    if (!el || !image) return

    const handleMouseMove = (e: MouseEvent): void => {
      const imageRect = image.getBoundingClientRect()
      const imageScale = imageRect.width / image.naturalWidth
      const imageFullHeight = image.naturalHeight * imageScale

      const moveRatio = (imageFullHeight - imageRect.height) / imageRect.height
      const posY = e.offsetY * moveRatio

      image.style.objectPosition = `0 -${posY}px`
    }

    const handleMouseLeave = (): void => {
      image.style.objectPosition = ""
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return { ref, imageRef }
}
