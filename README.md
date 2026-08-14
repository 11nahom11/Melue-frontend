# melue-app

Complete frontend for the Melu'e Foundation therapy platform (React
Native / Expo Router). All 7 roles from the spec docs are built: Teacher,
Therapy Coordinator, Program Director, Director, Institutional Admin,
System Admin, Parent. See `PROJECT_NOTES.md` for the full screen-by-screen
breakdown and known gaps.

## Run it

```bash
npm install
npx expo install   # aligns dependency versions to your installed Expo SDK
npx expo start
```

Scan the QR with **Expo Go**, or press `a` (Android emulator) / `i` (iOS
simulator) / `w` (web).

Opens on the Login screen (matches Figma). Tap any Demo Account row to
enter that role — see `PROJECT_NOTES.md` for the full list of demo
emails.

## Structure

```
melue-app/
├── app/
│   ├── _layout.js       # Expo Router root layout (required)
│   └── index.js         # Entry point -> AuthProvider + RootNavigator
├── assets/
│   └── logo.png
├── src/
│   ├── api/              # One file per role - assumed backend contracts
│   ├── components/       # Shared: StatusPill (all roles), TopNav (Teacher only)
│   ├── context/           # AuthContext - frontend-only role switching
│   ├── navigation/        # RootNavigator + one Stack per role
│   ├── screens/
│   │   ├── auth/                # Login
│   │   ├── session/             # Teacher: Session Data Collection + Incident Modal
│   │   ├── goalmastery/         # Teacher: Goal Mastery Check
│   │   ├── sessionsummary/      # Teacher: Session Summary
│   │   ├── dailynotes/          # Teacher: Daily Notes + Note Editor
│   │   ├── goalprogress/        # Teacher: Goal Progress (draft, no spec)
│   │   ├── scheduling/          # Teacher: Scheduling Calendar + Appointment Modal
│   │   ├── attendance/          # Teacher: Attendance
│   │   ├── coordinator/         # Therapy Coordinator (6 screens)
│   │   ├── programdirector/     # Program Director (8 screens)
│   │   ├── director/            # Director (6 screens)
│   │   ├── institutionaladmin/  # Institutional Admin (6 screens)
│   │   ├── systemadmin/         # System Admin (3 screens)
│   │   └── parent/              # Parent (4 screens)
│   └── theme/              # colors.js, typography.js
├── app.json
├── babel.config.js
└── package.json
```

## Notes

- Package versions pinned to Expo SDK 51 as of generation — run
  `npx expo install` to correct any drift, safer than trusting hardcoded
  versions.
- Frontend-only throughout: every screen has a `DEMO_*` fallback so it
  renders standalone with no backend. See `PROJECT_NOTES.md` for what's
  assumed vs. confirmed, and for a known role-boundary issue around
  scheduling (MR-38/39/40).
