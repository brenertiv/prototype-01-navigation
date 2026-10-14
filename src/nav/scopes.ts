/**
 * Fake scopes for the scope indicator (SYS-SCOPE-30 to 32). The real scope
 * navigator is its own spec and is not built here.
 */
export type ScopeLevel = 'portfolio' | 'property';

export interface ScopeDef {
  id: string;
  /** Level type shown first in the indicator: Portfolio, a client-labelled group, or Property. */
  type: 'Portfolio' | 'Group' | 'Property';
  level: ScopeLevel;
  name: string;
  /** Property count at portfolio and group level (SYS-SCOPE-32). */
  count?: number;
  path: string[];
}

export const SCOPES: ScopeDef[] = [
  { id: 'portfolio', type: 'Portfolio', level: 'portfolio', name: 'Portfolio', count: 14, path: ['Portfolio'] },
  { id: 'west-region', type: 'Group', level: 'portfolio', name: 'West Region', count: 5, path: ['Portfolio', 'West Region'] },
  { id: '123-main-st', type: 'Property', level: 'property', name: '123 Main St', path: ['Portfolio', 'West Region', '123 Main St'] },
];

export const DEFAULT_SCOPE = SCOPES[0];

export interface CompanyDef {
  id: string;
  name: string;
  role: string;
  /** A guest membership from another firm (ST-N04). */
  guest?: boolean;
  initials: string;
}

export const COMPANIES: CompanyDef[] = [
  { id: 'northwind', name: 'Northwind Holdings', role: 'Admin', initials: 'NH' },
  { id: 'harbor', name: 'Harbor Point Partners', role: 'Member', initials: 'HP' },
  { id: 'cedar', name: 'Cedar Property Management', role: 'Guest, 3 buildings', guest: true, initials: 'CP' },
];
