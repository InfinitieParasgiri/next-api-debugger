import { useEffect, useState } from 'react';
import { ApiDebuggerProps } from '../types';
import { logStore } from '../core/logStore';
import { consoleStore } from '../core/consoleStore';
import { installFetchInterceptor, uninstallFetchInterceptor } from '../core/interceptors/fetchInterceptor';
import { installXhrInterceptor, uninstallXhrInterceptor } from '../core/interceptors/xhrInterceptor';
import { installAxiosInterceptor } from '../core/interceptors/axiosInterceptor';
import { installConsoleInterceptor, uninstallConsoleInterceptor } from '../core/interceptors/consoleInterceptor';
import { installCreationTracker, uninstallCreationTracker } from '../core/inspector/creationTracker';
import { subscribeServerLogs } from '../core/serverLogClient';
import { useApiLogs } from '../hooks/useApiLogs';
import { useConsoleLogs } from '../hooks/useConsoleLogs';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { useActivationSequence } from '../hooks/useActivationSequence';
import { useHoldCombo } from '../hooks/useHoldCombo';
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
    activationSequence,
    ignoreUrls,
    serverLogsUrl,
    inspector = true,
    editorProjectRoot,
  } = props;

  const isEnabled = resolveEnabled(enabled);
  const [activated, setActivated] = useState(!activationSequence);
  const captureEnabled = isEnabled && activated;
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(themeProp);
  const { logs, clear, togglePin } = useApiLogs();
  const { entries: consoleEntries, clear: clearConsole } = useConsoleLogs();

  useEffect(() => setActivated(!activationSequence), [activationSequence]);

  useEffect(() => {
    if (!captureEnabled || typeof window === 'undefined') return;
    logStore.setMaxLogs(maxLogs);
    consoleStore.setMaxEntries(500);
    installFetchInterceptor({ ignoreUrls: serverLogsUrl ? [...(ignoreUrls ?? []), serverLogsUrl] : ignoreUrls });
    installXhrInterceptor({ ignoreUrls });
    installConsoleInterceptor();
    if (inspector) installCreationTracker();
    const uninstallAxios = axiosInstance ? installAxiosInterceptor(axiosInstance, { ignoreUrls }) : () => {};
    return () => {
      uninstallFetchInterceptor();
      uninstallXhrInterceptor();
      uninstallConsoleInterceptor();
      if (inspector) uninstallCreationTracker();
      uninstallAxios();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureEnabled, inspector, serverLogsUrl]);

  useEffect(() => {
    if (!captureEnabled || !serverLogsUrl || typeof window === 'undefined') return;
    return subscribeServerLogs(serverLogsUrl);
  }, [captureEnabled, serverLogsUrl]);

  useActivationSequence(activationSequence, () => {
    setActivated(true);
    setOpen((current) => !current);
  }, isEnabled && keyboardShortcut);

  useKeyboardShortcut({ ctrl: true, shift: true, key: 'd' }, () => setOpen((o) => !o), captureEnabled && keyboardShortcut);

  // Hold Space+H together to fully hide (or reveal) the debugger — button
  // and modal both — without touching the mount toggle from the shortcut
  // above. Also closes the modal on hide, so it doesn't silently reappear
  // still-open the next time the debugger is shown.
  useHoldCombo(
    ['space', 'h'],
    () => {
      setHidden((h) => !h);
      setOpen(false);
    },
    captureEnabled && keyboardShortcut
  );

  if (!captureEnabled) return null;

  const networkErrors = logs.filter((l) => !l.success).length;
  const consoleErrors = consoleEntries.filter((e) => e.level === 'error').length;
  const resolvedTheme = theme === 'system' ? 'dark' : theme;

  return (
    <div className={`apd-root${resolvedTheme === 'light' ? ' apd-light' : ''}`}>
      <StyleInjector />
      {!hidden && !open && (
        <FloatingButton
          count={logs.length + consoleEntries.length}
          hasErrors={networkErrors > 0 || consoleErrors > 0}
          onOpen={() => setOpen(true)}
          initialPosition={initialPosition}
        />
      )}
      {!hidden && open && (
        <DebuggerModal
          logs={logs}
          consoleEntries={consoleEntries}
          onClose={() => setOpen(false)}
          onClear={clear}
          onClearConsole={clearConsole}
          onTogglePin={togglePin}
          theme={resolvedTheme}
          onToggleTheme={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
          inspectorEnabled={inspector}
          editorProjectRoot={editorProjectRoot}
        />
      )}
    </div>
  );
}
