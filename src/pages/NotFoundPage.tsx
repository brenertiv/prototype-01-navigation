import { Link, useLocation } from 'react-router-dom';
import { useScopedPath } from '../state/scope';

export function NotFoundPage() {
  const { pathname } = useLocation();
  const scoped = useScopedPath();
  return (
    <article className="page">
      <p className="eyebrow">Not a page</p>
      <h1>Nothing at this address</h1>
      <p className="muted">
        <code>{pathname}</code> is not a route in prototype 01. Every page in the IA is listed in the README.
      </p>
      <Link className="btn" to={scoped('/workspace')}>
        Go to your workspace
      </Link>
    </article>
  );
}
