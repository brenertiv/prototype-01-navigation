import { useEffect, useRef } from 'react';
import { COMPANIES } from '../nav/scopes';
import { usePrefs } from '../state/preferences';
import { Icon } from './Icon';

/** The Company modal: switch company, nothing else (SYS-NAVPAT-07, SYS-SCOPE-20). ST-N04. */
export function CompanyModal({ onClose }: { onClose: () => void }) {
  const { prefs, set } = usePrefs();
  const ref = useRef<HTMLDialogElement>(null);
  const companies = prefs.manyCompanies ? COMPANIES : COMPANIES.slice(0, 1);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (!d.open) d.showModal();
    const handleClose = () => onClose();
    d.addEventListener('close', handleClose);
    return () => d.removeEventListener('close', handleClose);
  }, [onClose]);

  const choose = (id: string) => {
    set('companyId', id);
    ref.current?.close();
  };

  return (
    <dialog ref={ref} className="modal" aria-labelledby="company-title">
      <header className="modal-header">
        <h2 id="company-title">Switch company</h2>
        <button type="button" className="icon-btn" aria-label="Close" onClick={() => ref.current?.close()}>
          <Icon name="close" />
        </button>
      </header>
      <p className="muted">
        {companies.length === 1
          ? 'You belong to one company. Managing teams and people is in the People section.'
          : 'Choosing a company switches the whole app to it and its last-used scope.'}
      </p>
      <ul className="company-list">
        {companies.map((c) => {
          const current = c.id === prefs.companyId;
          return (
            <li key={c.id}>
              <button type="button" className={`company-option ${current ? 'is-current' : ''}`} onClick={() => choose(c.id)} aria-current={current ? 'true' : undefined}>
                <span className="company-mark" aria-hidden="true">
                  {c.initials}
                </span>
                <span className="company-text">
                  <span className="company-name">{c.name}</span>
                  <span className="muted">
                    {c.role}
                    {c.guest ? ' · invited from another firm' : ''}
                  </span>
                </span>
                {current && <Icon name="check" />}
              </button>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
