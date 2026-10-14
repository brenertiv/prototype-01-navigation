import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { findSection, sectionForPath } from '../nav/sections';
import { PHONE_QUERY, useMediaQuery } from '../state/media';
import { usePrefs } from '../state/preferences';
import { AssistantDrawer } from './AssistantDrawer';
import { CompanyModal } from './CompanyModal';
import { Icon } from './Icon';
import { Panel } from './Panel';
import { PrototypeControls } from './PrototypeControls';
import { Rail } from './Rail';
import { TopBar } from './TopBar';

/** The three-region shell: rail, panel, canvas (SYS-NAVPAT-01). */
export function Shell() {
  const { prefs, set } = usePrefs();
  const phone = useMediaQuery(PHONE_QUERY);
  const { pathname } = useLocation();
  const activeSection = sectionForPath(pathname);

  const [peekId, setPeekId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const peekTimer = useRef<number | undefined>(undefined);

  const docked = prefs.panelDocked;
  const peekSection = peekId ? findSection(peekId) : undefined;

  // Upgradable (Missing) sections have no panel, so they never peek; hovering one closes any open peek.
  const openPeek = useCallback((id: string) => {
    window.clearTimeout(peekTimer.current);
    setPeekId(findSection(id)?.missing ? null : id);
  }, []);
  const closePeekSoon = useCallback(() => {
    window.clearTimeout(peekTimer.current);
    peekTimer.current = window.setTimeout(() => setPeekId(null), 300);
  }, []);
  const holdPeek = useCallback(() => window.clearTimeout(peekTimer.current), []);

  // Docking again, or leaving desktop width, clears any peek.
  useEffect(() => {
    if (docked || phone) setPeekId(null);
  }, [docked, phone]);

  useEffect(() => {
    if (!phone) setMobileOpen(false);
  }, [phone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setPeekId(null);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeCompany = useCallback(() => setCompanyOpen(false), []);

  return (
    <div className="shell" data-phone={phone || undefined} data-docked={docked} data-drawer={prefs.drawerOpen || undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {!phone && (
        <div className="sidebar" onMouseEnter={holdPeek} onMouseLeave={docked ? undefined : closePeekSoon}>
          <Rail
            activeId={activeSection?.id}
            docked={docked}
            onHoverSection={docked ? undefined : openPeek}
            onClickSection={docked ? undefined : openPeek}
            onOpenCompany={() => setCompanyOpen(true)}
          />
          {docked && activeSection && !activeSection.missing && <Panel section={activeSection} mode="docked" />}
          {!docked && peekSection && <Panel section={peekSection} mode="peek" onClose={() => setPeekId(null)} />}
        </div>
      )}

      <div className="canvas-wrap" onMouseDown={() => setPeekId(null)}>
        <TopBar phone={phone} onOpenMenu={() => setMobileOpen(true)} />
        <main id="main" className="canvas" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      {prefs.drawerOpen && <AssistantDrawer phone={phone} onClose={() => set('drawerOpen', false)} />}

      {phone && mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <div className={`mobile-drawer-body ${activeSection?.missing ? 'mobile-drawer-body--rail-only' : ''}`}>
            <Rail
              activeId={activeSection?.id}
              phone
              onClickSection={(id) => {
                // Nothing more to choose in an upgradable section: go straight to its upgrade page.
                if (findSection(id)?.missing) setMobileOpen(false);
              }}
              onOpenCompany={() => setCompanyOpen(true)}
            />
            {activeSection && !activeSection.missing ? (
              <Panel section={activeSection} mode="phone" onClose={() => setMobileOpen(false)} onNavigate={() => setMobileOpen(false)} />
            ) : (
              <div className="mobile-drawer-close">
                <button type="button" className="icon-btn" aria-label="Close navigation" onClick={() => setMobileOpen(false)}>
                  <Icon name="close" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {companyOpen && <CompanyModal onClose={closeCompany} />}
      <PrototypeControls />
    </div>
  );
}
