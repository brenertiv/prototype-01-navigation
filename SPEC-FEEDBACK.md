# Prototype 01: recommended updates to Project Kilowatt

What prototype 01 changed from the navigation spec, and what it had to guess
because the docs were silent. Use it to update `github.com/brenertiv/project-kilowatt`
so the next prototype built from the docs gets it right on the first prompt.

Checked against the repo at commit `029dffd` (2026-10-14). Prototype commits:
`a215480` (shell as specified), `833fbd4` (People), `d18a21a` (Workspace).

## Part 1: Changes made after review

Six directions from review, all on 2026-10-14. Changes 1 to 3 contradict
agreed spec text, so each needs a decision-log entry before the specs change.
Changes 4 to 6 settle points the spec left open.

### 1. The People panel is a flat list; sub-pages become filters

**What changed.** The People panel has no collapsible groups. Each former group
is one row and one page, and its former sub-pages are filters over that page's
records.

| Panel item | Filters on its page | Was |
|---|---|---|
| Team | Team members · Teams | Group with two pages |
| Tenants | Tenants · Requests | Group with two pages |
| Partners | Contractors and guests · Vendors · Management companies | Group with three pages |
| Building contacts | none | Group with one page, Who's who |
| Agents | none | Group with one page, Chase agent |

**Docs to update**

- `02-building/system/navigation-pattern.md`, SYS-NAVPAT-10: the template names
  "collapsible groups, item rows". Allow a section to use flat items whose
  records carry filters instead.
- `02-building/system/navigation-pattern.md`, Panel template table: add a
  "Filters per item" field beside "Groups, in order" and "Pages per group".
- `02-building/modules/people.md`, Panel and pages: replace the groups and pages
  table with the items and filters above. Requirement IDs move with the filters
  unchanged.
- `02-building/system/navigation-pattern.md`, Rail contents row 4: list the new
  items.
- `02-building/journeys-and-prototypes/journeys-and-ia.md`, IA tree: People
  branch.

**Open questions to add**

- Do filters include an "All" option? Partners is the likeliest place for one.
- Should other sections follow the same pattern, or is it People only?
- Should the filter be in the URL, as the scope is under SYS-SCOPE-13? The
  prototype puts it there so filtered views can be linked.

### 2. Workspace is the app's home and lands on a workspace, not a Home page

**What changed.** Workspace is the app's home, and there is no Home page.

- The Workspace rail item lands on the last workspace the user had open.
- A new user lands on the ready-made default for their role, and it is the only
  workspace they have.

**Docs to update**

- `02-building/modules/workspace.md`, MOD-WS-01: "a default dashboard per
  persona" becomes a default workspace per role, which a new user lands on.
- `02-building/modules/workspace.md`, MOD-WS-52: "Home is the user's copy of
  their persona default" no longer applies.
- `02-building/system/personalization.md`: add the last-opened workspace as a
  persisted preference, alongside the docked panel (SYS-NAVPAT-11).
- `02-building/system/navigation-pattern.md`: say where each rail item lands.
  The spec defines this for no section today (see Part 2).

### 3. A workspace is one canvas; the panel lists workspaces

**What changed.** A workspace is one canvas that can cover a dashboard, a
report or a plan. The Workspace panel is a flat list of workspaces: the role's
default first, then the user's own. The Home, Dashboards, Reports, Plans and
Gallery groups are gone. "New" stays as the primary action.

**Docs to update**

- `00-project/02-decision-log.md`: the 2026-10-13 decision "Workspace is a
  library of artefacts, not a set of containers" with three artefact types is
  reversed or reshaped. The 2026-10-13 decision that redesigned Plans and
  Projects as library lists is affected too.
- `02-building/modules/workspace.md`, MOD-WS-45 and 46: three artefact types,
  one list per type, become one workspace type in one list.
- `02-building/modules/workspace.md`, Panel and pages: replace the groups and
  pages table.
- `02-building/system/navigation-pattern.md`, Rail contents row 2: "Home,
  Dashboards, Reports, Plans, Gallery" becomes a list of workspaces.
- `02-building/journeys-and-prototypes/journeys-and-ia.md`, IA tree: Workspace
  branch.
- `02-building/system/ai-assistant.md`, SYS-AI-02 and 07: "artefact thread"
  becomes the workspace's thread, if the term changes.
- `02-building/journeys-and-prototypes/hypotheses-and-prototypes.md`,
  hypothesis 2: it tests generating from an example gallery, and the Gallery is
  gone from the panel.
- `02-building/journeys-and-prototypes/prototype-data.md`, ST-W states: they are
  written per artefact type (stale report, scheduled report, carbon plan
  approval). Review them against one workspace type.
