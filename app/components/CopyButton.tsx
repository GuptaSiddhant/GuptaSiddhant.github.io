import clsx from "clsx"
import CopyIcon from "remixicon-react/FileCopyLineIcon"
import CheckIcon from "remixicon-react/CheckLineIcon"
import useCopy from "use-copy"

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
