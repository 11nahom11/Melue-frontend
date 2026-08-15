# Melu'e Foundation — Frontend

Complete frontend for the Melu'e Foundation therapy platform, built in
**React Native + Expo (SDK 51)** with Expo Router and React Navigation.
Every screen from the specification documents is implemented, covering all
**7 roles** (Teacher, Therapy Coordinator, Program Director, Director,
Institutional Admin, System Admin, Parent).

The detailed screen-by-screen specifications live in the
[`frontend description/`](./frontend%20description) folder — each screen ID
in the code (e.g. `SCR-TEA-001`) maps to a row in those documents.
`PROJECT_NOTES.md` holds the build breakdown, demo logins and known gaps.

## Run it

```bash
npm install
npx expo start
```

Scan the QR with **Expo Go**, or press `a` (Android emulator) / `i` (iOS
simulator) / `w` (web).

The app opens on the Login screen. Tap any **Demo Account** row (or type
its email — any password works) to enter that role:

| Role | Email |
|---|---|
| Teacher | teacher@melue.org |
| Therapy Coordinator | coordinator@melue.org |
| Program Director | pd@melue.org |
| Director | director@melue.org |
| Institutional Admin | admin@melue.org |
| System Admin | sysadmin@melue.org |
| Parent | parent@melue.org |

## What's built

All 7 role stacks from the spec docs, plus the cross-cutting feature areas:

- **Teacher / Therapist** — Dashboard, Session Data Collection with
  wall-clock session timer, Goal Mastery Check, Session Summary, Daily
  Notes, Goal Progress, ABC Log, Skills Assessment (ABLLS-R) + Need
  Analysis Map, Behavior Assessment (MASS/FAST + ABC), Scheduling Calendar,
  Attendance, Student Profile, Parent Communication.
- **Therapy Coordinator** — Dashboard, Live Session Monitoring (30s
  auto-refresh, station filter), Session Summary Review, Student Progress,
  Operational Management, Parent Communication, Student Enrollment +
  Enrollment Wizard, IUP generation, Room/Resource scheduling, Workload.
- **Program Director** — Dashboard, Assessment Review & Approval, IUP
  Generation & Management, IUP Library, Student Caseload, Goal Bank (CRUD),
  Graph & Chart View, Parent Communication, Goal Mastery Approval.
- **Director** — Dashboard, Staff Scheduling (capacity-validated), Goal
  Mastery Approval, Parent Communication hub + audit log, Reports &
  Oversight, Report Builder, Student Progress.
- **Institutional Admin** — Admin Panel, Form Builder, Trial Logging
  Format, ABC Dropdown Lists, Schedule & Capacity, Goal Domain
  Definitions, Task Analysis Templates, Clinical Categories, Clinic Info,
  Working Hours, School Settings.
- **System Admin** — Staff Account Management, Role Management, Permission
  Configuration (RBAC), Audit Log.
- **Parent** — Dashboard, Child Progress, Home Observation Log, Parent
  Communication, Reports.
- **Notifications** — per-role notification lists wired to each dashboard.

## Structure

```
melue-app/
├── app/                     # Expo Router entry (_layout.tsx, index.tsx)
├── assets/logo.png
├── frontend description/    # Screen specification documents (SCR-*)
├── src/
│   ├── api/                 # One file per role — assumed backend contracts
│   ├── components/          # Shared: StatusPill, ExportPreviewModal
│   ├── context/             # AuthContext — frontend-only role switching
│   ├── navigation/          # RootNavigator + one Stack per role
│   ├── screens/
│   │   ├── auth/            # Login, Forgot Password
│   │   ├── session/         # Teacher: Session Data Collection, Student Profile
│   │   ├── sessionsummary/  # Session Summary (resets the session timer)
│   │   ├── goalmastery/     # Goal Mastery Check
│   │   ├── assessments/     # ABLLS-R, Behavior, Preference, Sensory
│   │   ├── coordinator/     # Therapy Coordinator (12 screens)
│   │   ├── programdirector/ # Program Director (9 screens)
│   │   ├── director/        # Director (7 screens)
│   │   ├── institutionaladmin/  # Institutional Admin (11 screens)
│   │   ├── systemadmin/     # System Admin (4 screens)
│   │   ├── parent/          # Parent (6 screens)
│   │   └── notifications/   # Shared notification lists
│   └── theme/               # colors.ts, typography.ts
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Notes

- **Frontend-only**: every `src/api/*.ts` file is an assumed backend
  contract with `DEMO_*` fallbacks, so the whole app renders with no
  server. `BASE_URL` (`https://REPLACE_WITH_REAL_API_HOST/api/v1`) is where
  a real API plugs in.
- Typecheck: `npm run typecheck` (`tsc --noEmit`) passes clean.
- Role navigation is wired in `RootNavigator` via `STACK_BY_ROLE`; screens
  shared across two stacks (e.g. Goal Mastery Approval for Director and
  Program Director) switch their tab bar by `session.role`.
- Known gaps and simplifications (PDF export, real charts, offline sync,
  backend integration) are tracked in `PROJECT_NOTES.md`.