- `reference/cowork-workspace-pattern.md`, "What Workspace leaves out": it says
  Workspace left out Cowork's containers. Re-read it against the new model.

**Requirements that lost their page and need a new home**

| Requirement | It lived on | Question |
|---|---|---|
| MOD-WS-40, 41: ready-made set and "start from this and change it" | Gallery | Inside New, or somewhere else? |
| MOD-WS-53: every report schedule with run history and an enable toggle | Reports | Where are schedules managed? |
| MOD-WS-23: Create Plan wizard | Plans | Is it an option under New? |
| MOD-WS-20, 22, 24: capital projects across plans | Projects | Is it a workspace, a Building Info page, or gone? |

### 4. Upgradable sections have no panel

**What changed.** Tenant Billing and Maintenance open their upgrade page with no
panel, so the page takes the full canvas. They never open a peek while the panel
is collapsed, and on a phone, choosing one closes the drawer.

**Docs to update**

- `02-building/system/navigation-pattern.md`, SYS-NAVPAT-02: "Choosing a rail
  destination swaps the panel to that section" needs an exception for Missing
  sections.
- `02-building/system/navigation-pattern.md`, SYS-NAVPAT-04: say a Missing
  section has no panel. The Rail contents table already says it opens "an
  upgrade page" rather than a panel, so this makes the rule explicit.
- `02-building/system/navigation-pattern.md`, SYS-NAVPAT-12: Missing sections do
  not peek.

### 5. Rail tooltips show each item's name

**What changed.** Each rail item shows its name in a tooltip on hover or
keyboard focus in two cases:

- The panel is docked.
- The item has no panel: the upgradable sections and the Company button.

While the panel is collapsed, items with a panel peek instead, because the peek
header already names the section. The tooltip carries the name only, without
the unread count or the Missing state. Screen readers get those from the item's
label.

**Docs to update**

- `02-building/system/navigation-pattern.md`, SYS-NAVPAT-31: it says only that
  a tooltip is not the label. Add when the tooltip shows, and that it gives way
  to the peek while the panel is collapsed.

### 6. Icons use weight 300

**What changed.** Every icon uses Material Symbols Outlined at weight 300,
lighter than the font's default of 400. The weight is one token, so filled
icons, such as the active rail item, use it too.

**Docs to update**

- `02-building/design-system/icons.md`, CMP-ICON-01: it names Material Symbols
  but not the style or the weight. Add Outlined, weight 300, and that fill marks
  a selected state.
- `02-building/design-system/icons.md`, CMP-ICON-03: it calls for one icon per
  meaning, kept in a list. No list exists yet. The prototype's icons are a
  starting point, and one clash needs resolving: `add` means both "create" on
  New and "not in your account" on the upgradable rail badge.

### Interim step, superseded

Before change 2, Home alone was removed from the Workspace panel, and the panel
title linked to it. Change 2 replaced this before it was committed on its own.
It needs no doc update.

## Part 2: Gaps the docs left open

Places where the prototype had to guess. Writing these down would make the
next build land without review rounds.

- **URL scheme.** SYS-SCOPE-13 puts scope in the URL, but no doc defines the
  routes. The prototype uses section, group and page in the path, with scope
  and filter as query parameters. A route table in the navigation spec would
  settle it.
- **Where a rail item lands.** No section names its default page. The prototype
  used each section's first page until Workspace was decided in review.
- **Rail contents contradicts People.** Rail contents row 4 lists four People
  groups and leaves out Agents, which `people.md` and the IA tree include.
- **ST-N12 cannot occur in the MVP.** The state "a pinned destination the user
  has lost access to" needs pinning. SYS-NAVPAT-05 leaves the overflow menu,
  where pinning lives, empty and hidden in the MVP.
- **Missing-section treatment.** SYS-NAVPAT-04 leaves it to design. The
  prototype used a dashed border with a plus badge.
- **Active rail marker.** SYS-NAVPAT-03 requires more than colour without saying
  what. The prototype used a filled icon, a tinted background and an edge bar.
- **Phone breakpoint.** SYS-NAVPAT-30 says "phone width" without a number. The
  prototype switches below 768 px.
- **Labels in the phone drawer.** Desktop rail labels are tooltips, and phones
  have no hover. The prototype shows labels under the icons in the drawer.

## Part 3: Inferences in the prototype to confirm

- **Dashboards and Projects were removed too.** Review named Reports, Plans and
  Gallery. Dashboards went because each workspace is now the canvas a dashboard
  was, and Projects went with Plans.
- **The role defaults' names.** Reporting readiness, Exposure by asset, Data
  problems to fix and Needs attention today are drawn from MOD-WS-01's
  description of what each persona opens Enertiv for.
- **Panel labels for single-page items.** Building contacts and Agents keep the
  group names rather than Who's who and Chase agent.
