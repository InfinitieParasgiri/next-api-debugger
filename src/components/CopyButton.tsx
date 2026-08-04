import { useState } from 'react';
import { copyToClipboard, classNames } from '../core/utils';

interface CopyButtonProps {
  getText: () => string;
  label: string;
  icon?: React.ReactNode;
}

export function CopyButton({ getText, label, icon }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const ok = await copyToClipboard(getText());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <button
      type="button"
      className={classNames('apd-action-btn', copied && 'apd-copied')}
      onClick={handleClick}
    >
      {icon}
      {copied ? 'Copied' : label}
    </button>
  );
}
