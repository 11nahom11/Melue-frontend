# Melu'e Foundation App — Project Notes

Frontend-only (no backend team - every `*Api.js` file is an assumed
contract with a `DEMO_*` fallback, not a real integration). All 7 roles
from the spec docs are built: Teacher, Therapy Coordinator, Program
Director, Director, Institutional Admin, System Admin, Parent.

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
| Program Director | pd@melue.org (not in Figma's demo list, added since the role exists in the spec docs) |
| Parent | parent@melue.org (same as above) |

## Screen count: 42 screens across 7 roles

### Teacher / Therapist (11 screens) — Daily Operations scope, expanded to full role coverage
| Screen | Spec | Notes |
|---|---|---|
| Teacher Dashboard (SCR-TEA-001) | Figma (exact match) | Today's Schedule, Quick Actions, Assessment Tasks, Pending Mastery Checks, Notifications - now the initial route for this role |
| Assessment Dashboard (SCR-010) | Figma (exact match) | 6-Week Assessment period, per-student ABLLS/Behavior cards. **Originally Hanania's ticket, not Daily Operations** - built now that the whole app is in scope. ABLLS/Behavior assessment *content* screens themselves (the actual assessment forms) are NOT built - only this launcher/dashboard |
| ABC Log / ABC Data Sheet (SCR-003A) | Figma (exact match) | Teacher's view of behavior incidents. **Originally Hanania's ticket.** Distinct from the Behavior Incident Modal (which *records* an incident during a session) and from Institutional Admin's ABC Dropdown List Manager (which configures the *option lists* both of these use) |
| Session Data Collection (SCR-002) | Figma + spec doc | Variable timer, color-coded trial icons, tap-to-activate, Task Analysis goal type |
| Behavior Incident Modal (SCR-003) | Spec doc | Dropdown options hardcoded from spec examples - real source is Institutional Admin's ABC List Manager |
| Goal Mastery Check (SCR-004) | Spec doc | Two-Teacher Generalization Check |
| Session Summary (SCR-005) | Spec doc | The live end-of-session report |
| Daily Notes & Summaries | Figma | Historical list of past sessions |
| Session Note Editor | Spec doc | Simplified markdown toolbar, not true rich text; real photo/doc attachments via expo-image-picker/expo-document-picker |
| Goal Progress Update | Business logic confirmed by spec, no screen layout | **Draft — still needs design review**. Reachable via "View Progress →" link on the active goal in Session Data Collection |
| Staff Scheduling Calendar + Attendance | Spec doc (via SCR-TC-005, role mismatch — see below) | |

**Parents tab still shows "not built here"** — this is the one deliberate exception. It's SCR-TEA-005 (Teacher-side messaging), distinct from the Parent role's own Communication screen (which IS built — see Parent section below, log in as `parent@melue.org`). Building the Teacher-side counterpart would mean designing a second messaging UI without a real backend to unify the threads between the two — flagged rather than guessed at.

### Therapy Coordinator (6 screens)
Dashboard, Live Session Monitoring (auto-refreshes every 30s), Session
Summary Review (bulk approve), Student Progress Monitoring, Operational
Management (the real scheduling home — reuses `AppointmentFormModal`),
Parent Communication.

### Program Director (8 screens)
Dashboard, Assessment Review & Approval, IUP Generation (goal-bank-driven
slot assignment), IUP Library, Student Caseload, Goal Bank Management
(full CRUD), Parent Communication, Graph & Chart View.

### Director (6 screens)
Dashboard, Staff Scheduling (block-level teacher/student assignment,
capacity-validated), Goal Mastery Approval (receives Teacher's SCR-004
submissions), Parent Communication (centralized hub + escalation log),
Reports & Oversight, Student Progress Monitoring.

### Institutional Admin (6 screens)
Form Builder (reorder-by-button, not drag-and-drop — see simplifications),
Trial Logging Format (the real source of Teacher's FP/PP/G/+ levels), ABC
Dropdown Lists (real source of the Incident Modal's options), Session
Schedule & Capacity, Goal Domain Definitions, Task Analysis Templates
(real source of the Task Analysis goal type).

### System Admin (3 screens)
Staff Account Management (bulk actions, password reset), Role Management,
Permission Configuration (RBAC matrix with audit trail).

### Parent (4 screens)
Dashboard, Child Progress View (parent-friendly language, session summary
modal), Home Observation Log (handles team-requested logs with prefill),
Parent Communication (quick-reply templates, escalation visibility).

## Known unresolved issue: MR-38/39/40 role mismatch

The real spec for staff scheduling (SCR-TC-005) belongs to the Therapy
Coordinator role. The original ticket assignment put MR-38 (Staff
Scheduling Calendar), MR-39 (Appointments), MR-40 (Attendance) under
"Teacher — Daily Operations." Both now exist: a Teacher-facing version
(simpler, single-teacher view) and the Coordinator's Operational
Management screen (full cross-teacher view with performance metrics).
They currently work independently and don't sync with each other — a
real backend would need one source of truth. Worth a team conversation
about whether to keep both or consolidate.

## Simplifications made against spec (review before shipping)

- **Form Builder**: reorder-by-button instead of drag-and-drop.
- **Behavior Incident Modal / ABC Lists**: not yet connected — Admin's
  list manager and Teacher's modal both exist but don't share data source
  yet (would happen automatically once a real backend exists).
- **Trial Logging Format / Session screen**: same — Admin can configure
  prompt levels, Teacher's screen still hardcodes FP/PP/G/+.
- **Session Note Editor**: markdown-style toolbar, not true rich text.
- **Attendance/Report screens**: several "generate report" actions are
  stub alerts — no PDF viewer built anywhere in the app yet.
- **Charts**: Program Director's Graph & Chart View uses simple bar
  visualizations, not a real charting library (no chart lib was
  installed — would recommend `react-native-svg` + `victory-native` or
  similar if real charts are needed).
- **Login**: no real credential check, entirely frontend/demo.

## Dependencies

`expo-image-picker` and `expo-document-picker` were added for the Session
Note Editor's attachments. Run `npm install` / `npx expo install` after
pulling.

## Architecture reference

Every role follows the same pattern — useful if anything needs revisiting:

```
src/api/<role>Api.js              - assumed backend contract
src/screens/<role>/components/<Role>Nav.js  - role-specific top nav + tab-to-route map
src/screens/<role>/<ScreenName>Screen.js    - one file per screen
src/navigation/<Role>Stack.js     - React Navigation stack for the role
```

`RootNavigator.js` maps `AuthContext`'s `session.role` to the right stack
via `STACK_BY_ROLE`. Adding an 8th role means: register it in
`AuthContext.js`'s `ROLES`/`DEMO_ACCOUNTS`, build the four files above,
add one line to `STACK_BY_ROLE`.

Shared across all roles: `src/theme` (colors, typography), `src/components`
(`StatusPill` — used everywhere; `TopNav` — Teacher-specific, not shared
despite the generic name).
