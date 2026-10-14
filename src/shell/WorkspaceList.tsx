import { NavLink } from 'react-router-dom';
import { useWorkspaces } from '../nav/workspaces';
import { useScopedPath } from '../state/scope';
import { Icon } from './Icon';

/**
 * The Workspace panel's contents: one flat list of workspaces, no groups.
 * The role's default comes first, marked with an icon; then the user's own.
 */
export function WorkspaceList({ onNavigate }: { onNavigate?: () => void }) {
  const { visible, roleDefault } = useWorkspaces();
  const scoped = useScopedPath();

  return (
    <li className="group">
      <ul className="rows">
        {visible.map((w) => {
          const isRole = w.id === roleDefault.id;
          return (
            <li key={w.id} className="row-wrap">
              <NavLink to={scoped(`/workspace/${w.id}`)} end className="row" onClick={onNavigate}>
                <Icon name={isRole ? 'badge' : 'dashboard'} className="row-lead" />
                <span className="row-label">
                  {w.name}
                  {isRole && <span className="sr-only">, default for your role</span>}
                </span>
              </NavLink>
              <div className="row-actions">
                <button type="button" className="icon-btn icon-btn--sm" aria-label={`More actions for ${w.name}`}>
                  <Icon name="more_horiz" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
