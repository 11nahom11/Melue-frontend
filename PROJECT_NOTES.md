# Melu'e Foundation App — Project Notes

Frontend-only (no backend team — every `src/api/*.ts` file is an assumed
contract with a `DEMO_*` fallback, not a real integration). All 7 roles
from the spec docs are built: Teacher, Therapy Coordinator, Program
Director, Director, Institutional Admin, System Admin, Parent. The screen
specifications live in `frontend description/`; the full work record and
architecture guide is `PROJECT_DOCUMENTATION.md`.

## How to log in

Login screen matches the Figma exactly. Tap any Demo Account row (or type
its email + Sign In, any password works) to enter that role:

| Role | Email |
|---|---|
| Teacher | teacher@melue.org |
| Coordinator | coordinator@melue.org |
| Director | director@melue.org |
| Institutional Admin | admin@melue.org |
| System Admin | sysadmin@melue.org |
| Program Director | pd@melue.org |
| Parent | parent@melue.org |

## Screen inventory (by role)

~60 screen files across the 7 role stacks, plus shared components
(`StatusPill`, `ExportPreviewModal`) and notification lists.

### Teacher / Therapist (13)
Teacher Dashboard (SCR-TEA-001), Assessment Dashboard (SCR-010),
Skills Assessment / ABLLS-R (SCR-011), ABLLS Need Analysis Map
(SCR-TEA-002A), Behavior Assessment MASS/FAST + ABC (SCR-012/013), ABC Log,
Session Data Collection (SCR-002), Goal Mastery Check (SCR-004), Session
Summary (SCR-005), Daily Notes & Summaries, Session Note Editor, Goal
Progress, Scheduling Calendar + Attendance, Student Profile (SCR-006A),
Parent Communication (SCR-TEA-005).

### Therapy Coordinator (12)
Dashboard (SCR-TC-001), Live Session Monitoring (SCR-TC-002, 30s
auto-refresh + working station filter), Session Summary Review (SCR-TC-003,
bulk approve), Student Progress Monitoring (SCR-TC-004), Operational
Management (SCR-TC-005), Parent Communication (SCR-TC-006), Student
Enrollment + Enrollment Wizard (SCR-009), IUP Generation (SCR-014), Student
Profile, Room/Resource Scheduling, Workload Dashboard, Notifications.

### Program Director (9)
Dashboard (SCR-PD-001), Assessment Review & Approval (SCR-PD-002), IUP
Generation & Management (SCR-PD-003), IUP Library (SCR-PD-004), Student
Caseload (SCR-PD-005), Goal Bank Management (SCR-PD-006), Parent
Communication (SCR-PD-007), Graph & Chart View (SCR-PD-008), Goal Mastery
Approval (SCR-PD-009 — shares SCR-DIR-003).

### Director (7)
Dashboard (SCR-DIR-001), Staff Scheduling (SCR-DIR-002, block-level
capacity-validated), Goal Mastery Approval (SCR-DIR-003), Parent
Communication (SCR-DIR-004, hub + escalation audit log), Reports & Oversight
(SCR-DIR-005), Report Builder, Student Progress Monitoring (SCR-DIR-006).

### Institutional Admin (11)
Admin Panel Overview, Form Builder (SCR-ADMIN-001), Trial Logging Format
(SCR-ADMIN-002), ABC Dropdown Lists (SCR-ADMIN-003), Session Schedule &
Capacity (SCR-ADMIN-004), Goal Domain Definitions (SCR-ADMIN-005), Task
Analysis Templates (SCR-ADMIN-006), Clinical Categories (SCR-ADMIN-007),
Clinic Info (SCR-ADMIN-008), Working Hours (SCR-ADMIN-009), School Settings
(SCR-ADMIN-010).

### System Admin (4)
Staff Account Management (SCR-SYS-001), Role Management (SCR-SYS-002),
Permission Configuration / RBAC (SCR-SYS-003), Audit Log (SCR-SYS-004).

