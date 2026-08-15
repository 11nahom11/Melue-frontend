# Melu'e Foundation — Project Documentation

Complete implementation record for the **Melu'e Foundation therapy-platform
frontend**. This document describes what was built, how it is organized, and
everything that was done to bring the app from the original baseline to the
current submission-ready state.

> Spec documents: `frontend description/` · Build notes: `PROJECT_NOTES.md` · This file: the full work record.

---

## 1. Project overview

A React Native / Expo (SDK 51) mobile+web frontend for a center-based ABA
therapy management platform. It implements **all 7 roles** defined in the
specification documents — Teacher (Therapist), Therapy Coordinator, Program
Director, Director, Institutional Admin, System Admin, and Parent — covering
roughly **60 screens** across the full clinical workflow: student enrollment
and assessment, session data collection and goal mastery, scheduling,
attendance, parent communication, reporting, RBAC administration, and
audit logging.

The app is **frontend-only by design**: every `src/api/*.ts` file is an
assumed backend contract with `DEMO_*` fallbacks, so the entire product
renders and is interactive with no server. This makes it reviewable,
demo-able, and ready to plug into a real API by replacing `BASE_URL`.

### Tech stack

| Layer | Choice |
|---|---|
| Framework | React Native via **Expo SDK 51** (Expo Router entry) |
| Navigation | **React Navigation** — native-stack per role, custom role tab bars |
| Language | **TypeScript** (strict `tsc --noEmit` typecheck passes) |
| Styling | StyleSheet + shared theme (`src/theme/`) |
| State | React Context for auth; module-level stores for shared cross-screen state |
| Icons | `@expo/vector-icons` (Feather) |
| Attachments | `expo-image-picker`, `expo-document-picker` |

### Verify it

```bash
npm install
npm run typecheck     # tsc --noEmit, must pass clean
npx expo start        # QR in Expo Go, or 'w' for web
```

---

## 2. Architecture

### Folder structure (as organized)

```
melue-app/
├── app/                        # Expo Router entry (_layout.tsx, index.tsx)
├── assets/logo.png
├── frontend description/       # Spec docs (SCR-* screen-by-screen)
├── PROJECT_DOCUMENTATION.md    # this file
├── PROJECT_NOTES.md            # build notes, logins, known gaps
├── README.md
└── src/
    ├── api/                    # One file per role — assumed backend contracts
    ├── components/             # Shared UI: StatusPill, ExportPreviewModal, TopNav
    ├── context/                # AuthContext — frontend-only role switching
    ├── navigation/             # RootNavigator + one Stack per role
    ├── screens/                # One folder per role / feature module
    │   ├── auth/  session/  sessionsummary/  goalmastery/  goalprogress/
    │   ├── assessments/  attendance/  abclog/  dailynotes/
    │   ├── scheduling/         # Staff calendar + shared appointment modals
    │   ├── coordinator/  programdirector/  director/
    │   ├── institutionaladmin/  systemadmin/  admin/
    │   ├── parent/  notifications/  teacherdashboard/  teacherparent/
    ├── stores/                 # Shared module-level stores
    │   ├── sessionTimerStore.ts  # wall-clock session timer
    │   └── scheduleStore.ts      # single source of truth for MR-38/39/40 scheduling
    └── theme/                  # colors.ts, typography.ts
```

### Conventions

Every role follows the same four-file pattern:

```
src/api/<role>Api.ts                  assumed backend contract (DEMO_* fallbacks)
src/screens/<role>/components/<Role>Nav.tsx   role tab bar + tab-to-route map
src/screens/<role>/<ScreenName>Screen.tsx     one file per screen
src/navigation/<Role>Stack.tsx                React Navigation stack for the role
```

- `RootNavigator.tsx` maps `session.role` → stack via `STACK_BY_ROLE`.
- Screens shared by two roles (Goal Mastery Approval, IUP Generation,
  Student Enrollment Wizard, Student Profile) switch their tab bar on
  `session.role` and are registered in both stacks.
