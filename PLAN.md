# Prototype 01: Navigation shell

A lightweight research prototype of the app shell defined in Project Kilowatt
(`github.com/brenertiv/project-kilowatt`). It builds the shell and every route,
with placeholder pages, so the team can walk the navigation pattern and judge it
before the production prototype commits to it.

Source specs, in order of authority:

- `02-building/system/navigation-pattern.md` (agreed 2026-10-14): the rail, the
  panel template, the top bar and canvas, phones, the Rail contents table.
- `02-building/modules/workspace.md`, `building-info.md`, `people.md` and
  `02-building/system/notifications.md`: each section's "Panel and pages" table.
- `02-building/journeys-and-prototypes/journeys-and-ia.md`: the links-only IA tree.
- `02-building/system/portfolio-scoping.md`: scope in the URL, the scope indicator.
- `02-building/system/ai-assistant.md`: the drawer toggle and its persisted state.
- `02-building/journeys-and-prototypes/prototype-data.md`: shell states ST-N01 to ST-N14.
- `reference/chat-app-navigation-pattern.md`: the measurements the spec was drawn from.

## Goals

1. Make the agreed shell tangible. Every rail destination, panel group and page
   exists as a route, so anyone can click through the whole IA and feel whether
   three regions plus one panel template hold up across five sections,
   Notifications and Account.
2. Test the two "must make possible" claims in SYS-NAVPAT: users always know which
   section they are in (SYS-NAVPAT-03), and any section is one step away on
   desktop or phone.
3. Exercise the shell states in the state catalogue (ST-N01 to ST-N14) so review
   feedback can cite a requirement ID rather than a feeling.
4. Settle the URL model (section / group / page, plus scope) before the production
   prototype's router is written.
5. Be disposable. Nothing here is production code. The production prototype rebuilds
   the shell on the decided stack from the same spec.

## What gets built

### The rail (SYS-NAVPAT-01 to 09)

- Company button at the top. Opens a modal listing fake companies; picking one
  changes a label, nothing else (SYS-NAVPAT-07).
- Section destinations, in the Rail contents order: Workspace, Building Info,
  People, Tenant Billing, Maintenance. The last two are marked Missing and open an
  upgrade page placeholder (SYS-NAVPAT-04, 09).
- No overflow menu, per the MVP decision (SYS-NAVPAT-05).
- Notifications and Account fixed to the bottom, visually separated; the section
  destinations scroll in their own container on a short viewport (SYS-NAVPAT-06, 08).
- Active item marked by a filled icon, a tinted background and an edge bar, not
  colour alone. Every item has a tooltip and a screen-reader label (SYS-NAVPAT-03, 31).
- Notifications carries a fake unread count (ST-N11).

### The panel (SYS-NAVPAT-10 to 13)

One Panel component fed by data. Each section's "Panel and pages" table becomes a
data file entry: header title, which header actions it uses, primary actions,
groups in order, pages per group with their scope and route. The panel renders
whatever the data says, so the shell proves the template rather than five
hand-built sidebars.

- Header: title, search (non-functional), section action icons, dock toggle.
- Primary action row where the spec has one (Workspace "New", People "Invite").
- Collapsible groups and item rows; the selected row keeps a tinted background.
- Docked or collapsed, persisted in localStorage as a stand-in for personalization
  (SYS-NAVPAT-11). While collapsed, hovering or clicking a rail item opens a peek
  over the canvas with no layout shift (SYS-NAVPAT-12).
- Account panel: Personal group, an Admin-only Account settings group, and a footer
  with Help and Sign out. A prototype toggle switches Admin on and off (ST-N05).

### The canvas and top bar (SYS-NAVPAT-20 to 22)

- No chrome. Each placeholder page owns its title and states its section, group,
  page, route, the scope it works at, and the requirement IDs it will meet. That
  is all a page contains.
- Top bar: scope indicator where scope applies, share and more-actions
  placeholders, and the AI assistant toggle.
- Assistant drawer: opens beside the canvas, its header names what it is bound to
  ("Bound to: Coverage"), and its open or closed state persists (SYS-AI-01, 02, 11).
  No chat inside.
- Scope: kept in the URL as a query parameter and preserved when moving between
  sections (SYS-SCOPE-10, 13). A thin switch between "Portfolio" and one fake
  property drives the indicator. Record pages that need one property show the
  "Pick a property" message at portfolio scope instead of an empty page
  (SYS-SCOPE-12). Account pages show no indicator (ST-N10).
- Upgrade page placeholder for Missing sections, with a "Request from account team"
  button that does nothing.

### Phones and keyboard (SYS-NAVPAT-30, 31)

- Below 768 px the rail and panel open together as one full-height drawer from a
  top-bar control, and hover-only controls are always shown. The assistant drawer
  becomes a bottom sheet.
- A skip link, a sensible focus order through rail, panel and canvas, visible focus
  rings, and labels on every icon-only control.

### Prototype controls

A small popover, kept out of the shell's own chrome, that flips the states the
catalogue asks for: Admin or not, unread count, one company or many, a simulated
panel loading delay, an empty group, a lost-access section. It is a test harness,
not a feature.

## Routes

Scope rides along as `?scope=portfolio` or `?scope=<property>`.

