import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_SCOPE, SCOPES } from '../nav/scopes';

/** Scope lives in the URL (SYS-SCOPE-13) and survives moving between sections (SYS-SCOPE-10). */
export function useScope() {
  const [params, setParams] = useSearchParams();
  const id = params.get('scope');
  const scope = SCOPES.find((s) => s.id === id) ?? DEFAULT_SCOPE;
  const inUrl = Boolean(id);

  const setScope = useCallback(
    (nextId: string) => {
      const next = new URLSearchParams(params);
      next.set('scope', nextId);
      setParams(next);
    },
    [params, setParams],
  );

  return { scope, inUrl, setScope };
}

/** Builds a link that carries the current scope along (SYS-SCOPE-15). */
export function useScopedPath() {
  const [params] = useSearchParams();
  const id = params.get('scope');
  return useCallback((path: string) => (id ? `${path}?scope=${encodeURIComponent(id)}` : path), [id]);
}
