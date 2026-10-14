import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navForPath } from '../nav/sections';
import { useActiveFilter } from '../pages/PlaceholderPage';
import { Icon } from './Icon';

interface Props {
  phone: boolean;
  onClose: () => void;
}

/** One drawer on every page, bound to what is on screen (SYS-AI-01, 02, 11). No chat inside. */
export function AssistantDrawer({ phone, onClose }: Props) {
  const { pathname } = useLocation();
  const nav = navForPath(pathname);
  const filter = useActiveFilter(nav?.page);
  const pageLabel = nav?.page?.label ?? nav?.section.label ?? 'this page';
  const boundTo = filter ? `${pageLabel} · ${filter.label}` : pageLabel;
  const isArtefact = Boolean(nav?.page?.detail);
  const [expanded, setExpanded] = useState(false);

  const body = (
    <div className="drawer-body">
      <p className="muted">
        The assistant drawer is a placeholder. In the production prototype it holds the thread {isArtefact ? 'of this artefact (MOD-WS-47)' : 'for this page'} and stays {phone ? 'a bottom sheet' : 'open'} across pages until you close it (SYS-AI-11).
      </p>
      <div className="composer" aria-hidden="true">
        <span className="muted">Ask about {boundTo}…</span>
        <Icon name="send" />
      </div>
    </div>
  );

  if (phone) {
    return (
      <aside className={`drawer drawer--sheet ${expanded ? 'is-expanded' : ''}`} aria-label="Assistant">
        <button type="button" className="sheet-bar" aria-expanded={expanded} onClick={() => setExpanded((e) => !e)}>
          <Icon name="auto_awesome" filled />
          <span className="sheet-bar-text">
            <strong>Assistant</strong>
            <span className="muted"> · Bound to {boundTo}</span>
          </span>
          <Icon name={expanded ? 'expand_more' : 'expand_less'} />
        </button>
        {expanded && body}
        <button type="button" className="icon-btn sheet-close" aria-label="Close assistant" onClick={onClose}>
          <Icon name="close" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="drawer" aria-label="Assistant">
      <header className="drawer-header">
        <div>
          <h2>Assistant</h2>
          <p className="drawer-binding">
            Bound to <strong>{boundTo}</strong>
            {isArtefact && <span className="chip chip--info">artefact thread</span>}
          </p>
        </div>
        <button type="button" className="icon-btn" aria-label="Close assistant" onClick={onClose}>
          <Icon name="close" />
        </button>
      </header>
      {body}
    </aside>
  );
}
