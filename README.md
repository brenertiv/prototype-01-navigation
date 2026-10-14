# Prototype 01: Navigation shell

A disposable research prototype of the Project Kilowatt app shell: the icon
rail, the context panel, the canvas top bar and the routes behind them. Every
page is a placeholder. The point is to walk the navigation pattern and judge it,
not to see content. The plan and goals are in `PLAN.md`; the governing spec is
`02-building/system/navigation-pattern.md` in `github.com/brenertiv/project-kilowatt`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` type-checks and bundles.

## What to try

- **Click every rail item.** Workspace, Building Info and People each swap the
  panel and the URL. Tenant Billing and Maintenance are marked Missing and open
  an upgrade page.
- **Start at Workspace, the app's home.** Its panel lists workspaces, and each
  one is a canvas that can be a dashboard, a report or a plan. Open one, leave
  for another section, then click Workspace on the rail: you land back on it.
  In the prototype controls, tick "New user" and pick a role to see a new user
  land on that role's default workspace, the only one they have. Each workspace
  page says how you got there.
- **Collapse the panel** (the toggle in the panel header), then hover or click a
  rail item: the panel peeks over the canvas without moving it. Click the canvas
  or press Escape to dismiss. The docked state survives a reload.
- **Open the assistant** (sparkle, top right). The drawer names what it is bound
  to and stays open across pages until you close it. That state survives a reload too.
- **Change scope** from the pill in the top bar. The scope rides in the URL as
  `?scope=` and follows you between sections. Open a record page such as
  Building Info › Details at portfolio scope to see the "pick a property" fix.
- **Open People.** Its panel is a flat list with no collapsible groups. Team,
  Tenants and Partners each open one page, and what used to be their sub-pages
  are filter chips over that page's records. The filter rides in the URL, so it
  deep-links and the back button steps through it.
- **Open the Company button** (top of the rail) to switch between fake companies.
- **Shrink the window** to 375 px wide: the rail and panel become one drawer from
  the menu button. Shrink the height: the section items scroll while the Company
  button and the Notifications and Account items stay put.
- **Tab through it.** A skip link, a visible focus ring, labels on every icon.
- **Prototype controls** (the dark button, bottom right) flip the other states:
  Admin or not, unread count, one or many companies, a panel loading delay, an
  empty group, a section with no access, and the theme.

## Routes

`/` redirects to `/workspace`, the app's home. Scope is `?scope=portfolio`, `?scope=west-region`
or `?scope=123-main-st`; with no scope the default (portfolio) applies.

| Rail item | Routes |
|---|---|
| Workspace | `/workspace` lands on the last workspace opened, or the role's default for a new user. Each workspace is `/workspace/:id`: `reporting-readiness`, `exposure-by-asset`, `data-problems`, `attention-today` (one ready-made default per role), and `gresb-2026`, `q3-board-pack`, `net-zero-2030`, `west-region-exposure` (a returning user's own). The old Home, Dashboards, Reports, Plans, Projects and Gallery routes redirect |
| Building Info | `/building-info/overview`; `/building-info/data-health/inbox`, `/sources`; `/building-info/utilities/coverage`, `/accounts`, `/bills`, `/energy-star`; `/building-info/record/details`, `/stacking-plan`, `/occupancy-hours`, `/policies`, `/accolades`, `/files`; `/building-info/equipment/equipment`, `/meters`, `/meter-health`, `/power-capacity`, `/one-line-diagram`, `/groups`, `/alerts` |
| People | `/people/team` (filters: `members`, `teams`), `/people/tenants` (`tenants`, `requests`), `/people/partners` (`contractors`, `vendors`, `management-companies`), `/people/contacts`, `/people/agents`. The filter is `?filter=`; the old sub-page routes redirect to their item and filter |
| Tenant Billing | `/tenant-billing` (upgrade page) |
| Maintenance | `/maintenance` (upgrade page) |
| Notifications | `/notifications/insights`, `/activity`, `/alerts`, `/app-updates` |
| Account | `/account/profile`, `/preferences`, `/notification-settings`, `/entitlements` (Admins) |
| Company | A modal, not a route |

The rail and every panel come from one data file, `src/nav/sections.ts`, which
mirrors the Rail contents table and each section's "Panel and pages" table.
Change the navigation by editing the data, not the components.

## Requirement coverage

| Requirement | Where | Notes |
|---|---|---|
| SYS-NAVPAT-01 three regions | `Shell.tsx` | Rail, panel, canvas |
| SYS-NAVPAT-02 rail changes the URL | `Rail.tsx` | Links, not buttons; back button and deep links work |
| SYS-NAVPAT-03 clear which section | `Rail.tsx`, `Panel.tsx`, `shell.css` | Filled icon, tinted background, edge bar, `aria-current`; the panel header names the section |
| SYS-NAVPAT-04 Missing sections | `Rail.tsx`, `UpgradePage.tsx` | Dashed border with a plus; the upgrade page has the three slots the spec names |
| SYS-NAVPAT-05 overflow menu | not built | Empty in the MVP and not shown, per the spec |
| SYS-NAVPAT-06 Account and Notifications fixed at the foot | `Rail.tsx`, `shell.css` | Separated from the sections by a rule; the account panel has the Personal and Admin-only Account settings groups and the footer |
| SYS-NAVPAT-07 Company button opens a modal | `CompanyModal.tsx` | Switches company only |
| SYS-NAVPAT-08 short viewport | `shell.css` `.rail-scroll` | Sections scroll; the ends stay fixed |
| SYS-NAVPAT-09 one rail for every persona | `sections.ts` | The rail does not change per persona |
| SYS-NAVPAT-10 one panel template | `Panel.tsx` | Header, primary action, groups, rows, footer |
| SYS-NAVPAT-11 docked state persists | `preferences.tsx` | localStorage stands in for personalization; the drawer state persists the same way (SYS-AI-11) |
| SYS-NAVPAT-12 peek while collapsed | `Shell.tsx`, `Panel.tsx` | Hover, click or focus a rail item; no layout shift |
| SYS-NAVPAT-13 panel per section from its spec | `sections.ts` | One entry per section |
| Workspace as a list of workspaces | `workspaces.ts`, `WorkspaceList.tsx`, `WorkspacePage.tsx` | **Differs from the spec.** Workspace is the app's home. Its panel is one flat list of workspaces, with no Home, Dashboards, Reports, Plans or Gallery groups; a workspace is one canvas that can hold a dashboard, a report or a plan. The rail item lands on the last workspace opened, or on the role's default for a new user. The spec has a library per artefact type (MOD-WS-45, 46) and a Home group |
| People panel, flat with filters | `sections.ts`, `PlaceholderPage.tsx` | **Differs from the spec.** People's panel has no collapsible groups; each item's former sub-pages are filters over its records. SYS-NAVPAT-10 and the People spec's Panel and pages both describe collapsible groups, so adopting this needs a decision-log entry and a spec change |
| SYS-NAVPAT-20 top bar controls | `TopBar.tsx` | Scope indicator where scope applies, share, more, assistant toggle |
| SYS-NAVPAT-21 no canvas chrome | `PlaceholderPage.tsx` | The page owns its title |
| SYS-NAVPAT-22 assistant toggle and drawer | `AssistantDrawer.tsx` | Bound to the page or the open artefact; a bottom sheet on phones |
| SYS-NAVPAT-30 phone drawer | `Shell.tsx`, `shell.css` | Rail and panel as one full-height drawer; row actions always shown; rail labels shown since there is no hover |
| SYS-NAVPAT-31 keyboard and labels | throughout | Skip link, focus ring, `aria-label` on icon-only controls, the title attribute is only the tooltip |
| SYS-SCOPE-10, 13, 15 scope persists and lives in the URL | `scope.ts` | Every link carries `?scope=` along |
| SYS-SCOPE-12 say so and offer the fix | `PlaceholderPage.tsx` | Record pages at portfolio scope; portfolio-only pages at property scope |
| SYS-SCOPE-30 to 33 where am I | `TopBar.tsx` | Level type, name, path, property count; portfolio and property look different; hidden where scope does not apply |
| SYS-ACCESS-06 never an empty or broken module | `NoAccessPage.tsx`, `Panel.tsx` | The no-access state says why and the next step |

## Shell states (prototype-data.md)

| State | How to reach it |
|---|---|
| ST-N01 every section active | Default |
| ST-N02 Missing sections and upgrade pages | Tenant Billing, Maintenance |
| ST-N03 a section the user can't access | Prototype controls › Section with no access |
| ST-N04 Company modal, one or many, with a guest | Company button; toggle "Member of several companies" |
| ST-N05 account panel for an Admin and a non-admin | Account item; toggle "Admin user" |
| ST-N06 docked, collapsed, collapsed with a peek | Panel toggle, then hover the rail |
| ST-N07 panel loading; empty group | "Panel loading delay"; "Empty group" (Building Info › Data health) |
| ST-N08 short viewport | Window height under about 480 px |
| ST-N09 phone width, drawer closed and open | 375 px wide; the menu button |
| ST-N10 canvas where scope doesn't apply | Any Account page |
| ST-N11 unread notifications, and none | "Unread notifications" |
| ST-N12 a pinned destination the user lost access to | Not reachable: pinning belongs to the overflow menu, which is empty in the MVP (SYS-NAVPAT-05) |
| ST-N13 deep link with and without scope | Paste any route, with or without `?scope=` |
| ST-N14 keyboard-only traversal | Tab from the top |

## What is faked

- Scope: three fixed scopes and a plain menu. The scope navigator (tree, search,
  recents) is its own spec and is not here.
- The Company list, the user (Sam Rivera), the unread count, the data-health and
  open-requests badges, and every number on screen.
- Search, filter, share, more-actions, row actions, Invite, New, Help, Sign out,
  Request from the account team: all present, none do anything.
- The assistant: a header and a disabled composer, no thread.
- Persistence: localStorage only.
- The look: placeholder tokens named by job (CMP-COLOR-03) with light and dark
  modes, Roboto and Material Symbols. Not the design system.

## Stack

Vite, React 18, TypeScript, React Router 6, plain CSS. No Material UI, Redux,
data layer, API, auth or tests. The production prototype's stack is in
`04-handoff/technical-approach/stack-and-architecture.md`; nothing here is meant
to carry over except the route model and the lessons.
