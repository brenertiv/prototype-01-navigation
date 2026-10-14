import { useLocation } from 'react-router-dom';
import type { GroupDef, PageDef, SectionDef } from '../nav/types';
import { usePrefs } from '../state/preferences';
import { useScope } from '../state/scope';
import { Icon } from '../shell/Icon';
import { NoAccessPage } from './NoAccessPage';

const SCOPE_WORDS: Record<PageDef['scope'], string> = {
  portfolio: 'Portfolio',
  property: 'Property',
  both: 'Portfolio and property',
  any: 'As saved',
  none: 'Scope does not apply',
};

interface Props {
  section: SectionDef;
  group: GroupDef;
  page: PageDef;
}

/** A page that owns its title and says what it will be. Nothing else (SYS-NAVPAT-21). */
export function PlaceholderPage({ section, group, page }: Props) {
  const { prefs } = usePrefs();
  const { scope, inUrl } = useScope();
  const { pathname, search } = useLocation();

  if (prefs.noAccessSection === section.id) return <NoAccessPage section={section} />;

  const needsProperty = page.scope === 'property' && scope.level !== 'property';
  const needsPortfolio = page.scope === 'portfolio' && scope.level !== 'portfolio';

  return (
    <article className="page">
      <p className="eyebrow">
        {section.label}
        {group.label ? ` › ${group.label}` : ''}
      </p>
      <h1>{page.label}</h1>

      {needsProperty && <ScopeNotice needed="property" page={page} />}
      {needsPortfolio && <ScopeNotice needed="portfolio" page={page} />}

      {!needsProperty && !needsPortfolio && (
        <p className="page-note">
          <Icon name="construction" />
          Placeholder. This page has no content in prototype 01; only the shell and the route exist.
        </p>
      )}

      <dl className="page-meta">
        <dt>Route</dt>
        <dd>
          <code>
            {pathname}
            {search}
          </code>
          {!inUrl && page.scope !== 'none' && <span className="muted"> (no scope in the URL, so the default applies)</span>}
        </dd>
        <dt>Works at</dt>
        <dd>{SCOPE_WORDS[page.scope]}</dd>
        {page.scope !== 'none' && (
          <>
            <dt>Current scope</dt>
            <dd>
              {scope.type} · {scope.name}
              {scope.count !== undefined ? ` · ${scope.count} properties` : ''}
            </dd>
          </>
        )}
        {page.requirements && (
          <>
            <dt>Requirements</dt>
            <dd>{page.requirements}</dd>
          </>
        )}
        {page.replaces && (
          <>
            <dt>Replaces today</dt>
            <dd>{page.replaces}</dd>
          </>
        )}
        <dt>Source spec</dt>
        <dd>
          <code>{section.source}</code>
        </dd>
      </dl>
    </article>
  );
}

/** SYS-SCOPE-12: say so and offer the fix. Never an empty page. */
function ScopeNotice({ needed, page }: { needed: 'property' | 'portfolio'; page: PageDef }) {
  const { setScope } = useScope();
  const target = needed === 'property' ? '123-main-st' : 'portfolio';
  return (
    <div className="notice">
      <Icon name={needed === 'property' ? 'apartment' : 'account_tree'} />
      <div>
        <p>
          <strong>{needed === 'property' ? 'Pick a property' : 'Switch to the portfolio'}</strong> to see {page.label.toLowerCase()}.{' '}
          {needed === 'property' ? 'This is a record page and needs one property.' : 'This page rolls up at portfolio scope.'}
        </p>
        <button type="button" className="btn" onClick={() => setScope(target)}>
          {needed === 'property' ? 'Use 123 Main St' : 'Use the portfolio'}
        </button>
      </div>
    </div>
  );
}
