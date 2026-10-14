import type { SectionDef } from './types';

/**
 * The Rail contents table (navigation-pattern.md § Rail contents) and each
 * section's "Panel and pages" table, as data. Order here is rail order.
 * Rows 1 to 7 scroll together; Notifications and Account are fixed (SYS-NAVPAT-06, 08).
 * The Company button is not a section; see CompanyModal.
 */
export const SECTIONS: SectionDef[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'space_dashboard',
    path: '/workspace',
    defaultPath: '/workspace/home',
    source: '02-building/modules/workspace.md § Panel and pages',
    headerActions: [
      { id: 'search', label: 'Search artefacts', icon: 'search' },
      { id: 'filter', label: 'Filter by job, persona, received, ready-made', icon: 'filter_list' },
    ],
    primaryAction: { label: 'New', icon: 'add' },
    groups: [
      {
        id: 'home',
        label: 'Home',
        pages: [
          {
            id: 'home',
            label: 'Home',
            path: '/workspace/home',
            scope: 'both',
            requirements: 'MOD-WS-01 to 03, 40',
            replaces: 'Portfolio and property Summary; Energy & ESG › Summary; Insights',
          },
        ],
      },
      {
        id: 'dashboards',
        label: 'Dashboards',
        pages: [
          {
            id: 'dashboards',
            label: 'Dashboards',
            path: '/workspace/dashboards',
            scope: 'both',
            requirements: 'MOD-WS-45, 46, 48',
            replaces: 'Energy & ESG › Summary, Energy Use, Emissions; ENERGY STAR › Summary; Dashboards; Insights; Alerts › Summary charts',
          },
          {
            id: 'dashboard',
            label: 'Dashboard (one artefact)',
            path: '/workspace/dashboards/exposure-by-asset',
            scope: 'any',
            detail: true,
            requirements: 'MOD-WS-10, 12 to 17, 30, 42, 44, 47, 51',
            replaces: 'The tabs and widgets of the pages above',
          },
        ],
      },
      {
        id: 'reports',
        label: 'Reports',
        pages: [
          {
            id: 'reports',
            label: 'Reports',
            path: '/workspace/reports',
            scope: 'both',
            requirements: 'MOD-WS-04, 11, 45, 46, 48, 53',
            replaces: 'Reports, Report settings; Energy & ESG export menu; Energy data table',
          },
          {
            id: 'report',
            label: 'Report (one artefact)',
            path: '/workspace/reports/gresb-2026',
            scope: 'any',
            detail: true,
            requirements: 'MOD-WS-11, 44, 47',
            replaces: 'Generated reports',
          },
        ],
      },
      {
        id: 'plans',
        label: 'Plans',
        pages: [
          {
            id: 'plans',
            label: 'Plans',
            path: '/workspace/plans',
            scope: 'portfolio',
            requirements: 'MOD-WS-20, 21, 23, 45',
            replaces: 'Carbon Planning › Summary, Plans',
          },
          {
            id: 'plan',
            label: 'Plan (one artefact)',
            path: '/workspace/plans/net-zero-2030',
            scope: 'any',
            detail: true,
            requirements: 'MOD-WS-20 to 24, 47',
            replaces: 'Carbon Planning › Plan detail, Create Plan',
          },
          {
            id: 'projects',
            label: 'Projects',
            path: '/workspace/projects',
            scope: 'both',
            requirements: 'MOD-WS-20, 22, 24',
            replaces: 'Carbon Planning › Projects',
          },
        ],
      },
      {
        id: 'gallery',
        label: 'Gallery',
        pages: [
          {
            id: 'gallery',
            label: 'Gallery',
            path: '/workspace/gallery',
            scope: 'any',
            requirements: 'MOD-WS-40, 41, 52',
            replaces: 'New',
          },
        ],
      },
    ],
  },
  {
    id: 'building-info',
    label: 'Building Info',
    icon: 'domain',
    path: '/building-info',
    defaultPath: '/building-info/overview',
    source: '02-building/modules/building-info.md § Panel and pages',
    headerActions: [
      { id: 'search', label: 'Search properties, equipment and meters', icon: 'search' },
      { id: 'data-health', label: 'Data health items', icon: 'health_and_safety', badge: 'dataHealth' },
    ],
    groups: [
      {
        id: 'overview',
        label: 'Overview',
        pages: [
          {
            id: 'overview',
            label: 'Property overview',
            path: '/building-info/overview',
            scope: 'property',
            requirements: 'MOD-BI-01, 07, 08, 61',
            replaces: 'Property Info › Summary; Digitization › Summary',
          },
        ],
      },
      {
        id: 'data-health',
        label: 'Data health',
        pages: [
          {
            id: 'inbox',
            label: 'Data health inbox',
            path: '/building-info/data-health/inbox',
            scope: 'both',
            requirements: 'MOD-BI-60, 07 (SYS-TRUST-30, 33, 34; SYS-GOLD-01, 03)',
            replaces: 'Utilities issues; ENERGY STAR › Alerts',
          },
          {
            id: 'sources',
            label: 'Data sources and tier',
            path: '/building-info/data-health/sources',
            scope: 'both',
            requirements: 'MOD-BI-61, 62 (SYS-TRUST-20 to 22)',
            replaces: 'New',
          },
        ],
      },
      {
        id: 'utilities',
        label: 'Utilities',
        pages: [
          {
            id: 'coverage',
            label: 'Coverage',
            path: '/building-info/utilities/coverage',
            scope: 'both',
            requirements: 'MOD-BI-10, 11, 13 (SYS-TRUST-03 to 07, 32)',
            replaces: 'Utilities › Data Coverage; Energy & ESG › Data Coverage tab',
          },
          {
            id: 'accounts',
            label: 'Utility accounts',
            path: '/building-info/utilities/accounts',
            scope: 'both',
            requirements: 'MOD-BI-12',
            replaces: 'Utilities › Accounts',
          },
          {
            id: 'bills',
            label: 'Bills',
            path: '/building-info/utilities/bills',
            scope: 'both',
            requirements: 'MOD-BI-12 (SYS-TRUST-11)',
            replaces: 'Utilities › Bills, Bill detail, Utility Bill Uploads',
          },
          {
            id: 'energy-star',
            label: 'ENERGY STAR',
            path: '/building-info/utilities/energy-star',
            scope: 'both',
            requirements: 'MOD-BI-14',
            replaces: 'ENERGY STAR › Property Details, Meters',
          },
        ],
      },
      {
        id: 'record',
        label: 'Building record',
        pages: [
          {
            id: 'details',
            label: 'Details',
            path: '/building-info/record/details',
            scope: 'property',
            requirements: 'MOD-BI-01 (SYS-GOLD-04, 06)',
            replaces: 'Property Info › Details, Edit details',
          },
          {
            id: 'stacking-plan',
            label: 'Stacking plan and site plan',
            path: '/building-info/record/stacking-plan',
            scope: 'property',
            requirements: 'MOD-BI-02',
            replaces: 'Property Info › Site plan, Add/edit unit; Digitization › Areas',
          },
          {
            id: 'occupancy-hours',
            label: 'Occupancy hours',
            path: '/building-info/record/occupancy-hours',
            scope: 'property',
            requirements: 'MOD-BI-03',
            replaces: 'Property Info › Occupancy hours',
          },
          {
            id: 'policies',
            label: 'Policies',
            path: '/building-info/record/policies',
            scope: 'both',
            requirements: 'MOD-BI-31',
            replaces: 'Energy & ESG › Policies',
          },
          {
            id: 'accolades',
            label: 'Accolades',
            path: '/building-info/record/accolades',
            scope: 'both',
            requirements: 'MOD-BI-30',
            replaces: 'Energy & ESG › Accolades',
          },
          {
            id: 'files',
            label: 'Files',
            path: '/building-info/record/files',
            scope: 'both',
            requirements: 'MOD-BI-50',
            replaces: 'Digitization › Files',
          },
        ],
      },
      {
        id: 'equipment',
        label: 'Equipment',
        pages: [
          {
            id: 'equipment',
            label: 'Equipment',
            path: '/building-info/equipment/equipment',
            scope: 'both',
            requirements: 'MOD-BI-09, 20, 50, 52, 53',
            replaces: 'Digitization › Equipment and tabs',
          },
          {
            id: 'meters',
            label: 'Meters',
            path: '/building-info/equipment/meters',
            scope: 'both',
            requirements: 'MOD-BI-09, 15, 50, 51, 52',
            replaces: 'Digitization › Meters and tabs; ENERGY STAR meter; Meter Reads readings',
          },
          {
            id: 'meter-health',
            label: 'Meter health',
            path: '/building-info/equipment/meter-health',
            scope: 'portfolio',
            requirements: 'MOD-BI-16',
            replaces: 'New',
          },
          {
            id: 'power-capacity',
            label: 'Power capacity',
            path: '/building-info/equipment/power-capacity',
            scope: 'both',
            requirements: 'MOD-BI-04, 71, 72, 75',
            replaces: 'Digitization › Electrical Distribution',
          },
          {
            id: 'one-line-diagram',
            label: 'One-line diagram',
            path: '/building-info/equipment/one-line-diagram',
            scope: 'property',
            requirements: 'MOD-BI-70, 73',
            replaces: 'New',
          },
          {
            id: 'groups',
            label: 'Groups',
            path: '/building-info/equipment/groups',
            scope: 'both',
            requirements: 'MOD-BI-54',
            replaces: 'Digitization › Groups and tabs',
          },
          {
            id: 'alerts',
            label: 'Alerts',
            path: '/building-info/equipment/alerts',
            scope: 'both',
            requirements: 'MOD-BI-20',
            replaces: 'Alerts › Summary (the list)',
          },
        ],
      },
    ],
  },
  {
    id: 'people',
    label: 'People',
    icon: 'group',
    path: '/people',
    defaultPath: '/people/team',
    source: '02-building/modules/people.md § Panel and pages',
    headerActions: [
      { id: 'search', label: 'Search people, tenants and vendors', icon: 'search' },
      { id: 'requests', label: 'Open requests', icon: 'mark_email_unread', badge: 'openRequests' },
    ],
    primaryAction: { label: 'Invite', icon: 'person_add', adminOnly: true },
    // One flat list, no collapsible groups: each item's former sub-pages are
    // filters over its records (decided in prototype 01; differs from the
    // People spec's grouped panel and SYS-NAVPAT-10's collapsible groups).
    groups: [
      {
        id: 'people',
        pages: [
          {
            id: 'team',
            label: 'Team',
            path: '/people/team',
            scope: 'both',
            filters: [
              {
                id: 'members',
                label: 'Team members',
                legacyPath: '/people/team/members',
                requirements: 'MOD-PPL-01, 02, 08',
                replaces: 'Admin › Users › Organization, Edit user; My Teams (member view)',
              },
              {
                id: 'teams',
                label: 'Teams',
                legacyPath: '/people/team/teams',
                requirements: 'MOD-PPL-02, 14',
                replaces: 'Property Info › Teams; My Teams',
              },
            ],
          },
          {
            id: 'tenants',
            label: 'Tenants',
            path: '/people/tenants',
            scope: 'both',
            filters: [
              {
                id: 'tenants',
                label: 'Tenants',
                legacyPath: '/people/tenants/tenants',
                requirements: 'MOD-PPL-05, 06, 07',
                replaces: 'Property Info › Tenants and Tenant view; Tenant Billing › Tenants; Admin › Users › Tenants',
              },
              {
                id: 'requests',
                label: 'Requests',
                legacyPath: '/people/tenants/requests',
                requirements: 'MOD-PPL-10 (SYS-CHASE-02, 04, 05)',
                replaces: 'New; Admin › Communications',
              },
            ],
          },
          {
            id: 'partners',
            label: 'Partners',
            path: '/people/partners',
            scope: 'both',
            filters: [
              {
                id: 'contractors',
                label: 'Contractors and guests',
                legacyPath: '/people/partners/contractors',
                requirements: 'MOD-PPL-03',
                replaces: 'No page today',
              },
              {
                id: 'vendors',
                label: 'Vendors',
                legacyPath: '/people/partners/vendors',
                requirements: 'MOD-PPL-11',
                replaces: 'Vendors, Add vendor',
              },
              {
                id: 'management-companies',
                label: 'Management companies',
                legacyPath: '/people/partners/management-companies',
                requirements: 'MOD-PPL-12',
                replaces: 'Property Info › Details',
              },
            ],
          },
          {
            id: 'contacts',
            label: 'Building contacts',
            path: '/people/contacts',
            legacyPath: '/people/contacts/whos-who',
            scope: 'both',
            requirements: "MOD-PPL-04 (was Who's who)",
            replaces: 'New',
          },
          {
            id: 'agents',
            label: 'Agents',
            path: '/people/agents',
            legacyPath: '/people/agents/chase-agent',
            scope: 'both',
            requirements: 'MOD-PPL-15 (SYS-CHASE-02, 06, 07, 09, 10); was Chase agent',
            replaces: 'New; Admin › Communications',
          },
        ],
      },
    ],
  },
  {
    id: 'tenant-billing',
    label: 'Tenant Billing',
    icon: 'receipt_long',
    path: '/tenant-billing',
    defaultPath: '/tenant-billing',
    missing: true,
    source: '02-building/modules/tenant-billing.md',
    pitch:
      'Automated tenant utility billing and cost recovery from submeter data, mobile app reads or pro-rata allocation, with AI-assisted QA and two-way sync with Yardi, MRI and JD Edwards.',
    headerActions: [],
    groups: [],
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: 'build',
    path: '/maintenance',
    defaultPath: '/maintenance',
    missing: true,
    source: '02-building/modules/maintenance.md',
    pitch:
      'A CMMS on a QR-coded equipment repository: work orders, preventive maintenance, vendors, HVAC compliance tracking, tenant tickets and amenities.',
    headerActions: [],
    groups: [],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'notifications',
    path: '/notifications',
    defaultPath: '/notifications/insights',
    fixed: true,
    source: '02-building/system/notifications.md § Panel and pages',
    headerActions: [
      { id: 'search', label: 'Search notifications', icon: 'search' },
      { id: 'mark-read', label: 'Mark all read', icon: 'done_all' },
      { id: 'prefs', label: 'Notification preferences', icon: 'settings' },
    ],
    groups: [
      {
        id: 'feeds',
        pages: [
          {
            id: 'insights',
            label: 'Insights',
            path: '/notifications/insights',
            scope: 'both',
            requirements: 'SYS-NOTIF-07',
            replaces: 'Insights',
          },
          {
            id: 'activity',
            label: 'Activity',
            path: '/notifications/activity',
            scope: 'both',
            requirements: 'SYS-NOTIF-07',
            replaces: 'Activity Feed (four copies today)',
          },
          {
            id: 'alerts',
            label: 'Alerts',
            path: '/notifications/alerts',
            scope: 'both',
            requirements: 'SYS-NOTIF-07 (MOD-BI-20)',
            replaces: 'Alerts',
          },
          {
            id: 'app-updates',
            label: 'App updates',
            path: '/notifications/app-updates',
            scope: 'both',
            requirements: 'SYS-NOTIF-07',
            replaces: 'New',
          },
        ],
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    icon: 'account_circle',
    path: '/account',
    defaultPath: '/account/profile',
    fixed: true,
    source: '02-building/system/navigation-pattern.md § The account panel (SYS-NAVPAT-06)',
    headerActions: [],
    groups: [
      {
        id: 'personal',
        label: 'Personal',
        pages: [
          {
            id: 'profile',
            label: 'Profile',
            path: '/account/profile',
            scope: 'none',
            requirements: 'SYS-PERS-02, 03',
            replaces: 'My Profile',
          },
          {
            id: 'preferences',
            label: 'Preferences',
            path: '/account/preferences',
            scope: 'none',
            requirements: 'SYS-PERS-06',
            replaces: 'Units',
          },
          {
            id: 'notification-settings',
            label: 'Notification preferences',
            path: '/account/notification-settings',
            scope: 'none',
            requirements: 'SYS-NOTIF-01, 02',
            replaces: 'Notification settings',
          },
          {
            id: 'tenant-view',
            label: 'Tenant view',
            scope: 'none',
            disabledNote: 'after the MVP',
          },
        ],
      },
      {
        id: 'account-settings',
        label: 'Account settings',
        adminOnly: true,
        pages: [
          {
            id: 'white-labelling',
            label: 'White labelling',
            scope: 'none',
            disabledNote: 'after the MVP',
          },
          {
            id: 'entitlements',
            label: 'Modules and entitlements',
            path: '/account/entitlements',
            scope: 'none',
            adminOnly: true,
            requirements: 'SYS-ACCESS-25 (SYS-NAVPAT-04)',
            replaces: 'New',
          },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help and support', icon: 'help' },
      { id: 'sign-out', label: 'Sign out', icon: 'logout' },
    ],
  },
];

export const RAIL_SECTIONS = SECTIONS.filter((s) => !s.fixed);
export const RAIL_FIXED = SECTIONS.filter((s) => s.fixed);

export function findSection(id: string) {
  return SECTIONS.find((s) => s.id === id);
}

export function sectionForPath(pathname: string) {
  return SECTIONS.find((s) => pathname === s.path || pathname.startsWith(s.path + '/'));
}

/** Returns the section, group and page a pathname resolves to, if it is a known page. */
export function navForPath(pathname: string) {
  const section = sectionForPath(pathname);
  if (!section) return undefined;
  for (const group of section.groups) {
    for (const page of group.pages) {
      if (page.path && page.path === pathname) return { section, group, page };
    }
  }
  return { section, group: undefined, page: undefined };
}
