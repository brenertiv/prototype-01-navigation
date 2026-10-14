import type { SectionDef } from '../nav/types';
import { Icon } from '../shell/Icon';

/** The upgrade page for a Missing section (SYS-NAVPAT-04, 09). ST-N02. */
export function UpgradePage({ section }: { section: SectionDef }) {
  return (
    <article className="page">
      <p className="eyebrow">
        {section.label} <span className="chip chip--missing">Missing</span>
      </p>
      <h1>{section.label} is not in your account</h1>
      <p className="lede">{section.pitch}</p>
      <section className="upgrade-grid" aria-label="What you would get">
        <div className="upgrade-card">
          <h2>What it does</h2>
          <p className="muted">Placeholder for the section's description.</p>
        </div>
        <div className="upgrade-card">
          <h2>Benefits</h2>
          <p className="muted">Placeholder for the benefits for this account.</p>
        </div>
        <div className="upgrade-card">
          <h2>How to get it</h2>
          <p className="muted">A price-affecting change becomes a request to the account team (SYS-ACCESS-25). To confirm.</p>
          <button type="button" className="btn">
            <Icon name="mail" />
            Request from the account team
          </button>
        </div>
      </section>
      <dl className="page-meta">
        <dt>Route</dt>
        <dd>
          <code>{section.path}</code>
        </dd>
        <dt>Source spec</dt>
        <dd>
          <code>{section.source}</code>
        </dd>
      </dl>
    </article>
  );
}
