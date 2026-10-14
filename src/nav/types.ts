/** The scope a page works at (SYS-SCOPE-12, panel template "Pages per group"). */
export type PageScope = 'portfolio' | 'property' | 'both' | 'any' | 'none';

/**
 * A filter over the records on one page. Used where a panel item stands for
 * several record sets instead of a collapsible group of pages (People).
 * Kept in the URL as `?filter=<id>`.
 */
export interface FilterDef {
  id: string;
  label: string;
  requirements?: string;
  replaces?: string;
  /** The route this filter replaced; redirects here so old deep links still land. */
  legacyPath?: string;
}

export interface PageDef {
  id: string;
  label: string;
  /** Filters over this page's records. The first is the default. */
  filters?: FilterDef[];
  /** The route this page replaced; redirects here. */
  legacyPath?: string;
  /** Route path. Absent for rows that are not pages in the MVP (for example the tenant view switch). */
  path?: string;
  scope: PageScope;
  /** Requirement IDs the real page will meet; shown on the placeholder. */
  requirements?: string;
  /** Current-app pages it replaces; shown on the placeholder. */
  replaces?: string;
  /** Row is shown but disabled, with this note (for example "after the MVP"). */
  disabledNote?: string;
  /** Row shown only to Admins. */
  adminOnly?: boolean;
  /** A detail route (one artefact or record) rather than a list. */
  detail?: boolean;
}

export interface GroupDef {
  id: string;
  label?: string;
  pages: PageDef[];
  adminOnly?: boolean;
}

export interface HeaderAction {
  id: string;
  label: string;
  icon: string;
  /** Shows a count badge driven by prototype controls. */
  badge?: 'dataHealth' | 'openRequests';
}

export interface SectionDef {
  id: string;
  label: string;
  /** Material Symbols name. */
  icon: string;
  /** Route prefix; also the rail link when no default page exists. */
  path: string;
  /** Where the rail item lands. */
  defaultPath: string;
  headerActions: HeaderAction[];
  primaryAction?: { label: string; icon: string; adminOnly?: boolean };
  groups: GroupDef[];
  footer?: { id: string; label: string; icon: string }[];
  /** SYS-NAVPAT-04: bought-able but not bought. Opens an upgrade page. */
  missing?: boolean;
  /** SYS-NAVPAT-06: fixed to the bottom of the rail. */
  fixed?: boolean;
  /** Source spec, for the placeholder and README. */
  source: string;
  /** Short line for the upgrade page. */
  pitch?: string;
}
