import { useEffect, useState } from 'react';
import { usePrefs } from '../state/preferences';
import { Icon } from './Icon';

/** A test harness for the shell states in prototype-data.md (ST-N01 to ST-N14). Not part of the design. */
export function PrototypeControls() {
  const { prefs, set, reset } = usePrefs();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="proto">
      {open && (
        <div className="proto-panel" role="dialog" aria-label="Prototype controls">
          <header>
            <strong>Prototype controls</strong>
            <span className="muted">Flip the shell states from the state catalogue.</span>
          </header>

          <label className="proto-row">
            <input type="checkbox" checked={prefs.isAdmin} onChange={(e) => set('isAdmin', e.target.checked)} />
            <span>
              Admin user <span className="muted">ST-N05: Account settings group</span>
            </span>
          </label>

          <label className="proto-row">
            <span>
              Unread notifications <span className="muted">ST-N11</span>
            </span>
            <input type="number" min={0} max={120} value={prefs.unreadCount} onChange={(e) => set('unreadCount', Math.max(0, Number(e.target.value) || 0))} />
          </label>

          <label className="proto-row">
            <input type="checkbox" checked={prefs.manyCompanies} onChange={(e) => set('manyCompanies', e.target.checked)} />
            <span>
              Member of several companies <span className="muted">ST-N04, ST-S05</span>
            </span>
          </label>

          <label className="proto-row">
            <span>
              Panel loading delay <span className="muted">ST-N07, ST-X01</span>
            </span>
            <select value={prefs.loadingDelay} onChange={(e) => set('loadingDelay', Number(e.target.value))}>
              <option value={0}>None</option>
              <option value={800}>0.8 s</option>
              <option value={2500}>2.5 s</option>
            </select>
          </label>

          <label className="proto-row">
            <input type="checkbox" checked={prefs.emptyGroup} onChange={(e) => set('emptyGroup', e.target.checked)} />
            <span>
              Empty group <span className="muted">ST-N07: Workspace › Plans has nothing</span>
            </span>
          </label>

          <label className="proto-row">
            <span>
              Section with no access <span className="muted">ST-N03, ST-E06</span>
            </span>
            <select value={prefs.noAccessSection ?? ''} onChange={(e) => set('noAccessSection', e.target.value || null)}>
              <option value="">None</option>
              <option value="building-info">Building Info</option>
              <option value="people">People</option>
            </select>
          </label>

          <label className="proto-row">
            <span>Theme</span>
            <select value={prefs.theme} onChange={(e) => set('theme', e.target.value as typeof prefs.theme)}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <p className="muted proto-hint">
            Other states: collapse the panel and hover the rail for the peek (ST-N06); shrink the window height for the scrolling rail (ST-N08); 375 px wide for the drawer (ST-N09); open an Account page for no scope indicator (ST-N10); paste a URL with or without <code>?scope=</code> (ST-N13); Tab through everything (ST-N14).
          </p>

          <button type="button" className="text-btn" onClick={reset}>
            Reset preferences
          </button>
        </div>
      )}
      <button type="button" className="proto-fab" aria-label="Prototype controls" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon name="tune" />
      </button>
    </div>
  );
}
