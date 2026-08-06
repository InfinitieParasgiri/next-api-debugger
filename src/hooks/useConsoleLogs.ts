import { useCallback, useSyncExternalStore } from 'react';
import { consoleStore } from '../core/consoleStore';

export function useConsoleLogs() {
  const entries = useSyncExternalStore(consoleStore.subscribe, consoleStore.getEntries, consoleStore.getEntries);
  const clear = useCallback(() => consoleStore.clear(), []);
  return { entries, clear };
}