- Cross-screen state that must survive navigation lives in `src/stores/`
  as module-level stores with a `subscribe`/`get` API — never in component
  state.
- API functions that "save" data resolve from the local store in demo mode
  (e.g. `sessionApi.createAppointment`) so all screens see consistent data.

---

## 3. Roles and screens

Screen IDs reference `frontend description/*.md`.

### Teacher / Therapist (13 screens)
| Screen | Spec |
|---|---|
| Teacher Dashboard | SCR-TEA-001 |
| Assessment Dashboard (6-week) | SCR-010 |
| Skills Assessment (ABLLS-R) + Need Analysis Map | SCR-011 / SCR-TEA-002 / SCR-TEA-002A |
| Behavior Assessment (MASS/FAST + ABC) | SCR-012 / SCR-013 / SCR-TEA-003 |
| ABC Log | SCR-003A |
| Session Data Collection | SCR-002 |
| Goal Mastery Check | SCR-004 |
| Session Summary | SCR-005 |
| Daily Notes & Summaries / Note Editor | SCR-TEA-004 |
| Goal Progress Update | SCR-TEA (draft) |
| Scheduling Calendar + Attendance | MR-38/39/40 |
| Student Profile | SCR-006A |
| Parent Communication | SCR-TEA-005 |

### Therapy Coordinator (12 screens)
Dashboard (SCR-TC-001), Live Session Monitoring (SCR-TC-002), Session
Summary Review (SCR-TC-003), Student Progress (SCR-TC-004), Operational
Management (SCR-TC-005), Parent Communication (SCR-TC-006), Student
Enrollment + Enrollment Wizard (SCR-009), IUP Generation (SCR-014),
Student Profile (MR-16), Room/Resource Scheduling, Workload Dashboard,
Notifications.

### Program Director (9 screens)
Dashboard (SCR-PD-001), Assessment Review & Approval (SCR-PD-002), IUP
Generation & Management (SCR-PD-003), IUP Library (SCR-PD-004), Student
Caseload (SCR-PD-005), Goal Bank Management (SCR-PD-006), Parent
Communication (SCR-PD-007), Graph & Chart View (SCR-PD-008), Goal Mastery
Approval (SCR-PD-009).

### Director (7 screens)
Dashboard (SCR-DIR-001), Staff Scheduling (SCR-DIR-002), Goal Mastery
Approval (SCR-DIR-003), Parent Communication hub (SCR-DIR-004), Reports &
Oversight (SCR-DIR-005), Report Builder, Student Progress (SCR-DIR-006).

### Institutional Admin (11 screens)
Admin Panel Overview, Form Builder (SCR-ADMIN-001), Trial Logging Format
(SCR-ADMIN-002), ABC Dropdown Lists (SCR-ADMIN-003), Schedule & Capacity
(SCR-ADMIN-004), Goal Domain Definitions (SCR-ADMIN-005), Task Analysis
Templates (SCR-ADMIN-006), Clinical Categories (SCR-ADMIN-007), Clinic Info
(SCR-ADMIN-008), Working Hours (SCR-ADMIN-009), School Settings
(SCR-ADMIN-010).

### System Admin (4 screens)
Staff Account Management (SCR-SYS-001), Role Management (SCR-SYS-002),
Permission Configuration / RBAC (SCR-SYS-003), Audit Log (SCR-SYS-004).

### Parent (6 screens)
Dashboard (SCR-PAR-001), Child Progress (SCR-PAR-002), Home Observation
Log (SCR-PAR-003), Parent Communication (SCR-PAR-004), Reports,
Notifications.

### Demo logins (any password)
`teacher@melue.org`, `coordinator@melue.org`, `pd@melue.org`,
`director@melue.org`, `admin@melue.org`, `sysadmin@melue.org`,
`parent@melue.org`.

---

## 4. What was done — work record

### 4.1 Original baseline → TypeScript rewrite

Replaced the initial JavaScript baseline with a full TypeScript app: typed
API contracts, typed navigation param lists, typed role stacks. Every screen
in the requirement docs (MR-3 through MR-52) plus the SCR screen specs was
implemented across all 7 roles. `npm run typecheck` (`tsc --noEmit`) passes.

