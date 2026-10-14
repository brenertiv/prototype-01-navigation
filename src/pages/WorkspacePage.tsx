import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { personaLabel, useWorkspaces, type LandedBecause } from '../nav/workspaces';
import { usePrefs } from '../state/preferences';
import { useScope, useScopedPath } from '../state/scope';
import { Icon } from '../shell/Icon';

/** One workspace: a single canvas that can hold a dashboard, a report or a plan. Placeholder only. */
export function WorkspacePage() {
  const { workspaceId } = useParams();
  const { visible, roleDefault } = useWorkspaces();
  const { prefs, set } = usePrefs();
  const { scope } = useScope();
  const scoped = useScopedPath();
  const { pathname, search, state } = useLocation();
  const ws = visible.find((w) => w.id === workspaceId);

  // Opening a workspace makes it the one the Workspace rail item lands on next time.
  useEffect(() => {
    if (ws && prefs.lastWorkspaceId !== ws.id) set('lastWorkspaceId', ws.id);
  }, [ws, prefs.lastWorkspaceId, set]);

  if (!ws) {
    return (
      <article className="page">
        <p className="eyebrow">Workspace</p>
        <h1>No workspace here</h1>
        <p className="muted" style={{ marginBottom: 16 }}>
          <code>{pathname}</code> is not one of your workspaces.
          {prefs.newUser ? ' As a new user you only have the default for your role.' : ''}
        </p>
        <Link className="btn" to={scoped('/workspace')}>
          Go to your workspace
        </Link>
      </article>
    );
  }

  const landed = (state as { landedBecause?: LandedBecause } | null)?.landedBecause;
  const role = personaLabel(prefs.persona);
  const howYouGotHere =
    landed === 'last'
      ? 'Landed here: the workspace you last had open'
      : landed === 'role'
        ? `Landed here: the default for your role (${role}), ${prefs.newUser ? 'because you are new' : "because you haven't opened another workspace yet"}`
        : 'Opened from the panel or a link';

  return (
    <article className="page">
      <p className="eyebrow">Workspace</p>
      <h1>{ws.name}</h1>

      <p className="page-note">
        <Icon name="construction" />
        Placeholder. A workspace is one canvas that can hold a dashboard, a report or a plan. It has no content in prototype 01.
      </p>

      <dl className="page-meta">
        <dt>How you got here</dt>
        <dd>{howYouGotHere}</dd>
        <dt>Route</dt>
        <dd>
          <code>
            {pathname}
            {search}
          </code>
        </dd>
        {ws.id === roleDefault.id ? (
          <>
            <dt>Ready-made for</dt>
            <dd>{role}</dd>
          </>
        ) : null}
        {ws.note && (
          <>
            <dt>What it answers</dt>
            <dd>{ws.note}</dd>
          </>
        )}
        <dt>Works at</dt>
        <dd>As saved</dd>
        <dt>Current scope</dt>
        <dd>
          {scope.type} · {scope.name}
          {scope.count !== undefined ? ` · ${scope.count} properties` : ''}
        </dd>
        {ws.id === roleDefault.id && (
          <>
            <dt>Requirements</dt>
            <dd>MOD-WS-01, 40</dd>
          </>
        )}
        <dt>Source spec</dt>
        <dd>
          <code>02-building/modules/workspace.md</code>
          <span className="muted"> (differs: the spec has a library per artefact type, MOD-WS-45, 46)</span>
        </dd>
      </dl>
    </article>
  );
}
