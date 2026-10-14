import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * User preferences the shell persists (SYS-NAVPAT-11, SYS-AI-11) and the
 * prototype controls that flip shell states (ST-N01 to ST-N14).
 * localStorage stands in for the personalization service.
 */
export interface Prefs {
  panelDocked: boolean;
  drawerOpen: boolean;
  theme: 'system' | 'light' | 'dark';
  // Prototype controls
  isAdmin: boolean;
  unreadCount: number;
  manyCompanies: boolean;
  companyId: string;
  loadingDelay: number;
  emptyGroup: boolean;
  noAccessSection: string | null;
}

const DEFAULTS: Prefs = {
  panelDocked: true,
  drawerOpen: false,
  theme: 'system',
  isAdmin: true,
  unreadCount: 3,
  manyCompanies: true,
  companyId: 'northwind',
  loadingDelay: 0,
  emptyGroup: false,
  noAccessSection: null,
};

const KEY = 'proto01.prefs';

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {
    return DEFAULTS;
  }
}

interface Ctx {
  prefs: Prefs;
  set: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void;
  reset: () => void;
}

const PrefsContext = createContext<Ctx | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* private mode or blocked storage: the shell still works */
    }
  }, [prefs]);

  useEffect(() => {
    const root = document.documentElement;
    if (prefs.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', prefs.theme);
  }, [prefs.theme]);

  const set = useCallback(<K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);

  const reset = useCallback(() => setPrefs(DEFAULTS), []);

  const value = useMemo(() => ({ prefs, set, reset }), [prefs, set, reset]);
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs outside PrefsProvider');
  return ctx;
}