### Parent (6)
Dashboard (SCR-PAR-001), Child Progress View (SCR-PAR-002), Home Observation
Log (SCR-PAR-003), Parent Communication (SCR-PAR-004), Reports,
Notifications.

## Latest work (most recent pass)

- **Session timer no longer resets** — the Session Data Collection timer now
  lives in a module-level wall-clock store (`src/stores/sessionTimerStore.ts`)
  computed from `Date.now()`, so switching tabs or backgrounds never restarts
  or drifts it. It resets only when a session is actually submitted.
- **SCR-TC-002** Live Session Monitoring now has a working Station filter
  (previously dead state).
- **SCR-PAR-004** Parent Communication: "Mark as Resolved" / "Reopen" with a
  real audit-log pane; `setParentConversationResolved` added to `parentApi.ts`.
- **SCR-006A** Teacher Student Profile: new `StudentProfileScreen` reachable
  by tapping the student name on a session card.
- **SCR-PD-009** Program Director can now approve goal mastery — the shared
  approval screen switches to a Program Director nav with an **Approvals** tab.
- **SCR-014** Coordinator IUP Generation — the screen is role-aware and
  reachable from the Coordinator Quick Actions ("Generate IUP").
- **SCR-009** Program Director Enrollment Wizard — "Enrollment" tab + dashboard
  quick action.
- Verified end-to-end: full `tsc --noEmit` typecheck passes, and a production
  bundle (`npx expo export`) compiles clean.
- **MR-38/39/40 scheduling is now a single source of truth** — previously the
  Teacher scheduling calendar and the Coordinator Operational Management screen
  each kept their own private demo copy of the schedule, so an appointment made
  in one role was invisible to the other. A shared in-memory store
  (`src/stores/scheduleStore.ts`) is now the one source of truth for both screens:
  create / edit / cancel / mark-status / reassign / unavailability all write to
  it, and each screen re-reads it on load and live-subscribes to changes.

## Simplifications made against spec (review before shipping)

- **Form Builder**: reorder-by-button instead of drag-and-drop.
- **Admin config → runtime screens**: Admin's ABC Dropdown Lists / Trial
  Logging Format / Task Analysis Templates configure options that Teacher
  screens currently hardcode — they'd share data automatically once a real
  backend exists.
- **Session Note Editor**: markdown-style toolbar, not true rich text.
- **PDF/Excel export**: "generate report" actions open a text-preview
  share sheet — no PDF library installed yet.
- **Charts**: Program Director's Graph & Chart View uses hand-built bar
  visualizations, not a charting library (would recommend
  `react-native-svg` + `victory-native` if real charts are needed).
- **Login / auth**: no credential check, entirely frontend/demo.
- **Offline queue / sync**: not implemented — needs AsyncStorage + backend.
- **Push notifications / read receipts**: stubs — need a backend.

## Dependencies

`expo-image-picker` and `expo-document-picker` were added for the Session
Note Editor's attachments. Run `npm install` / `npx expo install` after
pulling.

## Architecture reference

Every role follows the same pattern — useful if anything needs revisiting:

```
src/api/<role>Api.ts              - assumed backend contract (DEMO_* fallbacks)
src/screens/<role>/components/<Role>Nav.tsx - role-specific top nav + tab-to-route map
src/screens/<role>/<ScreenName>Screen.tsx   - one file per screen
src/navigation/<Role>Stack.tsx    - React Navigation stack for the role
```

`RootNavigator.tsx` maps `AuthContext`'s `session.role` to the right stack
via `STACK_BY_ROLE`. Adding an 8th role means: register it in
`AuthContext.tsx`'s `ROLES`/`DEMO_ACCOUNTS`, build the four files above,
add one line to `STACK_BY_ROLE`.

Shared across all roles: `src/theme` (colors, typography), `src/components`
(`StatusPill` — used everywhere, statuses typed via `StatusType`).
Screens shared between two stacks (Goal Mastery Approval: Director /
Program Director; Student Enrollment Wizard; IUP Generation) switch their
tab bar based on `session.role`.
