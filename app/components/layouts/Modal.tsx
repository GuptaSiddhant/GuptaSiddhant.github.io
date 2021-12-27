import { Dialog, type DialogProps } from "@reach/dialog"
import clsx from "clsx"
import { useRef, useState } from "react"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import Button from "~/components/atoms/Button"
import Tooltip from "~/components/atoms/Tooltip"
import { BaseComponentProps } from "~/types"

export interface ModalProps extends BaseComponentProps, DialogProps {}

/** Modal component */
export function Modal({
  className,
  children,
  ...props
}: ModalProps): JSX.Element | null {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog
      initialFocusRef={closeButtonRef}
      className={clsx("relative bg-hover shadow-xl rounded-lg", className)}
      {...props}
    >
      {children}
      <Tooltip label="Close">
        <Button
          className="absolute top-2 right-2"
          onClick={props.onDismiss}
          ref={closeButtonRef}
        >
          <CloseIcon />
          <span className="sr-only">Close</span>
        </Button>
      </Tooltip>
    </Dialog>
  )
}

export function useModal() {
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const modalProps: Omit<DialogProps, "children"> = {
    isOpen: isModalOpen,
    onDismiss: closeModal,
  }

  return { modalProps, openModal, closeModal }
}
