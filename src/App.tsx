import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SECTIONS } from './nav/sections';
import { WORKSPACE_LEGACY, useWorkspaces } from './nav/workspaces';
import { NotFoundPage } from './pages/NotFoundPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { UpgradePage } from './pages/UpgradePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { Shell } from './shell/Shell';
import { PrefsProvider } from './state/preferences';

/** An old route lands on its new item, with its filter set and the scope kept. */
function LegacyRedirect({ to, filter }: { to: string; filter?: string }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  if (filter) params.set('filter', filter);
  const qs = params.toString();
  return <Navigate to={`${to}${qs ? `?${qs}` : ''}`} replace />;
}

/** `/` is Workspace, the app's home. Keeps any scope already in the URL. */
function RedirectHome() {
  const { search } = useLocation();
  return <Navigate to={`/workspace${search}`} replace />;
}

/** `/workspace` lands on the last workspace opened, or the role's default for a new user. */
function WorkspaceLanding() {
  const { search } = useLocation();
  const { landing, landedBecause } = useWorkspaces();
  return <Navigate to={`/workspace/${landing.id}${search}`} replace state={{ landedBecause }} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <PrefsProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<RedirectHome />} />
            {SECTIONS.flatMap((section) =>
              section.missing
                ? [<Route key={section.id} path={section.path} element={<UpgradePage section={section} />} />]
                : section.dynamicList === 'workspaces'
                  ? [
                      <Route key="/workspace" path="/workspace" element={<WorkspaceLanding />} />,
                      <Route key="/workspace/:id" path="/workspace/:workspaceId" element={<WorkspacePage />} />,
                      ...WORKSPACE_LEGACY.map(([from, to]) => <Route key={from} path={from} element={<LegacyRedirect to={to} />} />),
                    ]
                  : section.groups.flatMap((group) =>
                    group.pages
                      .filter((page) => page.path)
                      .flatMap((page) => [
                        <Route key={page.path} path={page.path} element={<PlaceholderPage section={section} group={group} page={page} />} />,
                        ...(page.legacyPath
                          ? [<Route key={page.legacyPath} path={page.legacyPath} element={<LegacyRedirect to={page.path!} />} />]
                          : []),
                        ...(page.filters ?? [])
                          .filter((f) => f.legacyPath)
                          .map((f) => (
                            <Route key={f.legacyPath} path={f.legacyPath} element={<LegacyRedirect to={page.path!} filter={f.id} />} />
                          )),
                      ]),
                  ),
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PrefsProvider>
    </BrowserRouter>
  );
}
