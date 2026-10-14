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
  onHoverSection?: (id: string) => void;
  onClickSection?: (id: string) => void;
  onOpenCompany: () => void;
}

/** The icon rail (SYS-NAVPAT-01 to 09). */
export function Rail({ activeId, phone, onHoverSection, onClickSection, onOpenCompany }: Props) {
  const { prefs } = usePrefs();
  const scoped = useScopedPath();
  const company = COMPANIES.find((c) => c.id === prefs.companyId) ?? COMPANIES[0];

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
          title={phone ? undefined : label}
          onMouseEnter={onHoverSection ? () => onHoverSection(section.id) : undefined}
          onFocus={onHoverSection ? () => onHoverSection(section.id) : undefined}
          onClick={onClickSection ? () => onClickSection(section.id) : undefined}
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
        title={phone ? undefined : company.name}
        onClick={onOpenCompany}
      >
        <span className="company-mark" aria-hidden="true">
          {company.initials}
        </span>
        {phone && <span className="rail-label">{company.name}</span>}
      </button>
      <ul className="rail-scroll">{RAIL_SECTIONS.map(renderItem)}</ul>
      <ul className="rail-fixed">{RAIL_FIXED.map(renderItem)}</ul>
    </nav>
  );
}
