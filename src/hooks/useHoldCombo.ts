import { useEffect, useRef } from 'react';
import { watchHoldCombo } from '../core/holdCombo';

/** See core/holdCombo.ts for the actual detection logic — this just wires it into React's effect lifecycle. */
export function useHoldCombo(keys: string[], onTrigger: () => void, enabled = true) {
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  useEffect(() => {
    if (!enabled) return;
    return watchHoldCombo(keys, () => onTriggerRef.current());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join(','), enabled]);
}
