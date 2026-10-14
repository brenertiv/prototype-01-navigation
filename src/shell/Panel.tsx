import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { GroupDef, PageDef, SectionDef } from '../nav/types';
import { usePrefs } from '../state/preferences';
import { useScopedPath } from '../state/scope';
import { personaLabel } from '../nav/workspaces';
import { Icon } from './Icon';
import { WorkspaceList } from './WorkspaceList';

interface Props {
  section: SectionDef;
  mode: 'docked' | 'peek' | 'phone';
  onClose?: () => void;
  /** Called when a page row is chosen (the phone drawer closes on it). */
  onNavigate?: () => void;
}

/** The context panel, one template for every section (SYS-NAVPAT-10 to 13). Upgradable (Missing) sections have none. */
export function Panel({ section, mode, onClose, onNavigate }: Props) {
  const { prefs, set } = usePrefs();
  const scoped = useScopedPath();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  // ST-N07: a simulated loading delay when the section changes.
  useEffect(() => {
    if (prefs.loadingDelay <= 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), prefs.loadingDelay);
    return () => window.clearTimeout(t);
  }, [section.id, prefs.loadingDelay]);

  const noAccess = prefs.noAccessSection === section.id;
  const isAccount = section.id === 'account';

  const toggleGroup = (id: string) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  const badgeFor = (badge?: 'dataHealth' | 'openRequests') => {
    if (badge === 'dataHealth') return 7;
    if (badge === 'openRequests') return 2;
    return 0;
  };

  const renderRow = (page: PageDef) => {
    const disabled = !page.path;
    return (
      <li key={page.id} className="row-wrap">
        {disabled ? (
          <div className="row row--disabled" aria-disabled="true">
            <span className="row-label">{page.label}</span>
            {page.disabledNote && <span className="row-note">{page.disabledNote}</span>}
          </div>
        ) : (
          <NavLink to={scoped(page.path!)} end className="row" onClick={onNavigate}>
            <span className="row-label">{page.label}</span>
          </NavLink>
        )}
        {!disabled && (
          <div className="row-actions">
            <button type="button" className="icon-btn icon-btn--sm" aria-label={`More actions for ${page.label}`}>
              <Icon name="more_horiz" />
            </button>
          </div>
        )}
      </li>
    );
  };

  const renderGroup = (group: GroupDef) => {
    if (group.adminOnly && !prefs.isAdmin) return null;
    const isEmpty = prefs.emptyGroup && section.id === 'building-info' && group.id === 'data-health';
    const open = !collapsed[group.id];
    const pages = group.pages.filter((p) => !p.adminOnly || prefs.isAdmin);
    if (pages.length === 0 && !isEmpty) return null;
    const listId = `group-${section.id}-${group.id}`;
    return (
      <li key={group.id} className="group">
        {group.label && (
          <button
            type="button"
            className="group-header"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => toggleGroup(group.id)}
          >
            <span>{group.label}</span>
            <Icon name={open ? 'expand_more' : 'chevron_right'} className="group-chevron" />
          </button>
        )}
        {open && (
          <ul id={listId} className="rows">
            {isEmpty ? (
              <li className="row row--empty">
                <Icon name="inbox" />
                <span>Nothing here yet</span>
              </li>
            ) : (
              pages.map(renderRow)
            )}
          </ul>
        )}
      </li>
    );
  };

  const dockToggle =
    mode === 'phone' ? (
      <button type="button" className="icon-btn" aria-label="Close navigation" onClick={onClose}>
        <Icon name="close" />
      </button>
    ) : mode === 'docked' ? (
      <button type="button" className="icon-btn" aria-label="Collapse panel" aria-pressed="true" onClick={() => set('panelDocked', false)}>
        <Icon name="left_panel_close" />
      </button>
    ) : (
      <button type="button" className="icon-btn" aria-label="Dock panel" aria-pressed="false" onClick={() => set('panelDocked', true)}>
        <Icon name="left_panel_open" />
      </button>
    );

  return (
    <nav className={`panel panel--${mode}`} aria-label={`${section.label} pages`} aria-busy={loading || undefined}>
      <header className="panel-header">
        <div className="panel-title">
          {isAccount ? (
            <>
              <span className="panel-eyebrow">Account</span>
              <h2>Sam Rivera</h2>
              <span className="panel-subtitle">{personaLabel(prefs.persona)}</span>
            </>
          ) : (
            <h2>
              {section.label}
            </h2>
          )}
        </div>
        <div className="panel-actions">
          {!noAccess &&
            section.headerActions.map((a) => {
              const n = badgeFor(a.badge);
              return (
                <button key={a.id} type="button" className="icon-btn" aria-label={n ? `${a.label}, ${n}` : a.label}>
                  <Icon name={a.icon} />
                  {n > 0 && (
                    <span className="count-badge" aria-hidden="true">
                      {n}
                    </span>
                  )}
                </button>
              );
            })}
          {dockToggle}
        </div>
      </header>

      {loading ? (
        <ul className="rows skeleton" aria-label="Loading">
          {[0, 1, 2, 3, 4].map((i) => (
            <li key={i} className="row row--skeleton" />
          ))}
        </ul>
      ) : noAccess ? (
        <div className="panel-message">
          <Icon name="lock" />
          <p>You don't have access to {section.label}.</p>
          <p className="muted">Ask an Admin of this Company for access. ST-N03, ST-E06.</p>
        </div>
      ) : (
        <>
          {section.primaryAction && (!section.primaryAction.adminOnly || prefs.isAdmin) && (
            <button type="button" className="primary-action">
              <Icon name={section.primaryAction.icon} />
              <span>{section.primaryAction.label}</span>
            </button>
          )}
          <ul className="groups">
            {section.dynamicList === 'workspaces' && <WorkspaceList onNavigate={onNavigate} />}
            {section.groups.map(renderGroup)}
          </ul>
        </>
      )}

      {section.footer && !noAccess && (
        <footer className="panel-footer">
          {section.footer.map((f) => (
            <button key={f.id} type="button" className="row row--footer">
              <Icon name={f.icon} />
              <span className="row-label">{f.label}</span>
            </button>
          ))}
        </footer>
      )}
    </nav>
  );
}
