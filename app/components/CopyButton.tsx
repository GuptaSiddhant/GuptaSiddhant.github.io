import copyToClipboard from "copy-to-clipboard"
import clsx from "clsx"
import CopyIcon from "remixicon-react/FileCopyLineIcon"
import CheckIcon from "remixicon-react/CheckLineIcon"
import { useState, useRef, useEffect, useCallback } from "react"

import Button from "~/components/atoms/Button"
import Tooltip from "~/components/atoms/Tooltip"
import type { BaseComponentProps } from "~/types"

export interface CopyButtonProps extends BaseComponentProps {
  content: string
  label?: string
}

export default function CopyButton({
  content,
  className,
  label = "Copy",
  children,
}: CopyButtonProps) {
  const [copied, copy, setCopied] = useCopy(content)
  const handleCopy = () => {
    copy()
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Tooltip label={copied ? "Copied" : label} aria-label="Copy the code.">
      <Button className={clsx(className)} onClick={handleCopy}>
        {copied ? (
          <CheckIcon aria-label="Copied" />
        ) : (
          children || <CopyIcon aria-label={label} />
        )}
      </Button>
    </Tooltip>
  )
}

function useCopy(str: string): [boolean, () => void, (value: boolean) => void] {
  const copyableString = useRef(str)
  const [copied, setCopied] = useState(false)
  const copyAction = useCallback(() => {
    const copiedString = copyToClipboard(copyableString.current)
    setCopied(copiedString)
  }, [copyableString])

  useEffect(() => {
    copyableString.current = str
  }, [str])

  return [copied, copyAction, setCopied]
}
