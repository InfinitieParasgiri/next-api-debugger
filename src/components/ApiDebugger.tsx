import { useEffect, useState } from 'react';
import { ApiDebuggerProps } from '../types';
import { logStore } from '../core/logStore';
import { installFetchInterceptor, uninstallFetchInterceptor } from '../core/interceptors/fetchInterceptor';
import { installAxiosInterceptor } from '../core/interceptors/axiosInterceptor';
import { useApiLogs } from '../hooks/useApiLogs';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { StyleInjector } from './StyleInjector';
import { FloatingButton } from './FloatingButton';
import { DebuggerModal } from './DebuggerModal';

function resolveEnabled(enabled?: boolean): boolean {
  if (typeof enabled === 'boolean') return enabled;
  return process.env.NODE_ENV !== 'production';
}

/**
 * Mount once, anywhere in your app (e.g. app/layout.tsx or pages/_app.tsx):
 *
 *   <ApiDebugger />
 *
 * Renders nothing and installs no interceptors when disabled (production by
 * default), so it's safe to leave in your tree.
 */
export function ApiDebugger(props: ApiDebuggerProps) {
  const {
    enabled,
    maxLogs = 200,
    initialPosition,
    axiosInstance,
    theme: themeProp = 'dark',
    keyboardShortcut = true,
    ignoreUrls,
  } = props;

  const isEnabled = resolveEnabled(enabled);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(themeProp);
  const { logs, clear, togglePin } = useApiLogs();

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;
    logStore.setMaxLogs(maxLogs);
    installFetchInterceptor({ ignoreUrls });
    const uninstallAxios = axiosInstance ? installAxiosInterceptor(axiosInstance, { ignoreUrls }) : () => {};
    return () => {
      uninstallFetchInterceptor();
      uninstallAxios();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  useKeyboardShortcut({ ctrl: true, shift: true, key: 'd' }, () => setOpen((o) => !o), isEnabled && keyboardShortcut);

  if (!isEnabled) return null;

  const errorCount = logs.filter((l) => !l.success).length;
  const resolvedTheme = theme === 'system' ? 'dark' : theme;

  return (
    <div className={`apd-root${resolvedTheme === 'light' ? ' apd-light' : ''}`}>
      <StyleInjector />
      {!open && (
        <FloatingButton count={logs.length} hasErrors={errorCount > 0} onOpen={() => setOpen(true)} initialPosition={initialPosition} />
      )}
      {open && (
        <DebuggerModal
          logs={logs}
          onClose={() => setOpen(false)}
          onClear={clear}
          onTogglePin={togglePin}
          theme={resolvedTheme}
          onToggleTheme={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        />
      )}
    </div>
  );
}
