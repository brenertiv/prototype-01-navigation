import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { navForPath } from '../nav/sections';
import { findWorkspace, workspaceIdForPath } from '../nav/workspaces';
import { COMPANIES, SCOPES } from '../nav/scopes';
import { usePrefs } from '../state/preferences';
import { useScope } from '../state/scope';
import { Icon } from './Icon';

interface Props {
  phone: boolean;
  onOpenMenu: () => void;
}

/** The canvas top bar: floating controls, no title (SYS-NAVPAT-20 to 22). */
export function TopBar({ phone, onOpenMenu }: Props) {
  const { prefs, set } = usePrefs();
  const { pathname } = useLocation();
  const nav = navForPath(pathname);
  const onWorkspace = Boolean(findWorkspace(workspaceIdForPath(pathname)));
  const scopeApplies = onWorkspace || (Boolean(nav?.page && nav.page.scope !== 'none') && !nav?.section.missing);

  return (
    <div className="topbar">
      <div className="topbar-left">
        {phone && (
          <button type="button" className="icon-btn topbar-btn" aria-label={`Open navigation${prefs.unreadCount ? `, ${prefs.unreadCount} unread notifications` : ''}`} onClick={onOpenMenu}>
            <Icon name="menu" />
            {prefs.unreadCount > 0 && (
              <span className="count-badge" aria-hidden="true">
                {prefs.unreadCount}
              </span>
            )}
          </button>
        )}
        {scopeApplies && <ScopeIndicator />}
      </div>
      <div className="topbar-right">
        <button type="button" className="icon-btn topbar-btn" aria-label="Share">
          <Icon name="share" />
        </button>
        <button type="button" className="icon-btn topbar-btn" aria-label="More actions">
          <Icon name="more_vert" />
        </button>
        <button
          type="button"
          className={`icon-btn topbar-btn ${prefs.drawerOpen ? 'is-on' : ''}`}
          aria-label="Assistant"
          aria-pressed={prefs.drawerOpen}
          onClick={() => set('drawerOpen', !prefs.drawerOpen)}
        >
          <Icon name="auto_awesome" filled={prefs.drawerOpen} />
        </button>
      </div>
    </div>
  );
}

/** Where am I (SYS-SCOPE-30 to 33). A thin stand-in: three fake scopes, no navigator tree. */
function ScopeIndicator() {
  const { scope, setScope } = useScope();
  const { prefs } = usePrefs();
  const ref = useRef<HTMLDetailsElement>(null);
  const company = COMPANIES.find((c) => c.id === prefs.companyId) ?? COMPANIES[0];
  const manyCompanies = prefs.manyCompanies;

  const choose = (id: string) => {
    setScope(id);
    if (ref.current) ref.current.open = false;
  };

  return (
    <details ref={ref} className="scope">
      <summary className={`scope-indicator scope-indicator--${scope.level}`} aria-label={`Scope: ${scope.type} ${scope.name}${scope.count ? `, ${scope.count} properties` : ''}. Change scope`}>
        <Icon name={scope.level === 'property' ? 'apartment' : 'account_tree'} filled />
        <span className="scope-type">{scope.type}</span>
        <span className="scope-name">{scope.name}</span>
        {scope.count !== undefined && <span className="scope-count">{scope.count} properties</span>}
        <span className="scope-path" aria-hidden="true">
          {(manyCompanies ? [company.name, ...scope.path] : scope.path).join(' › ')}
        </span>
        <Icon name="expand_more" />
      </summary>
      <ul className="scope-menu" role="list" aria-label="Choose a scope">
        {SCOPES.map((s) => (
          <li key={s.id}>
            <button type="button" className={`scope-option ${s.id === scope.id ? 'is-current' : ''}`} onClick={() => choose(s.id)} aria-current={s.id === scope.id ? 'true' : undefined}>
              <Icon name={s.level === 'property' ? 'apartment' : 'account_tree'} />
              <span>
                <span className="scope-option-type">{s.type}</span> {s.name}
              </span>
              {s.count !== undefined && <span className="muted">{s.count}</span>}
            </button>
          </li>
        ))}
        <li className="scope-menu-note muted">The full scope navigator is a separate spec and is not in this prototype.</li>
      </ul>
    </details>
  );
}
