import { usePrefs, type Persona } from '../state/preferences';

/**
 * Workspaces: the Workspace section's contents (decided in prototype 01).
 * A workspace is one canvas that can hold a dashboard, a report or a plan, so
 * the panel lists workspaces rather than one group per artefact type. This
 * differs from MOD-WS-45 and 46 (three artefact types in a library).
 */
export interface WorkspaceDef {
  id: string;
  name: string;
  /** Set on a role's ready-made default. */
  persona?: Persona;
  /** What it answers, for the placeholder. */
  note?: string;
}

export const PERSONAS: { id: Persona; label: string }[] = [
  { id: 'sl', label: 'Sustainability Lead' },
  { id: 'am', label: 'Asset Manager' },
  { id: 'pm', label: 'Property Manager' },
  { id: 'be', label: 'Building Engineer' },
];

export function personaLabel(id: Persona) {
  return PERSONAS.find((p) => p.id === id)?.label ?? id;
}

/** The ready-made default per role, answering what each persona opens Enertiv for (MOD-WS-01, 40). */
export const ROLE_DEFAULTS: WorkspaceDef[] = [
  { id: 'reporting-readiness', name: 'Reporting readiness', persona: 'sl', note: 'Coverage gaps, whether ENERGY STAR is in sync, and reporting readiness' },
  { id: 'exposure-by-asset', name: 'Exposure by asset', persona: 'am', note: 'One defensible number per asset (exposure, cost or carbon) with attribution' },
  { id: 'data-problems', name: 'Data problems to fix', persona: 'pm', note: 'Data problems on your buildings, leading into Building Info' },
  { id: 'attention-today', name: 'Needs attention today', persona: 'be', note: "What needs attention today on your equipment, leading into Building Info" },
];

/** A returning user's own workspaces, most recent first. Fake. */
export const OWN_WORKSPACES: WorkspaceDef[] = [
  { id: 'gresb-2026', name: 'GRESB 2026 submission', note: 'Was a report' },
  { id: 'q3-board-pack', name: 'Q3 board pack', note: 'Was a report' },
  { id: 'net-zero-2030', name: 'Net zero 2030 plan', note: 'Was a carbon plan' },
  { id: 'west-region-exposure', name: 'West Region compliance exposure', note: 'Was a dashboard' },
];

export const ALL_WORKSPACES = [...ROLE_DEFAULTS, ...OWN_WORKSPACES];

export type LandedBecause = 'last' | 'role';

/**
 * What the panel lists and where the Workspace rail item lands.
 * New user: only the role's default is listed, and the app lands on it.
 * Returning user: the role's default and their own; the app lands on the last
 * workspace they had open, or on the role's default if none.
 */
export function useWorkspaces() {
  const { prefs } = usePrefs();
  const roleDefault = ROLE_DEFAULTS.find((w) => w.persona === prefs.persona) ?? ROLE_DEFAULTS[0];
  const visible = prefs.newUser ? [roleDefault] : [roleDefault, ...OWN_WORKSPACES];
  const last = !prefs.newUser && prefs.lastWorkspaceId ? visible.find((w) => w.id === prefs.lastWorkspaceId) : undefined;
  const landing = last ?? roleDefault;
  const landedBecause: LandedBecause = last ? 'last' : 'role';
  return { visible, roleDefault, landing, landedBecause };
}

export function workspaceIdForPath(pathname: string) {
  return pathname.match(/^\/workspace\/([^/]+)$/)?.[1];
}

export function findWorkspace(id?: string) {
  return id ? ALL_WORKSPACES.find((w) => w.id === id) : undefined;
}

/** Routes from before the change, redirected so old links still land. */
export const WORKSPACE_LEGACY: [from: string, to: string][] = [
  ['/workspace/home', '/workspace'],
  ['/workspace/dashboards', '/workspace'],
  ['/workspace/reports', '/workspace'],
  ['/workspace/plans', '/workspace'],
  ['/workspace/projects', '/workspace'],
  ['/workspace/gallery', '/workspace'],
  ['/workspace/dashboards/exposure-by-asset', '/workspace/exposure-by-asset'],
  ['/workspace/reports/gresb-2026', '/workspace/gresb-2026'],
  ['/workspace/plans/net-zero-2030', '/workspace/net-zero-2030'],
];
