import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SECTIONS } from './nav/sections';
import { NotFoundPage } from './pages/NotFoundPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { UpgradePage } from './pages/UpgradePage';
import { Shell } from './shell/Shell';
import { PrefsProvider } from './state/preferences';

/** `/` lands on Workspace › Home and keeps any scope already in the URL. */
function RedirectHome() {
  const { search } = useLocation();
  return <Navigate to={`/workspace/home${search}`} replace />;
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
                : section.groups.flatMap((group) =>
                    group.pages
                      .filter((page) => page.path)
                      .map((page) => (
                        <Route key={page.path} path={page.path} element={<PlaceholderPage section={section} group={group} page={page} />} />
                      )),
                  ),
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PrefsProvider>
    </BrowserRouter>
  );
}