### 4.2 Spec audit — every screen verified

Each spec document was audited against the code (parallel sub-agent
reviews): no missing screens, no broken imports, no render-crashing code.
The audit produced a fix list, all of which was implemented (see 4.3).

### 4.3 Bugs and dead ends fixed

1. **Session timer reset bug** — the Session Data Collection countdown
   restarted whenever the user left the Session tab (component state was
   lost on unmount). Fixed with a module-level **wall-clock** store
   (`src/stores/sessionTimerStore.ts`) computed from `Date.now()`. The
   timer now survives tab switches and backgrounding and only resets when a
   session is actually submitted. Wired into `SessionDataCollectionScreen`
   and `SessionSummaryScreen`.
2. **SCR-TC-002 dead station filter** — Live Session Monitoring had filter
   state with no UI. A working station-filter chip row was added.
3. **SCR-PAR-004 resolve/reopen** — Parent Communication gained
   "Mark as Resolved" / "Reopen" plus a real audit-log pane
   (`setParentConversationResolved` in `parentApi.ts`).
4. **SCR-006A teacher student profile** — new read-only Student Profile
   screen, reachable by tapping the student name on a session card; route
   added to the Session stack.
5. **SCR-PD-009 Program Director approvals** — Goal Mastery Approval is
   now role-aware: the Program Director gets his own nav with an
   **Approvals** tab (he previously saw the Director's tab bar).
6. **SCR-014 Coordinator IUP generation** — IUP Generation is role-aware
   and reachable from the Coordinator Quick Actions ("Generate IUP").
7. **SCR-009 Program Director enrollment wizard** — "Enrollment" tab and
   dashboard quick action added for the Program Director.
8. **MR-38/39/40 scheduling split-brain** — Teacher scheduling and
   Coordinator Operational Management each kept a private copy of the
   schedule, so appointments never crossed roles. Fixed with a shared
   source of truth: `src/stores/scheduleStore.ts`. Create / edit / cancel /
   mark-status / reassign / unavailability all write to the store, and both
   screens read it (and live-subscribe). Reassign also fixed a bug that
   appended student IDs as display names.

### 4.4 Code organization pass

- Removed stray empty folders left by a shell-glob mishap
  (`src/{theme,screens/...}`).
- Consolidated shared state into a dedicated `src/stores/` folder:
  `sessionTimerStore.ts` and `scheduleStore.ts` no longer live inside
  `screens/` or `api/`.
- Verified the full structure per-role / per-feature (see Architecture).

### 4.5 Quality gates

- `npm run typecheck` — clean.
- `npx expo export --platform web` — production bundle compiles clean.

---

## 5. Known gaps & simplifications

Genuinely backend/library-dependent items that cannot be "fixed" in a
frontend-only demo (tracked in `PROJECT_NOTES.md`):

| Area | Current state | Needs |
|---|---|---|
| PDF / Excel / print export | text-preview share sheet | a PDF library |
| Real charts | hand-built bars | `react-native-svg` + `victory-native` |
| Offline queue / sync | not implemented | AsyncStorage + backend |
| Admin config → runtime screens | Teacher screens hardcode option lists | backend shared data |
| Login / credentials | demo only, any password | backend auth |
| Push notifications / read receipts | stubs | backend |
| Note editor attachments | file picker works, no real upload | backend |

---

## 6. Git history

`main` branch on `github.com/11nahom11/Melue-frontend`, linear history:

- `6ea79de` — original JS baseline
- `c4f297a` — README update
- `9f2feaa` — full TypeScript rewrite (all roles, MR-3–MR-52)
- `9e722de` — spec fixes: session timer, station filter, parent resolve,
  teacher profile, PD approvals/enrollment, coordinator IUP
- `952d06e` — spec docs moved into `frontend description/`
- `f675638` — README + project notes refresh
- `937dfc4` — unified Teacher/Coordinator schedules via shared store
- latest — code organization pass + this documentation
