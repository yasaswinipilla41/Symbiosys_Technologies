import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

// v2: key versioned so every visitor starts on the dark theme by default
// (older saved "light" values under the previous key are ignored).
const KEY = 'sym-theme-v2';
let current: Theme =
  typeof window !== 'undefined' && localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';

const listeners = new Set<() => void>();

function apply(t: Theme) {
  document.documentElement.classList.toggle('light', t === 'light');
}

// apply persisted theme immediately on module load (before first paint of sections)
if (typeof window !== 'undefined') apply(current);

export function setTheme(t: Theme) {
  current = t;
  localStorage.setItem(KEY, t);
  apply(t);
  listeners.forEach((l) => l());
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => 'dark' as Theme,
  );
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') };
}