| Rail item | Routes |
|---|---|
| Workspace | `/workspace` lands on the last workspace opened, or the role's default for a new user. Each workspace is `/workspace/:id`: `reporting-readiness`, `exposure-by-asset`, `data-problems`, `attention-today` (one ready-made default per role), and `gresb-2026`, `q3-board-pack`, `net-zero-2030`, `west-region-exposure` (a returning user's own). The old Home, Dashboards, Reports, Plans, Projects and Gallery routes redirect |
| Building Info | `/building-info/overview`; `/building-info/data-health/inbox`, `/sources`; `/building-info/utilities/coverage`, `/accounts`, `/bills`, `/energy-star`; `/building-info/record/details`, `/stacking-plan`, `/occupancy-hours`, `/policies`, `/accolades`, `/files`; `/building-info/equipment/equipment`, `/meters`, `/meter-health`, `/power-capacity`, `/one-line-diagram`, `/groups`, `/alerts` |
| People | `/people/team` (filters: `members`, `teams`), `/people/tenants` (`tenants`, `requests`), `/people/partners` (`contractors`, `vendors`, `management-companies`), `/people/contacts`, `/people/agents`. The filter is `?filter=`; the old sub-page routes redirect to their item and filter |
| Tenant Billing | `/tenant-billing` (upgrade page) |
| Maintenance | `/maintenance` (upgrade page) |
| Notifications | `/notifications/insights`, `/activity`, `/alerts`, `/app-updates` |
| Account | `/account/profile`, `/preferences`, `/notification-settings`, `/entitlements` (Admin) |
| Company | A modal, not a route |

`/` redirects to `/workspace`, the app's home. Every rail click and every panel row changes
the URL, so deep links and the back button keep the section (SYS-NAVPAT-02, ST-N13).

## Changes after review

- **People panel flattened (2026-10-14).** The People panel has no collapsible
  groups. Each top-level item (Team, Tenants, Partners, Building contacts,
  Agents) is one row and one page, and its former sub-pages are filters over that
  page's records, kept in the URL as `?filter=`. Old sub-page routes redirect.
  This differs from SYS-NAVPAT-10 and the People spec's Panel and pages, which
  both describe collapsible groups.

- **Workspace is a list of workspaces (2026-10-14).** Workspace is the app's
  home, and a workspace is one canvas that can cover a dashboard, a report or a
  plan. The panel is a flat list of workspaces: the Home, Dashboards, Reports,
  Plans (with Projects) and Gallery groups are gone, and there is no Home page.
  The rail item lands on the last workspace the user had open; a new user lands
  on the ready-made default for their role (MOD-WS-01), which is the only one
  they have. This differs from the Workspace spec's Panel and pages and from
  MOD-WS-45 and 46, which define three artefact types kept in a library.
- **No panel for upgradable sections (2026-10-14).** Tenant Billing and
  Maintenance open their upgrade page with no panel, docked or not, and never
  peek. On a phone, choosing one closes the drawer.
- **Rail tooltips (2026-10-14).** Each rail item shows its name in a tooltip on
  hover or focus when the panel is docked, or when the item has no panel
  (the upgradable sections and the Company button). While the panel is
  collapsed, items with a panel peek instead of showing a tooltip.

## Stack

Vite, React, TypeScript, React Router, Material Symbols from a font link, plain
CSS with semantic custom properties for light and dark. No Material UI, Redux,
data layer, API, auth, or tests. The production prototype's stack is decided in
`04-handoff/technical-approach/stack-and-architecture.md`; this prototype only
borrows the pieces that matter for navigation (React Router, Material Symbols,
token naming by job per CMP-COLOR-03) and leaves the rest, because none of it
tests navigation.

## Layout

```
prototype-01-navigation/
  README.md            what it is, how to run, which requirement each behaviour covers, what is faked
  PLAN.md              this file
  index.html  package.json  vite.config.ts  tsconfig.json
  src/
    main.tsx  App.tsx            router and shell composition
    nav/rail.ts                  the Rail contents table as data
    nav/sections.ts              each section's panel: groups, pages, scope, route
    shell/Rail.tsx  Panel.tsx  TopBar.tsx  Canvas.tsx
    shell/AssistantDrawer.tsx  CompanyModal.tsx  MobileDrawer.tsx  PrototypeControls.tsx
    pages/PlaceholderPage.tsx  UpgradePage.tsx  PickPropertyPage.tsx
    state/preferences.ts         docked, drawer open, admin flag (localStorage)
    state/scope.ts               scope from the URL
    styles/tokens.css  shell.css
```

## Out of scope

No page content, charts, tables, forms, data or API. No real search, no scope
navigator tree, no onboarding, personas, entitlement logic, or AI. No overflow
menu or pinning. No white labelling. No tenant view. Nothing is persisted beyond
the browser's localStorage.

## Done when

- Every route in the table renders inside the shell with its placeholder.
- Every ST-N state except ST-N12 can be reached, by navigation or the prototype controls (ST-N12 needs the overflow menu, which is empty in the MVP).
- The shell works at 375 px and at a desktop width, and the panel's docked state and
  the drawer's open state survive a reload.
- The whole shell can be driven by keyboard alone.
- The README maps each behaviour to its requirement ID and lists what is faked.
