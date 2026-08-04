import { useCallback, useSyncExternalStore } from 'react';
import { logStore } from '../core/logStore';

export function useApiLogs() {
  const logs = useSyncExternalStore(logStore.subscribe, logStore.getLogs, logStore.getLogs);

  const clear = useCallback(() => logStore.clear(), []);
  const togglePin = useCallback((id: string) => logStore.togglePin(id), []);

  return { logs, clear, togglePin };
}
