import { useState, type FocusEvent, type MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { RAIL_FIXED, RAIL_SECTIONS } from '../nav/sections';
import type { SectionDef } from '../nav/types';
import { COMPANIES } from '../nav/scopes';
import { usePrefs } from '../state/preferences';
import { useScopedPath } from '../state/scope';
import { Icon } from './Icon';

interface Props {
  activeId?: string;
  /** Phone variant inside the drawer: labels shown, no tooltips (SYS-NAVPAT-30). */
  phone?: boolean;
  /** Panel docked: every item gets a tooltip. Collapsed: only items with no panel, since the peek names the rest. */
  docked?: boolean;
  onHoverSection?: (id: string) => void;
  onClickSection?: (id: string) => void;
  onOpenCompany: () => void;
}

/** The icon rail (SYS-NAVPAT-01 to 09). */
export function Rail({ activeId, phone, docked, onHoverSection, onClickSection, onOpenCompany }: Props) {
  const { prefs } = usePrefs();
  const scoped = useScopedPath();
  const company = COMPANIES.find((c) => c.id === prefs.companyId) ?? COMPANIES[0];

  // The tooltip shows the item's name. It is fixed-positioned so the rail's
  // scrolling list can't clip it, and aria-hidden because the aria-label is
  // the accessible name (SYS-NAVPAT-31: a tooltip is not the label).
  const [tip, setTip] = useState<{ label: string; top: number; left: number } | null>(null);
  const showTip = (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, label: string, enabled: boolean) => {
    if (!enabled || phone) return setTip(null);
    const r = e.currentTarget.getBoundingClientRect();
    setTip({ label, top: r.top + r.height / 2, left: r.right + 10 });
  };
  const hideTip = () => setTip(null);

  const renderItem = (section: SectionDef) => {
    const active = section.id === activeId;
    const noAccess = prefs.noAccessSection === section.id;
    const unread = section.id === 'notifications' ? prefs.unreadCount : 0;
    const labelParts = [section.label];
    if (section.missing) labelParts.push('not in your account');
    if (noAccess) labelParts.push('no access');
    if (unread > 0) labelParts.push(`${unread} unread`);
    const label = labelParts.join(', ');
    const isAccount = section.id === 'account';
    // Upgradable (Missing) sections have no panel, so they always get the tooltip.
    const tipOn = Boolean(docked) || Boolean(section.missing);

    return (
      <li key={section.id}>
        <NavLink
          to={scoped(section.defaultPath)}
          className={[
            'rail-item',
            active ? 'is-active' : '',
            section.missing ? 'is-missing' : '',
            noAccess ? 'is-locked' : '',
            isAccount ? 'rail-item--account' : '',
          ].join(' ')}
          aria-label={label}
          aria-current={active ? 'page' : undefined}
          onMouseEnter={(e) => {
            showTip(e, section.label, tipOn);
            onHoverSection?.(section.id);
          }}
          onFocus={(e) => {
            showTip(e, section.label, tipOn);
            onHoverSection?.(section.id);
          }}
          onMouseLeave={hideTip}
          onBlur={hideTip}
          onClick={() => onClickSection?.(section.id)}
        >
          {isAccount ? (
            <span className="avatar" aria-hidden="true">
              SR
            </span>
          ) : (
            <Icon name={section.icon} filled={active} />
          )}
          {section.missing && <Icon name="add" className="rail-sub" />}
          {noAccess && <Icon name="lock" className="rail-sub" />}
          {unread > 0 && (
            <span className="rail-badge" aria-hidden="true">
              {unread > 99 ? '99+' : unread}
            </span>
          )}
          {phone && <span className="rail-label">{section.label}</span>}
        </NavLink>
      </li>
    );
  };

  return (
    <nav className={`rail ${phone ? 'rail--phone' : ''}`} aria-label="Sections">
      <button
        type="button"
        className="rail-item rail-item--company"
        aria-label={`Company: ${company.name}. Switch company`}
        aria-haspopup="dialog"
        onMouseEnter={(e) => showTip(e, company.name, true)}
        onFocus={(e) => showTip(e, company.name, true)}
        onMouseLeave={hideTip}
        onBlur={hideTip}
        onClick={() => {
          hideTip();
          onOpenCompany();
        }}
      >
        <span className="company-mark" aria-hidden="true">
          {company.initials}
        </span>
        {phone && <span className="rail-label">{company.name}</span>}
      </button>
      <ul className="rail-scroll" onScroll={hideTip}>
        {RAIL_SECTIONS.map(renderItem)}
      </ul>
      <ul className="rail-fixed">{RAIL_FIXED.map(renderItem)}</ul>
      {tip && (
        <div className="rail-tooltip" aria-hidden="true" style={{ top: tip.top, left: tip.left }}>
          {tip.label}
        </div>
      )}
    </nav>
  );
}
